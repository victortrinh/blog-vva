"use client";

interface Props {
    id: string;
}

export const Recipe = ({id}: Props) => {
    return <div id={id}>Recipe</div>
}