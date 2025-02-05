"use client";

import { ReactNode } from "react";
import styles from "./UnorderedList.module.css";

interface Props {
    children: ReactNode;  
}

export const UnorderedList = ({children}: Props) => {
    return <ul className={styles.list}>{children}</ul>;
}