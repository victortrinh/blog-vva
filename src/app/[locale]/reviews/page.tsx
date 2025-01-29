import { Posts } from "@/components/blog/Posts";
import { baseURL, renderContent } from "@/app/resources"
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Title, Flex } from "@mantine/core";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(
    {params}: { params: Params}
) {
    const { locale } = await params;
    const t = await getTranslations();
    const { reviews } = renderContent(t);

    const title = reviews.title;
    const description = reviews.description;
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
    const { person, reviews } = renderContent(t);
    return (
        <Flex direction="column">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        headline: reviews.title,
                        description: reviews.description,
                        url: `https://${baseURL}/reviews`,
                        image: `${baseURL}/og?title=${encodeURIComponent(reviews.title)}`,
                        author: {
                            "@type": "Person",
                            name: person.name,
                            image: {
                                "@type": "ImageObject",
                                url: `${baseURL}${person.avatar}`,
                            },
                        },
                    }),
                }}
            />
            <Title order={1}>
                {reviews.title}
            </Title>
            <Posts page="reviews"  columns={4} locale={locale} thumbnail/>
        </Flex>
    );
}