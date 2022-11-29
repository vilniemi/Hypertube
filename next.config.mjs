// @ts-check
import { env } from './src/env/server.mjs';
import { CronJob } from 'cron';

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
	return config;
}
var job = new CronJob(
	'* * * * * *',
	function () {
		console.log('You will see this message every second');
	},
	null,
	true,
	'America/Los_Angeles'
);
export default defineNextConfig({
	reactStrictMode: true,
	swcMinify: true,
	/** Next.js i18n docs:
	 * @see https://nextjs.org/docs/advanced-features/i18n-routing
	 * Reference repo for i18n:
	 * @see https://github.com/juliusmarminge/t3-i18n
	 **/
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	output: 'standalone',
});
