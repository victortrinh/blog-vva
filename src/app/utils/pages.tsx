import { LocaleParams } from "@/types";
import { baseURL } from "../resources";

interface Props {
    title: string;
    description: string;
    params: LocaleParams;
}

export const generateMetadataForPage = async ({ title, description, params }: Props) => {
    const { locale } = await params;

    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://${baseURL}/${locale}/recipes`,
            images: [
                {
                    url: ogImage,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}