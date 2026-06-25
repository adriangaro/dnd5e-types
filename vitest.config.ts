import { defineConfig } from "vitest/config";

// Type-only library: tests are compile-time assertions in tests/**/*.test-d.ts,
// validated via vitest's typecheck mode (which runs the TS compiler under the hood).
export default defineConfig({
  test: {
    include: [],
    typecheck: {
      enabled: true,
      include: ["tests/**/*.test-d.ts"],
      tsconfig: "./tsconfig.json",
      // Use the native Go compiler (@typescript/native-preview) — historically the
      // strictest and ~4-5× faster than tsc for this suite (≈6s vs ≈28s).
      checker: "tsgo",
    },
  },
});
