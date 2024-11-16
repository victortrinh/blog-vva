'use client';

import { useParams } from "next/navigation";
import { DropdownWrapper, Flex, NavIcon, SmartLink, ToggleButton, Text } from '@/once-ui/components';
import React, { useTransition } from 'react';
import { renderContent, routes } from '@/app/resources';
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export const Header = () => {
    const router = useRouter();
    const params = useParams();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname() ?? '';

    function handleLanguageChange(locale: string) {
        const nextLocale = locale as Locale;
        startTransition(() => {
            router.replace(
                pathname,
                {locale: nextLocale}
            )
        })
    }

    const t = useTranslations();
    const { recipes, tips, reviews } = renderContent(t);

    return (
        <Flex
            style={{
                borderBottom: '1px solid var(--neutral-border-medium)'
            }}
            as="header"
            fillWidth paddingX="m" height="64"
            alignItems="center"
            background="surface">
            <Flex hide="s">
                <Link href={`/${params?.locale}/`}>
                    <Text style={{whiteSpace: "nowrap"}} variant="display-strong-xs">VICTOR VU</Text>
                </Link>
            </Flex>
            <Flex fillWidth show="s" alignItems="center" justifyContent="space-between">
                <Link href={`/${params?.locale}/`}>
                    <Text style={{whiteSpace: "nowrap"}} variant="display-strong-xs">VICTOR VU</Text>
                </Link>
                <DropdownWrapper 
                    dropdownOptions={[
                        {
                            label: recipes.label,
                            value: 'recipes'
                        },
                        {
                            label: tips.label,
                            value: 'tips'
                        },
                        {
                            label: reviews.label,
                            value: 'reviews'
                        }
                    ]}
                    dropdownProps={{
                        selectedOption: pathname.split('/').pop(),
                        onOptionSelect: (option) => {
                            router.replace(option.value);
                        }
                    }}
                >
                    <NavIcon/>
                </DropdownWrapper>
            </Flex>
            <Flex
                fillWidth
                justifyContent="flex-end"
                hide="s"
                textVariant="label-default-s"
                gap="4"
                alignItems="center">
                    { routes['/recipes'] && (
                        <SmartLink
                            href={`/${params?.locale}/recipes`}
                            selected={pathname.startsWith('/recipes')}>
                            <Flex paddingX="2" hide="s">{recipes.label}</Flex>
                        </SmartLink>
                    )}
                    { routes['/tips'] && (
                        <SmartLink
                            href={`/${params?.locale}/tips`}
                            selected={pathname.startsWith('/tips')}>
                            <Flex paddingX="2" hide="s">{tips.label}</Flex>
                        </SmartLink>
                    )}
                    { routes['/reviews'] && (
                        <SmartLink
                            href={`/${params?.locale}/reviews`}
                            selected={pathname.startsWith('/reviews')}>
                            <Flex paddingX="2" hide="s">{reviews.label}</Flex>
                        </SmartLink>
                    )}
                    {routing.locales.map((locale, index) => (
                        <ToggleButton
                            key={index}
                            selected={params?.locale === locale}
                            onClick={() => handleLanguageChange(locale)}
                            className={isPending && 'pointer-events-none opacity-60' || ''}
                            >
                            {locale.toUpperCase()}
                        </ToggleButton>
                    ))}
            </Flex>
        </Flex>
    );
};