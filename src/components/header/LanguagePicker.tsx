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
        console.log(locale);

        startTransition(() => {
            router.replace(
                pathname,
                {locale}
            )
        })
    }

    return (
        <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="md"
            withinPortal
            disabled={isPending}
        >
            <Menu.Target>
                <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
                    {params?.locale ?? routing.defaultLocale}
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                {routing.locales.map((locale) => (
                    <Menu.Item key={locale} onClick={() => handleLanguageChange(locale)}>
                        {locale.toUpperCase()}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
}
