/**
 * Data model template with item description & source.
 *
 * CANONICAL EXAMPLE (item template): a pure `SystemDataModel` template (parent = Item) that other
 * item models fold in via `ItemDataModel.mixin(...)`. Exposes its schema as a global interface so it
 * composes through `dnd5e.types.GetSchema<typeof ItemDescriptionTemplate>` at the mixin site.
 */

import SystemDataModel from "../../abstract/system-data-model.mjs";

declare global {
  namespace dnd5e.types.Item.ItemDescription {
    interface Schema extends foundry.data.fields.DataSchema {
      description: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.HTMLField<{ required: true; nullable: true }>;
        chat: foundry.data.fields.HTMLField<{ required: true; nullable: true }>;
      }>;
      identifier: dnd5e.types.fields.IdentifierField<{ required: true }>;
      source: dnd5e.types.fields.SourceField;
    }

    /** Instance methods/getters this template MIXES onto a model (no schema/base members → safe to
     *  compose onto an item via a companion `interface` without `DataModel`-base collisions). */
    interface Methods {
      /** What properties can be used for this item? */
      get validProperties(): Set<string>;
      /** Prepare the source label. */
      prepareDescriptionData(): void;
    }
  }
}

export declare class ItemDescriptionTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.ItemDescription.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends SystemDataModel<Schema, BaseData, DerivedData> {
  static override defineSchema(): dnd5e.types.Item.ItemDescription.Schema;
  static override _migrateData(source: object): object;
  /**
   * Create the properties filter configuration for a type.
   * @param type - Item type.
   * @returns The compendium browser filter definition entry for item properties.
   */
  static compendiumBrowserPropertiesFilter(type: string): dnd5e.types.applications.CompendiumBrowserFilterDefinitionEntry;
}
export declare interface ItemDescriptionTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.ItemDescription.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends dnd5e.types.Item.ItemDescription.Methods {}

export default ItemDescriptionTemplate;
