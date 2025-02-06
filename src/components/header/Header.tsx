"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Burger, Divider, Drawer, Flex, Group, ScrollArea, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "./Header.module.css";
import { LanguagePicker } from "./LanguagePicker";
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

    const items = (onClose?: () => void) => <>
        <Link href={`/${locale}/`} onClick={onClose} className={styles.link}>
            {t("home.label")}
        </Link>
        <Link href={`/${locale}/about`} onClick={onClose} className={styles.link}>
            {t("about.label")}
        </Link>
        <Link href={`/${locale}/recipes`} onClick={onClose} className={styles.link}>
            {t("recipes.label")}
        </Link>
        <LanguagePicker />
    </>

    return (
        <>
            <header className={styles.header}>
                <Container h="100%">
                    <Group justify="space-between" h="100%">
                        <Link className={styles.logo} href={`/${locale}/`}>
                            <Flex gap="xs" align="center" justify="center">
                                <Image src="/images/main-logo.png" width={40} height={40} alt="Date my dish" />
                                <Title lh="100%" fw="800" component={Text} fz="h2" tt="uppercase" lts="-1px">Date my Dish</Title>
                            </Flex>
                        </Link>

                        <Group h="100%" gap={0} visibleFrom="sm">
                            {items()}
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
                    <Divider mb="sm" />

                    {items(closeDrawer)}
                </ScrollArea>
            </Drawer>
        </>
    );
};