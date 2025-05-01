import FormulaField from "../fields/formula-field.mjs";
import IdentifierField from "../fields/identifier-field.mjs";
import BaseActivityData from "./base-activity.mjs";


/**
 * Data model for a summon activity.
 */
export default class SummonActivityData extends BaseActivityData<
  'summon',
  dnd5e.types.MergeSchemas<
    {
      bonuses: foundry.data.fields.SchemaField<{
        ac: FormulaField,
        hd: FormulaField,
        hp: FormulaField,
        attackDamage: FormulaField,
        saveDamage: FormulaField,
        healing: FormulaField
      }>,
      creatureSizes: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey>>,
      creatureTypes: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<dnd5e.types.Creature.TypeKey>>,
      match: foundry.data.fields.SchemaField<{
        ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey>,
        attacks: foundry.data.fields.BooleanField,
        proficiency: foundry.data.fields.BooleanField,
        saves: foundry.data.fields.BooleanField
      }>,
      profiles: foundry.data.fields.ArrayField<foundry.data.fields.SchemaField<{
        _id: foundry.data.fields.DocumentIdField<{ initial: () => string }>,
        count: FormulaField,
        cr: FormulaField<{ deterministic: true }>,
        level: foundry.data.fields.SchemaField<{
          min: foundry.data.fields.NumberField<{ integer: true, min: 0 }>,
          max: foundry.data.fields.NumberField<{ integer: true, min: 0 }>
        }>,
        name: foundry.data.fields.StringField,
        types: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<dnd5e.types.Creature.TypeKey>>,
        uuid: foundry.data.fields.StringField
      }>>,
      summon: foundry.data.fields.SchemaField<{
        identifier: IdentifierField,
        mode: dnd5e.types.fields.RestrictedStringField<"cr" | "">,
        prompt: foundry.data.fields.BooleanField<{ initial: true }>
      }>

    },
    {}
  >
> {
  /* -------------------------------------------- */

  /** @override */
  get actionType(): 'summ'

  /* -------------------------------------------- */

  /** @override */
  get applicableEffects(): null

  /* -------------------------------------------- */

  /**
   * Summons that can be performed based on spell/character/class level.
   */
  get availableProfiles(): this['profiles']

  /* -------------------------------------------- */

  /**
   * Determine the level used to determine profile limits, based on the spell level for spells or either the
   * character or class level, depending on whether `classIdentifier` is set.
   */
  get relevantLevel(): number

  /* -------------------------------------------- */

  /**
   * Creatures summoned by this activity.
   */
  get summonedCreatures(): Actor.Implementation[]
}
