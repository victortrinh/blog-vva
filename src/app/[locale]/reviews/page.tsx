import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/app/resources"
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Title, Flex } from "@mantine/core";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(
    {params}: { params: Params}
) {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("reviews.title");
    const description = t("reviews.description");
    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://${baseURL}/${locale}/reviews`,
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

export default async function Reviews(
    { params }: { params: Params}
) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <InnerReviews locale={locale} />;
}

interface InnerReviewsProps {
	locale: string;
}

const InnerReviews = ({ locale }: InnerReviewsProps) => {
    const t = useTranslations();

    return (
        <Flex direction="column">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        headline: t("reviews.title"),
                        description: t("reviews.description"),
                        url: `https://${baseURL}/reviews`,
                        image: `${baseURL}/og?title=${encodeURIComponent(t("reviews.title"))}`,
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
                {t("reviews.title")}
            </Title>
            <Posts page="reviews"  columns={4} locale={locale} thumbnail/>
        </Flex>
    );
}