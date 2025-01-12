import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from 'classnames';

import { Header, RouteGuard } from "@/components";
import { baseURL, style } from '@/app/resources'

import { Inter } from 'next/font/google'
import { Source_Code_Pro } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from "@/i18n/routing";
import { renderContent } from "@/app/resources";
import { Flex } from "@/once-ui/components";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

type Params = Promise<{ locale: string }>

export async function generateMetadata(
	{ params }: { params: Params }
) {
	const { locale } = await params;
	const t = await getTranslations();
	const { person, home } = renderContent(t);

	return {
		metadataBase: new URL(`https://${baseURL}/${locale}`),
		title: home.title,
		description: home.description,
		openGraph: {
			title: `${person.firstName}'s Portfolio`,
			description: 'Portfolio website showcasing my work.',
			url: baseURL,
			siteName: `${person.firstName}'s Portfolio`,
			locale: 'en_US',
			type: 'website',
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
	}
};

const primary = Inter({
	variable: '--font-primary',
	subsets: ['latin'],
	display: 'swap',
})

type FontConfig = {
    variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
*/

const code = Source_Code_Pro({
	variable: '--font-code',
	subsets: ['latin'],
	display: 'swap',
});

interface RootLayoutProps {
	children: React.ReactNode;
	params: Params;
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({locale}));
  }

export default async function RootLayout({
	children,
	params
} : RootLayoutProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	const messages = await getMessages();
	return (
		<NextIntlClientProvider messages={messages}>
			<Flex
				as="html" lang="en"
				background="page"
				data-neutral={style.neutral} data-brand={style.brand} data-accent={style.accent}
				data-solid={style.solid} data-solid-style={style.solidStyle}
				data-theme={style.theme}
				data-border={style.border}
				data-surface={style.surface}
				data-transition={style.transition}
				className={classNames(
					primary.variable,
					secondary ? secondary.variable : '',
					tertiary ? tertiary.variable : '',
					code.variable)}>
				<GoogleAnalytics gaId="G-BB3M3FJ27B" />
				<Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9035056618426040" crossOrigin="anonymous" />
				<Flex style={{minHeight: '100vh'}}
					as="body"
					fillWidth margin="0" padding="0"
					direction="column">
					<Header/>
					<Flex
						fillWidth paddingY="l" paddingX="l"
						justifyContent="center" flex={1}>
						<Flex
							justifyContent="center"
							fillWidth minHeight="0">
							<RouteGuard>
								{children}
							</RouteGuard>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</NextIntlClientProvider>
	);
}