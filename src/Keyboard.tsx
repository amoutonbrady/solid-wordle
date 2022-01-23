import { For, PropsWithChildren, Show } from "solid-js";
import { LetterState } from "./types";
import { css } from "solid-styled";

interface KeyboardProps {
  letterStates: Record<string, LetterState>;
  onKey: (key: string) => void;
}

export default function Keyboard(props: PropsWithChildren<KeyboardProps>) {
  const rows = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    ["Enter", ..."zxcvbnm".split(""), "Backspace"],
  ];

  css`
    #keyboard {
      margin: 30px 8px 0;
      user-select: none;
    }

    .row {
      display: flex;
      width: 100%;
      margin: 0 auto 8px;
      touch-action: manipulation;
    }

    .spacer {
      flex: 0.5;
    }

    button {
      font-family: inherit;
      font-weight: bold;
      border: 0;
      padding: 0;
      margin: 0 6px 0 0;
      height: 58px;
      border-radius: 4px;
      cursor: pointer;
      user-select: none;
      background-color: #d3d6da;
      color: #1a1a1b;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
    }

    button:last-of-type {
      margin: 0;
    }

    button.big {
      flex: 1.5;
    }
  `;

  return (
    <div id="keyboard">
      <For each={rows}>
        {(row, i) => (
          <div class="row">
            <Show when={i() === 1}>
              <div class="spacer"></div>
            </Show>

            <For each={row}>
              {(key) => (
                <button
                  class={props.letterStates[key] as string}
                  classList={{ big: key.length > 1 }}
                  onClick={[props.onKey, key]}
                >
                  <Show
                    when={key !== "Backspace"}
                    fallback={
                      <svg height="24" viewBox="0 0 24 24" width="24">
                        <path
                          fill="currentColor"
                          d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                        ></path>
                      </svg>
                    }
                  >
                    <span>{key}</span>
                  </Show>
                </button>
              )}
            </For>

            <Show when={i() === 1}>
              <div class="spacer"></div>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
}
