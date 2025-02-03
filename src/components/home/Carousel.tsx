"use client";

import { Carousel as MantineCarousel } from "@mantine/carousel";

import classes from "./Carousel.module.css";
import { AspectRatio, Overlay, useMatches, Title, Button, Flex } from "@mantine/core";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Container } from "../Container";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay"

export const Carousel = () => {
    const autoplay = useRef(Autoplay({ delay: 2000 }));
    const t = useTranslations();
    const params = useParams();

    const aspectRatio = useMatches({
        base: 1/1,
        sm: 16/7,
        md: 3/1,
    });

    const withControls = useMatches({
        base: false,
        sm: true,
    });

    const headlineFz = useMatches({
        base: "28px",
        sm: "34px",
        md: "50px",
    });

    const textFz = useMatches({
        base: "18px",
        sm: "20px",
        md: "24px",
    });

    const ctaSize = useMatches({
        base: "sm",
        sm: "md",
        md: "lg"
    });

    const ctaMt = useMatches({
        base: "md",
        sm: "lg",
        md: "xl"
    });

    const { locale } = params;

    const images = [
        {
            src: "/images/home/carousel1.jpg",
            alt: t("recipes.label"),
            headline: t("recipes.headline"),
            subline: t("recipes.subline"),
            cta: t("recipes.cta"),
            href: `/${locale}/recipes`
        },
        {
            src: "/images/home/carousel2.jpg",
            alt: t("tips.label"),
            headline: t("tips.headline"),
            subline: t("tips.subline"),
            cta: t("tips.cta"),
            href: `/${locale}/tips`
        },
        {
            src: "/images/home/carousel3.jpg",
            alt: t("reviews.label"),
            headline: t("reviews.headline"),
            subline: t("reviews.subline"),
            cta: t("reviews.cta"),
            href: `/${locale}/reviews`
        },
    ]

    return (
        <MantineCarousel 
            align="start"
            withIndicators
            withControls={withControls}
            loop
            classNames={classes}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
        >
            {images.map(({ src, alt, headline, subline, cta, href }) => (
                <MantineCarousel.Slide key={alt}>
                    <AspectRatio ratio={aspectRatio} pos="relative">
                        <img
                            alt={alt}
                            src={src}
                        />
                        <Overlay color="#000" backgroundOpacity={0.30}>
                            <Container h="100%" w="100%">
                                <Flex ta="center" tt="uppercase" direction="column" align="center" justify="center" h="100%" w="100%" gap="md">
                                    <Title fz={headlineFz} c="white" className={classes.headline}>{headline}</Title>
                                    <Title fz={textFz} c="white" order={2} className={classes.subline}>{subline}</Title>
                                    <Button component={Link} href={href} variant="default" fw="normal" size={ctaSize} mt={ctaMt} tt="uppercase">{cta}</Button>
                                </Flex>
                            </Container>
                        </Overlay>
                    </AspectRatio>
                </MantineCarousel.Slide>
            ))}
        </MantineCarousel>
    )
}