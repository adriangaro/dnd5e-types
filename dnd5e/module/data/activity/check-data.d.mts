import { simplifyBonus } from "../../utils.mjs";
import FormulaField from "../fields/formula-field.mjs";
import BaseActivityData from "./base-activity.mjs";


/**
 * Data model for a check activity.
 */
export default class CheckActivityData extends BaseActivityData<
  'check',
  dnd5e.types.MergeSchemas<
    {
      check: foundry.data.fields.SchemaField<{
        ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | 'spellcasting'>,
        associated: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.Skill.TypeKey | dnd5e.types.Tool.TypeKey>
        >,
        dc: foundry.data.fields.SchemaField<{
          calculation: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey>,
          formula: FormulaField<{ deterministic: true }>
        }>
      }>
    },
    {
      check: foundry.data.fields.SchemaField<
        {},
        foundry.data.fields.SchemaField.DefaultOptions,
        {},
        {
          value: number
        }
      >
    }
  >

> {

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Get the ability to use with an associated value.
   */
  getAbility(associated: dnd5e.types.Skill.TypeKey | dnd5e.types.Tool.TypeKey): dnd5e.types.Ability.TypeKey | null
}
