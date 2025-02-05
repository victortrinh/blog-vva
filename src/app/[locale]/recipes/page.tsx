import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/app/resources"
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container, PageTitle } from "@/components";
import { generateMetadataForPage } from "@/app/utils";
import { LocaleParams } from "@/types";

interface Params {
    params: LocaleParams;
}

export async function generateMetadata({params}: Params) {
    const t = await getTranslations();

    const title = t("recipes.title");
    const description = t("recipes.description");

    return await generateMetadataForPage({ title, description, params });
}

export default async function Recipes({ params }: Params) {
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
        <Container>
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
            <PageTitle>{t("recipes.title")}</PageTitle>
            <Posts page="recipes" locale={locale} columns={3} thumbnail/>
        </Container>
    );
}