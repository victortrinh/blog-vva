import React from "react";

import { baseURL, routes, renderContent } from "@/app/resources"; 
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
    const { home } = renderContent(t);
    const title = home.title;
    const description = home.description;
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
    const { home, person } = renderContent(t);
    return (
        <Container>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: home.title,
                        description: home.description,
                        url: `https://${baseURL}`,
                        image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
                        publisher: {
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
            <Carousel />
            <Flex
                w="100%"
                direction="column"
                gap="m">
                <Flex
                    direction="column"
                    gap="m">
                    <Title>
                        {home.headline}
                    </Title>
                    <Text>
                        {home.subline}
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
                    <Posts page="recipes" range={[1,4]} columns={4} locale={locale} thumbnail />
                </Flex>
            )}
            {routes["/tips"] && (
                <Flex
                    gap="24"
                    direction="column">
                    <Title order={2}>
                        Latest tips
                    </Title>
                    <Posts page="tips" range={[1,4]} columns={4} locale={locale} thumbnail />
                </Flex>
            )}
            {routes["/reviews"] && (
                <Flex
                    gap="24"
                    direction="column">
                    <Title order={2}>
                        Latest reviews
                    </Title>
                    <Posts page="reviews" range={[1,4]} columns={4} locale={locale} thumbnail />
                </Flex>
            )}
        </Container>
    );
}
