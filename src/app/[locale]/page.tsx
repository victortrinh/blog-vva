import React from 'react';

import { Heading, Flex, Text, Carousel } from '@/once-ui/components';

import { baseURL, routes, renderContent } from '@/app/resources'; 
import { Posts } from '@/components/blog/Posts';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

type Params = Promise<{ locale: string }>

export async function generateMetadata(
	{params}: { params: Params}
) {
	const { locale } = await params;
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

export default async function Home(
	{ params }: { params: Params }
) {
	const { locale } = await params
	setRequestLocale(locale);
	
	return <InnerHome locale={locale} />;
}

interface InnerHomeProps {
	locale: string;
}

const InnerHome = ({locale}: InnerHomeProps) => {
	const t = useTranslations();
	const { home, person } = renderContent(t);
	return (
		<Flex
			maxWidth="xl" fillWidth gap="l"
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
			<Carousel
				aspectRatio="16 / 5"
				indicator="line"
				images={[
					{
						alt: 'Spaghetti carbonara',
						src: '/images/recipes/spaghetti-carbonara.jpg'
					},
					{
						alt: 'Le petit bouchon',
						src: '/images/reviews/le-petit-bouchon.jpg'
					},
					{
						alt: 'Crispy roasted vegetables',
						src: '/images/tips/crispy-roasted-vegetables.jpg'
					}
				]}
			/>
			<Flex
				fillWidth
				direction="column"
				paddingY="l" gap="m">
					<Flex
						direction="column"
						fillWidth gap="m">
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
			{routes['/recipes'] && (
				<Flex
					fillWidth gap="24"
					direction="column">
					<Heading
						as="h2"
						variant="display-strong-xs"
						wrap="balance">
						Latest recipes
					</Heading>
					<Posts page="recipes" range={[1,4]} columns="4" locale={locale} thumbnail />
				</Flex>
			)}
			{routes['/tips'] && (
				<Flex
					fillWidth gap="24"
					direction="column">
					<Heading
						as="h2"
						variant="display-strong-xs"
						wrap="balance">
						Latest tips
					</Heading>
					<Posts page="tips" range={[1,4]} columns="4" locale={locale} thumbnail />
				</Flex>
			)}
			{routes['/reviews'] && (
				<Flex
					fillWidth gap="24"
					direction="column">
					<Heading
						as="h2"
						variant="display-strong-xs"
						wrap="balance">
						Latest reviews
					</Heading>
					<Posts page="reviews" range={[1,4]} columns="4" locale={locale} thumbnail />
				</Flex>
			)}
		</Flex>
	);
}
