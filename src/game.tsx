import {
  For,
  onCleanup,
  createSignal,
  createMemo,
  PropsWithChildren,
} from "solid-js";
import { createStore } from "solid-js/store";

import {
  GameIcon,
  GameRow,
  GameTile,
  GameToast,
  GameKeyboard,
} from "./components";
import { LetterState, Position, Tile } from "./types";
import { allWords, encouragingWords } from "./words";

/**
 * Create an `x` by `y` grid of `Tile`s.
 *
 * @param x Number of tiles per row
 * @param y Number of rows
 */
function createBoard(x: number, y: number) {
  const initialBoard = Array.from({ length: y }, () => {
    return Array.from(
      { length: x },
      () => ({ letter: "", state: LetterState.INITIAL } as Tile)
    );
  });

  const [boardState, setBoardState] = createStore({ board: initialBoard });

  function updateTile({ x, y }: Position, newTile: Partial<Tile>) {
    setBoardState("board", y, x, (tile) => ({
      ...tile,
      ...newTile,
    }));
  }

  return [() => boardState.board, { updateTile }] as const;
}

interface GameProps {
  rows: number;
  tilesPerRow: number;
  wordToFind: string;
}

export default function Game(props: PropsWithChildren<GameProps>) {
  let allowInput = true;
  const [board, { updateTile }] = createBoard(props.tilesPerRow, props.rows);

  const [message, setMessage] = createSignal("");
  const hasMessage = () => message().length > 0;

  const [shakeRowIndex, setShakeRowIndex] = createSignal(-1);

  // This keeps track of where we are in the matrix
  const [position, setPosition] = createStore<Position>({ x: 0, y: 0 });
  const currentRow = createMemo(() => board()[position.y]);

  // This keeps track of revealed letter state for the keyboard
  const [letterStates, setLetterStates] = createStore<
    Record<string, LetterState>
  >({});

  const onKeyup = (event: KeyboardEvent) => onKey(event.key);

  window.addEventListener("keyup", onKeyup);
  onCleanup(() => window.removeEventListener("keyup", onKeyup));

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
    if (position.x === props.tilesPerRow) return;
    updateTile(position, { letter });
    setPosition("x", (x) => x + 1);
  }

  function clearTile() {
    if (position.x === 0) return;
    setPosition("x", (x) => x - 1);
    updateTile(position, { letter: "" });
  }

  function completeRow() {
    const isRowFilled = currentRow().every((tile) => tile.letter);
    if (!isRowFilled) {
      shake();
      return showMessage("Not enough letters");
    }

    const guess = currentRow()
      .map((tile) => tile.letter)
      .join("");

    if (!allWords.includes(guess) && guess !== props.wordToFind) {
      shake();
      showMessage(`Not in word list`);
      return;
    }

    const answerLetters: (string | null)[] = props.wordToFind.split("");

    // first pass: mark correct ones
    currentRow().forEach((tile, x) => {
      if (answerLetters[x] === tile.letter) {
        updateTile({ x, y: position.y }, { state: LetterState.CORRECT });
        setLetterStates(tile.letter, LetterState.CORRECT);
        answerLetters[x] = null;
      }
    });

    // second pass: mark the present
    currentRow().forEach((tile, x) => {
      if (
        tile.state === LetterState.INITIAL &&
        answerLetters.includes(tile.letter)
      ) {
        updateTile({ x, y: position.y }, { state: LetterState.PRESENT });
        answerLetters[answerLetters.indexOf(tile.letter)] = null;

        if (!letterStates[tile.letter]) {
          setLetterStates(tile.letter, LetterState.PRESENT);
        }
      }
    });

    // 3rd pass: mark absent
    currentRow().forEach((tile, x) => {
      if (tile.state === LetterState.INITIAL) {
        updateTile({ x, y: position.y }, { state: LetterState.ABSENT });

        if (!letterStates[tile.letter]) {
          setLetterStates(tile.letter, LetterState.ABSENT);
        }
      }
    });

    const isRowCorrect = currentRow().every(
      (tile) => tile.state === LetterState.CORRECT
    );

    if (isRowCorrect) {
      // yay!
      allowInput = false;
      showMessage(encouragingWords[position.y], 2000);
    } else if (position.y < props.rows) {
      // go the next row
      setPosition({ x: 0, y: position.y + 1 });
    } else {
      // game over :(
      allowInput = false;
      showMessage(props.wordToFind.toUpperCase(), -1);
    }
  }

  function showMessage(msg: string, time = 1000) {
    setMessage(msg);
    if (time < 0) return;

    setTimeout(setMessage, time, "");
  }

  function shake() {
    setShakeRowIndex(position.y);
    setTimeout(setShakeRowIndex, 1000, -1);
  }

  return (
    <>
      <header class="flex items-center justify-between border-b py-2">
        <menu class="flex space-x-2 items-center">
          <button type="button">
            <span class="sr-only">help</span>
            <GameIcon icon="help" />
          </button>
        </menu>

        <h1 class="font-bold text-4xl">SWORDLE</h1>

        <menu class="flex space-x-2 items-center">
          <button type="button">
            <span class="sr-only">statistics</span>
            <GameIcon icon="statistics" />
          </button>

          <button type="button">
            <span class="sr-only">settings</span>
            <GameIcon icon="settings" />
          </button>
        </menu>
      </header>

      <GameToast isOpen={hasMessage()}>{message()}</GameToast>

      <main class="flex-1 flex items-center justify-center">
        <div
          id="board"
          class="grid p-2.5 gap-1 max-w-sm w-full"
          style={{ "grid-template-rows": `repeat(${props.rows}, 1fr)` }}
        >
          <For each={board()}>
            {(row, rowIndex) => (
              <GameRow
                isShaking={shakeRowIndex() === rowIndex()}
                tilesPerRow={props.tilesPerRow}
              >
                <For each={row}>
                  {(tile, tileIndex) => (
                    <GameTile tile={tile} delay={tileIndex() * 200} />
                  )}
                </For>
              </GameRow>
            )}
          </For>
        </div>
      </main>

      <GameKeyboard onKey={onKey} letterStates={letterStates} />
    </>
  );
}
