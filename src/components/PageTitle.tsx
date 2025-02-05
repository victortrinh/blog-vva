import { Center, CenterProps, Title } from "@mantine/core";
import { ReactNode } from "react";

interface Props extends CenterProps {
    children: ReactNode;
}

export const PageTitle = ({ children, ...props }: Props) => (
    <Center py="42px" {...props}>
        <Title fw="normal" tt="uppercase">
            {children}
        </Title>
    </Center>
)