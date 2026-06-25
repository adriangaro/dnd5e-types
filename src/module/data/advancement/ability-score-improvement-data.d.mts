/**
 * Follows the canonical item-grant pattern (design D8): the `configuration` and `value` fields are
 * supplied explicitly to `BaseSchema<Type, ConfigField, ValueField>` (resolved at runtime from
 * `metadata.dataModels`). Both are `EmbeddedDataField`s over local DataModels — the config model and
 * the (sparse) value model.
 */

import BaseAdvancementData from "./base-advancement.mjs";

declare global {
  namespace dnd5e.types.Advancement {
    namespace AbilityScoreImprovement {
      /** The `configuration` model schema. */
      type ConfigSchema = {
        /** Maximum number of points that can be assigned to a single score. */
        cap: foundry.data.fields.NumberField<{ integer: true; min: 1; initial: 2 }>;
        /** Number of points automatically assigned to a certain score. */
        fixed: dnd5e.types.fields.MappingField<
          foundry.data.fields.NumberField<{ nullable: false; integer: true; initial: 0 }>,
          dnd5e.types.Ability.TypeKey
        >;
        /** Abilities that cannot be changed by this advancement. */
        locked: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey, { required: true; blank: false }>
        >;
        /** Override for the maximum ability score. */
        max: foundry.data.fields.NumberField<{ integer: true; min: 1 }>;
        /** Number of points that can be assigned to any score. */
        points: foundry.data.fields.NumberField<{ integer: true; min: 0; initial: 0 }>;
        /** Epic Boon feat recommended by this class. */
        recommendation: foundry.data.fields.DocumentUUIDField<{ type: "Item" }>;
      };

      /** The `value` model schema (sparse — what was chosen). */
      type ValueSchema = {
        /** When on a class, whether the player chose ASI or a Feat. */
        type: foundry.data.fields.StringField<{ choices: ["asi", "feat"] }>;
        /** Points assigned to individual scores. */
        assignments: dnd5e.types.fields.MappingField<
          foundry.data.fields.NumberField<{ nullable: false; integer: true }>,
          dnd5e.types.Ability.TypeKey,
          { required: false; initial: undefined }
        >;
        /** Feat that was selected. */
        feat: dnd5e.types.fields.MappingField<
          foundry.data.fields.StringField,
          string,
          { required: false; initial: undefined; label: "DND5E.Feature.Feat" }
        >;
      };

      type Schema = dnd5e.types.Advancement.BaseSchema<
        "AbilityScoreImprovement",
        foundry.data.fields.EmbeddedDataField<typeof BaseAbilityScoreImprovementConfigData>,
        foundry.data.fields.EmbeddedDataField<typeof BaseAbilityScoreImprovementValueData>
      >;
    }
  }
}

/** Data model for the Ability Score Improvement advancement configuration. */
declare class BaseAbilityScoreImprovementConfigData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.AbilityScoreImprovement.ConfigSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.AbilityScoreImprovement.ConfigSchema;
}

/** Data model for the Ability Score Improvement advancement value. */
declare class BaseAbilityScoreImprovementValueData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.AbilityScoreImprovement.ValueSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.AbilityScoreImprovement.ValueSchema;
}

declare class BaseAbilityScoreImprovementAdvancementData extends BaseAdvancementData<
  dnd5e.types.Advancement.AbilityScoreImprovement.Schema
> {
  static override defineSchema(): dnd5e.types.Advancement.AbilityScoreImprovement.Schema;
}

export default BaseAbilityScoreImprovementAdvancementData;
export { BaseAbilityScoreImprovementConfigData, BaseAbilityScoreImprovementValueData };
