/**
 * Settings: `game.settings.get("dnd5e", …)` resolves each key to its strict value type —
 * model-backed settings to their DataModel instance, choice settings to a literal union,
 * domain-keyed sets to the strict domain.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";

declare const game: foundry.Game;

{
  // model-backed → instance
  const transform = game.settings.get("dnd5e", "transformationSettings");
  type _transform = Expect<
    Extends<typeof transform, import("#dnd5e/module/data/settings/transformation-setting.mjs").default>
  >;
  const bastion = game.settings.get("dnd5e", "bastionConfiguration");
  type _bastionEnabled = Expect<Equal<typeof bastion.enabled, boolean>>;
  const party = game.settings.get("dnd5e", "primaryParty");
  type _party = Expect<
    Extends<typeof party, import("#dnd5e/module/data/settings/primary-party-setting.mjs").default>
  >;

  // choice settings → literal unions
  type _rules = Expect<Equal<ReturnType<typeof rulesVersion>, "modern" | "legacy">>;
  function rulesVersion() {
    return game.settings.get("dnd5e", "rulesVersion");
  }
  const bloodied = game.settings.get("dnd5e", "bloodied");
  type _bloodied = Expect<Equal<typeof bloodied, "all" | "player" | "none">>;
  const rest = game.settings.get("dnd5e", "restVariant");
  type _rest = Expect<Equal<typeof rest, "normal" | "gritty" | "epic">>;

  // boolean
  const strict = game.settings.get("dnd5e", "strictValidation");
  type _strict = Expect<Equal<typeof strict, boolean>>;

  // domain-keyed set
  const skills = game.settings.get("dnd5e", "defaultSkills");
  type _skills = Expect<Extends<typeof skills, ReadonlySet<dnd5e.types.Skill.TypeKey>>>;
}
