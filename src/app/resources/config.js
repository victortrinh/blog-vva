const baseURL = 'demo.magic-portfolio.com'

// Manage localized content in the messages folder
const i18nOptions = {
    locales: ['en', 'fr'],            // A list of all locales that are supported, e.g. ['en','id']
    defaultLocale: 'en'         // Locale used by default and as a fallback
}

const routes = {
    '/':        true,
    '/blog':    false,
    '/recipes': true,
    '/tips':    true,
    '/reviews': true
}

// Enable password protection on selected routes
// Set password in pages/api/authenticate.ts
const protectedRoutes = {
    '/work/automate-design-handovers-with-a-figma-to-code-pipeline': true
}

const style = {
    theme:       'light',        // dark | light
    neutral:     'slate',        // sand | gray | slate
    brand:       'emerald',      // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    accent:      'indigo',       // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    solid:       'contrast',     // color | contrast
    solidStyle:  'flat',         // flat | plastic
    border:      'playful',      // rounded | playful | conservative
    surface:     'filled',       // filled | translucent
    transition:  'all'           // all | micro | macro
}

export { routes, protectedRoutes, style, baseURL, i18nOptions };