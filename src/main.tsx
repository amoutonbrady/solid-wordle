import "./game.css";

import { render } from "solid-js/web";
import { StyleRegistry } from "solid-styled";

import Game from "./Game";

// resize for scaling the board size
window.addEventListener("resize", onResize);
// set size on startup
onResize();

function onResize() {
  // get actual vh on mobile
  document.body.style.setProperty("--vh", window.innerHeight + "px");
}

render(
  () => (
    <StyleRegistry>
      <Game tilesPerRow={5} rows={6} />
    </StyleRegistry>
  ),
  document.getElementById("app")!
);
