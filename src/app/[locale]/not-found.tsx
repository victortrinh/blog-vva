import { Text, Title, Flex } from "@mantine/core";

export default function NotFound() {
    return (
        <section>
            <Flex direction="column" align="center">
                <Text>
                    404
                </Text>
                <Title>
                    Page Not Found
                </Title>
                <Text>
                    The page you are looking for does not exist.
                </Text>
            </Flex>
        </section>
    )
}