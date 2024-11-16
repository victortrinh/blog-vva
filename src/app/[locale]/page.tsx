import React from 'react';

import { Heading, Flex, Text, Button,  Avatar, Arrow } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';

import { baseURL, routes, renderContent } from '@/app/resources'; 
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {
	const t = await getTranslations();
    const { home } = renderContent(t);
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}`,
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

export default function Home(
	{ params: {locale}}: { params: { locale: string }}
) {
	setRequestLocale(locale);
	const t = useTranslations();
	const { home, person, newsletter } = renderContent(t);
	return (
		<Flex
			maxWidth="m" fillWidth gap="xl"
			direction="column" alignItems="center">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: home.title,
						description: home.description,
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
						publisher: {
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
			<Flex
				fillWidth
				direction="column"
				paddingY="l" gap="m">
					<Flex
						direction="column"
						fillWidth maxWidth="s" gap="m">
						<Heading
							wrap="balance"
							variant="display-strong-l">
							{home.headline}
						</Heading>
						<Flex fillWidth>
							<Text
								wrap="balance"
								onBackground="neutral-weak"
								variant="heading-default-xl">
								{home.subline}
							</Text>
						</Flex>
					</Flex>
			</Flex>
			{routes['/blog'] && (
				<Flex
					fillWidth gap="24"
					mobileDirection="column">
					<Flex flex={1} paddingLeft="l">
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Latest from the blog
						</Heading>
					</Flex>
					<Flex
						flex={3} paddingX="20">
						<Posts page="blog" range={[1,2]} columns="2" locale={locale}/>
					</Flex>
				</Flex>
			)}
			{routes['/recipes'] && (
				<Flex
					fillWidth gap="24"
					mobileDirection="column">
					<Flex flex={1} paddingLeft="l">
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Latest recipes
						</Heading>
					</Flex>
					<Flex
						flex={3} paddingX="20">
						<Posts page="recipes" range={[1,2]} columns="2" locale={locale}/>
					</Flex>
				</Flex>
			)}
			{routes['/tips'] && (
				<Flex
					fillWidth gap="24"
					mobileDirection="column">
					<Flex flex={1} paddingLeft="l">
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Latest tips
						</Heading>
					</Flex>
					<Flex
						flex={3} paddingX="20">
						<Posts page="tips" range={[1,2]} columns="2" locale={locale}/>
					</Flex>
				</Flex>
			)}
			{routes['/reviews'] && (
				<Flex
					fillWidth gap="24"
					mobileDirection="column">
					<Flex flex={1} paddingLeft="l">
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Latest reviews
						</Heading>
					</Flex>
					<Flex
						flex={3} paddingX="20">
						<Posts page="reviews" range={[1,2]} columns="2" locale={locale}/>
					</Flex>
				</Flex>
			)}
			{ newsletter.display &&
				<Mailchimp newsletter={newsletter} />
			}
		</Flex>
	);
}
