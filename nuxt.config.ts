// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      // link: [
      //   { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      //   {
      //     rel: "apple-touch-icon-precomposed",
      //     href: "/apple-touch-icon-precomposed.png",
      //   },
      // ],
    },
  },
});
