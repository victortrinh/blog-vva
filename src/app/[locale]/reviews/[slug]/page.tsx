import { notFound } from "next/navigation"
import { CustomMDX } from "@/components/mdx"
import { getPosts, Metadata } from "@/app/utils/utils"
import { baseURL } from "@/app/resources"
import { setRequestLocale } from "next-intl/server"
import { useTranslations } from "next-intl";
import { Flex } from "@mantine/core"
import { generateMetadataForFolder, generateStaticParamsForFolder } from "@/app/utils"
import { PageTitle, Container } from "@/components"

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
        <section>
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
            <Container pb="72px" id="top">
                <PageTitle pb="12px">
                    {post.metadata.title}
                </PageTitle>
                <article>
                    <Flex direction="column" gap="md">
                        <CustomMDX source={post.content} />
                    </Flex>
                </article>
            </Container>
        </section>
    )
}