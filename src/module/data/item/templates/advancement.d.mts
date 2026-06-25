/**
 * Data model template for items with advancement.
 *
 * Pure `SystemDataModel` template (parent = Item) for items that carry an advancement collection
 * (`system.advancement`). Folded into item models via `ItemDataModel.mixin(...)`; exposes its schema
 * as a global interface so it composes through `dnd5e.types.GetSchema<typeof AdvancementTemplate>`.
 */

import SystemDataModel from "../../abstract/system-data-model.mjs";

declare global {
  namespace dnd5e.types.Item.Advancement {
    interface Schema extends foundry.data.fields.DataSchema {
      advancement: dnd5e.types.fields.AdvancementCollectionField;
    }

    /** Instance methods this template MIXES onto a model (composed onto items via a companion interface). */
    interface Methods {
      /**
       * If no advancement data exists on the item, create some default advancement.
       * @param data     The initial data object provided to the document creation request.
       * @param options  Additional options which modify the creation request.
       */
      preCreateAdvancement(data: object, options: object): Promise<void>;

      /**
       * Create a list of advancement data to be created on new items of this type.
       * @param options  Additional options which modify the creation request.
       * @returns {object[]}
       * @protected
       */
      _advancementToCreate(options: object): object[];
    }
  }
}

export declare class AdvancementTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.Advancement.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends SystemDataModel<Schema, BaseData, DerivedData> {
  static override defineSchema(): dnd5e.types.Item.Advancement.Schema;

  /**
   * Migrate advancement data.
   * @param source Candidate source data to migrate.
   */
  static migrateAdvancement(source: object): void;
}
export declare interface AdvancementTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.Advancement.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends dnd5e.types.Item.Advancement.Methods {}

export default AdvancementTemplate;
