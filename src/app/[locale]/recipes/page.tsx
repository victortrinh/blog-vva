import { Flex, Heading } from '@/once-ui/components';
import { Posts } from '@/components/blog/Posts';
import { baseURL, renderContent } from '@/app/resources'
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {
	const t = await getTranslations();
	const { recipes } = renderContent(t);

	const title = recipes.title;
	const description = recipes.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/recipes`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Recipes(
	{ params: {locale}}: { params: { locale: string }}
) {
	setRequestLocale(locale);

	const t = useTranslations();
	const { person, recipes } = renderContent(t);
    return (
        <Flex
			fillWidth maxWidth="xl"
			direction="column">
            <script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Blog',
						headline: recipes.title,
						description: recipes.description,
						url: `https://${baseURL}/recipes`,
						image: `${baseURL}/og?title=${encodeURIComponent(recipes.title)}`,
						author: {
							'@type': 'Person',
							name: person.name,
                            image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
            <Heading
				as="h1"
                marginBottom="l"
                variant="display-strong-s">
                {recipes.title}
            </Heading>
			<Posts page="recipes" locale={locale} columns="4" thumbnail/>
        </Flex>
    );
}