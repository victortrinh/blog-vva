"use client";

import { useTranslations } from "next-intl";

import styles from "./Recipe.module.css";
import { ActionIcon, AspectRatio, Center, Divider, Text, Title } from "@mantine/core";
import { UnorderedList } from "../mdx/UnorderedList";
import { OrderedList } from "../mdx/OrderedList";
import { Fragment } from "react";
import { IconArrowUp } from "@tabler/icons-react";

interface Ingredient {
    name: string;
    steps: string[];
}

interface Props {
    id: string;
    title: string;
    src: string;
    ingredients: Ingredient[];
    instructions: string[];
}

export const Recipe = ({id, title, src, ingredients, instructions }: Props) => {
    const t = useTranslations();

    const onClick = () => {
        const element = document.getElementById("top");
        element?.scrollIntoView({
            behavior: "smooth"
        }); 
    }

    return <div className={styles.container}>
        <Center id={id} pos="absolute" top="-125px" left="50%" className={styles.image}>
            <AspectRatio ratio={1/1} h="250px" w="250px">
                <img src={src} alt={id} />
            </AspectRatio>
        </Center>
        <Center pt="150px" px="lg" pb="20px" className={styles.header}>
            <Title c="white" order={2} fz="h1">{title}</Title>
        </Center>
        <div className={styles.recipe}>
            <aside className={styles.ingredients}>
                <Title order={3} fz="h2">{t("recipe.ingredients")}</Title>
                {ingredients.map(({ name, steps }, index) => (
                    <Fragment key={name}>
                        <Text mt="20px">{name}</Text>
                        <UnorderedList>
                            {steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </UnorderedList>
                        {index < ingredients.length - 1 && <Divider />}
                    </Fragment>
                ))}
            </aside>
            <article>
                <Title fz="h2" order={3} pb="20px">{t("recipe.instructions")}</Title>
                <OrderedList>
                    {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </OrderedList>
            </article>
        </div>
        <ActionIcon onClick={onClick} size="xl" pos="fixed" bottom="24px" right="24px" variant="filled" radius="xl" aria-label="Up">
            <IconArrowUp  />
        </ActionIcon>
    </div>
}