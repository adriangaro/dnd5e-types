/**
 * World collections: `game.actors.party` (added by `Actors5e`, merged onto the base `Actors`
 * collection) resolves to the primary-party group actor or null.
 */

import type { Expect, Equal } from "./_assert.ts";

declare const game: foundry.Game;

{
  const party = game.actors!.party;
  type _party = Expect<Equal<typeof party, globalThis.Actor.Implementation | null>>;
  // API surface is exposed under dnd5e.dataModels.collection
  type _actors = Expect<Equal<dnd5e.dataModels.collection.Actors5e, import("#dnd5e/module/data/collection/actors-collection.mjs").default>>;
  type _items = Expect<Equal<dnd5e.dataModels.collection.Items5e, import("#dnd5e/module/data/collection/items-collection.mjs").default>>;
}
