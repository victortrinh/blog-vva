"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Burger, Divider, Drawer, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "./Header.module.css";
import { LanguagePicker } from "./LanguagePicker";
import { ColorThemeToggle } from "./ColorThemeToggle";

export const Header = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const params = useParams();
    const t = useTranslations();

    if (!params) {
        return null;
    }

    const { locale } = params;

    return (
        <>
            <header className={styles.header}>
                <Group justify="space-between" h="100%">
                    <div>Logo</div>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <Link href={`/${locale}/`} className={styles.link}>
                            {t("home.label")}
                        </Link>
                        <Link href={`/${locale}/recipes`} className={styles.link}>
                            {t("recipes.label")}
                        </Link>
                        <Link href={`/${locale}/tips`} className={styles.link}>
                            {t("tips.label")}
                        </Link>
                        <Link href={`/${locale}/reviews`} className={styles.link}>
                            {t("reviews.label")}
                        </Link>
                    </Group>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <LanguagePicker />
                        <ColorThemeToggle />
                    </Group>
                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px" mx="-md">
                    <Divider my="sm" />

                    <Link href={`/${locale}/recipes`} className={styles.link}>
                        {t("recipes.label")}
                    </Link>
                    <Link href={`/${locale}/tips`} className={styles.link}>
                        {t("tips.label")}
                    </Link>
                    <Link href={`/${locale}/reviews`} className={styles.link}>
                        {t("reviews.label")}
                    </Link>

                    <Divider my="sm" />

                    <LanguagePicker />
                    <ColorThemeToggle />
                </ScrollArea>
            </Drawer>
        </>
    );
};