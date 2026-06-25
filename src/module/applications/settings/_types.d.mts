/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/applications/settings/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.applications.settings {
      interface CompendiumBrowserSourceConfiguration extends foundry.applications.api.ApplicationV2.Configuration {
      selected?: string; // The initially-selected package.
      }

  }
}

export {};
