import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/app/resources"
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Title, Container } from "@mantine/core";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(
    {params}: { params: Params }
) {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("recipes.title");
    const description = t("recipes.description");
    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://${baseURL}/${locale}/recipes`,
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

export default async function Recipes(
    { params }: { params: Params}
) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <InnerRecipes locale={locale} />;
}

interface InnerRecipesProps {
	locale: string;
}

const InnerRecipes = ({locale}: InnerRecipesProps) => {
    const t = useTranslations();

    return (
        <Container size="responsive">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        headline: t("recipes.title"),
                        description: t("recipes.description"),
                        url: `https://${baseURL}/recipes`,
                        image: `${baseURL}/og?title=${encodeURIComponent(t("recipes.title"))}`,
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
                {t("recipes.title")}
            </Title>
            <Posts page="recipes" locale={locale} columns={4} thumbnail/>
        </Container>
    );
}