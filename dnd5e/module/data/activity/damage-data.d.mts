import FormulaField from "../fields/formula-field.mjs";
import DamageField from "../shared/damage-field.mjs";
import BaseActivityData from "./base-activity.mjs";

/**
 * Data model for an damage activity.
 */
export default class DamageActivityData extends BaseActivityData<
  'damage',
  dnd5e.types.MergeSchemas<
    {
      damage: foundry.data.fields.SchemaField<{
        critical: foundry.data.fields.SchemaField<{
          allow: foundry.data.fields.BooleanField,
          bonus: FormulaField
        }>,
        parts: foundry.data.fields.ArrayField<DamageField>
      }>
    },
    {}
  >
> {}
