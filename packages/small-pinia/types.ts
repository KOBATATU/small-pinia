import type { ComputedRef, UnwrapRef } from "vue";
import type { Pinia } from "./rootStore";

export type StateTree = Record<PropertyKey, any>;

export type _Method = (...args: any[]) => any;

/**
 * Base properties common to all store instances.
 */
export interface SmallStoreProperties<Id extends string> {
  /**
   * Unique identifier of the store.
   */
  $id: Id;

  /**
   * The Pinia instance this store belongs to.
   */
  _p: Pinia;
}

export interface _SmallStoreWithState<
  Id extends string,
  S extends StateTree,
  G,
  A
> extends SmallStoreProperties<Id> {
  // $dispose and $patch utils type
}

/**
 * Getters become readonly properties.
 */
export type _StoreWithGetters<G> = {
  readonly [K in keyof G]: G[K] extends ComputedRef<infer R> ? R : never;
};

export type Store<
  Id extends string = string,
  S extends StateTree = {},
  G = {},
  A = {}
> = _SmallStoreWithState<Id, S, G, A> & // Core properties ($id, _p)
  UnwrapRef<S> & // State properties (unwrapped)
  _StoreWithGetters<G> & // Getters (computed refs)
  A; // Actions (functions become methods)

export type _ExtractStateFromSetupStore<SS> = SS extends undefined | void
  ? {} // No state if setup returns nothing
  : {
      [K in keyof SS as SS[K] extends _Method | ComputedRef ? never : K]: SS[K];
    };
export type _ExtractActionsFromSetupStore<SS> = SS extends undefined | void
  ? {}
  : {
      [K in keyof SS as SS[K] extends _Method ? K : never]: SS[K];
    };
export type _ExtractGettersFromSetupStore<SS> = SS extends undefined | void
  ? {}
  : {
      [K in keyof SS as SS[K] extends ComputedRef ? K : never]: SS[K];
    };
