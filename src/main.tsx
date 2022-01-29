import { render } from "solid-js/web";
import { Router } from "solid-app-router";

import Game, { GameProps } from "@/game";
import { getWordOfTheDay } from "@/utils/getWordOfTheDay";
import { GameProvider } from "./stores";

// get word of the day
const gameOptions: GameProps = {
  guesses: 6,
  wordLength: 5,
  wordToFind: getWordOfTheDay(),
};

render(
  () => (
    <GameProvider>
      <Router>
        <Game {...gameOptions} />
      </Router>
    </GameProvider>
  ),
  document.getElementById("app")!
);
