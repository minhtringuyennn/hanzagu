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
	const auth_provider_x509_cert_url = env.auth_provider_x509_cert_url;
	const auth_uri = env.auth_uri;
	const client_email = env.client_email;
	const client_id = env.client_id;
	const client_x509_cert_url = env.client_x509_cert_url;
	const raw_private_key = JSON.parse(env.private_key);
	const { private_key } = raw_private_key;
	const private_key_id = env.private_key_id;
	const project_id = env.project_id;
	const token_uri = env.token_uri;
	const type = env.type;
	const universe_domain = env.universe_domain;

	const spreadsheet_id = env.spreadsheet_id;

	const sheet_name = env.sheet_name;
	const start_cell = env.start_cell;
	const end_cell = env.end_cell;

	const credentials = {
		auth_provider_x509_cert_url,
		auth_uri,
		client_email,
		client_id,
		client_x509_cert_url,
		private_key,
		private_key_id,
		project_id,
		token_uri,
		type,
		universe_domain
	};

	const auth = new google.auth.GoogleAuth({
		credentials,
		scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly'
	});

	const sheets = google.sheets({ version: 'v4', auth });

	const range = `${sheet_name}!${start_cell}:${end_cell}`;

	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: spreadsheet_id,
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
