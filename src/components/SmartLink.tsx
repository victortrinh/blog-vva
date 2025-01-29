"use client";

import React, { forwardRef, ReactNode } from "react";
import classNames from "classnames";
import Link from "next/link";

interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    prefixIcon?: string;
    suffixIcon?: string;
    iconSize?: "xs" | "s" | "m" | "l" | "xl";
    style?: React.CSSProperties;
    className?: string;
    selected?: boolean;
    unstyled?: boolean;
    children: ReactNode;
}

const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(({ 
    href,
    style,
    className,
    selected,
    unstyled = false,
    children,
    ...props
}, ref) => {
    const isExternal = href.startsWith("http") || href.startsWith("//");

    const content = (
        <>
            {children}
        </>
    );

    const commonProps = {
        ref,
        className: classNames(className || "", {
            "px-4 mx-4": !unstyled,
        }),
        style: !unstyled ? {
            display: "inline-flex",
            alignItems: "center",
            ...(selected && { textDecoration: "underline" }),
            ...style
        } : { 
            textDecoration: "none",
            color: "inherit",
            ...style
        },
        ...props
    };

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                {...commonProps}>
                {content}
            </a>
        );
    }

    return (
        <Link
            href={href}
            {...commonProps}
            {...props}>
            {content}
        </Link>
    );
}
);

SmartLink.displayName = "SmartLink";

export { SmartLink };