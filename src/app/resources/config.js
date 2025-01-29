const baseURL = "blog-vva.vercel.app"

// Manage localized content in the messages folder
const i18nOptions = {
    locales: ["en", "fr"],            // A list of all locales that are supported, e.g. ['en','id']
    defaultLocale: "en"         // Locale used by default and as a fallback
}

const routes = {
    "/":        true,
    "/recipes": true,
    "/tips":    true,
    "/reviews": true
}

export { routes, baseURL, i18nOptions };