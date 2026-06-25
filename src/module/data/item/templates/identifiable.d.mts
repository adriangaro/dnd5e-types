/**
 * Data model template for items that can be identified.
 *
 * Pure `SystemDataModel` template (parent = Item) for items that can be identified. Other item
 * models fold it in via `ItemDataModel.mixin(...)`. Exposes its schema as a global interface so it
 * composes through `dnd5e.types.GetSchema<typeof IdentifiableTemplate>` at the mixin site.
 */

import SystemDataModel from "../../abstract/system-data-model.mjs";

declare global {
  namespace dnd5e.types.Item.Identifiable {
    interface Schema extends foundry.data.fields.DataSchema {
      identified: foundry.data.fields.BooleanField<{ required: true; initial: true }>;
      unidentified: foundry.data.fields.SchemaField<{
        name: foundry.data.fields.StringField;
        description: foundry.data.fields.HTMLField;
      }>;
    }

    interface Methods {
      /**
       * Prepare the unidentified name for the item.
       */
      prepareIdentifiable(): void;

      /**
       * If no unidentified name or description are set when the identified checkbox is unchecked, then fetch values
       * from base item if possible.
       * @param changed  The differential data that is changed relative to the document's prior values.
       * @param options  Additional options which modify the update request
       * @param user     The User requesting the document update
       * @returns A return value of false indicates the update operation should be cancelled.
       * @see Document#_preUpdate
       * @protected
       */
      preUpdateIdentifiable(changed: object, options: object, user: foundry.documents.BaseUser): Promise<boolean | void>;
    }
  }
}

export declare class IdentifiableTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.Identifiable.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends SystemDataModel<Schema, BaseData, DerivedData> {
  static override defineSchema(): dnd5e.types.Item.Identifiable.Schema;
  static override _migrateData(source: fvttUtils.AnyObject): void;
}
export declare interface IdentifiableTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.Identifiable.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends dnd5e.types.Item.Identifiable.Methods {}

export default IdentifiableTemplate;
