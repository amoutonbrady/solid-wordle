import { defineConfig } from "vite";
import { resolve } from "node:path";
import solid from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [solid()],
});
