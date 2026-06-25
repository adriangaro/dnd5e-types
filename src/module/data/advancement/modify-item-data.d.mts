/**
 * Follows the item-grant template: `configuration` and `value` are supplied explicitly to
 * `BaseSchema<Type, ConfigField, ValueField>`. Both are plain embedded DataModels resolved at runtime
 * from `metadata.dataModels`. The configuration tracks enchantment `changes`; the value tracks which
 * items were `modified`.
 */

import BaseAdvancementData from "./base-advancement.mjs";

declare global {
  namespace dnd5e.types.Advancement {
    namespace ModifyItem {
      /** The `configuration` model schema. */
      type ConfigSchema = {
        /** List of enchantments to apply and their valid items. */
        changes: foundry.data.fields.ArrayField<
          foundry.data.fields.SchemaField<{
            /** ID of the change, matches local enchantment ID if UUID isn't specified. */
            _id: foundry.data.fields.DocumentIdField;
            /** UUID of a remote effect to apply. */
            uuid: foundry.data.fields.DocumentUUIDField;
            /** One or more identifiers used to find matching items. */
            identifiers: foundry.data.fields.SetField<dnd5e.types.fields.IdentifierField>;
          }>
        >;
      };

      /** The `value` model schema (what was modified). */
      type ValueSchema = {
        /** List of items that were modified by the advancement. */
        modified: foundry.data.fields.ArrayField<
          foundry.data.fields.SchemaField<{
            /** ID of the change that was applied (referencing entry in `configuration.changes`). */
            change: foundry.data.fields.DocumentIdField;
            /** ID of the enchantment that was created on the item. */
            effect: foundry.data.fields.DocumentIdField;
            /** ID of the item that was modified. */
            item: foundry.data.fields.DocumentIdField;
          }>
        >;
      };

      type Schema = dnd5e.types.Advancement.BaseSchema<
        "ModifyItem",
        foundry.data.fields.EmbeddedDataField<typeof BaseModifyItemConfigData>,
        foundry.data.fields.EmbeddedDataField<typeof BaseModifyItemValueData>
      >;
    }
  }
}

/** Configuration data for the Modify Item advancement. */
declare class BaseModifyItemConfigData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.ModifyItem.ConfigSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.ModifyItem.ConfigSchema;
}

/** Value data for the Modify Item advancement. */
declare class BaseModifyItemValueData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.ModifyItem.ValueSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.ModifyItem.ValueSchema;
}

declare class BaseModifyItemAdvancementData extends BaseAdvancementData<dnd5e.types.Advancement.ModifyItem.Schema> {
  static override defineSchema(): dnd5e.types.Advancement.ModifyItem.Schema;
}

export default BaseModifyItemAdvancementData;
export { BaseModifyItemConfigData, BaseModifyItemValueData };
