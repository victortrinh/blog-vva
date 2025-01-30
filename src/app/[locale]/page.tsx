import React from "react";

import { baseURL, routes } from "@/app/resources"; 
import { Posts } from "@/components/blog/Posts";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Carousel } from "@/components";
import { Text, Title, Flex, Container } from "@mantine/core";

type Params = Promise<{ locale: string }>

export async function generateMetadata(
    {params}: { params: Params}
) {
    const { locale } = await params;
    const t = await getTranslations();
    const title = t("home.title");
    const description = t("home.description");
    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://${baseURL}/${locale}`,
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

export default async function Home(
    { params }: { params: Params }
) {
    const { locale } = await params
    setRequestLocale(locale);
	
    return <InnerHome locale={locale} />;
}

interface InnerHomeProps {
	locale: string;
}

const InnerHome = ({locale}: InnerHomeProps) => {
    const t = useTranslations();

    return (
        <>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: t("home.title"),
                        description: t("home.description"),
                        url: `https://${baseURL}`,
                        image: `${baseURL}/og?title=${encodeURIComponent(t("home.title"))}`,
                        publisher: {
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
            <Carousel />
            <Container size="responsive">
                <Flex  direction="column" gap="m">
                    <Flex
                        direction="column"
                        gap="m">
                        <Title>
                            {t("home.headline")}
                        </Title>
                        <Text>
                            {t("home.subline")}
                        </Text>
                    </Flex>
                </Flex>
                {routes["/recipes"] && (
                    <Flex
                        gap="24"
                        direction="column">
                        <Title order={2}>
                            Latest recipes
                        </Title>
                        <Posts page="recipes" range={[1,3]} columns={3} locale={locale} thumbnail />
                    </Flex>
                )}
            </Container>
        </>
    );
}
