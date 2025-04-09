import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const basePath = mode === "production" ? "/250410_r3f/" : "./";

  return {
    plugins: [react()],
    base: basePath,
    build: {
      outDir: "dist",
    },
  };
});
