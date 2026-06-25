/**
 * Runtime API fragment for `dnd5e.dataModels.collection` (`Actors5e`, `Items5e`).
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.collection {
    const Actors5e: typeof import("../collection/actors-collection.mjs").default;
    type Actors5e = import("../collection/actors-collection.mjs").default;

    const Items5e: typeof import("../collection/items-collection.mjs").default;
    type Items5e = import("../collection/items-collection.mjs").default;
  }
}

export {};
