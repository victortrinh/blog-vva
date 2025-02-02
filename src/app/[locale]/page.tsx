import React from "react";

import { baseURL } from "@/app/resources"; 
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Carousel, Section } from "@/components";
import { Text, Title, Flex, Container, Button, Divider, SimpleGrid } from "@mantine/core";
import Link from "next/link";

type Params = Promise<{ locale: string }>

export async function generateMetadata(
    {params}: { params: Params}
) {
    const { locale } = await params;
    const t = await getTranslations();
    const title = t("home.title");
    const description = t("about.subline");
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
                        description: t("about.subline"),
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
            <Flex direction="column" gap="xl">
                <Carousel />
                <Container size="responsive" pb="32px">
                    <Flex direction="column" gap="md" ta="center" justify="center" align="center">
                        <Title order={2} fw="normal" tt="uppercase">
                            {t("about.headline")}
                        </Title>
                        <Divider w="120px" my="sm" />
                        <Text>
                            {t("about.subline")}
                        </Text>
                        <Button mt="24px" component={Link} href={`/${locale}/about`} fw="normal" size="lg" tt="uppercase">
                            {t("about.cta")}
                        </Button>
                        <Divider my="lg" w="100%" />
                        <Title>{t("home.headline")}</Title>
                        <Divider my="xs" />
                        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} w="100%">
                            <Section href={`/${locale}/recipes`} src="/images/recipes/calamari/ogImage.png" cta={t("recipes.appetizers")} />
                            <Section href={`/${locale}/recipes`} src="/images/recipes/calamari/DSCF2266.jpg" cta={t("recipes.mains")}  />
                            <Section href={`/${locale}/recipes`} src="/images/recipes/spaghetti-carbonara.jpg" cta={t("recipes.desserts")}  />
                        </SimpleGrid>
                    </Flex>
                </Container>
            </Flex>
        </>
    );
}
