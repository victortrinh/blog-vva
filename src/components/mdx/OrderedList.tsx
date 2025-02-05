"use client";

import { ReactNode } from "react";
import styles from "./OrderedList.module.css";

interface Props {
    children: ReactNode;  
}

export const OrderedList = ({children}: Props) => {
    return <ol className={styles.list}>{children}</ol>;
}