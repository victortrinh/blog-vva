"use client";

import styles from "./Post.module.scss";
import { useTranslations } from "next-intl";
import { SmartLink }from "@/components";
import { Button, Text, Title, Flex, AspectRatio } from "@mantine/core";

interface PostProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post: any;
    thumbnail: boolean;
}

export default function Post({ post, thumbnail }: PostProps) {
    const t = useTranslations();

    return (
        <SmartLink className={styles.link} key={post.slug} href={post.slug}>
            <Flex direction="column" h="100%" justify="space-between">
                <Flex direction="column" pb="lg">
                    {post.metadata.image && thumbnail && (
                        <AspectRatio ratio={3/2} pos="relative">
                            <img
                                className={styles.image}
                                src={post.metadata.image}
                                alt={"Thumbnail of " + post.metadata.title}
                            />
                        </AspectRatio>
                    )}
                    <Title order={2} fz="h3" pt="12px" pb="8px" fw="normal" tt="uppercase">
                        {post.metadata.title}
                    </Title>
                    <Text>
                        {post.metadata.summary}
                    </Text>
                </Flex>
                <Button variant="filled" fullWidth size="lg">
                    {t("common.view", {type: post.metadata.tag }).toUpperCase()}
                </Button>
            </Flex>
        </SmartLink>
    );
}