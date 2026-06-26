import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    env: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
