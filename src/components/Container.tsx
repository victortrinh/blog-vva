import { Container as MantineContainer, ContainerProps } from "@mantine/core";

export const Container = (props: ContainerProps) => {
    return (
        <MantineContainer
            {...props}
            size="responsive"
        />
    );
}