import { notFound } from "next/navigation"
import { CustomMDX } from "@/components/mdx"
import { getPosts, Metadata } from "@/app/utils/utils"
import { baseURL } from "@/app/resources"
import { setRequestLocale } from "next-intl/server"
import { useTranslations } from "next-intl";
import { formatDate } from "@/app/utils/formatDate"
import { Avatar, Button, Text, Title, Flex } from "@mantine/core"
import Link from "next/link"
import { IconChevronLeft } from "@tabler/icons-react"
import { generateMetadataForFolder, generateStaticParamsForFolder } from "@/app/utils"

type Params = Promise<{ locale: string, slug: string }>;

interface BlogParams {
	params: Params;
}

export async function generateStaticParams() {
    return generateStaticParamsForFolder("reviews");
}

export async function generateMetadata({ params } : BlogParams) {
    return await generateMetadataForFolder("reviews", params);
}

export default async function Blog({ params } : BlogParams) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const post = getPosts(["src", "app", "[locale]", "reviews", "posts", locale]).find((post) => post.slug === slug)

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

const InnerBlog = ({post, locale}: InnerBlogProps) => {
    const t = useTranslations();

    return (
        <Flex
            direction="column"
            gap="m">
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
                        url: `https://${baseURL}/${locale}/reviews/${post.slug}`,
                        author: {
                            "@type": "Person",
                            name: t("person.name"),
                        },
                    }),
                }}
            />
            <Button
                component={Link}
                href={`/${locale}/reviews`}
                variant="default"
                size="xs"
                leftSection={<IconChevronLeft size={14} />}
            >
                {t("reviews.label")}
            </Button>
            <Title order={1}>
                {post.metadata.title}
            </Title>
            <Flex
                gap="12"
                align="center">
                { t("person.avatar") && (
                    <Avatar src={t("person.avatar")} alt={t("person.firstName")} />
                )}
                <Text>
                    {formatDate(post.metadata.publishedAt)}
                </Text>
            </Flex>
            <article>
                <Flex direction="column">
                    <CustomMDX source={post.content} />
                </Flex>
            </article>
        </Flex>
    )
}