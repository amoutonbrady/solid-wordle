import { createSignal } from "solid-js";

export function createMediaQuery(query: string) {
  const mediaQuery = window.matchMedia(query);
  const [result, setResult] = createSignal(mediaQuery.matches);
  mediaQuery.addEventListener("change", (event) => setResult(event.matches));

  return result;
}
