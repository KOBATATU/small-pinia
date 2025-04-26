import { piniaSymbol, type Pinia } from "./rootStore";

export function defineStore(id: string, setup?: any) {
  const isSetupStore = typeof setup === "function";

  function useStore() {
    const pinia = inject(piniaSymbol, null);
    if (!pinia) {
      throw new Error("not call createPinia");
    }

    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        /** setup method */
        createSetupStore(id, setup, pinia);
      } else {
        /**TODO: options method */
      }
    }

    const store: Record<string, any> = pinia._s.get(id)!;

    return store;
  }

  useStore.$id = id;
  return useStore;
}

function createSetupStore<Id extends string, SS extends Record<any, unknown>>(
  $id: Id,
  setup: () => SS,
  pinia: Pinia
) {
  const partialStore = {
    _p: pinia,
  };
  const store = reactive(partialStore);

  // register store into the pinia
  pinia._s.set($id, store);

  const setupStore = setup();

  Object.assign(store, setupStore);
  return store;
}
