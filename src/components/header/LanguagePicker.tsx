import { useState, useTransition } from "react";
import { Menu, UnstyledButton } from "@mantine/core";
import classes from "./LanguagePicker.module.css";
import { routing, useRouter, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";

export function LanguagePicker() {
    const params = useParams();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [opened, setOpened] = useState(false);
    const pathname = usePathname() ?? "";

    function handleLanguageChange(locale: string) {
        startTransition(() => {
            router.replace(pathname, {locale})
        })
    }

    const getFlag = (locale?: string | string[]) => {
        switch (locale) {
        case "en":
            return "🇺🇸";
        case "fr":
            return "🇫🇷";
        default:
            return "🇺🇸";
        }
    }

    return (
        <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="md"
            withinPortal
            disabled={isPending}
            zIndex={1000001}
        >
            <Menu.Target>
                <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
                    {getFlag(params?.locale)}
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                {routing.locales.map((locale) => (
                    <Menu.Item key={locale} onClick={() => handleLanguageChange(locale)}>
                        {getFlag(locale)}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
}
