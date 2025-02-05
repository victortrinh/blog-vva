"use client";

import { Button, ButtonProps } from "@mantine/core";
import { IconArrowDown } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface Props extends ButtonProps {
    id: string;
}

export const GoToRecipeButton = ({ id, ...props }: Props) => {
    const t = useTranslations();

    const onClick = () => {
        const element = document.getElementById(id);
        element?.scrollIntoView({
            behavior: "smooth"
        }); 
    }

    return (
        <Button leftSection={<IconArrowDown />} onClick={onClick} {...props}>{t("recipe.jump")}</Button>
    )
}