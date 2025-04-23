import { simplifyBonus } from "../../utils.mjs";
import FormulaField from "../fields/formula-field.mjs";
import DamageField from "../shared/damage-field.mjs";
import BaseActivityData from "./base-activity.mjs";
import AppliedEffectField from "./fields/applied-effect-field.mjs";

/**
 * Data model for an save activity.
 */
declare class SaveActivityData extends BaseActivityData<
  dnd5e.types.MergeSchemas<
    {
      damage: foundry.data.fields.SchemaField<{
        onSave: foundry.data.fields.StringField,
        parts: foundry.data.fields.ArrayField<DamageField>
      }>,
      effects: foundry.data.fields.ArrayField<AppliedEffectField<{
        onSave: foundry.data.fields.BooleanField
      }>>,
      save: foundry.data.fields.SchemaField<{
        ability: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey>
        >,
        dc: foundry.data.fields.SchemaField<{
          calculation: foundry.data.fields.StringField<{ initial: "initial" }>,
          formula: FormulaField<{ deterministic: true }>
        }>
      }>
    },
    {
      save: foundry.data.fields.SchemaField<
        {},
        foundry.data.fields.SchemaField.DefaultOptions,
        {},
        {
          bonus: string,
          value: number
        }
      >
    }
  >
> {}

export default SaveActivityData