/**
 * Runtime API fragment for `dnd5e.dataModels.spellcasting` — mirrors the runtime
 * `module/data/spellcasting/_module.mjs` (`export * from "./spellcasting-model.mjs"`).
 *
 * All four models are NAMED exports of `data/spellcasting/spellcasting-model.mjs` and are real
 * value classes (generic with defaults, so referenced bare). Each is exposed as BOTH a value
 * (`const` → constructor) and a type (`type` → instance), inside an OPEN namespace so a module
 * can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.spellcasting {
    const SpellcastingModel: typeof import("./spellcasting-model.mjs").SpellcastingModel;
    type SpellcastingModel = import("./spellcasting-model.mjs").SpellcastingModel;
    const SlotSpellcasting: typeof import("./spellcasting-model.mjs").SlotSpellcasting;
    type SlotSpellcasting = import("./spellcasting-model.mjs").SlotSpellcasting;
    const SingleLevelSpellcasting: typeof import("./spellcasting-model.mjs").SingleLevelSpellcasting;
    type SingleLevelSpellcasting = import("./spellcasting-model.mjs").SingleLevelSpellcasting;
    const MultiLevelSpellcasting: typeof import("./spellcasting-model.mjs").MultiLevelSpellcasting;
    type MultiLevelSpellcasting = import("./spellcasting-model.mjs").MultiLevelSpellcasting;
  }
}

export {};
