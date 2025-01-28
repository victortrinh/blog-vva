const createI18nContent = (t) => {
  const person = {
    firstName: 'Victor',
    lastName:  'Vu',
    get name() {
      return `${this.firstName} ${this.lastName}`;
    },
    role:      t("person.role"),
    // avatar:    '/images/avatar.jpg',
    avatar: undefined,
    location:  'Asia/Jakarta',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English', 'Bahasa']  // optional: Leave the array empty if you don't want to display languages
  }

  const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
      name: 'GitHub',
      icon: 'github',
      link: 'https://github.com/once-ui-system/nextjs-starter',
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      link: 'https://www.linkedin.com/company/once-ui/',
    },
    {
      name: 'X',
      icon: 'x',
      link: '',
    },
    {
      name: 'Email',
      icon: 'email',
      link: 'mailto:example@gmail.com',
    },
  ]

  const home = {
    label: t("home.label"),
    title: t("home.title", {name: person.name}),
    description: t("home.description"),
    headline: t("home.headline"),
    subline: t("home.subline")
  }

  const blog = {
    label: t("blog.label"),
    title: t("blog.title"),
    description: t("blog.description", {name: person.name})
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
  }

  const recipes = {
    label: t("recipes.label"),
    title: t("recipes.title"),
    description: t("recipes.description")
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
  }

  const tips = {
    label: t("tips.label"),
    title: t("tips.title"),
    description: t("tips.description")
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
  }

  const reviews = {
    label: t("reviews.label"),
    title: t("reviews.title"),
    description: t("reviews.description")
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
  }

  return {
    person,
    social,
    home,
    recipes,
    reviews,
    tips,
    blog
  }
};

export { createI18nContent };