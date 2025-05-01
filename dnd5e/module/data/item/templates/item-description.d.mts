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
