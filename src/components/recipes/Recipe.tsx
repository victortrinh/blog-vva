"use client";

import { useTranslations } from "next-intl";

import styles from "./Recipe.module.scss";
import { SmartImage }from "@/components";
import { Title } from "@mantine/core";

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

    return <div id={id} className={styles.container}>
        <Title>{title}</Title>
        <SmartImage alt={id} src={src} height={20} />
        <div className={styles.recipe}>
            <aside className={styles.ingredients}>
                <Title>{t("recipe.ingredients")}</Title>
                {ingredients.map(({ name, steps }) => (
                    <div key={name}>
                        <p>{name}</p>
                        <ul>
                            {steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </aside>
            <article>
                <Title>{t("recipe.instructions")}</Title>
                <ol>
                    {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </article>
        </div>
    </div>
}