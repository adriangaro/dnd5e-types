/**
 * Data model for a summon activity.
 *
 * Adds summon-specific fields (`bonuses`, `creatureSizes`, `creatureTypes`, `flat`, `match`,
 * `profiles`, `summon`, `tempHP`). No prepareData/prepareFinalData mutates persisted system values,
 * so no DerivedData overlay (the `actionType`/`ability`/`availableProfiles`/`summonedCreatures`
 * accessors are runtime getters, not schema-derived fields).
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Summon {
    type Schema = dnd5e.types.MergeSchemas<
      dnd5e.types.Activity.BaseSchema,
      {
        type: foundry.data.fields.StringField<
          { required: true; blank: false; readOnly: true },
          "summon",
          "summon",
          "summon"
        >;
        bonuses: foundry.data.fields.SchemaField<{
          ac: dnd5e.types.fields.FormulaField;
          hd: dnd5e.types.fields.FormulaField;
          hp: dnd5e.types.fields.FormulaField;
          attackDamage: dnd5e.types.fields.FormulaField;
          saveDamage: dnd5e.types.fields.FormulaField;
          healing: dnd5e.types.fields.FormulaField;
        }>;
        creatureSizes: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey, { required: true; blank: false }>
        >;
        creatureTypes: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.Creature.TypeKey, { required: true; blank: false }>
        >;
        flat: foundry.data.fields.SchemaField<{
          attack: foundry.data.fields.NumberField<{ nullable: true; initial: null }>;
          save: foundry.data.fields.NumberField<{ nullable: true; initial: null }>;
        }>;
        match: foundry.data.fields.SchemaField<{
          ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { required: true; blank: true }>;
          attacks: foundry.data.fields.BooleanField;
          disposition: foundry.data.fields.BooleanField;
          proficiency: foundry.data.fields.BooleanField;
          saves: foundry.data.fields.BooleanField;
        }>;
        profiles: foundry.data.fields.ArrayField<
          foundry.data.fields.SchemaField<{
            _id: foundry.data.fields.DocumentIdField<{ initial: () => string }>;
            count: dnd5e.types.fields.FormulaField;
            cr: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
            level: foundry.data.fields.SchemaField<{
              min: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
              max: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
            }>;
            name: foundry.data.fields.StringField;
            types: foundry.data.fields.SetField<
              dnd5e.types.fields.RestrictedStringField<dnd5e.types.Creature.TypeKey, { required: true; blank: false }>
            >;
            uuid: foundry.data.fields.DocumentUUIDField;
          }>
        >;
        summon: foundry.data.fields.SchemaField<{
          mode: dnd5e.types.fields.RestrictedStringField<"" | "cr", { required: true; blank: true }>;
          prompt: foundry.data.fields.BooleanField<{ initial: true }>;
        }>;
        tempHP: dnd5e.types.fields.FormulaField;
      }
    >;
  }
}

declare class BaseSummonActivityData extends BaseActivityData<dnd5e.types.Activity.Summon.Schema> {
  static override defineSchema(): dnd5e.types.Activity.Summon.Schema;

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** @inheritDoc */
  get ability(): dnd5e.types.Ability.TypeKey | null;

  /* -------------------------------------------- */

  /** @override */
  get actionType(): "summ";

  /* -------------------------------------------- */

  /**
   * Summons that can be performed based on spell/character/class level.
   */
  get availableProfiles(): dnd5e.types.data.activity.SummonsProfile[];

  /* -------------------------------------------- */

  /**
   * Creatures summoned by this activity.
   */
  get summonedCreatures(): globalThis.Actor.Implementation[];
}

export default BaseSummonActivityData;
