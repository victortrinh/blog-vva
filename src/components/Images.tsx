"use client";

import { Grid } from "@/once-ui/components";
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
    return <Grid
        columns={`repeat(${columns}, 1fr)`} mobileColumns="1col"
        fillWidth marginTop="24" gap="m">
        {images.map(({ src, alt }, index) => (
            <div key={index}>
                <img alt={alt} src={src} width="100%" />
            </div>
        ))}
    </Grid>
}