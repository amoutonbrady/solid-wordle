import { render } from "solid-js/web";

import Game from "@/game";
import { getWordOfTheDay } from "@/utils/getWordOfTheDay";

function onResize() {
  // get actual vh on mobile
  document.body.style.setProperty("--vh", `${window.innerHeight}px`);
}

// resize for scaling the board size
window.addEventListener("resize", onResize);
window.addEventListener("DOMContentLoaded", onResize);

// get word of the day
const wordToFind = "hello" || getWordOfTheDay();

render(
  () => <Game tilesPerRow={5} rows={6} wordToFind={wordToFind} />,
  document.getElementById("app")!
);
