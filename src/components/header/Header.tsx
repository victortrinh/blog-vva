"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Burger, Divider, Drawer, Flex, Group, ScrollArea, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "./Header.module.css";
import { LanguagePicker } from "./LanguagePicker";
import { ColorThemeToggle } from "./ColorThemeToggle";
import { Container } from "../Container";
import Image from "next/image";

export const Header = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const params = useParams();
    const t = useTranslations();

    if (!params) {
        return null;
    }

    const { locale } = params;

    const items = <>
        <Link href={`/${locale}/`} className={styles.link}>
            {t("home.label")}
        </Link>
        <Link href={`/${locale}/about`} className={styles.link}>
            {t("about.label")}
        </Link>
        <Link href={`/${locale}/recipes`} className={styles.link}>
            {t("recipes.label")}
        </Link>
        <LanguagePicker />
        <ColorThemeToggle />
    </>

    return (
        <>
            <header className={styles.header}>
                <Container h="100%">
                    <Group justify="space-between" h="100%">
                        <Flex gap="xs" align="center" justify="center">
                            <Image src="/images/main-logo.png" width={40} height={40} alt="Date my dish" />
                            <Title pt="8px" component={Text} fz="h1" ff="monospace" lts="-1px">Date my Dish</Title>
                        </Flex>

                        <Group h="100%" gap={0} visibleFrom="sm">
                            {items}
                        </Group>
                        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                    </Group>
                </Container>
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

                    {items}
                </ScrollArea>
            </Drawer>
        </>
    );
};