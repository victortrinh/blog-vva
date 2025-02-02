"use client";

import { SimpleGrid } from "@mantine/core";
import Image from "next/image";

interface Image {
    src: string;
    alt: string;
}

interface Props {
    columns?: number;
    images: Image[];
}

export const Images = ({ columns = 2, images }: Props) => {
    return <SimpleGrid
        cols={{ base: 1, sm: 2, md: columns }} mt={24}>
        {images.map(({ src, alt }, index) => (
            <div key={index}>
                <img alt={alt} src={src} width="100%" />
            </div>
        ))}
    </SimpleGrid>
}