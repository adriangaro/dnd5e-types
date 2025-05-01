import FormulaField from "../../fields/formula-field.mjs";
import IdentifierField from "../../fields/identifier-field.mjs";

type SummonsDataSchema = {
  bonuses: foundry.data.fields.SchemaField<{
    ac: FormulaField<{
      label: "DND5E.Summoning.Bonuses.ArmorClass.Label", hint: "DND5E.Summoning.Bonuses.ArmorClass.hint"
    }>,
    hd: FormulaField<{
      label: "DND5E.Summoning.Bonuses.HitDice.Label", hint: "DND5E.Summoning.Bonuses.HitDice.hint"
    }>,
    hp: FormulaField<{
      label: "DND5E.Summoning.Bonuses.HitPoints.Label", hint: "DND5E.Summoning.Bonuses.HitPoints.hint"
    }>,
    attackDamage: FormulaField<{
      label: "DND5E.Summoning.Bonuses.Attack.Label", hint: "DND5E.Summoning.Bonuses.Attack.Hint"
    }>,
    saveDamage: FormulaField<{
      label: "DND5E.Summoning.Bonuses.Saves.Label", hint: "DND5E.Summoning.Bonuses.Saves.Hint"
    }>,
    healing: FormulaField<{
      label: "DND5E.Summoning.Bonuses.Healing.Label", hint: "DND5E.Summoning.Bonuses.Healing.Hint"
    }>
  }>,
  classIdentifier: IdentifierField,
  creatureSizes: foundry.data.fields.SetField<
    foundry.data.fields.StringField<
      foundry.data.fields.StringField.DefaultOptions,
      dnd5e.types.ActorSize.TypeKey, dnd5e.types.ActorSize.TypeKey, dnd5e.types.ActorSize.TypeKey
    >,
    {
      label: "DND5E.Summoning.CreatureSizes.Label", hint: "DND5E.Summoning.CreatureSizes.Hint"
    }
  >,
  creatureTypes: foundry.data.fields.SetField<
    foundry.data.fields.StringField<
      foundry.data.fields.StringField.DefaultOptions,
      dnd5e.types.Creature.TypeKey, dnd5e.types.Creature.TypeKey, dnd5e.types.Creature.TypeKey
    >,
    {
      label: "DND5E.Summoning.CreatureTypes.Label", hint: "DND5E.Summoning.CreatureTypes.Hint"
    }
  >,
  match: foundry.data.fields.SchemaField<{
    attacks: foundry.data.fields.BooleanField<{
      label: "DND5E.Summoning.Match.Attacks.Label", hint: "DND5E.Summoning.Match.Attacks.Hint"
    }>,
    proficiency: foundry.data.fields.BooleanField<{
      label: "DND5E.Summoning.Match.Proficiency.Label", hint: "DND5E.Summoning.Match.Proficiency.Hint"
    }>,
    saves: foundry.data.fields.BooleanField<{
      label: "DND5E.Summoning.Match.Saves.Label", hint: "DND5E.Summoning.Match.Saves.Hint"
    }>
  }>,
  mode: foundry.data.fields.StringField<{ label: "DND5E.Summoning.Mode.Label", hint: "DND5E.Summoning.Mode.Hint" }>,
  profiles: foundry.data.fields.ArrayField<
    foundry.data.fields.SchemaField<{
      _id: foundry.data.fields.DocumentIdField<{ initial: () => string }>,
      count: FormulaField,
      cr: FormulaField<{ deterministic: true }>,
      level: foundry.data.fields.SchemaField<{
        min: foundry.data.fields.NumberField<{ integer: true, min: 0 }>,
        max: foundry.data.fields.NumberField<{ integer: true, min: 0 }>
      }>,
      name: foundry.data.fields.StringField,
      types: foundry.data.fields.SetField<foundry.data.fields.StringField>,
      uuid: foundry.data.fields.StringField
    }>
  >,
  prompt: foundry.data.fields.BooleanField<{
    initial: true, label: "DND5E.Summoning.Prompt.Label", hint: "DND5E.Summoning.Prompt.Hint"
  }>
}

/**
 * A field for storing Summons data.
 */
declare class SummonsField<
  Options extends SummonsField.Options = SummonsField.DefaultOptions,
  AssignmentType = SummonsField.AssignmentType<Options>,
  InitializedType = SummonsField.InitializedType<Options>,
  PersistedType extends fvttUtils.AnyObject | null | undefined = SummonsField.PersistedType<Options>,
> extends foundry.data.fields.EmbeddedDataField<
  typeof SummonsData,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> { }

declare namespace SummonsField {
  type Options = foundry.data.fields.EmbeddedDataField.Options<typeof SummonsData>;
  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.EmbeddedDataField.DefaultOptions,
    {
      required: false, 
      nullable: true, 
      initial: null
    }
  >;
  type AssignmentType<
    Opts extends Options,
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    foundry.data.fields.SchemaField.AssignmentData<SummonsDataSchema>,
    fvttUtils.SimpleMerge<
      DefaultOptions,
      Opts
    >
  >;
  type InitializedType<
    Opts extends Options,
  > = foundry.data.fields.DataField.DerivedInitializedType<
    foundry.data.fields.SchemaField.InitializedData<SummonsDataSchema>,
    fvttUtils.SimpleMerge<
      DefaultOptions,
      Opts
    >
  >;
  type PersistedType<
    Opts extends Options,
  > = foundry.data.fields.DataField.DerivedInitializedType<
    foundry.data.fields.SchemaField.PersistedData<SummonsDataSchema>,
    fvttUtils.SimpleMerge<
      DefaultOptions,
      Opts
    >
  >;
}

export default SummonsField;

/**
 * Data stored in "Summons" flag on Summons active effects.
 *
 * @typedef {object} SummonsProfile
 * @property {object} level
 * @property {number} level.min        Minimum level at which this profile can be used.
 * @property {number} level.max        Maximum level at which this profile can be used.
 * @property {object} riders
 * @property {string[]} riders.effect  IDs of other effects on this item that will be added with this Summons.
 * @property {string[]} riders.item    UUIDs of items that will be added with this Summons.
 */

/**
 * Data model for Summons configuration.
 *
 * @property {string} classIdentifier             Class identifier that will be used to determine applicable level.
 * @property {object} items
 * @property {string} items.max                   Maximum number of items that can have this Summons.
 * @property {string} items.period                Frequency at which the Summons be swapped.
 * @property {object} restrictions
 * @property {boolean} restrictions.allowMagical  Allow Summonss to be applied to items that are already magical.
 * @property {string} restrictions.type           Item type to which this Summons can be applied.
 */
export class SummonsData extends foundry.abstract.DataModel<
  SummonsDataSchema,
  any
> { }