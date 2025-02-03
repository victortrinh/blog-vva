import { notFound } from "next/navigation"
import { CustomMDX } from "@/components/mdx"
import { getPosts, Metadata } from "@/app/utils/utils"
import { baseURL } from "@/app/resources"
import { setRequestLocale } from "next-intl/server"
import { useTranslations } from "next-intl";
import { formatDate } from "@/app/utils/formatDate";
import { Button, Text, Title, Flex } from "@mantine/core"
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { Container, GoToRecipeButton } from "@/components"
import { generateMetadataForFolder, generateStaticParamsForFolder } from "@/app/utils"
import { LocaleAndSlugParams } from "@/types"

interface BlogParams {
	params: LocaleAndSlugParams;
}

export async function generateStaticParams() {
    return generateStaticParamsForFolder("recipes");
}

export async function generateMetadata({ params }: BlogParams) {
    return await generateMetadataForFolder("recipes", params);
}

export default async function Page({params}: BlogParams) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const post = getPosts(["src", "app", "[locale]", "recipes", "posts", locale]).find((post) => post.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <InnerBlog post={post} locale={locale} />
    )
}

interface InnerBlogProps {
	post: {
		metadata: Metadata;
		slug: string;
		content: string;
	},
	locale: string;
}

const InnerBlog = ({ post, locale }: InnerBlogProps) => {
    const t = useTranslations();

    return (
        <section>
            <Container>
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            headline: post.metadata.title,
                            datePublished: post.metadata.publishedAt,
                            dateModified: post.metadata.publishedAt,
                            description: post.metadata.summary,
                            image: post.metadata.image
                                ? `https://${baseURL}${post.metadata.image}`
                                : `https://${baseURL}/og?title=${post.metadata.title}`,
                            url: `https://${baseURL}/${locale}/recipes/${post.slug}`,
                            author: {
                                "@type": "Person",
                                name: t("person.name"),
                            },
                        }),
                    }}
                />
                <Button
                    component={Link}
                    href={`/${locale}/recipes`}
                    variant="default"
                    size="xs"
                    leftSection={<IconChevronLeft size={14} />}
                >
                    {t("recipes.label")}
                </Button>
                <Title>
                    {post.metadata.title}
                </Title>
                <Flex
                    gap="12"
                    align="center">
                    <Text>
                        {formatDate(post.metadata.publishedAt)}
                    </Text>
                </Flex>
                <GoToRecipeButton id={post.slug} />
                <article>
                    <Flex  direction="column">
                        <CustomMDX source={post.content} />
                    </Flex>
                </article>
            </Container>
        </section>
    )
}