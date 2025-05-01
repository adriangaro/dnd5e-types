import { SparseDataModel } from "../abstract.mjs";
import MappingField from "../fields/mapping-field.mjs";

/**
 * Data model for the Ability Score Improvement advancement configuration.
 */
export class AbilityScoreImprovementConfigurationData extends foundry.abstract.DataModel<
  {
    cap: foundry.data.fields.NumberField<{ integer: true, min: 1, initial: 2 }>,
    fixed: MappingField<
      foundry.data.fields.NumberField<{ nullable: false, integer: true, initial: 0 }>
    >,
    locked: foundry.data.fields.SetField<foundry.data.fields.StringField>,
    points: foundry.data.fields.NumberField<{ integer: true, min: 0, initial: 0 }>
  },
  null
> { }

/**
 * Data model for the Ability Score Improvement advancement value.
 */
export class AbilityScoreImprovementValueData extends SparseDataModel<
  {
    type: foundry.data.fields.StringField<{ required: true, initial: "asi", choices: ["asi", "feat"] }, "asi" | "feat", "asi" | "feat", "asi" | "feat">,
    assignments: MappingField<
      foundry.data.fields.NumberField<{
        nullable: false, integer: true
      }>,
      dnd5e.types.Ability.TypeKey,
      { required: false, initial: undefined }
    >,
    feat: MappingField<
      foundry.data.fields.StringField, 
      string,
      { required: false, initial: undefined, label: "DND5E.Feature.Feat" }
    >
  },
  null
> {}
