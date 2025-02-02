"use client";

import React from "react";
import styles from "@/components/HeadingLink.module.scss";
import { notify } from "@/app/utils";
import { ActionIcon, Title, Tooltip, Flex } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface HeadingLinkProps {
    id: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const HeadingLink: React.FC<HeadingLinkProps> = ({
    id,
    level,
    children,
    style
}) => {
    const t = useTranslations();
    const copyURL = (id: string): void => {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;

        navigator.clipboard.writeText(url).then(() => {
            notify("Link copied to clipboard.");
        }, () => {
            notify("Link copied to clipboard.", "warning");
        });
    };

    return (
        <Flex
            style={style}
            onClick={() => copyURL(id)}
            className={styles.control}
            align="center"
            gap="4">
            <Title
                className={styles.text}
                id={id}
                order={level}
            >
                {children}
            </Title>
            <Tooltip label={t("common.copy")}>
                <ActionIcon variant="transparent" color="gray" className={styles.visibility}>
                    <IconExternalLink />
                </ActionIcon>
            </Tooltip>
        </Flex>
    );
};