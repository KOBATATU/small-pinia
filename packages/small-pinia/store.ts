import { piniaSymbol, type Pinia } from "./rootStore";
import type {
  _ExtractActionsFromSetupStore,
  _ExtractGettersFromSetupStore,
  _ExtractStateFromSetupStore,
  Store,
} from "./types";

export function defineStore<
  Id extends string,
  SS extends Record<PropertyKey, unknown>
>(id: Id, setup: () => SS) {
  const isSetupStore = typeof setup === "function";

  function useStore(): Store<
    Id,
    _ExtractStateFromSetupStore<SS>,
    _ExtractGettersFromSetupStore<SS>,
    _ExtractActionsFromSetupStore<SS>
  > {
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

    const store = pinia._s.get(id)! as Store<
      Id,
      _ExtractStateFromSetupStore<SS>,
      _ExtractGettersFromSetupStore<SS>,
      _ExtractActionsFromSetupStore<SS>
    >;

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
