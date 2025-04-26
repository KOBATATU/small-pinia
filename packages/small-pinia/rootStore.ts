import type { App, InjectionKey } from "vue";

export interface Pinia {
  install: (app: App) => void;

  _s: Map<string, any>;
}

export const piniaSymbol = Symbol("smallPinia") as InjectionKey<Pinia>;
