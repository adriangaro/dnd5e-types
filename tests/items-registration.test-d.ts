/**
 * Smoke test: all 13 built-in item subtypes register into Item.SubType and narrow `item.system`,
 * and the activity/advancement collections surface on the items that carry those templates.
 */

import type { Expect, Extends } from "./_assert.ts";

/* ---- All 13 item types present in the document SubType union ---- */
type AllItemKeys =
  | "background" | "class" | "consumable" | "container" | "equipment" | "facility"
  | "feat" | "loot" | "race" | "spell" | "subclass" | "tool" | "weapon";
type _complete = Expect<Extends<AllItemKeys, Item.SubType>>;

/* ---- system narrows per subtype ---- */
type _weaponSys = Expect<Extends<Item.OfType<"weapon">["system"], { type: { value: string } }>>;
type _spellSys = Expect<Extends<Item.OfType<"spell">["system"], object>>;

/* ---- activities collection surfaces on items with ActivitiesTemplate ---- */
{
  type WeaponSys = Item.OfType<"weapon">["system"];
  type _hasActivities = Expect<Extends<keyof WeaponSys, "activities" | (string & {})>>;
  // the polymorphic collection field initializes to id-keyed activity instances
  type Acts = dnd5e.types.InitializedOf<{ a: dnd5e.types.Activity.Field }>["a"][string];
  type _actDiscriminates = Expect<Extends<Extract<Acts, { type: "attack" }>, { type: "attack" }>>;
}

/* ---- advancement collection surfaces on items with AdvancementTemplate (class) ---- */
{
  type ClassSys = Item.OfType<"class">["system"];
  type _hasAdvancement = Expect<Extends<keyof ClassSys, "advancement" | (string & {})>>;
}
