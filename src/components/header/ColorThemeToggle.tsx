import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "classnames";
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import classes from "./ColorThemeToggle.module.css";

export function ColorThemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

    return (
        <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
            variant="transparent"
            size="s"
            aria-label="Toggle color scheme"
            className={classes.control}
        >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        </ActionIcon>
    );
}