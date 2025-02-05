import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/app/resources"
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { generateMetadataForPage } from "@/app/utils";
import { LocaleParams } from "@/types";
import { Container, PageTitle } from "@/components";

interface Params {
    params: LocaleParams;
}

export async function generateMetadata({params}: Params) {
    const t = await getTranslations();

    const title = t("reviews.title");
    const description = t("reviews.description");

    return await generateMetadataForPage({ title, description, params });
}

export default async function Reviews({ params }: Params) {
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
        <>
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
            <Container>
                <PageTitle>
                    {t("reviews.label")}
                </PageTitle>
                <Posts page="reviews" columns={3} locale={locale} thumbnail/>
            </Container>
        </>
    );
}