import { Container as MantineContainer, ContainerProps } from "@mantine/core";

export const Container = (props: ContainerProps) => (
    <MantineContainer
        {...props}
        size="responsive"
    />
);