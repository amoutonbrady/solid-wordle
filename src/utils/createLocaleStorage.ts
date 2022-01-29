import { createEffect, createSignal } from "solid-js";

export function createLocalStorage<T>(key: string, value: T) {
  const valueFromStorage = localStorage.getItem(key);
  const extractValue = (jsonLike: string) => {
    try {
      return JSON.parse(jsonLike);
    } catch {
      return jsonLike;
    }
  };

  const initialValue = valueFromStorage
    ? extractValue(valueFromStorage)
    : value;

  const [signal, setSignal] = createSignal<T>(initialValue);

  createEffect(() => {
    localStorage.setItem(key, JSON.stringify(signal()));
  });

  return [signal, setSignal] as const;
}
