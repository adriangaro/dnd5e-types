/**
 * Foundation test for item data models: the canonical `loot` subtype proves
 *  - schema composed from mixed templates (description/identifiable/item-type/physical) + own fields,
 *  - the activity/advancement collection fields are reachable on items that mix those templates,
 *  - Seam-C narrowing: `Item.OfType<"loot">.system` is LootData.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";
import type LootData from "#dnd5e/module/data/item/loot.mjs";

/* ---- loot registered + system narrows ---- */
{
  type _sub = Expect<Extends<"loot", Item.SubType>>;
  type LootSystem = Item.OfType<"loot">["system"];
  type _isLoot = Expect<Extends<LootData, LootSystem>>;
}

/* ---- composed schema: fields from EACH mixed template + loot's own ---- */
{
  type Sys = fvttUtils.FixedInstanceType<typeof LootData>;

  // from ItemDescriptionTemplate
  type _desc = Expect<Equal<NonNullable<Sys["description"]["value"]>, string>>;
  type _ident = Expect<Equal<NonNullable<Sys["identifier"]>, string>>;
  // from IdentifiableTemplate
  type _identified = Expect<Equal<Sys["identified"], boolean>>;
  // from PhysicalItemTemplate
  type _qty = Expect<Equal<Sys["quantity"], number>>;
  type _container = Expect<Equal<NonNullable<Sys["container"]>, string>>;
  // loot's own fields
  type _props = Expect<Extends<NonNullable<Sys["properties"]>, ReadonlySet<dnd5e.types.ItemProperty.TypeKey>>>;
  type _typeValue = Expect<Equal<NonNullable<Sys["type"]["value"]>, dnd5e.types.LootType.TypeKey | "">>;

  // MIXED-IN TEMPLATE METHODS surface (the `.mixin()` contract, not just schema):
  type _mDesc = Expect<Equal<Sys["prepareDescriptionData"], () => void>>;       // ItemDescription
  type _gVP = Expect<Equal<Sys["validProperties"], Set<string>>>;               // ItemDescription getter
  type _mId = Expect<Extends<Sys["prepareIdentifiable"], () => void>>;          // Identifiable
  type _gCat = Expect<Extends<Sys["itemCategories"], Record<string, unknown>>>; // ItemType getter
  type _gTW = Expect<Equal<Sys["totalWeight"], number>>;                        // PhysicalItem getter
}

/* ---- mixed methods surface on items with Activities/Advancement templates too ---- */
{
  type WeaponSys = fvttUtils.FixedInstanceType<typeof import("#dnd5e/module/data/item/weapon.mjs").default>;
  type _hasAttack = Expect<Equal<WeaponSys["hasAttack"], boolean>>;     // ActivitiesTemplate getter
  type _isActive = Expect<Equal<WeaponSys["isActive"], boolean>>;       // ActivitiesTemplate getter

  type ClassSys = fvttUtils.FixedInstanceType<typeof import("#dnd5e/module/data/item/class.mjs").default>;
  type _preCreateAdv = Expect<Extends<ClassSys["preCreateAdvancement"], (...a: any[]) => Promise<void>>>; // AdvancementTemplate
}

/* ---- `.mixin()` STATICS surface too: the runtime copies static AND instance members ---- */
{
  type LootCtor = typeof LootData;
  // statics inherited from ItemDataModel
  type _meta = Expect<Extends<LootCtor["metadata"], { enchantable: boolean }>>;
  // statics copied from PhysicalItemTemplate (previously NOT surfaced)
  type _maxDepth = Expect<Equal<LootCtor["MAX_DEPTH"], number>>;
  type _physFilters = Expect<Extends<LootCtor["compendiumBrowserPhysicalItemFilters"], unknown>>;

  // and the registered constructor remains a valid DataModel constructor (drives Seam-C narrowing)
  type _validCtor = Expect<Extends<typeof LootData, foundry.abstract.DataModel.AnyConstructor>>;
}

/* ---- EXPANDABILITY: Seam-D OverrideSchema adds a field to loot downstream ---- */
declare global {
  namespace dnd5e.types.DataModelConfig.Item.loot {
    interface OverrideSchema {
      homebrewTag: foundry.data.fields.StringField<{ required: true; nullable: false }>;
    }
  }
}
{
  type Sys = fvttUtils.FixedInstanceType<typeof LootData>;
  type _homebrew = Expect<Equal<Sys["homebrewTag"], string>>;
}
