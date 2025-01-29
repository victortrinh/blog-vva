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

// Enable password protection on selected routes
// Set password in pages/api/authenticate.ts
const protectedRoutes = {
    "/work/automate-design-handovers-with-a-figma-to-code-pipeline": true
}

export { routes, protectedRoutes, baseURL, i18nOptions };