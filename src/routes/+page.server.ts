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
	const AUTH_PROVIDER_X509_CERT_URL = env.AUTH_PROVIDER_X509_CERT_URL;
	const AUTH_URI = env.AUTH_URI;
	const CLIENT_EMAIL = env.CLIENT_EMAIL;
	const CLIENT_ID = env.CLIENT_ID;
	const CLIENT_X509_CERT_URL = env.CLIENT_X509_CERT_URL;
	const raw_private_key = JSON.parse(env.PRIVATE_KEY);
	const { PRIVATE_KEY } = raw_private_key;
	const PRIVATE_KEY_ID = env.PRIVATE_KEY_ID;
	const PROJECT_ID = env.PROJECT_ID;
	const TOKEN_URI = env.TOKEN_URI;
	const TYPE = env.TYPE;
	const UNIVERSE_DOMAIN = env.UNIVERSE_DOMAIN;

	const SPREADSHEET_ID = env.SPREADSHEET_ID;

	const SHEET_NAME = env.SHEET_NAME;
	const START_CELL = env.START_CELL;
	const END_CELL = env.END_CELL;

	const credentials = {
		auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
		auth_uri: AUTH_URI,
		client_email: CLIENT_EMAIL,
		client_id: CLIENT_ID,
		client_x509_cert_url: CLIENT_X509_CERT_URL,
		private_key: PRIVATE_KEY,
		private_key_id: PRIVATE_KEY_ID,
		project_id: PROJECT_ID,
		token_uri: TOKEN_URI,
		type: TYPE,
		universe_domain: UNIVERSE_DOMAIN
	};

	const auth = new google.auth.GoogleAuth({
		credentials,
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
