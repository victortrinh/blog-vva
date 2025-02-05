import { Container } from "@/components";
import { PageTitle } from "@/components/PageTitle";
import { Text } from "@mantine/core"
import { useTranslations } from "next-intl";

const About = () => {
    const t = useTranslations();

    return (
        <section>
            <Container>
                <PageTitle>{t("about.label")}</PageTitle>
                <Text>
                    This is the about page.
                </Text>
            </Container>
        </section>
    )
}

export default About;