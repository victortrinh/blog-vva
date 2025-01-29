import { getPosts } from "@/app/utils/utils"
import { baseURL } from "@/app/resources"
import { routing } from "@/i18n/routing"

export default async function sitemap() {
    const locales = routing.locales;

    const recipes = locales.flatMap((locale) => 
        getPosts(["src", "app", "[locale]", "recipes", "posts", locale]).map((post) => ({
            url: `${baseURL}/${locale}/recipes/${post.slug}`,
            lastModified: post.metadata.publishedAt,
        }))
    );

    const tips = locales.flatMap((locale) => 
        getPosts(["src", "app", "[locale]", "tips", "posts", locale]).map((post) => ({
            url: `${baseURL}/${locale}/tips/${post.slug}`,
            lastModified: post.metadata.publishedAt,
        }))
    );

    const reviews = locales.flatMap((locale) => 
        getPosts(["src", "app", "[locale]", "reviews", "posts", locale]).map((post) => ({
            url: `${baseURL}/${locale}/reviews/${post.slug}`,
            lastModified: post.metadata.publishedAt,
        }))
    );

    const routes = locales.flatMap((locale)=> 
        ["", "/blog"].map((route) => ({
            url: `${baseURL}/${locale}${route}`,
            lastModified: new Date().toISOString().split("T")[0],
        }))
    );

    return [...routes, ...recipes, ...tips, ...reviews]
}