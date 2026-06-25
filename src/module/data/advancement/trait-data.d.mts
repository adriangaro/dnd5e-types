/**
 * Follows the canonical item-grant pattern (design D8): the `configuration` and `value` fields are
 * supplied explicitly to `BaseSchema<Type, ConfigField, ValueField>`. Both are EmbeddedDataFields
 * over local config/value DataModels (`TraitConfigurationData` / `TraitValueData` at runtime).
 */

import BaseAdvancementData from "./base-advancement.mjs";

declare global {
  namespace dnd5e.types.Advancement {
    namespace Trait {
      /** The `configuration` model schema. */
      type ConfigSchema = {
        /** Whether all potential choices should be presented to the user if there are no more choices available in a more limited set. */
        allowReplacements: foundry.data.fields.BooleanField<{ required: true }>;
        /** Choices presented to the user. */
        choices: foundry.data.fields.ArrayField<
          foundry.data.fields.SchemaField<{
            /** Number of traits that can be selected. */
            count: foundry.data.fields.NumberField<{
              required: true;
              positive: true;
              integer: true;
              initial: 1;
            }>;
            /** List of trait or category keys that can be chosen. If no choices are provided, any trait of the specified type can be selected. */
            pool: foundry.data.fields.SetField<foundry.data.fields.StringField>;
          }>
        >;
        /** Keys for traits granted automatically. */
        grants: foundry.data.fields.SetField<foundry.data.fields.StringField, { required: true }>;
        /** Method by which this advancement modifies the actor's traits. */
        mode: dnd5e.types.fields.RestrictedStringField<dnd5e.types.TraitMode.TypeKey, { required: true; blank: false; initial: "default" }>;
      };

      /** The `value` model schema (what was chosen). */
      type ValueSchema = {
        /** Trait keys that have been chosen. */
        chosen: foundry.data.fields.SetField<foundry.data.fields.StringField, { required: false }>;
      };

      type Schema = dnd5e.types.Advancement.BaseSchema<
        "Trait",
        foundry.data.fields.EmbeddedDataField<typeof BaseTraitConfigData>,
        foundry.data.fields.EmbeddedDataField<typeof BaseTraitValueData>
      >;
    }
  }
}

/** Embedded configuration DataModel. */
declare class BaseTraitConfigData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.Trait.ConfigSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.Trait.ConfigSchema;
}

/** Embedded value DataModel. */
declare class BaseTraitValueData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.Trait.ValueSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.Trait.ValueSchema;
}

declare class BaseTraitAdvancementData extends BaseAdvancementData<dnd5e.types.Advancement.Trait.Schema> {
  static override defineSchema(): dnd5e.types.Advancement.Trait.Schema;
}

export default BaseTraitAdvancementData;
export { BaseTraitConfigData, BaseTraitValueData };
