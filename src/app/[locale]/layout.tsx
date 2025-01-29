import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
import "@mantine/core/styles.css";

import { Header, RouteGuard } from "@/components";
import { baseURL } from "@/app/resources"
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { renderContent } from "@/app/resources";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react"
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";

type Params = Promise<{ locale: string }>;

type Props = {
    params: Params;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations();
    const { home } = renderContent(t);

    // TODO: Add metadata for the home page
    return {
        metadataBase: new URL(`https://${baseURL}/${locale}`),
        title: home.title,
        description: home.description,
        openGraph: {
            title: "Flirting with Flavors",
            description: "Flirt with flavors and make your taste buds dance with these delicious recipes.",
            url: baseURL,
            siteName: "Flirting with Flavors",
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
                </head>
                <body>
                    <Analytics />
                    <MantineProvider>
                        <RouteGuard>
                            <Header />
                            {children}
                        </RouteGuard>
                    </MantineProvider>
                </body>
            </html>
        </NextIntlClientProvider>
    );
}