import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";

import { Header } from "@/components";
import { baseURL } from "@/app/resources"
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react"
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "@/theme/theme";

type Params = Promise<{ locale: string }>;

type Props = {
    params: Params;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations();

    // TODO: Add metadata for the home page
    return {
        metadataBase: new URL(`https://${baseURL}/${locale}`),
        title: t("home.title"),
        description: t("about.subline"),
        openGraph: {
            title: "Date my dish",
            description: "Flirt with flavors and make your taste buds dance with these delicious recipes.",
            url: baseURL,
            siteName: "Date my dish",
            locale: "en_US",
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    }
};

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
            <html lang="en" {...mantineHtmlProps}>
                <head>
                    <GoogleAnalytics gaId="G-BB3M3FJ27B" />
                    <ColorSchemeScript />
                    <script 
                        async 
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9035056618426040" 
                        crossOrigin="anonymous"
                    />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0/dist/css/tabler-flags.min.css" />
                </head>
                <body>
                    <Analytics />
                    <MantineProvider theme={theme} defaultColorScheme="light">
                        <Notifications />
                        <Header />
                        <main>{children}</main>
                    </MantineProvider>
                </body>
            </html>
        </NextIntlClientProvider>
    );
}