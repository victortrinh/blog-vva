import React from "react";

import { baseURL } from "@/app/resources"; 
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Carousel, Container, Section } from "@/components";
import { Text, Title, Flex, Button, Divider, SimpleGrid, Box } from "@mantine/core";
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
            <Flex direction="column">
                <Carousel />
                <Box bg="var(--mantine-color-gray-light)" w="100%" py="72px">
                    <Container>
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
                        </Flex>
                    </Container>
                </Box>
                <Container py="72px">
                    <Title ta="center">
                        {t.rich("home.headline", { Highlight: (chunks) => <Text component="span" fz="52px" ff="monospace">{chunks}</Text> })}
                    </Title>
                </Container>
                <Box bg="var(--mantine-color-gray-light)" w="100%" pt="72px" pb="85px">
                    <Container>
                        <SimpleGrid spacing="72px" verticalSpacing="72px" cols={{ base: 1, sm: 2, md: 3 }} w="100%">
                            <Section href={`/${locale}/recipes#appetizers`} src="/images/recipes/calamari/ogImage.png" cta={t("recipes.appetizers")} />
                            <Section href={`/${locale}/recipes#mains`} src="/images/recipes/calamari/DSCF2266.jpg" cta={t("recipes.mains")}  />
                            <Section href={`/${locale}/recipes#desserts`} src="/images/recipes/spaghetti-carbonara.jpg" cta={t("recipes.desserts")}  />
                        </SimpleGrid>
                    </Container>
                </Box>
            </Flex>
        </>
    );
}
