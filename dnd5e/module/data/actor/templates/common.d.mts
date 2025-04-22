import Proficiency from "../../../documents/actor/proficiency.mjs";
import { ActorDataModel } from "../../abstract.mjs";
import FormulaField from "../../fields/formula-field.mjs";
import MappingField from "../../fields/mapping-field.mjs";
import CurrencyTemplate from "../../shared/currency.mjs";
import RollConfigField from "../../shared/roll-config-field.mjs";

type AbilityData = {
  value: foundry.data.fields.NumberField<{
    required: true, nullable: false, integer: true, min: 0, initial: 10, label: "DND5E.AbilityScore"
  }>,
  proficient: foundry.data.fields.NumberField<{
    required: true, integer: true, min: 0, max: 1, initial: 0, label: "DND5E.ProficiencyLevel"
  }>,
  max: foundry.data.fields.NumberField<{
    required: true, integer: true, nullable: true, min: 0, initial: null, label: "DND5E.AbilityScoreMax"
  }>,
  bonuses: foundry.data.fields.SchemaField<{
    check: FormulaField<{ required: true, label: "DND5E.AbilityCheckBonus" }>,
    save: FormulaField<{ required: true, label: "DND5E.SaveBonus" }>
  }, { label: "DND5E.AbilityBonuses" }>,
  check: RollConfigField<{ ability: false }>,
  save: RollConfigField<{ ability: false }>
}

declare class CommonTemplate extends ActorDataModel.mixin(CurrencyTemplate)<{
  abilities: MappingField<
    foundry.data.fields.SchemaField<AbilityData>,
    dnd5e.types.Ability.TypeKey,
    {
      initialKeys: dnd5e.types.Ability.TypeKey[],
      initialKeysOnly: true,
      label: "DND5E.Abilities"
    },
    MappingField.AssignmentType<AbilityData, dnd5e.types.Ability.TypeKey>,
    dnd5e.types.DeepMerge<
      MappingField.InitializedType<AbilityData, dnd5e.types.Ability.TypeKey>,
      {
        checkProf: Proficiency,
        checkBonus: number,
        saveProf: Proficiency,
        saveBonus: number,
        save: {
          value: number,
          toString(): string,
          toJson(): string
        },
        attack: number,
        dc: number,
        max: number
      }
    >
  >
}> {

  /* -------------------------------------------- */

  /**
   * Populate the proper initial value for abilities.
   * @private
   */
  static _initialAbilityValue(key: dnd5e.types.Ability.TypeKey, initial: object, existing: object): object

  /* -------------------------------------------- */

  /**
   * Migrate the actor ac.value to new ac.flat override field.
    */
  static #migrateACData(source: CommonTemplate['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate the actor speed string to movement object.
   */
  static #migrateMovementData(source: CommonTemplate['_source'])

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare modifiers and other values for abilities.
   */
  prepareAbilities(options?: {
    rollData?: object,
    originalSaves?: foundry.data.fields.SchemaField.AssignmentData<
      dnd5e.types.GetSchema<typeof CommonTemplate>
    >['abilities']
  })

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Create the proficiency object for an ability, skill, or tool, taking remarkable athlete and Jack of All Trades
   * into account.
   */
  calculateAbilityCheckProficiency(multiplier: number, ability: dnd5e.types.Ability.TypeKey): Proficiency
}

declare global {
  namespace dnd5e.types {
    namespace Ability {
      // --- Base Ability Definitions ---
      interface DefaultAbilityTypes {
        "str": true; // Strength
        "dex": true; // Dexterity
        "con": true; // Constitution
        "int": true; // Intelligence
        "wis": true; // Wisdom
        "cha": true; // Charisma
        "hon": true; // Honor (Optional Rule)
        "san": true; // Sanity (Optional Rule)
      }

      /**
       * Override interface for declaration merging.
       * Add custom ability scores here (e.g., Luck).
       * @example
       * declare global {
       * namespace dnd5e.types.Ability {
       * interface OverrideTypes {
       * "luc": true // Luck
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultAbilityTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;


      // --- Default Ability Mapping for derived stats/checks ---
      interface DefaultAbilityDefaults {
        concentration: 'con'; // Default ability for concentration saves
        hitPoints: 'con';     // Default ability modifier for hit points per level
        initiative: 'dex';    // Default ability for initiative rolls
        meleeAttack: 'str';   // Default ability modifier for generic melee attacks
        rangedAttack: 'dex';  // Default ability modifier for generic ranged attacks
        // Add other common defaults as needed, e.g., spellcasting defaults per class type
      }

      /**
       * Override interface for declaration merging.
       * Change default ability mappings or add new ones.
       * @example
       * declare global {
       * namespace dnd5e.types.Ability {
       * interface OverrideAbilityDefaults {
       * // Example: Change default melee to dex for a specific setting
       * meleeAttack: 'dex';
       * // Example: Add a default for a specific magic system
       * arcaneSpellcasting: 'int';
       * }
       * }
       * }
       */
      interface OverrideAbilityDefaults extends Record<string, TypeKey | never> {}

      type AbilityDefaults = dnd5e.types.MergeOverrideDefinition<
        DefaultAbilityDefaults,
        OverrideAbilityDefaults
      >;

      /** Configuration object structure for an ability score type. */
      type AbilityTypeConfig<T extends TypeKey> = {
        abbreviation: T; // e.g., "str", "dex"
        fullKey: string; // Usually the same as abbreviation
        icon?: string; // Icon representation
        label: string; // Display name, e.g., "Strength"
        reference?: string; // Link to rules reference
        type: 'mental' | 'physical'; // Categorization
        improvement?: boolean; // Whether this ability typically improves via ASIs (usually true for core 6)
        /** Default score values for different actor subtypes (e.g., NPCs might default to 10) */
        defaults?: Partial<{
          [K in Actor.SubType]: number;
        }>;
      };
    }

    interface DND5EConfig {
      abilities: {
        [K in dnd5e.types.Ability.TypeKey]: dnd5e.types.Ability.AbilityTypeConfig<K>
      },
      defaultAbilities: dnd5e.types.Ability.AbilityDefaults,
    }
  }
}

export default CommonTemplate;