import { getPosts } from "@/app/utils/utils";
import Post from "./Post";
import { SimpleGrid } from "@mantine/core";

interface Props {
    range?: [number] | [number, number];
    columns?: number;
    locale: string;
    thumbnail?: boolean;
    page: string;
    subtag?: string;
}

export function Posts({ range, columns = 1, locale = "en", thumbnail = false, page, subtag }: Props) {
    const allPosts = getPosts(["src", "app", "[locale]", page, "posts", locale]);

    const filteredPosts = allPosts.filter(x => subtag ? x.metadata.subtag === subtag : true);

    const sortedPosts = filteredPosts.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedPosts = range
        ? sortedPosts.slice(
            range[0] - 1,
            range.length === 2 ? range[1] : sortedPosts.length 
        )
        : sortedPosts;

    return (
        <>
            {displayedPosts.length > 0 && (
                <SimpleGrid spacing="xl" verticalSpacing="xl" cols={{ base: 1, sm: 2, md: columns }}>
                    {displayedPosts.map((post) => (
                        <Post
                            key={post.slug}
                            post={{
                                ...post,
                                slug: `${page}/${post.slug}`
                            }}
                            thumbnail={thumbnail}
                        />
                    ))}
                </SimpleGrid>
            )}
        </>
    );
}