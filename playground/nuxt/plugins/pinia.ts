import { createPinia } from "@pinia/src/createPinia";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
});
