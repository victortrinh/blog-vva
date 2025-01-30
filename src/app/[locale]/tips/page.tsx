import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/app/resources"
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Title, Container } from "@mantine/core";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(
    {params}: { params: Params}
) {
    const { locale } = await params;
    const t = await getTranslations();

    const title =t("tips.title");
    const description = t("tips.description");
    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://${baseURL}/${locale}/tips`,
            images: [
                {
                    url: ogImage,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function Tips(
    { params}: { params: Params}
) {
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