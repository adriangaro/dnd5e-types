import FormulaField from "../fields/formula-field.mjs";

export default class SpellConfigurationData extends foundry.abstract.DataModel<{
  ability: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey>>,
  preparation: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Spellcasting.PreparationModes.TypeKey>,
  uses: foundry.data.fields.SchemaField<{
    max: FormulaField<{ deterministic: true }>,
    per: foundry.data.fields.StringField,
    requireSlot: foundry.data.fields.BooleanField
  }>
}> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The item this advancement data belongs to.
   */
  get item(): Item.OfType<Item.SubType> | null


  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Apply changes to a spell item based on this spell configuration.
   * @param itemData          Data for the item to modify.
   * @param config            Configuration object.
   * @param config.ability    Spellcasting ability selected during advancement process.
   */
  applySpellChanges(
    itemData: Item.OfType<'spell'>, 
    config?: {
      ability?: dnd5e.types.Ability.TypeKey
    }
  )
}
