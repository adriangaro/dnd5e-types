import SystemDataModel from "../../abstract.mjs";

/**
 * Data model template with item type, subtype and baseItem.
 *
 * @property {object} type                      Standardized item type object.
 * @property {string} type.value                Category to which this item belongs.
 * @property {string} type.subtype              Item subtype according to its category.
 * @property {string} type.baseItem             Item this one is based on.
 * @mixin
 */
declare class ItemTypeTemplate<Type extends Item.SubType = Item.SubType> extends SystemDataModel<{

}> {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Item categories used to populate `system.type.value`.
   */
  static get itemCategories(): Record<string, dnd5e.types.ItemTypes.ItemTypeConfig>

  get itemCategories(): dnd5e.types.ItemTypes.GetItemTypeMap<Type>

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */
  /**
   * Convert old types into the new standard.
   */
  static #migrateType(source: ItemTypeTemplate['_source'])
}

declare namespace ItemTypeTemplate {

}

declare global {
  namespace dnd5e.types {
    namespace ItemTypes {
      /**
       * Configuration data for an items that have sub-types.
       */
      interface ItemTypeConfig<Subtypes extends string | null = null> {
        /**
         * Localized label for this type.
         */
        label: string,
        /**
         * Enum containing localized labels for subtypes.
         */
        subtypes: ([Subtypes] extends [string] ? { [K in Subtypes]: string } : never)
      }
      
      type StrictItemTypeConfig<S extends string | null = null> =
        [S] extends [string]
        ? ItemTypeConfig<S>
        : Omit<ItemTypeConfig<null>, "subtypes">;


      interface ItemTypeMap extends Record<Item.SubType, Record<string, ItemTypeConfig<null> | ItemTypeConfig<any>>> {
      }

      type GetItemTypeKey<T extends Item.SubType> = keyof fvttUtils.RemoveIndexSignatures<ItemTypeMap>[T]

      type GetItemTypeMap<T extends Item.SubType> = fvttUtils.RemoveIndexSignatures<ItemTypeMap>[T]
      
      type InferSubTypes<T> = T extends ItemTypeConfig<infer Subtypes> ? Subtypes : never;
      type GetItemSubTypeKey<T extends Item.SubType, S extends GetItemTypeKey<T>> =  InferSubTypes<GetItemTypeMap<T>[S]>
    }
  }
}

export default ItemTypeTemplate;