import { getPosts } from '@/app/utils/utils';
import { Grid } from '@/once-ui/components';
import Post from './Post';

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3' | '4' | '5';
    locale: string;
    thumbnail?: boolean;
    page: string;
}

export function Posts({
    range,
    columns = '1',
    locale = 'en',
    thumbnail = false,
    page
}: PostsProps) {
    const allPosts = getPosts(['src', 'app', '[locale]', page, 'posts', locale]);

    const sortedPosts = allPosts.sort((a, b) => {
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
                <Grid
                    columns={`repeat(${columns}, 1fr)`} mobileColumns="1col"
                    fillWidth marginBottom="40" gap="m">
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
                </Grid>
            )}
        </>
    );
}