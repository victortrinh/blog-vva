"use client";

import { Container, createTheme } from "@mantine/core";
import classNames from "classnames";
import classes from "./theme.module.css";

export const theme = createTheme({
    components: {
        Container: Container.extend({
            classNames: (_, { size }) => ({
                root: classNames({ [classes.responsiveContainer]: size === "responsive" }),
            }),
        }),
    },
});