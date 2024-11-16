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
	const { reviews } = renderContent(t);

	const title = reviews.title;
	const description = reviews.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/reviews`,
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

export default function Reviews(
	{ params: {locale}}: { params: { locale: string }}
) {
	setRequestLocale(locale);

	const t = useTranslations();
	const { person, reviews, newsletter } = renderContent(t);
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
						headline: reviews.title,
						description: reviews.description,
						url: `https://${baseURL}/reviews`,
						image: `${baseURL}/og?title=${encodeURIComponent(reviews.title)}`,
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
                {reviews.title}
            </Heading>
			<Posts page="reviews"  columns='4' locale={locale} thumbnail/>
            {newsletter.display && (
                <Mailchimp newsletter={newsletter} />
            )}
        </Flex>
    );
}