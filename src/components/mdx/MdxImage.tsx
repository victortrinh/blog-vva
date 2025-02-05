"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMatches } from "@mantine/core";

export const MdxImage = ({ alt, src, ...props }: any) => {
    const width = useMatches({
        base: "100%",
        sm: "50%",
    });
        
    if (!src) {
        console.error("SmartImage requires a valid 'src' property.");
        return null;
    }

    return (
        <img width={width} className="recipe-image" alt={alt} src={src} {...props} />
    );
}