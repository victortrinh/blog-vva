import { notFound } from "next/navigation"
import { CustomMDX } from "@/components/mdx"
import { getPosts, Metadata } from "@/app/utils/utils"
import { baseURL } from "@/app/resources"
import { setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { formatDate } from "@/app/utils/formatDate";
import { GoToRecipeButton } from "@/components/recipes/GoToRecipeButton";
import { Button, Text, Title, Flex, Container } from "@mantine/core"
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

type Params = Promise<{ locale: string, slug: string }>;

interface BlogParams {
	params: Params;
}

export async function generateStaticParams() {
    const locales = routing.locales;
    
    // Create an array to store all posts from all locales
    const allPosts = [];

    // Fetch posts for each locale
    for (const locale of locales) {
        const posts = getPosts(["src", "app", "[locale]", "recipes", "posts", locale]);
        allPosts.push(...posts.map(post => ({
            slug: post.slug,
            locale: locale,
        })));
    }

    return allPosts;
}

export async function generateMetadata({ params }: BlogParams) {
    const { locale, slug } = await params;
    const post = getPosts(["src", "app", "[locale]", "recipes", "posts", locale]).find((post) => post.slug === slug)

    if (!post) {
        return
    }

    const {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
    } = post.metadata;

    const ogImage = image
        ? `https://${baseURL}${image}`
        : `https://${baseURL}/og?title=${title}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime,
            url: `https://${baseURL}/${locale}/recipes/${post.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    }
}

export default async function Blog({params}: BlogParams) {
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
            <Container size="responsive">
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