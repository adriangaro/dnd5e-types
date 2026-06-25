/**
 * Foundation test for the expandable polymorphic advancement collections.
 * Mirrors activities-foundation: built-in item-grant subtype + downstream expandability.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";
import type ItemGrantAdvancement from "#dnd5e/module/documents/advancement/item-grant.mjs";

/* ---- Built-in subtype registered + discriminated ---- */
{
  type _keys = Expect<Extends<"ItemGrant", dnd5e.types.Advancement.TypeKey>>;
  type _ig = Expect<Equal<dnd5e.types.Advancement.OfType<"ItemGrant">, ItemGrantAdvancement>>;

  type IG = dnd5e.types.Advancement.OfType<"ItemGrant">;
  // schema: dual config/value present and typed
  type _optional = Expect<Equal<IG["configuration"]["optional"], boolean>>;
  type _spellPrepared = Expect<Equal<NonNullable<IG["configuration"]["spell"]>["prepared"], number>>;
  // value.added is a flat object map of granted item id → source uuid (runtime reads it via Object.keys/values).
  type _added = Expect<Extends<IG["value"]["added"], object>>;
  // inherited pseudo-document behavior — runtime `apply(level, data, options={})`.
  type _apply = Expect<
    Equal<IG["apply"], (level: number, data: object, options?: { automatic?: boolean; initial?: boolean }) => Promise<void>>
  >;
}

/* ---- SOURCE side discriminates by `type` ---- */
{
  type IGSrc = Extract<dnd5e.types.Advancement.Source, { type: "ItemGrant" }>;
  type _optSrc = Expect<Equal<NonNullable<IGSrc["configuration"]["optional"]>, boolean>>;
}

/* ---- EXPANDABILITY: a downstream custom advancement flows in via one OverrideTypes merge ---- */
declare class FavorAdvancementData extends foundry.abstract.TypeDataModel<
  {
    type: foundry.data.fields.StringField<{ required: true; nullable: false; blank: false }, "Favor", "Favor", "Favor">;
    configuration: foundry.data.fields.SchemaField<{ amount: foundry.data.fields.NumberField<{ required: true; nullable: false }> }>;
    value: foundry.data.fields.SchemaField<{}>;
  },
  Item.Implementation,
  {},
  { granted: boolean }
> {
  static defineSchema(): {
    type: foundry.data.fields.StringField<{ required: true; nullable: false; blank: false }, "Favor", "Favor", "Favor">;
    configuration: foundry.data.fields.SchemaField<{ amount: foundry.data.fields.NumberField<{ required: true; nullable: false }> }>;
    value: foundry.data.fields.SchemaField<{}>;
  };
}
declare global {
  namespace dnd5e.types.Advancement {
    interface OverrideTypes {
      Favor: typeof FavorAdvancementData;
    }
  }
}
{
  type _key = Expect<Extends<"Favor", dnd5e.types.Advancement.TypeKey>>;
  type Favor = dnd5e.types.Advancement.OfType<"Favor">;
  type _amount = Expect<Equal<Favor["configuration"]["amount"], number>>;
  type _granted = Expect<Equal<Favor["granted"], boolean>>;
}
