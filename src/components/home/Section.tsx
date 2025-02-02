"use client";

import styles from "./Section.module.css";
import { SmartLink }from "@/components";
import { AspectRatio, Button } from "@mantine/core";

interface Props {
    href: string;
    src: string;
    cta: string;
}

export const Section = ({ href, src, cta }: Props) => (
    <SmartLink
        className={styles.section}
        key={href}
        href={href}>
        <AspectRatio ratio={9/12} pos="relative">
            <img
                className={styles.image}
                alt={cta}
                src={src}
            />
        </AspectRatio>
        <Button className={styles.cta}>
            {cta}
        </Button>
    </SmartLink>
);