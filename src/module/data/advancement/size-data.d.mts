/**
 * Follows the canonical item-grant pattern (design D8): the `configuration` and `value` fields are
 * supplied explicitly to `BaseSchema<Type, ConfigField, ValueField>`. Here both `configuration`
 * (sizes) and `value` (chosen size) are EmbeddedDataFields over local config/value DataModels.
 */

import BaseAdvancementData from "./base-advancement.mjs";

declare global {
  namespace dnd5e.types.Advancement {
    namespace Size {
      /** The `configuration` model schema (selectable sizes). */
      type ConfigSchema = {
        /** Sizes that can be selected. */
        sizes: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey, { required: false; blank: true }>,
          { required: false; initial: ["med"] }
        >;
      };

      /** The `value` model schema (the chosen size). */
      type ValueSchema = {
        /** Selected size. */
        size: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey | "", { required: false; blank: true }>;
      };

      type Schema = dnd5e.types.Advancement.BaseSchema<
        "Size",
        foundry.data.fields.EmbeddedDataField<typeof BaseSizeConfigData>,
        foundry.data.fields.EmbeddedDataField<typeof BaseSizeValueData>
      >;
    }
  }
}

/** Configuration data for the size advancement type. */
declare class BaseSizeConfigData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.Size.ConfigSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.Size.ConfigSchema;
}

/** Value data for the size advancement type. */
declare class BaseSizeValueData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.Size.ValueSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.Size.ValueSchema;
}

declare class BaseSizeAdvancementData extends BaseAdvancementData<dnd5e.types.Advancement.Size.Schema> {
  static override defineSchema(): dnd5e.types.Advancement.Size.Schema;
}

export default BaseSizeAdvancementData;
export { BaseSizeConfigData, BaseSizeValueData };
