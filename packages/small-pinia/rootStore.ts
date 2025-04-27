import type { App, InjectionKey } from "vue";

export interface Pinia {
  install: (app: App) => void;

  _s: Map<string, any>;
}

export const piniaSymbol = Symbol("smallPinia") as InjectionKey<Pinia>;

export let activePinia: Pinia | undefined;

//@ts-expect-error
export const setActivePinia: _SetActivePinia = (pinia) => (activePinia = pinia);

interface _SetActivePinia {
  (pinia: Pinia): Pinia;
  (pinia: undefined): undefined;
  (pinia: Pinia | undefined): Pinia | undefined;
}
