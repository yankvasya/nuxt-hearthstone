export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  css: ["gardevoir/dist/mini.min.css", "~/assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/assets/styles/colors.scss";@import "@/assets/styles/transitions.scss";',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      HEARTH_TOKEN: process.env.HEARTH_TOKEN || "",
    },
  },
});
