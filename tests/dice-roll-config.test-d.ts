/**
 * Roll-config family (`dnd5e.types.Dice`): the expandability mechanism.
 *
 * Proves the ceremony-free design — plain `interface extends` gives (a) the inheritance chain,
 * (b) DOWNWARD propagation of consumer augmentation, and (c) reach into nested `rolls[].options`,
 * with no generics / `MakeX`.
 */

import type { Expect, Extends, Equal } from "./_assert.ts";

/* ---- chain is intact (interface extends, not opaque type aliases) ---- */
{
  type _d20IsBasic = Expect<Extends<dnd5e.types.Dice.D20RollProcessConfiguration, dnd5e.types.Dice.BasicRollProcessConfiguration>>;
  type _attackIsD20 = Expect<Extends<dnd5e.types.Dice.AttackRollProcessConfiguration, dnd5e.types.Dice.D20RollProcessConfiguration>>;
  type _dmgIsBasic = Expect<Extends<dnd5e.types.Dice.DamageRollProcessConfiguration, dnd5e.types.Dice.BasicRollProcessConfiguration>>;
  // compatible override survived as a real narrowing (not erased to the base element type)
  type _attackRollsElem = Expect<Extends<dnd5e.types.Dice.AttackRollProcessConfiguration["rolls"][number], dnd5e.types.Dice.D20RollConfiguration>>;
}

/* ---- consumer augments a MID-LEVEL interface → propagates DOWN ---- */
declare global {
  namespace dnd5e.types.Dice {
    interface D20RollOptions {
      advantageSource?: string;
    }
  }
}
{
  // appears on the augmented level
  type _onD20 = Expect<Equal<dnd5e.types.Dice.D20RollOptions["advantageSource"], string | undefined>>;
  // and on every descendant config's nested rolls[].options (attack rolls reuse D20RollConfiguration)
  type AttackOpt = NonNullable<dnd5e.types.Dice.AttackRollProcessConfiguration["rolls"][number]["options"]>;
  type _onAttack = Expect<Equal<AttackOpt["advantageSource"], string | undefined>>;
  type _onSkill = Expect<Equal<
    NonNullable<dnd5e.types.Dice.SkillToolRollProcessConfiguration["rolls"][number]["options"]>["advantageSource"],
    string | undefined
  >>;
  // but NOT on the unrelated damage branch (precise to the extends graph)
  type _notOnDamage = Expect<Equal<
    "advantageSource" extends keyof dnd5e.types.Dice.DamageRollOptions ? true : false,
    false
  >>;
}

/* ---- augmenting the ROOT reaches ALL rolls (d20 AND damage) ---- */
declare global {
  namespace dnd5e.types.Dice {
    interface BasicRollOptions {
      sourceTag?: string;
    }
  }
}
{
  type _rootOnD20 = Expect<Equal<dnd5e.types.Dice.D20RollOptions["sourceTag"], string | undefined>>;
  type _rootOnDamage = Expect<Equal<dnd5e.types.Dice.DamageRollOptions["sourceTag"], string | undefined>>;
}

/* ---- the Override escape hatch: incompatible override compiles + wins ---- */
{
  interface Base {
    k: number;
    keep: boolean;
  }
  type Child = dnd5e.types.Override<Base, { k: string }>;
  type _kOverridden = Expect<Equal<Child["k"], string>>;
  type _keepInherited = Expect<Equal<Child["keep"], boolean>>;
}
