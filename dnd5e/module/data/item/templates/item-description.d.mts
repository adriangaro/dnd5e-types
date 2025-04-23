import SystemDataModel from "../../abstract.mjs";
import IdentifierField from "../../fields/identifier-field.mjs";
import SourceField from "../../shared/source-field.mjs";

/**
 * Data model template with item description & source.
 *
 * @mixin
 */
declare class ItemDescriptionTemplate<Type extends Item.ConfiguredSubTypes = Item.ConfiguredSubTypes> extends SystemDataModel<{
  description: foundry.data.fields.SchemaField<{
    value: foundry.data.fields.HTMLField<{required: true, nullable: true, label: "DND5E.Description"}>,
    chat: foundry.data.fields.HTMLField<{required: true, nullable: true, label: "DND5E.DescriptionChat"}>
  }>,
  identifier: IdentifierField<{ required: true, label: "DND5E.Identifier" }>,
  source: SourceField
}> {

  /* -------------------------------------------- */
  /*  Data Migrations                             */
  /* -------------------------------------------- */

  /**
   * Convert source string into custom object.
   */
  static #migrateSource(source: ItemDescriptionTemplate['_source'])

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare the source label.
   */
  prepareDescriptionData()

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * What properties can be used for this item?
   */
  get validProperties(): Set<dnd5e.types.ItemProperties.ValidPropertyMap[Type]>

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Create the properties filter configuration for a type.
   */
  static compendiumBrowserPropertiesFilter(type: string): dnd5e.types.CompendiumBrowserFilterDefinitionEntry
}


declare global {
  namespace dnd5e.types {
    namespace ItemProperties {

      namespace Consumable {
        // --- Base Definitions ---
        interface DefaultConsumableProperties {
          mgc: true; // Magical
        }

        /**
         * Override interface for declaration merging.
         * Add custom consumable properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Consumable {
         * interface OverrideTypes {
         * cursed: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> {}

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultConsumableProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Container {
         // --- Base Definitions ---
        interface DefaultContainerProperties {
          mgc: true; // Magical
          weightlessContents: true; // Contents do not count toward encumbrance
        }

        /**
         * Override interface for declaration merging.
         * Add custom container properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Container {
         * interface OverrideTypes {
         * extradimensional: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> {}

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultContainerProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Equipment {
        // --- Base Definitions ---
        interface DefaultEquipmentProperties {
          mgc: true;  // Magical
          ada: true;  // Adamantine
          foc: true;  // Spellcasting Focus
          stealthDisadvantage: true; // Confers disadvantage on Stealth checks
        }

        /**
         * Override interface for declaration merging.
         * Add custom equipment properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Equipment {
         * interface OverrideTypes {
         * requiresAttunement: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> {}

         // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultEquipmentProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Feat {
        // --- Base Definitions ---
        interface DefaultFeatProperties {
          mgc: true;   // Represents a supernatural or magical feat/trait
          trait: true; // Indicates it's a racial/class/monster trait rather than a chosen Feat
        }

        /**
         * Override interface for declaration merging.
         * Add custom feat properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Feat {
         * interface OverrideTypes {
         * combatManeuver: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> {}

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultFeatProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Loot {
        // --- Base Definitions ---
        interface DefaultLootProperties {
          mgc: true; // Magical (e.g., pile of magic dust)
        }

        /**
         * Override interface for declaration merging.
         * Add custom loot properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Loot {
         * interface OverrideTypes {
         * questItem: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> {}

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultLootProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Spell {
        // --- Base Definitions ---
        interface DefaultSpellProperties {
          vocal: true;         // V - Verbal component
          somatic: true;       // S - Somatic component
          material: true;      // M - Material component
          concentration: true; // C - Requires concentration
          ritual: true;        // R - Can be cast as a ritual
        }

        /**
         * Override interface for declaration merging.
         * Add custom spell properties here (e.g., focus required).
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Spell {
         * interface OverrideTypes {
         * requiresFocus: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> {}

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultSpellProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Tool {
         // --- Base Definitions ---
        interface DefaultToolProperties {
          mgc: true; // Magical tool
        }

        /**
         * Override interface for declaration merging.
         * Add custom tool properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Tool {
         * interface OverrideTypes {
         * requiresCalibration: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> {}

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultToolProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Weapon {
        // --- Base Definitions ---
        interface DefaultWeaponProperties {
          ada: true; // Adamantine weapon (overcomes resistance)
          amm: true; // Ammunition (requires ammunition)
          fin: true; // Finesse (can use Dex for attack/damage)
          fir: true; // Firearm (special firearm property, often misfire) - Consider renaming if confusing with fire damage
          foc: true; // Spellcasting Focus (can be used as one)
          hvy: true; // Heavy (Small creatures have disadvantage)
          lgt: true; // Light (suitable for two-weapon fighting)
          lod: true; // Loading (limits attacks per action/round)
          mgc: true; // Magical weapon (overcomes resistance)
          rch: true; // Reach (extends melee range)
          rel: true; // Reload (requires action/bonus action to reload) - Distinguish from Loading
          ret: true; // Returning (thrown weapon returns)
          sil: true; // Silvered weapon (overcomes resistance)
          spc: true; // Special (has unique rules described elsewhere)
          thr: true; // Thrown (can be thrown as a ranged attack)
          two: true; // Two-Handed (requires two hands to wield)
          ver: true; // Versatile (can be used with one or two hands for different damage)
        }

        /**
         * Override interface for declaration merging.
         * Add custom weapon properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Weapon {
         * interface OverrideTypes {
         * double: true // e.g., Double-bladed Scimitar
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> {}

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultWeaponProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      /**
       * Maps item subtypes to the union of their valid property keys.
       * This allows configuration or validation based on item type.
       */
      interface ValidPropertyMap extends Record<Item.ConfiguredSubTypes, string | never> {
        consumable: ItemProperties.Consumable.TypeKey;
        container: ItemProperties.Container.TypeKey;
        equipment: ItemProperties.Equipment.TypeKey; 
        feat: ItemProperties.Feat.TypeKey;
        loot: ItemProperties.Loot.TypeKey;
        spell: ItemProperties.Spell.TypeKey;
        tool: ItemProperties.Tool.TypeKey;
        weapon: ItemProperties.Weapon.TypeKey; 
        // Example: Class items might not have these kinds of properties,
        class: never;
        background: never,
        subclass: never,
        base: never,
        facility: never
      }

      type TypeKey = fvttUtils.UnionToIntersection<{
        [K in Item.ConfiguredSubTypes]: Record<
          K, 
          string extends fvttUtils.RemoveIndexSignatures<dnd5e.types.ItemProperties.ValidPropertyMap>[K] ? never : fvttUtils.RemoveIndexSignatures<dnd5e.types.ItemProperties.ValidPropertyMap>[K]
        >
      }[Item.ConfiguredSubTypes]>[Item.ConfiguredSubTypes]
    }

    interface DND5EConfig {
      validProperties: {
        [K in Item.ConfiguredSubTypes]: Set<fvttUtils.RemoveIndexSignatures<dnd5e.types.ItemProperties.ValidPropertyMap>[K]>
      }
      itemProperties:{
        [K in dnd5e.types.ItemProperties.TypeKey]: string
      }
    }
  }
}


export default ItemDescriptionTemplate;
