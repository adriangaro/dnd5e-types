import type Proficiency from "@dnd5e/module/documents/actor/proficiency.mjs";
import type { ActorDataModel } from "../../abstract.d.mts";
import FormulaField from "../../fields/formula-field.mjs";
import MappingField from "../../fields/mapping-field.mjs";
import RollConfigField from "../../shared/roll-config-field.mjs";
import CommonTemplate from "./common.mjs";

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

declare class CreatureTemplate extends CommonTemplate.mixin()<{
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
}> {


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
    originalSkills?: foundry.data.fields.SchemaField.AssignmentData<
      dnd5e.types.GetSchema<typeof CreatureTemplate>
    >['skills']
  })

  /* -------------------------------------------- */

  /**
   * Prepares data for a specific skill.
   */
  prepareSkill(
    skillId: dnd5e.types.Skill.TypeKey,
    options?: {
      skillData: foundry.data.fields.SchemaField.InitializedData<
        dnd5e.types.GetSchema<typeof CreatureTemplate>
      >['skills'][dnd5e.types.Skill.TypeKey],
      rollData: object,
      originalSkills: foundry.data.fields.SchemaField.AssignmentData<
        dnd5e.types.GetSchema<typeof CreatureTemplate>
      >['skills'],
      globalBonuses: foundry.data.fields.SchemaField.InitializedData<
        dnd5e.types.GetSchema<typeof CreatureTemplate>
      >['bonuses'],
      globalCheckBonus: number,
      globalSkillBonus: number,
      ability: dnd5e.types.Ability.TypeKey
    }): foundry.data.fields.SchemaField.InitializedData<
      dnd5e.types.GetSchema<typeof CreatureTemplate>
    >['skills'][dnd5e.types.Skill.TypeKey]

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

  override getRollData:(...args: Parameters<CommonTemplate['getRollData']>) => ActorDataModel.RollData<
    CreatureTemplate
  > & {
    classes: Record<string, (Item.OfType<'class'>)['system'] & {
      hitDice: number
      subclass:  Item.OfType<'class'>['subclass']['system']
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

    namespace ToolGroup {
      // --- Base Definitions ---
      interface DefaultToolGroupTypes {
        art: true;  // Artisan's Tools
        game: true; // Gaming Set
        music: true;// Musical Instrument
        vehicle: true; // Vehicle proficiency (Land/Water) - Consider if this fits tool logic
      }

      /**
       * Override interface for declaration merging.
       * Add custom tool group types here.
       * @example
       * declare global {
       * namespace dnd5e.types.ToolGroup {
       * interface OverrideTypes {
       * 'sci': true // Scientific Instrument
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultToolGroupTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    namespace Tool {
      // --- Base Definitions ---
      // `true` indicates a tool proficiency not belonging to a standard group (like thieves' tools)
      // Otherwise, the value is the key of the group it belongs to (from ToolGroup.TypeKey)
      interface DefaultToolTypes extends Record<string, ToolGroup.TypeKey | true> {
        alchemist: 'art';    // Alchemist's Supplies
        bagpipes: 'music';   // Bagpipes
        brewer: 'art';       // Brewer's Supplies
        calligrapher: 'art'; // Calligrapher's Supplies
        card: 'game';        // Playing Card Set
        carpenter: 'art';    // Carpenter's Tools
        cartographer: 'art'; // Cartographer's Tools
        chess: 'game';       // Chess Set
        cobbler: 'art';      // Cobbler's Tools
        cook: 'art';         // Cook's Utensils
        dice: 'game';        // Dice Set
        disg: true;          // Disguise Kit
        drum: 'music';       // Drum
        dulcimer: 'music';   // Dulcimer
        flute: 'music';      // Flute
        forg: true;          // Forgery Kit
        glassblower: 'art';  // Glassblower's Tools
        herb: true;          // Herbalism Kit
        horn: 'music';       // Horn
        jeweler: 'art';      // Jeweler's Tools
        leatherworker: 'art';// Leatherworker's Tools
        lute: 'music';       // Lute
        lyre: 'music';       // Lyre
        mason: 'art';        // Mason's Tools
        navg: true;          // Navigator's Tools
        painter: 'art';      // Painter's Supplies
        panflute: 'music';   // Pan Flute
        pois: true;          // Poisoner's Kit
        potter: 'art';       // Potter's Tools
        shawm: 'music';      // Shawm
        smith: 'art';        // Smith's Tools
        thief: true;         // Thieves' Tools
        tinker: 'art';       // Tinker's Tools
        viol: 'music';       // Viol
        weaver: 'art';       // Weaver's Tools
        woodcarver: 'art';   // Woodcarver's Tools
        // Consider adding vehicle proficiency keys if needed, e.g., land: true, water: true
      }

      /**
       * Override interface for declaration merging.
       * Add custom tool types here. Map them to a ToolGroup.TypeKey if applicable,
       * otherwise use `true`.
       * @example
       * declare global {
       * namespace dnd5e.types.Tool {
       * interface OverrideTypes {
       * 'chemSet': 'sci'; // Chemistry Set -> Scientific Instrument Group
       * 'lockpick': true; // Advanced Lockpicks -> Standalone Proficiency
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, ToolGroup.TypeKey | true | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultToolTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Configuration object structure for a specific tool type. */
      interface ToolTypeConfig<T extends TypeKey> {
        id: T; // The key identifying the tool, e.g., "alchemist"
        label: string; // The display name, e.g., "Alchemist's Supplies"
        ability?: dnd5e.types.Ability.TypeKey; // Default ability score associated, if any
        group?: ToolGroup.TypeKey; // The group this tool belongs to, if any
      }
    }

    interface DND5EConfig {
      skills: {
        [K in dnd5e.types.Skill.TypeKey]: dnd5e.types.Skill.SkillTypeConfig
      },
      tools: {
        [K in dnd5e.types.Tool.TypeKey]: dnd5e.types.Tool.ToolTypeConfig<K>
      }
      toolProficiencies: {
        [K in dnd5e.types.ToolGroup.TypeKey]: string
      }
    }
  }
}
