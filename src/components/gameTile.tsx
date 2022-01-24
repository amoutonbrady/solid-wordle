import { LetterState, Tile } from "@/types";
import { PropsWithChildren } from "solid-js";

interface GameTileProps {
  tile: Tile;
}

export default function GameTile(props: PropsWithChildren<GameTileProps>) {
  const isLetterSet = () => props.tile.letter.length > 0;
  const isStateSet = () => props.tile.state !== LetterState.INITIAL;

  return (
    <div
      class="border-2 w-full inline-flex items-center justify-center text-3xl font-bold align-middle uppercase select-none aspect-square"
      classList={{
        "border-gray-500 animate-pop-in": isLetterSet(),
        revealed: isStateSet(),
      }}
    >
      {props.tile.letter}
    </div>
  );
}
