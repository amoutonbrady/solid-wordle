import { Link } from "solid-app-router";
import { PropsWithChildren } from "solid-js";
import { GameIcon } from ".";

interface GamePageProps {
  title: string;
}

export default function GamePage(props: PropsWithChildren<GamePageProps>) {
  return (
    <div class="fixed top-0 w-full max-w-md -translate-x-1/2 h-screen left-1/2 bg-white">
      <header class="flex relative items-center justify-center">
        <h2 class="uppercase tracking-wide py-2.5 font-semibold text-">
          {props.title}
        </h2>

        <Link href="/" class="absolute right-0 top-1/2 -translate-y-1/2">
          <span class="sr-only">Close the page</span>
          <GameIcon icon="close" />
        </Link>
      </header>

      <main>{props.children}</main>
    </div>
  );
}
