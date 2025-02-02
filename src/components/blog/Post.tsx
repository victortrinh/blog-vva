"use client";

import styles from "./Post.module.scss";
import { formatDate } from "@/app/utils/formatDate";
import { useTranslations } from "next-intl";
import { SmartImage, SmartLink }from "@/components";
import { Button, Text, Title, Flex } from "@mantine/core";

interface PostProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post: any;
    thumbnail: boolean;
}

export default function Post({ post, thumbnail }: PostProps) {
    const t = useTranslations();

    return (
        <SmartLink
            className={styles.hover}
            style={{
                textDecoration: "none",
                margin: "0",
                height: "fit-content",
            }}
            key={post.slug}
            href={post.slug}>
            <Flex
                pos="relative"
                direction="column"
                gap="32">
                {post.metadata.image && thumbnail && (
                    <Flex className={styles.image}>
                        <SmartImage
                            sizes="640px"
                            src={post.metadata.image}
                            alt={"Thumbnail of " + post.metadata.title}
                            aspectRatio="9 / 12"
                        />
                    </Flex>
                )}
                <Flex
                    pos="relative"
                    gap="8"
                    direction="column" justify="center">
                    <Title order={2}>
                        {post.metadata.title}
                    </Title>
                    <Text>
                        {formatDate(post.metadata.publishedAt, false)}
                    </Text>
                </Flex>
                <Button variant="filled" fullWidth>
                    {t("common.view", {type: post.metadata.tag }).toUpperCase()}
                </Button>
            </Flex>
        </SmartLink>
    );
}