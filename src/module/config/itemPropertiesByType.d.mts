/**
 * Per-item-type property domains. The flat `ItemProperty` (config/itemProperties.d.mts) remains the
 * GLOBAL registry of every property key (drives `CONFIG.DND5E.itemProperties`); these are the
 * per-type SUBSETS that actually apply to each item type's `system.properties` set — each an
 * independent Seam-A domain you widen on its own:
 *
 *   declare global { namespace dnd5e.types.ItemProperty.Weapon {
 *     interface OverrideTypes { double: true }   // a new weapon-only property
 *   } }
 *
 * Item models type `properties` as `SetField<RestrictedStringField<ItemProperty.<Type>.TypeKey>>`.
 * `ItemProperty.ValidPropertyMap` maps each item subtype → its property key union (expandable, for
 * lookups). No coupling beyond that — just strict, per-type-expandable property keys.
 */

declare global {
  namespace dnd5e.types {
    namespace ItemProperty {
      namespace Class {
        interface DefaultTypes {
          sidekick: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Weapon {
        interface DefaultTypes {
          ada: true;
          amm: true;
          fin: true;
          fir: true;
          foc: true;
          hvy: true;
          lgt: true;
          lod: true;
          mgc: true;
          rch: true;
          rel: true;
          ret: true;
          sil: true;
          spc: true;
          thr: true;
          two: true;
          ver: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Equipment {
        interface DefaultTypes {
          mgc: true;
          ada: true;
          foc: true;
          stealthDisadvantage: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Consumable {
        interface DefaultTypes {
          mgc: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Tool {
        interface DefaultTypes {
          foc: true;
          mgc: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Feat {
        interface DefaultTypes {
          mgc: true;
          trait: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Loot {
        interface DefaultTypes {
          mgc: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Container {
        interface DefaultTypes {
          mgc: true;
          weightlessContents: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Spell {
        interface DefaultTypes {
          vocal: true;
          somatic: true;
          material: true;
          concentration: true;
          ritual: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      /** Item subtype → its valid property key union. Expandable: a module adds its item type here. */
      interface ValidPropertyMap {
        class: dnd5e.types.ItemProperty.Class.TypeKey;
        weapon: dnd5e.types.ItemProperty.Weapon.TypeKey;
        equipment: dnd5e.types.ItemProperty.Equipment.TypeKey;
        consumable: dnd5e.types.ItemProperty.Consumable.TypeKey;
        tool: dnd5e.types.ItemProperty.Tool.TypeKey;
        feat: dnd5e.types.ItemProperty.Feat.TypeKey;
        loot: dnd5e.types.ItemProperty.Loot.TypeKey;
        container: dnd5e.types.ItemProperty.Container.TypeKey;
        spell: dnd5e.types.ItemProperty.Spell.TypeKey;
      }
    }
  }
}

export {};
