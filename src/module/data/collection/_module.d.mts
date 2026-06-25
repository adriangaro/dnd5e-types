/**
 * Runtime API fragment for `dnd5e.dataModels.collection` (`Actors5e`, `Items5e`).
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.collection {
    const Actors5e: typeof import("./actors-collection.mjs").default;
    type Actors5e = import("./actors-collection.mjs").default;

    const Items5e: typeof import("./items-collection.mjs").default;
    type Items5e = import("./items-collection.mjs").default;
  }
}

export {};
