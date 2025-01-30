"use client";

import { Carousel as MantineCarousel } from "@mantine/carousel";
import { SmartImage } from "../SmartImage";

import classes from "./Carousel.module.css";

const images = [
    {
        src: "/images/recipes/spaghetti-carbonara.jpg",
        alt: "Spaghetti carbonara",
    },
    {
        src: "/images/reviews/le-petit-bouchon.jpg",
        alt: "Le petit bouchon",
    },
    {
        src: "/images/tips/crispy-roasted-vegetables.jpg",
        alt: "Crispy roasted vegetables",
    },
]

export const Carousel = () => (
    <MantineCarousel 
        align="start"
        withIndicators 
        controlSize={40}
        loop
        classNames={classes}
    >
        {images.map(({ src, alt }) => (
            <MantineCarousel.Slide key={alt}>
                <SmartImage
                    priority
                    tabIndex={0}
                    radius="l"
                    alt={alt}
                    aspectRatio="16 / 5"
                    src={src}
                />
            </MantineCarousel.Slide>
        ))}
    </MantineCarousel>
)