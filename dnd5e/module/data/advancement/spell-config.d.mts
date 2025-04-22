import FormulaField from "../fields/formula-field.mjs";

export default class SpellConfigurationData extends foundry.abstract.DataModel<{
  ability: foundry.data.fields.SetField<foundry.data.fields.StringField>,
  preparation: foundry.data.fields.StringField,
  uses: foundry.data.fields.SchemaField<{
    max: FormulaField<{ deterministic: true }>,
    per: foundry.data.fields.StringField,
    requireSlot: foundry.data.fields.BooleanField
  }>
}> {
  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Apply changes to a spell item based on this spell configuration.
   */
  applySpellChanges(
    itemData: Item.OfType<'spell'>, 
    config?: {
      ability?: dnd5e.types.Ability.TypeKey
    }
  )

  /* -------------------------------------------- */

  /**
   * Changes that this spell configuration indicates should be performed on spells.
   * @deprecated since DnD5e 4.0, available until DnD5e 4.4
   */
  getSpellChanges(data?: object): object
}
