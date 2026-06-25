/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/applications/dice/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.applications.dice {
      interface BasicRollConfigurationDialogRenderOptions {
      dice?: {
        max?: number; // @default 5 — The maximum number of dice to display in the large dice breakdown. If the given rolls contain more dice than this, then the large breakdown is not shown.
        denominations?: Set<string>; // Valid die denominations to display in the large dice breakdown. If any of the given rolls contain an invalid denomination, then the large breakdown is not shown.
      };
      }

  }
}

export {};
