import { PropsWithChildren } from "solid-js";

interface GameRowProps {
  isShaking: boolean;
  tilesPerRow: number;
}

export default function GameRow(props: PropsWithChildren<GameRowProps>) {
  return (
    <div
      class="grid gap-1.5"
      style={{
        "grid-template-columns": `repeat(${props.tilesPerRow}, 1fr)`,
      }}
      classList={{ "animate-shake": props.isShaking }}
    >
      {props.children}
    </div>
  );
}
