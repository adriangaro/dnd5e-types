/**
 * Dice classes (`BasicRoll`/`D20Roll`/`DamageRoll`/`BasicDie`/`D20Die`) — the payoff of the
 * augmentable `dnd5e.types.Dice` configs flowing into the class build/config statics.
 */

import type { Expect, Extends, Equal } from "./_assert.ts";
import BasicRoll from "../src/module/dice/basic-roll.mjs";
import D20Roll from "../src/module/dice/d20-roll.mjs";
import DamageRoll from "../src/module/dice/damage-roll.mjs";
import type aggregateDamageRolls from "../src/module/dice/aggregate-damage-rolls.mjs";
import type simplifyRollFormula from "../src/module/dice/simplify-roll-formula.mjs";

/* ---- inheritance chain ---- */
{
  type _d20IsBasic = Expect<Extends<D20Roll, BasicRoll>>;
  type _dmgIsBasic = Expect<Extends<DamageRoll, BasicRoll>>;
}

/* ---- build statics return the right subclass, narrowed by class ---- */
{
  type _basicBuild = Expect<Equal<Awaited<ReturnType<typeof BasicRoll.build>>, BasicRoll[]>>;
  type _d20Build = Expect<Equal<Awaited<ReturnType<typeof D20Roll.build>>, D20Roll[]>>;
  type _dmgBuild = Expect<Equal<Awaited<ReturnType<typeof DamageRoll.build>>, DamageRoll[]>>;
}

/* ---- build statics accept the matching (augmentable) process config ---- */
{
  // d20-only fields are accepted on D20Roll.build
  void D20Roll.build({ advantage: true, elvenAccuracy: true, rolls: [] });
  // damage-only fields on DamageRoll.build
  void DamageRoll.build({ isCritical: true, scaling: 2, rolls: [] });
  // ADV_MODE enum present on D20Roll
  type _adv = Expect<Equal<typeof D20Roll.ADV_MODE.ADVANTAGE, 1>>;
}

/* ---- augmenting a Dice config flows into the class signature ---- */
declare global {
  namespace dnd5e.types.Dice {
    interface D20RollProcessConfiguration {
      __consumerFlag?: boolean;
    }
  }
}
{
  // the consumer's field is now accepted by D20Roll.build with no library change
  void D20Roll.build({ __consumerFlag: true, rolls: [] });
}

/* ---- function exports ---- */
{
  type _agg = Expect<Equal<ReturnType<typeof aggregateDamageRolls>, DamageRoll[]>>;
  type _simplify = Expect<Equal<ReturnType<typeof simplifyRollFormula>, string>>;
}
