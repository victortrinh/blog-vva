"use client";

import { Button, Flex, Heading, SmartImage, SmartLink, Text } from "@/once-ui/components";
import styles from "./Post.module.scss";
import { formatDate } from "@/app/utils/formatDate";
import { useTranslations } from "next-intl";

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
                position="relative"
                direction="column"
                fillWidth gap="32">
                {post.metadata.image && thumbnail && (
                    <Flex
                        fillWidth
                        className={styles.image}>
                        <SmartImage
                            sizes="640px"
                            style={{
                                cursor: "pointer",
                                border: "1px solid var(--neutral-alpha-weak)"
                            }}
                            radius="m"
                            src={post.metadata.image}
                            alt={"Thumbnail of " + post.metadata.title}
                            aspectRatio="16 / 9"
                        />
                    </Flex>
                )}
                <Flex
                    position="relative"
                    fillWidth gap="8"
                    direction="column" justifyContent="center">
                    <Heading
                        as="h2"
                        variant="heading-strong-l"
                        wrap="balance">
                        {post.metadata.title}
                    </Heading>
                    <Text
                        variant="label-default-s"
                        onBackground="neutral-weak">
                        {formatDate(post.metadata.publishedAt, false)}
                    </Text>
                </Flex>
                <Button variant="tertiary" fillWidth>
                    {t("common.view", {type: post.metadata.tag }).toUpperCase()}
                </Button>
            </Flex>
        </SmartLink>
    );
}