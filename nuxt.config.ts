// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  css: ["~/assets/css/main.css"],
  nitro: {
    experimental: {
      wasm: true,
    },
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#D97706" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      ],
      link: [
        // Favicon untuk berbagai ukuran dan platform
        { rel: "icon", type: "image/svg+xml", href: "/coffee-icon.svg" },
        { rel: "icon", type: "image/x-icon", href: "/coffee-icon.svg" },
        { rel: "shortcut icon", href: "/coffee-icon.svg" },

        // Apple Touch Icons
        { rel: "apple-touch-icon", href: "/coffee-icon.svg" },
        { rel: "apple-touch-icon", sizes: "57x57", href: "/coffee-icon.svg" },
        { rel: "apple-touch-icon", sizes: "60x60", href: "/coffee-icon.svg" },
        { rel: "apple-touch-icon", sizes: "72x72", href: "/coffee-icon.svg" },
        { rel: "apple-touch-icon", sizes: "76x76", href: "/coffee-icon.svg" },
        { rel: "apple-touch-icon", sizes: "114x114", href: "/coffee-icon.svg" },
        { rel: "apple-touch-icon", sizes: "120x120", href: "/coffee-icon.svg" },
        { rel: "apple-touch-icon", sizes: "144x144", href: "/coffee-icon.svg" },
        { rel: "apple-touch-icon", sizes: "152x152", href: "/coffee-icon.svg" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/coffee-icon.svg" },

        // Android Chrome Icons
        { rel: "icon", type: "image/png", sizes: "192x192", href: "/coffee-icon.svg" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/coffee-icon.svg" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/coffee-icon.svg" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/coffee-icon.svg" },
      ],
    },
  },
});
