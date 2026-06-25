/**
 * Foundation test for the expandable polymorphic activity collections.
 * Covers: (1) the built-in utility + save subtypes (incl. save's nested derived `save.dc.value`),
 * (2) registering a custom type via the Seam (OverrideTypes) and it flowing into the unions + field.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";
import type UtilityActivity from "#dnd5e/documents/activity/utility.mjs";
import type SaveActivity from "#dnd5e/documents/activity/save.mjs";

/* ---- Built-in subtypes registered + discriminated ---- */
{
  type _keys = Expect<Extends<"utility" | "save", dnd5e.types.Activity.TypeKey>>;

  // OfType narrows the union to the matching document instance.
  type _util = Expect<Equal<dnd5e.types.Activity.OfType<"utility">, UtilityActivity>>;
  type _save = Expect<Equal<dnd5e.types.Activity.OfType<"save">, SaveActivity>>;

  // utility: schema field + inherited mixin behavior + base `labels`.
  type Util = dnd5e.types.Activity.OfType<"utility">;
  type _rollVisible = Expect<Equal<Util["roll"]["visible"], boolean>>;
  type _utilUse = Expect<Equal<Util["use"], (
    config?: dnd5e.types.documents.activity.ActivityUseConfiguration,
    dialog?: dnd5e.types.documents.activity.ActivityDialogConfiguration,
    message?: dnd5e.types.documents.activity.ActivityMessageConfiguration
  ) => Promise<dnd5e.types.documents.activity.ActivityUsageResults | void>>>;
  type _utilLabels = Expect<Equal<Util["labels"], Record<string, string>>>;

  // save: the NESTED derived prop surfaces (DerivedData replaced `save`), AND source keys survive.
  type Save = dnd5e.types.Activity.OfType<"save">;
  type _saveDcValue = Expect<Equal<Save["save"]["dc"]["value"], number>>; // derived
  type _saveDcCalc = Expect<Equal<NonNullable<Save["save"]["dc"]["calculation"]>, string>>; // schema preserved
  type _saveAbility = Expect<Extends<NonNullable<Save["save"]["ability"]>, ReadonlySet<dnd5e.types.Ability.TypeKey>>>; // now strict
}

/* ---- SOURCE side discriminates by `type` ---- */
{
  type SaveSrc = Extract<dnd5e.types.Activity.Source, { type: "save" }>;
  // Closed code-level enum (sheet hardcodes none/half/full), not an expandable CONFIG domain.
  type _onSaveSrc = Expect<Equal<NonNullable<SaveSrc["damage"]["onSave"]>, "none" | "half" | "full">>;
}

/* ---- The collection field (id-keyed) ---- */
{
  type Init = dnd5e.types.InitializedOf<{ activities: dnd5e.types.Activity.Field }>["activities"][string];
  type SaveInit = Extract<Init, { type: "save" }>;
  type _fieldDcValue = Expect<Equal<SaveInit["save"]["dc"]["value"], number>>;
}

/* ---- EXPANDABILITY: a downstream custom activity type flows in via one OverrideTypes merge ---- */
declare class PingActivityData extends foundry.abstract.TypeDataModel<
  {
    type: foundry.data.fields.StringField<{ required: true; nullable: false; blank: false }, "ping", "ping", "ping">;
    radius: foundry.data.fields.NumberField<{ required: true; nullable: false }>;
  },
  Item.Implementation,
  {},
  { pinged: boolean }
> {
  static defineSchema(): {
    type: foundry.data.fields.StringField<{ required: true; nullable: false; blank: false }, "ping", "ping", "ping">;
    radius: foundry.data.fields.NumberField<{ required: true; nullable: false }>;
  };
}
declare global {
  namespace dnd5e.types.Activity {
    interface OverrideTypes {
      ping: typeof PingActivityData;
    }
  }
}
{
  type _key = Expect<Extends<"ping", dnd5e.types.Activity.TypeKey>>;
  type Ping = dnd5e.types.Activity.OfType<"ping">;
  type _radius = Expect<Equal<Ping["radius"], number>>;
  type _pinged = Expect<Equal<Ping["pinged"], boolean>>; // its DerivedData flows through too
}
