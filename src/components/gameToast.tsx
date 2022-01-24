import { Portal } from "solid-js/web";
import { PropsWithChildren, Show } from "solid-js";

interface GameToastProps {
  isOpen: boolean;
}

export default function GameToast(props: PropsWithChildren<GameToastProps>) {
  const mountElement = document.getElementById("toasts")!;

  return (
    <Show when={props.isOpen}>
      <Portal mount={mountElement}>
        <div class="rounded bg-black text-white py-3 px-4 font-semibold">
          {props.children}
        </div>
      </Portal>
    </Show>
  );
}
