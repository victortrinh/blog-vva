"use client";

import { useTranslations } from "next-intl";

import styles from './Recipe.module.scss';
import { Heading, SmartImage } from "@/once-ui/components";

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
        <Heading style={{ paddingTop: "20px", paddingBottom: '20px', textAlign: "center", backgroundColor: "rgb(36, 37, 38)", color: "rgb(226, 229, 233)" }} variant="heading-strong-xl" as="h2">{title}</Heading>
        <SmartImage alt={id} src={src} height={20} />
        <div className={styles.recipe}>
            <aside className={styles.ingredients}>
                <Heading style={{ marginBottom: '24px'}} variant="heading-strong-l" as="h3">{t("recipe.ingredients")}</Heading>
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
                <Heading style={{ marginBottom: '24px'}} variant="heading-strong-l" as="h3">{t("recipe.instructions")}</Heading>
                <ol>
                    {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </article>
        </div>
    </div>
}