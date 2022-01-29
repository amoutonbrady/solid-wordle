import { LetterState, Tile } from "@/types";
import { createEffect, PropsWithChildren } from "solid-js";

interface GameTileProps {
  tile: Tile;
  delay: number;
}

export default function GameTile(props: PropsWithChildren<GameTileProps>) {
  const state = () => props.tile.state;
  const isLetterSet = () => props.tile.letter.length > 0;
  const isStateSet = () => state() !== LetterState.INITIAL;

  const background = () => {
    switch (state()) {
      case LetterState.ABSENT:
        return "var(--gray)";
      case LetterState.CORRECT:
        return "var(--green)";
      case LetterState.PRESENT:
        return "var(--yellow)";
      default:
        return "transparent";
    }
  };

  return (
    <span
      class="border-2 dark:border-neutral-500 w-full inline-flex items-center justify-center text-3xl font-bold align-middle uppercase select-none aspect-square"
      style={{
        "--background": background(),
        "--delay": `${props.delay}ms`,
      }}
      classList={{
        "border-neutral-500 dark:border-neutral-400 animate-pop-in":
          isLetterSet() && !isStateSet(),
        "animate-flip": isStateSet(),
      }}
    >
      {props.tile.letter}
    </span>
  );
}
