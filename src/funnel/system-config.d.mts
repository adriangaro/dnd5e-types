/**
 * fvtt-types `SystemConfig` — tunes how `system` narrows for our documents.
 *
 * By default fvtt-types forces every consumer to account for ALL possible subtypes of a document
 * (including arbitrary module subtypes and `"base"`), so `item.system.someProp` / `actor.system.foo`
 * error unless the prop exists on every subtype. For a system types package that's needlessly
 * painful. We opt in to:
 *   - `discriminate: "all"`  → `system` is a true discriminated union; accessing a prop that doesn't
 *     exist on every member yields `T | undefined` instead of an error.
 *   - `moduleSubtype: "ignore"` + `base: "ignore"` → drop the arbitrary module-subtype and `"base"`
 *     members from the union entirely, so narrowing on `.type` only ever sees the real dnd5e subtypes.
 *
 * This is deliberately a touch less sound (module subtypes are assumed away) in exchange for ergonomic
 * `actor.system`/`item.system` access — a documented, system-level policy choice. Consumers who need
 * the strict behavior can override these per document.
 */

import type {} from "fvtt-types/configuration";

declare module "fvtt-types/configuration" {
  interface SystemConfig {
    Item: {
      discriminate: "all";
      moduleSubtype: "ignore";
      base: "ignore";
    };
    Actor: {
      discriminate: "all";
      moduleSubtype: "ignore";
      base: "ignore";
    };
    ChatMessage: {
      discriminate: "all";
      moduleSubtype: "ignore";
      base: "ignore";
    };
    JournalEntryPage: {
      discriminate: "all";
      moduleSubtype: "ignore";
      base: "ignore";
    };
    ActiveEffect: {
      discriminate: "all";
      moduleSubtype: "ignore";
      // NB: NO `base: "ignore"` — dnd5e registers only `enchantment` (system.json documentTypes.ActiveEffect).
      // `base` is Foundry's untyped fallback subtype, not a dnd5e-registered subtype, but untyped effects
      // (type "base") still occur at runtime and must remain in the union.
    };
    RegionBehavior: {
      discriminate: "all";
      moduleSubtype: "ignore";
      base: "ignore";
    };
  }
}

export {};
