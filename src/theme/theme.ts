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
    primaryColor: "dusty-burgundy",
    colors: {
        "dusty-burgundy": ["#CE7685", "#C06776", "#B35766", "#A14A55","#94404C", "#873944", "#752E3B", "#682732", "#5A1F2A", "#4C1C24"],
    },
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