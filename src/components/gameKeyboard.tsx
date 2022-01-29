import { For, JSX, PropsWithChildren, Show } from "solid-js";

import { LetterState } from "@/types";
import { GameIcon } from "@/components";

interface KeyboardProps {
  letterStates: Record<string, LetterState>;
  onKey: (key: string) => void;
}

export default function Keyboard(props: PropsWithChildren<KeyboardProps>) {
  const rows = [
    "qwertyuiop".split(""),
    " asdfghjkl ".split(""),
    ["Enter", ..."zxcvbnm".split(""), "Backspace"],
  ];

  return (
    <div id="keyboard" class="mt-2 select-none py-4">
      <For each={rows}>
        {(row) => (
          <div class="flex w-full mx-auto mt-2 touch-manipulation space-x-2">
            <For each={row}>
              {(key) => (
                <Key
                  key={key}
                  state={props.letterStates[key]}
                  onPressed={[props.onKey, key]}
                />
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
}

interface KeyProps {
  key: string;
  state: LetterState;
  onPressed: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
}

function Key(props: PropsWithChildren<KeyProps>) {
  // We can do this because the component never re-renders
  if (props.key === " ") {
    return <div class="flex-0.5"></div>;
  }

  const classes = [
    "font-bold",
    "h-14",
    "rounded",
    "flex",
    "items-center",
    "justify-center",
    "uppercase",
    "text-sm",
    "bg-neutral-300 dark:bg-neutral-700",
  ];

  // We can do this because the component never re-renders
  if (props.key.length > 1) {
    classes.push(`flex-1.5`);
  } else {
    classes.push(`flex-1`);
  }

  return (
    <button
      type="button"
      onClick={props.onPressed}
      class={classes.join(" ")}
      classList={{
        "bg-absent text-white": props.state === LetterState.ABSENT,
        "bg-present text-white": props.state === LetterState.PRESENT,
        "bg-correct text-white": props.state === LetterState.CORRECT,
      }}
    >
      <Show
        when={props.key !== "Backspace"}
        fallback={<GameIcon icon="backspace" />}
      >
        <span>{props.key}</span>
      </Show>
    </button>
  );
}
