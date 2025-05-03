import SystemDataModel from "../../abstract.mjs";

/**
 * Data model template with information on items that can be attuned and equipped.
 *
 * @mixin
 */
declare class EquippableItemTemplate extends SystemDataModel<{
  attunement: foundry.data.fields.StringField<{required: true, label: "DND5E.Attunement"}>,
  attuned: foundry.data.fields.BooleanField<{label: "DND5E.Attuned"}>,
  equipped: foundry.data.fields.BooleanField<{required: true, label: "DND5E.Equipped"}>
}> {
  /* -------------------------------------------- */

  /**
   * Create attunement filter configuration.
   */
  static get compendiumBrowserAttunementFilter(): dnd5e.types.CompendiumBrowserFilterDefinitionEntry

  /* -------------------------------------------- */
  /*  Data Migrations                             */
  /* -------------------------------------------- */

  /**
   * Migrate the item's attuned boolean to attunement string.
   */
  static #migrateAttunement(source: EquippableItemTemplate['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate the equipped field.
   */
  static #migrateEquipped(source: EquippableItemTemplate['_source'])

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Ensure items that cannot be attuned are not marked as attuned.
   */
  prepareFinalEquippableData()

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Chat properties for equippable items.
   */
  get equippableItemCardProperties(): string[]

  /* -------------------------------------------- */

  /**
   * Are the magical properties of this item, such as magical bonuses to armor & damage, available?
   */
  get magicAvailable(): boolean 

  /* -------------------------------------------- */
  /*  Socket Event Handlers                       */
  /* -------------------------------------------- */

  /**
   * Set as equipped for NPCs, and unequipped for PCs.
   */
  preCreateEquipped(data: object, options: object, user: User.Implementation)
}

declare namespace EquippableItemTemplate {
  
}

export default EquippableItemTemplate 

declare global {
  namespace dnd5e.types {
    namespace Attunement {
      // --- Base Definitions ---
      interface DefaultAttunementTypes {
        required: string,
        optional: string
      }

      /**
       * Override interface for declaration merging.
       * Add custom condition types here.
       * @example
       * declare global {
       * namespace dnd5e.types.Conditions {
       * interface OverrideTypes {
       * 'dazed': true
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultAttunementTypes,
        OverrideTypes
      >;

      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }  

    interface DND5EConfig {
      /**
       * An enumeration of item attunement types.
       */
      attunementTypes: {
        [K in Attunement.TypeKey]: string
      }
      /**
       * An enumeration of item attunement states.
       * @deprecated since 3.2, available until 3.4
       */
      attunements: {
        0: string,
        1: string,
        2: string
      }
    }
  }
}
