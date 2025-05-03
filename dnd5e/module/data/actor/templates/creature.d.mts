import type Proficiency from "@dnd5e/module/documents/actor/proficiency.mjs";
import type { ActorDataModel } from "../../abstract.d.mts";
import FormulaField from "../../fields/formula-field.mjs";
import MappingField from "../../fields/mapping-field.mjs";
import RollConfigField from "../../shared/roll-config-field.mjs";
import CommonTemplate from "./common.mjs";
import type SystemDataModel from "../../abstract.d.mts";

declare type AttackBonusesDataSchema = {
  attack: FormulaField<{ required: true, label: "DND5E.BonusAttack" }>,
  damage: FormulaField<{ required: true, label: "DND5E.BonusDamage" }>
}

declare interface AttackBonusesDataSchemaField<
  Options extends foundry.data.fields.SchemaField.Options<AttackBonusesDataSchema> = foundry.data.fields.SchemaField.DefaultOptions
> extends foundry.data.fields.SchemaField<AttackBonusesDataSchema, Options> { }

/**
 * Produce the schema field for a simple trait.
 */
declare function makeAttackBonuses<
  Options extends foundry.data.fields.SchemaField.Options<AttackBonusesDataSchema> = foundry.data.fields.SchemaField.DefaultOptions
>(schemaOptions?: Options): AttackBonusesDataSchemaField<Options>

type SpellLevelKeyActor = (
  'pact' | `spell${Exclude<dnd5e.types.Spellcasting.Level.TypeKey, '0'>}`
)

type SkillField = RollConfigField<{
  value: foundry.data.fields.NumberField<{
    required: true, nullable: false, min: 0, max: 2, step: 0.5, initial: 0, label: "DND5E.ProficiencyLevel"
  }>,
  ability: "dex",
  bonuses: foundry.data.fields.SchemaField<
    {
      check: FormulaField<{ required: true, label: "DND5E.SkillBonusCheck" }>,
      passive: FormulaField<{ required: true, label: "DND5E.SkillBonusPassive" }>
    },
    { label: "DND5E.SkillBonuses" }
  >
}>

type ToolField = RollConfigField<
  {
    value: foundry.data.fields.NumberField<{
      required: true, nullable: false, min: 0, max: 2, step: 0.5, initial: 1, label: "DND5E.ProficiencyLevel"
    }>,
    ability: "int",
    bonuses: foundry.data.fields.SchemaField<
      {
        check: FormulaField<{ required: true, label: "DND5E.CheckBonus" }>
      },
      { label: "DND5E.ToolBonuses" }
    >
  }
>

declare class CreatureTemplate<
  Schema extends foundry.data.fields.DataSchema = {},
> extends CommonTemplate<
  dnd5e.types.MergeSchemas<
    {
      bonuses: foundry.data.fields.SchemaField<{
        mwak: AttackBonusesDataSchemaField,
        rwak: AttackBonusesDataSchemaField,
        msak: AttackBonusesDataSchemaField,
        rsak: AttackBonusesDataSchemaField,
        abilities: foundry.data.fields.SchemaField<{
          check: FormulaField<{ required: true }>,
          save: FormulaField<{ required: true }>,
          skill: FormulaField<{ required: true }>
        }>,
        spell: foundry.data.fields.SchemaField<{
          dc: FormulaField<{ required: true, deterministic: true }>
        }>
      }>,
      skills: MappingField<
        SkillField,
        dnd5e.types.Skill.TypeKey,
        {
          initialKeys: dnd5e.types.Skill.TypeKey[],
          initialKeysOnly: true,
          label: "DND5E.Skills"
        },
        MappingField.AssignmentElementType<SkillField>,
        fvttUtils.SimpleMerge<
          MappingField.InitializedElementType<SkillField>,
          {
            effectValue: number,
            bonus: number,
            mod: number,
            prof: Proficiency,
            proficient: number,
            total: number,
            passive: number
          }
        >
      >,
      tools: MappingField<
        ToolField,
        dnd5e.types.Tool.TypeKey,
        {},
        MappingField.AssignmentElementType<ToolField>,
        fvttUtils.SimpleMerge<
          MappingField.InitializedElementType<ToolField>,
          {
            effectValue: number,
            bonus: number,
            mod: number,
            prof: Proficiency,
            total: number,
          }
        >
      >,
      spells: MappingField<
        foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{
            nullable: false, integer: true, min: 0, initial: 0, label: "DND5E.SpellProgAvailable"
          }>,
          override: foundry.data.fields.NumberField<{
            integer: true, min: 0, label: "DND5E.SpellProgOverride"
          }>
        }>,
        SpellLevelKeyActor,
        {
          initialKeys: SpellLevelKeyActor[], // this._spellLevels, 
          label: "DND5E.SpellLevels"
        }
      >
    },
    Schema
  >
> {


  /* -------------------------------------------- */

  /**
   * Populate the proper initial abilities for the skills.
   * @private
   */
  static _initialSkillValue(key: dnd5e.types.Skill.TypeKey, initial: object): object

  /* -------------------------------------------- */

  /**
   * Helper for building the default list of spell levels.
   * @private
   */
  static get _spellLevels(): SpellLevelKeyActor[]

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */
  /* -------------------------------------------- */

  /**
   * Migrate the actor traits.senses string to attributes.senses object.
   */
  static #migrateSensesData(source: CreatureTemplate['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate traits.toolProf to the tools field.
   */
  static #migrateToolData(source: CreatureTemplate['_source'])

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare modifiers and other values for skills.
   */
  prepareSkills(options?: {
    rollData?: object,
    originalSkills?: CreatureTemplate['_source']['skills']
  })

  /* -------------------------------------------- */

  /**
   * Prepares data for a specific skill.
   */
  prepareSkill(
    skillId: dnd5e.types.Skill.TypeKey,
    options?: {
      skillData: CreatureTemplate['_source']['skills'][dnd5e.types.Skill.TypeKey],
      rollData: object,
      originalSkills: CreatureTemplate['_source']['skills'],
      globalBonuses: CreatureTemplate['_source']['bonuses'],
      globalCheckBonus: number,
      globalSkillBonus: number,
      ability: dnd5e.types.Ability.TypeKey
    }): CreatureTemplate['skills'][dnd5e.types.Skill.TypeKey]

  /* -------------------------------------------- */

  /**
   * Prepare tool checks. Mutates the values of system.tools.
   */
  prepareTools(options?: {
    rollData?: object
  })

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  override getRollData(...args: Parameters<CommonTemplate['getRollData']>): ActorDataModel.RollData<
    this
  > & {
    classes: Record<string, (Item.OfType<'class'>)['system'] & {
      hitDice: number
      subclass?: dnd5e.types.GetTypeFromPath<Item.OfType<'class'>, 'subclass.system'> | null
    }>
  }
}

export default CreatureTemplate;

declare global {
  namespace dnd5e.types {
    namespace Skill {
      // --- Base Definitions ---
      interface DefaultSkillTypes {
        "acr": true; // Acrobatics
        "ani": true; // Animal Handling
        "arc": true; // Arcana
        "ath": true; // Athletics
        "dec": true; // Deception
        "his": true; // History
        "ins": true; // Insight
        "itm": true; // Intimidation
        "inv": true; // Investigation
        "med": true; // Medicine
        "nat": true; // Nature
        "prc": true; // Perception
        "prf": true; // Performance
        "per": true; // Persuasion
        "rel": true; // Religion
        "slt": true; // Sleight of Hand
        "ste": true; // Stealth
        "sur": true; // Survival
      }

      /**
       * Override interface for declaration merging.
       * Add custom skill types here.
       * @example
       * declare global {
       * namespace dnd5e.types.Skill {
       * interface OverrideTypes {
       * "lor": true // Lore
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultSkillTypes,
        OverrideTypes
      >;

      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Configuration object structure for a skill type. */
      interface SkillTypeConfig {
        label: string;
        ability: dnd5e.types.Ability.TypeKey;
        fullKey: string; // Usually matches the key, e.g., "acr"
        reference?: string; // Link to rules reference if available
        icon?: string; // Associated icon
      }
    }

    interface DND5EConfig {
      /**
       * The set of skill which can be trained with their default ability scores.
       */
      skills: {
        [K in dnd5e.types.Skill.TypeKey]: dnd5e.types.Skill.SkillTypeConfig
      },
    }
  }
}
