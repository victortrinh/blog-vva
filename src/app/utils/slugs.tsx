import { routing } from "@/i18n/routing";
import { getPosts } from "./utils";
import { baseURL } from "../resources";
import { LocaleAndSlugParams } from "@/types";

export const generateStaticParamsForFolder = (folder: string) => {
    const locales = routing.locales;
    
    // Create an array to store all posts from all locales
    const allPosts = [];

    // Fetch posts for each locale
    for (const locale of locales) {
        const posts = getPosts(["src", "app", "[locale]", folder, "posts", locale]);

        allPosts.push(...posts.map(post => ({
            slug: post.slug,
            locale: locale,
        })));
    }

    return allPosts;
}

export async function generateMetadataForFolder(folder: string, params: LocaleAndSlugParams) {
    const { locale, slug } = await params;
    const post = getPosts(["src", "app", "[locale]", folder, "posts", locale]).find((post) => post.slug === slug)

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