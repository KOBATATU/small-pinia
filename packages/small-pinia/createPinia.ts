import { type App } from "vue";
import { piniaSymbol, type Pinia } from "./rootStore";

export function createPinia(): Pinia {
  const pinia: Pinia = {
    install(app: App) {
      app.provide(piniaSymbol, pinia);
    },
    _s: new Map<string, any>(),
  };

  return pinia;
}
