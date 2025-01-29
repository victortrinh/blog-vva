import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "classnames";
import { ActionIcon, Group, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import classes from "./ColorThemeToggle.module.css";

export function ColorThemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

    return (
        <Group justify="center">
            <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                variant="transparent"
                size="s"
                aria-label="Toggle color scheme"
            >
                <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
        </Group>
    );
}