"use client";

import { Button } from "@/once-ui/components";

interface Props {
    id: string;
}

export const GoToRecipeButton = ({id}: Props) => {
    const onClick = () => {
        const element = document.getElementById(id);
        element?.scrollIntoView({
            behavior: 'smooth'
        }); 
    }

    return (
        <Button onClick={onClick}>Recipe</Button>
    )
}