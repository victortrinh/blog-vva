"use client";

import { Container, createTheme } from "@mantine/core";
import classNames from "classnames";
import classes from "./theme.module.css";
import { Open_Sans, Montserrat, Great_Vibes } from "next/font/google";

export const openSans = Open_Sans({
    subsets: ["latin"],
    display: "swap",
})
 
export const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
})

export const greatVibes = Great_Vibes({
    subsets: ["latin"],
    weight: "400",
    display: "swap"
})

export const theme = createTheme({
    fontFamily: openSans.style.fontFamily,
    fontFamilyMonospace: greatVibes.style.fontFamily,
    headings: {
        fontFamily: montserrat.style.fontFamily,
    },
    components: {
        Container: Container.extend({
            classNames: (_, { size }) => ({
                root: classNames({ [classes.responsiveContainer]: size === "responsive" }),
            }),
        }),
    },
});