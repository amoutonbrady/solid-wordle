import { GamePage, GameSetting, GameTile } from "@/components";
import { LetterState } from "@/types";

export default function HelpPage() {
  return (
    <GamePage title="How to play">
      <section class="flex flex-col space-y-2 text-sm">
        <p>
          Guess the <strong>WORDLE</strong> in 6 tries.
        </p>
        <p>
          Each guess must be a valid 5 letter word. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
      </section>

      <hr class="my-6" />

      <section class="space-y-6">
        <p class="font-bold">Example</p>

        <div class="space-y-2">
          <p class="flex space-x-2 w-1/2">
            <GameTile
              delay={0}
              tile={{ letter: "H", state: LetterState.CORRECT }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "E", state: LetterState.INITIAL }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "L", state: LetterState.INITIAL }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "L", state: LetterState.INITIAL }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "O", state: LetterState.INITIAL }}
            />
          </p>

          <p>
            The letter <strong>H</strong> is in the word and in the correct
            spot.
          </p>
        </div>

        <div class="space-y-2">
          <p class="flex space-x-2 w-1/2">
            <GameTile
              delay={0}
              tile={{ letter: "W", state: LetterState.INITIAL }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "O", state: LetterState.PRESENT }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "R", state: LetterState.INITIAL }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "L", state: LetterState.INITIAL }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "D", state: LetterState.INITIAL }}
            />
          </p>

          <p>
            The letter <strong>O</strong> is in the word but in the wrong spot.
          </p>
        </div>

        <div class="space-y-2">
          <p class="flex space-x-2 w-1/2">
            <GameTile
              delay={0}
              tile={{ letter: "S", state: LetterState.INITIAL }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "O", state: LetterState.PRESENT }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "L", state: LetterState.INITIAL }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "I", state: LetterState.ABSENT }}
            />
            <GameTile
              delay={0}
              tile={{ letter: "D", state: LetterState.INITIAL }}
            />
          </p>

          <p>
            The letter <strong>I</strong> is not in the word in any spot.
          </p>
        </div>
      </section>

      <hr class="my-6" />

      <p class="font-bold">A new WORDLE will be available each day!</p>
    </GamePage>
  );
}
