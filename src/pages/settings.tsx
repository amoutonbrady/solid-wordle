import { useGame } from "@/stores";
import { GamePage, GameSetting } from "@/components";

export default function SettingsPage() {
  const [game, gameActions] = useGame();

  return (
    <GamePage title="Settings">
      <section class="flex flex-col divide-y">
        <GameSetting
          label="Hard Mode"
          hint="Any revealed hints must be used in subsequent guesses"
          disabled
        />

        <GameSetting
          label="Dark Theme"
          checked={game.darkMode}
          onChange={gameActions.toggleDarkMode}
        />

        <GameSetting
          label="Color Blind Mode"
          hint="High contrast colors"
          disabled
        />

        <div class="py-4 flex justify-between">
          <span class="text-lg font-semibold text-gray-800">Feedback</span>

          <a
            rel="noopener"
            target="_blank"
            href="https://github.com/amoutonbrady/solid-wordle"
            class="text-blue-700 hover:underline"
          >
            Github
          </a>
        </div>
      </section>
    </GamePage>
  );
}
