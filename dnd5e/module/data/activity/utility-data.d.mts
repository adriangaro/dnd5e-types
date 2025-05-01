import FormulaField from "../fields/formula-field.mjs";
import BaseActivityData from "./base-activity.mjs";

/**
 * Data model for an utility activity
 */
export default class UtilityActivityData extends BaseActivityData<
  'utility',
{
  roll: foundry.data.fields.SchemaField<{
    formula: FormulaField,
    name: foundry.data.fields.StringField,
    prompt: foundry.data.fields.BooleanField,
    visible: foundry.data.fields.BooleanField
  }>
}
> {}
