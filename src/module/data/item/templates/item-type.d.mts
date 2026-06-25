/**
 * Data model template with item type, subtype and baseItem.
 * Contributes NO schema fields (items declare their own `type` via {@link dnd5e.types.fields.ItemTypeField});
 * it only carries the `itemCategories` helper + type migration. Modeled with an empty schema so it
 * folds cleanly through `ItemDataModel.mixin(...)`.
 */

import SystemDataModel from "../../abstract/system-data-model.mjs";

declare global {
  namespace dnd5e.types.Item.ItemType {
    interface Schema extends foundry.data.fields.DataSchema {}

    /** Instance members this template MIXES onto a model (composed onto items via a companion interface). */
    interface Methods {
      /** Item categories used to populate `system.type.value`. */
      get itemCategories(): Record<string, string>;
    }
  }
}

/**
 * Data model template with item type, subtype and baseItem.
 */
export declare class ItemTypeTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.ItemType.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends SystemDataModel<Schema, BaseData, DerivedData> {
  static override defineSchema(): dnd5e.types.Item.ItemType.Schema;

  /**
   * Item categories used to populate `system.type.value`.
   * @type {Record<string, string>}
   */
  static get itemCategories(): Record<string, string>;

  static override _migrateData(source: object): object;
}
export declare interface ItemTypeTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.ItemType.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends dnd5e.types.Item.ItemType.Methods {}

export default ItemTypeTemplate;
