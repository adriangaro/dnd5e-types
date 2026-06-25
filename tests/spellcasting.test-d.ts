/**
 * Spellcasting models: the `CONFIG.DND5E.spellcasting` registry's `foundry.abstract.DataModel`s.
 * Linear inheritance (`SpellcastingModel → SlotSpellcasting → Single/MultiLevelSpellcasting`) with the
 * schema growing at each level (fields live directly on the instance — these are not document subtypes).
 */

import type { Expect, Equal, Extends } from "./_assert.ts";
import type {
  SpellcastingModel,
  SlotSpellcasting,
  SingleLevelSpellcasting,
  MultiLevelSpellcasting,
} from "../src/module/data/spellcasting/spellcasting-model.mjs";

/* ---- method-class registry (Seam A): consumer registers a custom method class ---- */
declare class PactSpellcasting extends SpellcastingModel {
  get pactMagic(): boolean;
}
declare global {
  namespace dnd5e.types.Spellcasting {
    interface OverrideTypes {
      pact: typeof PactSpellcasting;
    }
  }
}
{
  // default keys present + custom key merged in
  type _base = Expect<Extends<"base", dnd5e.types.Spellcasting.TypeKey>>;
  type _multi = Expect<Extends<"multi", dnd5e.types.Spellcasting.TypeKey>>;
  type _pact = Expect<Extends<"pact", dnd5e.types.Spellcasting.TypeKey>>;

  // ModelFor → exact constructor; InstanceOf → exact instance (+ its members)
  type _ctor = Expect<Equal<dnd5e.types.Spellcasting.ModelFor<"multi">, typeof MultiLevelSpellcasting>>;
  type _pactInst = Expect<Extends<dnd5e.types.Spellcasting.InstanceOf<"pact">, PactSpellcasting>>;
  type _pactMember = Expect<Equal<dnd5e.types.Spellcasting.InstanceOf<"pact">["pactMagic"], boolean>>;

  // the runtime `SpellcastingModel.TYPES` getter reflects the registry
  type _typesPact = Expect<
    Extends<InstanceType<(typeof SpellcastingModel)["TYPES"]["pact"]>, PactSpellcasting>
  >;
}

/* ---- inheritance chain ---- */
{
  type _slotExtendsBase = Expect<Extends<SlotSpellcasting, SpellcastingModel>>;
  type _singleExtendsSlot = Expect<Extends<SingleLevelSpellcasting, SlotSpellcasting>>;
  type _multiExtendsSlot = Expect<Extends<MultiLevelSpellcasting, SlotSpellcasting>>;
}

declare const s: SingleLevelSpellcasting;

/* ---- schema grows through the chain (fields are top-level on the DataModel) ---- */
{
  type _img = Equal<typeof s.img, string>; // base
  type _order = Equal<typeof s.order, number>; // base
  type _cantrips = Equal<typeof s.cantrips, boolean>; // slot
  type _isSingle = Equal<typeof s.isSingleLevel, boolean>; // own getter
  type _key = Equal<typeof s.key, string>; // base getter
}
