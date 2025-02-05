"use client";

import styles from "./Section.module.css";
import { SmartLink }from "@/components";
import { AspectRatio, Button, useMatches } from "@mantine/core";

interface Props {
    href: string;
    src: string;
    cta: string;
}

export const Section = ({ href, src, cta }: Props) => {
    const aspectRatio = useMatches({
        base: 1/1,
        sm: 9/10,
        md: 9/12,
    });

    return (
        <SmartLink
            className={styles.section}
            key={href}
            href={href}>
            <AspectRatio ratio={aspectRatio} pos="relative">
                <img
                    className={styles.image}
                    alt={cta}
                    src={src}
                />
            </AspectRatio>
            <Button size="lg" className={styles.cta}>
                {cta}
            </Button>
        </SmartLink>
    )
}