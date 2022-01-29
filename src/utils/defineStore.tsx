import {
  createContext,
  createEffect,
  on,
  PropsWithChildren,
  useContext,
} from "solid-js";
import { createStore, DeepReadonly, SetStoreFunction } from "solid-js/store";

import { TODO } from "@/types";
import { createLocalStorage } from "./createLocaleStorage";

/**
 * Helper function to create stores with a common interface
 */
export function defineStore<
  T extends Record<string, TODO>,
  U
>(storeDefinition: {
  state: () => T;
  actions: (state: DeepReadonly<T>, set: SetStoreFunction<T>) => U;
  watchers?: () => Record<keyof T, (state: DeepReadonly<T>) => void>;
  plugins?: ((state: DeepReadonly<T>, set: SetStoreFunction<T>) => void)[];
}) {
  function createStoreContext() {
    const [state, setState] = createStore<T>(storeDefinition.state());
    const actions = storeDefinition.actions(state, setState);

    if (storeDefinition.plugins) {
      for (const plugin of storeDefinition.plugins) {
        plugin(state, setState);
      }
    }

    if (storeDefinition.watchers) {
      const watchers = Object.entries(storeDefinition.watchers());

      for (const [property, watcher] of watchers) {
        createEffect(on(() => state[property], watcher));
      }
    }

    return [state, actions] as const;
  }

  type StoreContextState = ReturnType<typeof createStoreContext>;
  const StoreContext = createContext<StoreContextState>();

  const Provider = (props: PropsWithChildren) => {
    const storeContext = createStoreContext();

    return (
      <StoreContext.Provider value={storeContext}>
        {props.children}
      </StoreContext.Provider>
    );
  };

  const useProvider = () => useContext(StoreContext)!;

  return [Provider, useProvider] as const;
}

/**
 * Store plugin to persist state to local storage
 */
export function persistentStorePlugin<T>(key: string) {
  return (state: DeepReadonly<T>, setState: SetStoreFunction<T>) => {
    const [persistedState, setPersistedState] = createLocalStorage(key, state);
    setState(persistedState);

    createEffect(() => setPersistedState({ ...state } as TODO));
  };
}
