"use client";

import { Button } from "@/once-ui/components";
import { useTranslations } from "next-intl";

interface Props {
    id: string;
}

export const GoToRecipeButton = ({id}: Props) => {
    const t = useTranslations();

    const onClick = () => {
        const element = document.getElementById(id);
        element?.scrollIntoView({
            behavior: "smooth"
        }); 
    }

    return (
        <Button onClick={onClick}>{t("recipe.jump")}</Button>
    )
}