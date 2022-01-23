import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import solidStyled from "babel-plugin-solid-styled";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    solid({
      babel: {
        plugins: [solidStyled],
      },
    }),
  ],
});
