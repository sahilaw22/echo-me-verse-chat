import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "e2e/*"],
    globals: true,
  },
});
