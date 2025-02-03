import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/app/resources"
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Title } from "@mantine/core";
import { Container } from "@/components";
import { generateMetadataForPage } from "@/app/utils";
import { LocaleParams } from "@/types";

interface Params {
    params: LocaleParams;
}

export async function generateMetadata( {params}: Params) {
    const t = await getTranslations();

    const title = t("tips.title");
    const description = t("tips.description");
    
    return await generateMetadataForPage({ title, description, params });
}

export default async function Tips({ params}: Params) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <InnerTips locale={locale} />;
}

interface InnerTipsProps {
	locale: string;
}

const InnerTips = ({ locale }: InnerTipsProps) => {
    const t = useTranslations();

    return (
        <Container>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        headline: t("tips.title"),
                        description: t("tips.description"),
                        url: `https://${baseURL}/tips`,
                        image: `${baseURL}/og?title=${encodeURIComponent(t("tips.title"))}`,
                        author: {
                            "@type": "Person",
                            name: t("person.name"),
                            image: {
                                "@type": "ImageObject",
                                url: `${baseURL}${t("person.avatar")}`,
                            },
                        },
                    }),
                }}
            />
            <Title order={1}>
                {t("tips.title")}
            </Title>
            <Posts page="tips" columns={4} locale={locale} thumbnail/>
        </Container>
    );
}