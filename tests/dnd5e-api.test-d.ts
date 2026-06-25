/**
 * The `game.dnd5e` / global `dnd5e` runtime API binding (src/module/_api.d.mts) + the ported
 * top-level module utilities.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";
import type D20Roll from "../src/module/dice/d20-roll.mjs";
import type Token5e from "../src/module/canvas/token.mjs";

declare const game: Game;

/* ---- game.dnd5e exposes the API surface ---- */
{
  // config is DND5EConfig (so game.dnd5e.config.abilities is typed)
  type _cfg = Expect<Extends<typeof game.dnd5e.config, dnd5e.types.DND5EConfig>>;
  game.dnd5e.config.abilities.str.label satisfies string;

  // dice classes are constructors and reachable
  type _d20 = Expect<Equal<typeof game.dnd5e.dice.D20Roll, typeof D20Roll>>;
  type _d20build = Expect<Equal<Awaited<ReturnType<typeof game.dnd5e.dice.D20Roll.build>>, D20Roll[]>>;

  // canvas classes reachable
  type _tok = Expect<Equal<typeof game.dnd5e.canvas.Token5e, typeof Token5e>>;

  // documents reachable
  type _actorIsDoc = Expect<Extends<InstanceType<typeof game.dnd5e.documents.Actor5e>, foundry.abstract.Document.Any>>;
}

/* ---- ported module utilities are callable through the API + as imports ---- */
{
  // utils.formatNumber returns string
  game.dnd5e.utils.formatNumber(5) satisfies string;
  // Filter.performCheck returns boolean
  game.dnd5e.Filter.performCheck({}, []) satisfies boolean;
  // registry default object members reachable
  type _reg = Expect<Extends<"spellLists", keyof typeof game.dnd5e.registry>>;
}

/* ---- bare global dnd5e value also works (namespace-as-value) ---- */
{
  dnd5e.utils.staticID("x") satisfies string;
}
