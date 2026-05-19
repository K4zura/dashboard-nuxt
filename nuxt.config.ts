// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/a11y",
    "@nuxt/hints",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
  ],

  alias: {
    styles: fileURLToPath(new URL("./app/assets/css", import.meta.url)),
    components: fileURLToPath(new URL("./app/components", import.meta.url)),
    store: fileURLToPath(new URL("./app/store", import.meta.url)),
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Hackeboard",
      htmlAttrs: {
        lang: "es",
      },
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },

  fonts: {
    families: [
      {
        name: "Karla",
        provider: "google",
        weights: [200, 300400, 500, 600, 700, 800, 900, 1000],
        styles: ["normal", "italic"],
      },
      {
        name: "Inter",
        provider: "google",
      },
    ],
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: false,
    },
    types: false,
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  typescript: {
    typeCheck: true,
  },
});
