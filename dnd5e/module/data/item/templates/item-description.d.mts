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

      /**
       * Maps item subtypes to the union of their valid property keys.
       * This allows configuration or validation based on item type.
       */
      interface ValidPropertyMap extends Record<Item.ConfiguredSubTypes, string | never> {
        
      }

      type TypeKey = fvttUtils.UnionToIntersection<{
        [K in Item.ConfiguredSubTypes]: Record<
          K, 
          string extends fvttUtils.RemoveIndexSignatures<dnd5e.types.ItemProperties.ValidPropertyMap>[K] ? never : fvttUtils.RemoveIndexSignatures<dnd5e.types.ItemProperties.ValidPropertyMap>[K]
        >
      }[Item.ConfiguredSubTypes]>[Item.ConfiguredSubTypes]

      interface ItemPropertyConfig {
        /**
         *  Localized label.
         */
        label: string
        /**
         * Localized abbreviation.
         */
        abbreviation?: string
        /**
         * Icon that can be used in certain places to represent this property.
         */
        icon?: string
        /**
         * Reference to a rule page describing this property.
         */
        reference?: string
        /**
         * Is this property one that can cause damage resistance bypasses?
         */
        isPhysical?: boolean
        /**
         * Is this spell property a tag, rather than a component?
         */
        isTag?: boolean
      }
    }

    interface DND5EConfig {
      /**
       * The various properties of an item per item type.
       */
      validProperties: dnd5e.types.FilterNever<{
        [K in Item.ConfiguredSubTypes]: fvttUtils.RemoveIndexSignatures<dnd5e.types.ItemProperties.ValidPropertyMap>[K] extends never ?
          never :
          Set<fvttUtils.RemoveIndexSignatures<dnd5e.types.ItemProperties.ValidPropertyMap>[K]>
      }>
      /**
       * The various properties of all item types.
       */
      itemProperties: {
        [K in dnd5e.types.ItemProperties.TypeKey]: ItemProperties.ItemPropertyConfig
      }
    }
  }
}


export default ItemDescriptionTemplate;
