import FormulaField from "../fields/formula-field.mjs";
import IdentifierField from "../fields/identifier-field.mjs";
import BaseActivityData from "./base-activity.mjs";

/**
 * Information for a single summoned creature.
 *
 * @typedef {object} SummonsProfile
 * @property {string} _id         Unique ID for this profile.
 * @property {string} count       Formula for the number of creatures to summon.
 * @property {string} cr          Formula for the CR of summoned creatures if in CR mode.
 * @property {object} level
 * @property {number} level.min   Minimum level at which this profile can be used.
 * @property {number} level.max   Maximum level at which this profile can be used.
 * @property {string} name        Display name for this profile if it differs from actor's name.
 * @property {Set<string>} types  Types of summoned creatures if in CR mode.
 * @property {string} uuid        UUID of the actor to summon if in default mode.
 */

/**
 * Data model for a summon activity.
 *
 * @property {object} bonuses
 * @property {string} bonuses.ac            Formula for armor class bonus on summoned actor.
 * @property {string} bonuses.hd            Formula for bonus hit dice to add to each summoned NPC.
 * @property {string} bonuses.hp            Formula for bonus hit points to add to each summoned actor.
 * @property {string} bonuses.attackDamage  Formula for bonus added to damage for attacks.
 * @property {string} bonuses.saveDamage    Formula for bonus added to damage for saving throws.
 * @property {string} bonuses.healing       Formula for bonus added to healing.
 * @property {Set<string>} creatureSizes    Set of creature sizes that will be set on summoned creature.
 * @property {Set<string>} creatureTypes    Set of creature types that will be set on summoned creature.
 * @property {object} match
 * @property {string} match.ability         Ability to use for calculating match values.
 * @property {boolean} match.attacks        Match the to hit values on summoned actor's attack to the summoner.
 * @property {boolean} match.proficiency    Match proficiency on summoned actor to the summoner.
 * @property {boolean} match.saves          Match the save DC on summoned actor's abilities to the summoner.
 * @property {SummonsProfile[]} profiles    Information on creatures that can be summoned.
 * @property {object} summon
 * @property {string} summon.identifier     Class identifier that will be used to determine applicable level.
 * @property {""|"cr"} summon.mode          Method of determining what type of creature is summoned.
 * @property {boolean} summon.prompt        Should the player be prompted to place the summons?
 */
export default class SummonActivityData extends BaseActivityData<
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
