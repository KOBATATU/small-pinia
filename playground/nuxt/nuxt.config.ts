import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const piniaRoot = resolve(currentDir, "../../packages/pinia/packages/pinia");

export default defineNuxtConfig({
  compatibilityDate: "2025-04-12",
  devtools: { enabled: true },
  vite: {
    define: {
      __DEV__: "true",
      __BROWSER__: "true",
      __USE_DEVTOOLS__: "true",
      __TEST__: "false",
    },
  },
  alias: {
    "@pinia": piniaRoot,
  },
  modules: ["@nuxt/eslint"],
});
