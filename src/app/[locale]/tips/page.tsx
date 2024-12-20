import { Flex, Heading } from '@/once-ui/components';
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { baseURL, renderContent } from '@/app/resources'
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {
	const t = await getTranslations();
	const { tips } = renderContent(t);

	const title = tips.title;
	const description = tips.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/tips`,
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

export default function Tips(
	{ params: {locale}}: { params: { locale: string }}
) {
	setRequestLocale(locale);

	const t = useTranslations();
	const { person, tips, newsletter } = renderContent(t);
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
						headline: tips.title,
						description: tips.description,
						url: `https://${baseURL}/tips`,
						image: `${baseURL}/og?title=${encodeURIComponent(tips.title)}`,
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
                {tips.title}
            </Heading>
			<Posts page="tips" columns="4" locale={locale} thumbnail/>
            {newsletter.display && (
                <Mailchimp newsletter={newsletter} />
            )}
        </Flex>
    );
}