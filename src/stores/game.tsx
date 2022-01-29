import { createMediaQuery } from "@/utils/createMediaQuery";
import { defineStore, persistentStorePlugin } from "@/utils/defineStore";

export const [GameProvider, useGame] = defineStore({
  state: () => {
    // We don't take advantage of the fact that this value is reactive... Should we though?
    const isDarkPrefered = createMediaQuery("(prefers-color-scheme: dark)");

    return { darkMode: isDarkPrefered() };
  },

  watchers: () => ({
    darkMode(isDark) {
      const action = isDark ? "add" : "remove";
      document.documentElement.classList[action]("dark");
    },
  }),

  actions: (state, setState) => ({
    toggleDarkMode(isDark: boolean) {
      setState("darkMode", isDark);
    },
  }),

  plugins: [persistentStorePlugin("gameSettings")],
});
