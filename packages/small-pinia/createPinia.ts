import { type App } from "vue";
import { piniaSymbol, setActivePinia, type Pinia } from "./rootStore";

export function createPinia(): Pinia {
  const pinia: Pinia = {
    install(app: App) {
      setActivePinia(pinia);
      app.provide(piniaSymbol, pinia);
    },
    _s: new Map<string, any>(),
  };

  return pinia;
}
