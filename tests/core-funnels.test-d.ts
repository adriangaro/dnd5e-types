/**
 * Core fvtt-types CONFIG funnels dnd5e feeds (src/module/config/_core-funnels.d.mts):
 * statusEffects fields, specialStatusEffects.CONCENTRATING, CONFIG.Dice classes.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";
import type BasicRoll from "../src/module/dice/basic-roll.mjs";
import type D20Roll from "../src/module/dice/d20-roll.mjs";
import type DamageRoll from "../src/module/dice/damage-roll.mjs";

/* ---- CONFIG.statusEffects entries carry dnd5e fields ---- */
{
  type Entry = CONFIG.StatusEffect;
  type _ref = Expect<Equal<Entry["reference"], string | undefined>>;
  type _riders = Expect<Equal<Entry["riders"], string[] | undefined>>;
  type _cover = Expect<Equal<Entry["coverBonus"], number | undefined>>;
  type _never = Expect<Equal<Entry["neverBlockMovement"], boolean | undefined>>;
}

/* ---- specialStatusEffects: dnd5e adds CONCENTRATING; core keys remain ---- */
{
  type Special = typeof CONFIG.specialStatusEffects;
  type _conc = Expect<Extends<"CONCENTRATING", keyof Special>>;
  // core defaults are NOT dropped (we merged into DefaultSpecialStatusEffects, not the replacing seam)
  type _blind = Expect<Extends<"BLIND", keyof Special>>;
  type _defeated = Expect<Extends<"DEFEATED", keyof Special>>;
}

/* ---- CONFIG.Dice gains dnd5e roll/die classes ---- */
{
  type _basic = Expect<Equal<typeof CONFIG.Dice.BasicRoll, typeof BasicRoll>>;
  type _d20 = Expect<Equal<typeof CONFIG.Dice.D20Roll, typeof D20Roll>>;
  type _dmg = Expect<Equal<typeof CONFIG.Dice.DamageRoll, typeof DamageRoll>>;
  // and the runtime registration usage typechecks: CONFIG.Dice.D20Roll.build(...) returns D20Roll[]
  type _build = Expect<Equal<Awaited<ReturnType<typeof CONFIG.Dice.D20Roll.build>>, D20Roll[]>>;
}
