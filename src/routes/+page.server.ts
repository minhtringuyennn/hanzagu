import { google } from 'googleapis';

import { env } from '$lib/env';
import type { PageServerLoad } from './$types';

interface ImageData {
	id: number;
	src: string;
	title: string;
	subtitle: string;
	alt: string;
	href: string;
}

export const load = (async () => {
	const SPREADSHEET_ID = env.SPREADSHEET_ID;
	const SHEET_NAME = env.SHEET_NAME;
	const START_CELL = env.START_CELL;
	const END_CELL = env.END_CELL;

	const auth = new google.auth.GoogleAuth({
		keyFile: 'credentials.json',
		scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly'
	});

	const sheets = google.sheets({ version: 'v4', auth });

	const range = `${SHEET_NAME}!${START_CELL}:${END_CELL}`;

	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: SPREADSHEET_ID,
		range
	});

	const rawResponsed = response.data.values;

	const rows = rawResponsed?.map((row) => {
		const [id, src, title, subtitle, alt, href] = row;
		return {
			id,
			src,
			title,
			subtitle,
			alt,
			href
		};
	}) as ImageData[];

	return { rows };
}) satisfies PageServerLoad;
