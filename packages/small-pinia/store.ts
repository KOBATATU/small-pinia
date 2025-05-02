import {
  computed,
  hasInjectionContext,
  inject,
  markRaw,
  reactive,
  type ComputedRef,
} from "vue";
import {
  activePinia,
  piniaSymbol,
  setActivePinia,
  type Pinia,
} from "./rootStore";
import type {
  _ActionsTree,
  _ExtractActionsFromSetupStore,
  _ExtractGettersFromSetupStore,
  _ExtractStateFromSetupStore,
  _GettersTree,
  _Method,
  DefineStoreOptions,
  StateTree,
  Store,
  StoreDefinition,
  StoreGeneric,
} from "./types";

export function defineStore<
  Id extends string,
  S extends StateTree = {},
  G extends _GettersTree<S> = {},
  A = {}
>(
  id: Id,
  options: Omit<DefineStoreOptions<Id, S, G, A>, "id">
): StoreDefinition<Id, S, G, A>;
export function defineStore<Id extends string, SS extends Record<any, unknown>>(
  id: any,
  setup: () => SS
): StoreDefinition<
  string,
  _ExtractStateFromSetupStore<SS>,
  _ExtractGettersFromSetupStore<SS>,
  _ExtractActionsFromSetupStore<SS>
>;
export function defineStore(id: any, setup?: any): StoreDefinition {
  const isSetupStore = typeof setup === "function";

  function useStore(): StoreGeneric {
    const hasContext = hasInjectionContext();
    let pinia = hasContext ? inject(piniaSymbol, null) : null;
    if (pinia) setActivePinia(pinia);

    if (!activePinia) {
      throw new Error(
        `[🍍 smallPinia] Cannot get current Pinia instance. Did you forget to call "app.use(smallPinia)"?`
      );
    }
    pinia = activePinia!;

    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, pinia);
      } else {
        createOptionsStore(id, setup, pinia);
      }
    }
    const store: StoreGeneric = pinia._s.get(id)!;
    return store;
  }

  useStore.$id = id;

  return useStore as any;
}

function createOptionsStore<
  Id extends string,
  S extends StateTree,
  G extends _GettersTree<S>,
  A extends _ActionsTree
>(
  id: Id,
  options: DefineStoreOptions<Id, S, G, A>,
  pinia: Pinia
): Store<Id, S, G, A> {
  const { state, actions, getters } = options;

  let store: Store<Id, S, G, A>;

  function setup() {
    const localState = state ? state() : {};

    return Object.assign(
      localState,
      actions,
      Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(
            `[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`
          );
        }

        computedGetters[name] = markRaw(
          computed(() => {
            setActivePinia(pinia);
            const store = pinia._s.get(id)!;
            // @ts-expect-error
            return getters![name].call(store, store);
          })
        );
        return computedGetters;
      }, {} as Record<string, ComputedRef>)
    );
  }

  store = createSetupStore(id, setup, pinia, true);

  return store;
}

function createSetupStore<
  Id extends string,
  SS extends Record<any, unknown>,
  S extends StateTree,
  G extends Record<string, _Method>,
  A extends _ActionsTree
>($id: Id, setup: () => SS, pinia: Pinia, isOptionsStore?: boolean) {
  const partialStore = {
    _p: pinia,
  };
  const store = reactive(partialStore) as unknown as Store<Id, S, G, A>;

  pinia._s.set($id, store);

  const setupStore = setup();

  Object.assign(store, setupStore);
  return store;
}
