import {
  onCleanup,
  createSignal,
  createMemo,
  For,
  Show,
  PropsWithChildren,
} from "solid-js";
import { createStore } from "solid-js/store";
import { css } from "solid-styled";

import Keyboard from "./Keyboard";
import { LetterState } from "./types";
import { answers, allWords } from "./words";

// board state
interface Tile {
  letter: string;
  state: LetterState;
}

/**
 * This create a x by y matrix of tiles
 */
function createBoard(x: number, y: number) {
  const initialBoard = Array.from({ length: y }, () => {
    return Array.from(
      { length: x },
      () => ({ letter: "", state: LetterState.INITIAL } as Tile)
    );
  });

  const [board, setBoard] = createStore({ board: initialBoard });

  function updateTile(x: number, y: number, newTile: Partial<Tile>) {
    setBoard("board", y, x, (tile) => ({ ...tile, ...newTile }));
  }

  return [() => board.board, { updateTile }] as const;
}

interface GameProps {
  rows: number;
  tilesPerRow: number;
}

export default function Game(props: PropsWithChildren<GameProps>) {
  // get word of the day
  const now = new Date();
  const start = new Date(2022, 0, 0);
  const diff = Number(now) - Number(start);
  let day = Math.floor(diff / (1000 * 60 * 60 * 24));
  while (day > answers.length) {
    day -= answers.length;
  }
  const answer = "hello";

  let allowInput = true;
  const [board, { updateTile }] = createBoard(props.tilesPerRow, props.rows);

  const [message, setMessage] = createSignal("");
  const [shakeRowIndex, setShakeRowIndex] = createSignal(-1);
  const [currentRowIndex, setCurrentRowIndex] = createSignal(0);
  const [currentTileIndex, setCurrentTileIndex] = createSignal(0);
  const currentRow = createMemo(() => board()[currentRowIndex()]);

  // keep track of revealed letter state for the keyboard
  const [letterStates, setLetterStates] = createStore<
    Record<string, LetterState>
  >({});

  const onKeyup = (event: KeyboardEvent) => onKey(event.key);

  window.addEventListener("keyup", onKeyup);

  onCleanup(() => {
    window.removeEventListener("keyup", onKeyup);
  });

  function onKey(key: string) {
    if (!allowInput) return;

    if (/^[a-z]$/.test(key)) {
      return fillTile(key);
    }

    if (key === "Backspace") {
      return clearTile();
    }

    if (key === "Enter") {
      return completeRow();
    }
  }

  function fillTile(letter: string) {
    if (currentTileIndex() === props.tilesPerRow) return;
    updateTile(currentTileIndex(), currentRowIndex(), { letter });
    setCurrentTileIndex(currentTileIndex() + 1);
  }

  function clearTile() {
    if (currentTileIndex() === 0) return;
    setCurrentTileIndex(currentTileIndex() - 1);
    updateTile(currentTileIndex(), currentRowIndex(), { letter: "" });
  }

  function completeRow() {
    if (currentRow().every((tile) => tile.letter)) {
      const guess = currentRow()
        .map((tile) => tile.letter)
        .join("");

      if (!allWords.includes(guess) && guess !== answer) {
        shake();
        showMessage(`Not in word list`);
        return;
      }

      const answerLetters: (string | null)[] = answer.split("");

      // first pass: mark correct ones
      currentRow().forEach((tile, i) => {
        if (answerLetters[i] === tile.letter) {
          updateTile(i, currentRowIndex(), { state: LetterState.CORRECT });
          setLetterStates(tile.letter, LetterState.CORRECT);
          answerLetters[i] = null;
        }
      });

      // second pass: mark the present
      currentRow().forEach((tile) => {
        if (!tile.state && answerLetters.includes(tile.letter)) {
          updateTile(currentTileIndex(), currentRowIndex(), {
            state: LetterState.PRESENT,
          });
          answerLetters[answerLetters.indexOf(tile.letter)] = null;

          if (!letterStates[tile.letter]) {
            setLetterStates(tile.letter, LetterState.PRESENT);
          }
        }
      });

      // 3rd pass: mark absent
      currentRow().forEach((tile) => {
        if (!tile.state) {
          updateTile(currentTileIndex(), currentRowIndex(), {
            state: LetterState.ABSENT,
          });
          if (!letterStates[tile.letter]) {
            setLetterStates(tile.letter, LetterState.ABSENT);
          }
        }
      });

      if (currentRow().every((tile) => tile.state === LetterState.CORRECT)) {
        // yay!
        allowInput = false;
        showMessage(
          ["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"][
            currentRowIndex()
          ],
          2000
        );
      } else if (currentRowIndex() < props.rows) {
        // go the next row
        setCurrentRowIndex(currentRowIndex() + 1);
        setCurrentTileIndex(0);
      } else {
        // game over :(
        allowInput = false;
        showMessage(answer.toUpperCase(), -1);
      }
    } else {
      shake();
      showMessage("Not enough letters");
    }
  }

  function showMessage(msg: string, time = 1000) {
    setMessage(msg);

    if (time > 0) {
      setTimeout(setMessage, time, "");
    }
  }

  function shake() {
    setShakeRowIndex(currentRowIndex());
    setTimeout(setShakeRowIndex, 1000, -1);
  }

  css`
    #board {
      display: grid;
      grid-template-rows: repeat(6, 1fr);
      grid-gap: 5px;
      padding: 10px;
      box-sizing: border-box;
      --height: min(420px, calc(var(--vh, 100vh) - 320px));
      height: var(--height);
      width: min(350px, calc(var(--height) / 6 * 5));
      margin: 0px auto;
    }
    .message {
      position: absolute;
      left: 50%;
      top: 80px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.85);
      padding: 16px 20px;
      z-index: 2;
      border-radius: 8px;
      transform: translateX(-50%);
      transition: opacity 0.3s ease-out;
    }
    .message.v-leave-to {
      opacity: 0;
    }
    .row {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 5px;
    }
    .tile {
      width: 100%;
      font-size: 2rem;
      line-height: 2rem;
      font-weight: bold;
      vertical-align: middle;
      text-transform: uppercase;
      user-select: none;
      position: relative;
    }
    @media (max-height: 680px) {
      .tile {
        font-size: 3vh;
      }
    }
    .tile .front,
    .tile .back {
      box-sizing: border-box;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .tile .front {
      border: 2px solid #ccc;
    }
    .tile .back {
      transform: rotateX(180deg);
    }
    .tile.filled .front {
      border-color: #999;
    }
    .tile.filled {
      animation: zoom 0.2s;
    }
    .tile:not(.empty) {
      border: none;
    }
    .tile.revealed .front {
      transform: rotateX(180deg);
    }
    .tile.revealed .back {
      transform: rotateX(0deg);
    }

    @keyframes zoom {
      0% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }

    .shake {
      animation: shake 0.5s;
    }

    @keyframes shake {
      0% {
        transform: translate(1px);
      }
      10% {
        transform: translate(-2px);
      }
      20% {
        transform: translate(2px);
      }
      30% {
        transform: translate(-2px);
      }
      40% {
        transform: translate(2px);
      }
      50% {
        transform: translate(-2px);
      }
      60% {
        transform: translate(2px);
      }
      70% {
        transform: translate(-2px);
      }
      80% {
        transform: translate(2px);
      }
      90% {
        transform: translate(-2px);
      }
      100% {
        transform: translate(1px);
      }
    }
  `;

  return (
    <>
      <Show when={message()}>
        <div class="message">{message()}</div>
      </Show>

      <header>
        <h1>SWORDLE</h1>
        <a
          id="source-link"
          href="https://github.com/amoutonbrady/solid-wordle"
          target="_blank"
        >
          Source
        </a>
      </header>

      <div id="board">
        <For each={board()}>
          {(row, rowIndex) => (
            <div
              class="row"
              classList={{ shake: shakeRowIndex() === rowIndex() }}
            >
              <For each={row}>
                {(tile, tileIndex) => (
                  <div
                    class="tile"
                    classList={{
                      filled: !!tile.letter,
                      empty: !tile.letter,
                      revealed: !!tile.state,
                    }}
                  >
                    <div
                      class="front"
                      style={{ "transition-delay": `${tileIndex() * 200}ms` }}
                    >
                      {tile.letter}
                    </div>

                    <div
                      class={`back ${tile.state}`}
                      style={{ "transition-delay": `${tileIndex() * 200}ms` }}
                    >
                      {tile.letter}
                    </div>
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </div>

      <Keyboard onKey={onKey} letterStates={letterStates} />
    </>
  );
}
