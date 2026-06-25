/**
 * Data field for class & subclass spellcasting information.
 *
 * A `SchemaField` describing a class/subclass's spellcasting block. Its base fields are
 * `progression` (a blank-disallowed StringField, initial `"none"`), `ability` (StringField) and
 * `preparation` (a SchemaField wrapping a `FormulaField`). The runtime constructor merges any
 * caller-supplied `fields` on top of these and drops falsy entries; model that by passing a
 * narrowed/extended `Fields` set as the type argument.
 */

import ItemDataModel from "../../abstract/item-data-model.mjs";

declare global {
  namespace dnd5e.types.fields {
    namespace SpellcastingField {
      /** The field block always present on a `SpellcastingField` (`defineSchema` base). */
      interface BaseSchema extends foundry.data.fields.DataSchema {
        progression: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Spellcasting.Progression.TypeKey, { required: true; initial: "none"; blank: false }>;
        ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { required: false; blank: true }>;
        preparation: foundry.data.fields.SchemaField<{
          formula: dnd5e.types.fields.FormulaField;
        }>;
      }
    }

    type SpellcastingField<Fields extends foundry.data.fields.DataSchema = {}> =
      foundry.data.fields.SchemaField<
        dnd5e.types.MergeSchemas<dnd5e.types.fields.SpellcastingField.BaseSchema, Fields>
      >;
  }
}

/**
 * Data field for class & subclass spellcasting information.
 *
 * Module-scoped value class so `SpellcastingField` is usable as a value/constructor (mirrors the type alias).
 */
declare class SpellcastingField<Fields extends foundry.data.fields.DataSchema = {}>
  extends foundry.data.fields.SchemaField<
    dnd5e.types.MergeSchemas<dnd5e.types.fields.SpellcastingField.BaseSchema, Fields>
  > {
  /**
   * Prepare data for this field. Should be called during the `prepareFinalData` stage.
   * @param rollData  Roll data used for formula replacements.
   */
  static prepareData(this: ItemDataModel.Any, rollData: dnd5e.types.documents.ItemRollData): void;
}

export { SpellcastingField };
export default SpellcastingField;
