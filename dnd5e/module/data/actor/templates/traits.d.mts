import FormulaField from "../../fields/formula-field.mjs";
import MappingField from "../../fields/mapping-field.mjs";
import DamageTraitField from "../fields/damage-trait-field.mjs";
import SimpleTraitField from "../fields/simple-trait-field.mjs";

type LanguageSchema = {
  communication: MappingField<
    foundry.data.fields.SchemaField<{
      units: foundry.data.fields.StringField<{ initial: () => number }>,
      value: foundry.data.fields.NumberField<{ min: 0 }>
    }>
  >
}

/**
 * Shared contents of the traits schema between various actor types.
 */
declare class TraitsField {

  /* -------------------------------------------- */

  /**
   * Fields shared between characters, NPCs, and vehicles.
   */
  static get common(): {
    size: foundry.data.fields.StringField<
      { required: true, initial: "med", label: "DND5E.Size" },
      dnd5e.types.ActorSize.TypeKey,
      dnd5e.types.ActorSize.TypeKey,
      dnd5e.types.ActorSize.TypeKey
    >,
    di: DamageTraitField<
      dnd5e.types.Damage.TypeKey,
      dnd5e.types.Damage.Bypass,
      {}, { label: "DND5E.DamImm" }
    >,
    dr: DamageTraitField<
      dnd5e.types.Damage.TypeKey,
      dnd5e.types.Damage.Bypass,
      {}, { label: "DND5E.DamRes" }
    >,
    dv: DamageTraitField<
      dnd5e.types.Damage.TypeKey,
      dnd5e.types.Damage.Bypass,
      {}, { label: "DND5E.DamVuln" }
    >,
    dm: foundry.data.fields.SchemaField<{
      amount: MappingField<
        FormulaField<{ deterministic: true }>,
        dnd5e.types.Damage.TypeKey,
        { label: "DND5E.DamMod" }
      >,
      bypasses: foundry.data.fields.SetField<
        foundry.data.fields.StringField<{}, dnd5e.types.Damage.Bypass, dnd5e.types.Damage.Bypass, dnd5e.types.Damage.Bypass>,
        {
          label: "DND5E.DamagePhysicalBypass", hint: "DND5E.DamagePhysicalBypassHint"
        }
      >
    }>,
    ci: SimpleTraitField<dnd5e.types.Conditions.TypeKey, {}, { label: "DND5E.ConImm" }>
  };


  /* -------------------------------------------- */

  /**
   * Fields shared between characters and NPCs.
   */
  static get creature(): {
    languages: SimpleTraitField<
      string,
      LanguageSchema,
      { label: "DND5E.Languages" },
      SimpleTraitField.AssignmentType<LanguageSchema, string>,
      fvttUtils.SimpleMerge<
        SimpleTraitField.InitializedType<LanguageSchema, string>,
        {
          labels: {
            languages: [],
            ranged: []
          }
        }
      >
    >
  };


  /* -------------------------------------------- */

  /**
   * Produce the schema field for a simple trait.
   */
  static makeSimpleTrait<
    TraitType extends string = string,
    Schema extends foundry.data.fields.DataSchema = {},
    Options extends SimpleTraitField.Options<
      Schema,
      TraitType
    > = SimpleTraitField.DefaultOptions,
  >(schemaOptions?: Options, options?: {
    initial?: TraitType[];
    extraFields?: Schema;
  }): SimpleTraitField<TraitType, Schema, Options>

  /* -------------------------------------------- */

  /**
   * Produce the schema field for a damage trait.
   */
  static makeDamageTrait<
    TraitType extends string = dnd5e.types.Damage.TypeKey,
    Schema extends foundry.data.fields.DataSchema = {},
    Options extends SimpleTraitField.Options<
      Schema,
      TraitType
    > = SimpleTraitField.DefaultOptions,
  >(schemaOptions?: Options, options?: {
    initial?: TraitType[];
    extraFields?: Schema;
  }): DamageTraitField<TraitType, dnd5e.types.Damage.Bypass, Schema, Options>

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare the language labels.
   */
  static prepareLanguages<T extends {
    traits: foundry.data.fields.SchemaField.InitializedData<typeof TraitsField['creature']>
  }>(this: T)

  /* -------------------------------------------- */

  /**
   * Prepare condition immunities & petrified condition.
   * @this {CharacterData|NPCData|VehicleData}
   */
  static prepareResistImmune<T extends {
    parent: Actor.Implementation,
    traits: foundry.data.fields.SchemaField.InitializedData<typeof TraitsField['common']>
  }>(this: T)
}

declare global {
  namespace dnd5e.types {
    namespace ActorSize {
      // --- Base Definitions ---
      interface DefaultActorSizeTypes {
        grg: 3,
        huge: 2,
        lg: 1,
        med: 0,
        sm: -1,
        tiny: -2
      }

      /**
       * Override interface for declaration merging.
       * Add custom actor sizes here.
       * @example
       * declare global {
       * namespace dnd5e.types.ActorSize {
       * interface OverrideTypes {
       * colossal: 4
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, number | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultActorSizeTypes,
        OverrideTypes
      >;

      type TypeKey = dnd5e.types.ExtractKeys<Types>;
      type TypeNumber = Types[TypeKey];

      // --- Mapping Utilities ---
      type KeyToNumber<T extends TypeKey> = Types[T];
      type NumberToKey<T extends TypeNumber> = dnd5e.types.FindKeyByValue<Types, T>;

      /** Configuration object structure for an actor size. */
      type ActorSizeConfig<T extends number> = {
        abbreviation: string;
        capacityMultiplier?: number;
        hitDie: number;
        label: string;
        token?: number;
        value: T;
      };

      /** A map for converting between actor size keys and their numeric values. */
      type ActorSizeConversionMap = {
        [K in TypeKey]: KeyToNumber<K>
      } & {
        [V in TypeNumber]: NumberToKey<V>
      };
    }

    namespace Conditions {
      // --- Base Definitions ---
      interface DefaultConditionTypes {
        'bleeding': true;
        'blinded': true;
        'burning': true;
        'charmed': true;
        'cursed': true;
        'deafened': true;
        'dehydration': true;
        'diseased': true;
        'exhaustion': true;
        'falling': true;
        'frightened': true;
        'grappled': true;
        'incapacitated': true;
        'invisible': true;
        'malnutrition': true;
        'paralyzed': true;
        'petrified': true;
        'poisoned': true;
        'prone': true;
        'restrained': true;
        'silenced': true;
        'stunned': true;
        'suffocation': true;
        'surprised': true;
        'transformed': true;
        'unconscious': true;
      }

      /**
       * Override interface for declaration merging.
       * Add custom condition types here.
       * @example
       * declare global {
       * namespace dnd5e.types.Conditions {
       * interface OverrideTypes {
       * 'dazed': true
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultConditionTypes,
        OverrideTypes
      >;

      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Configuration object structure for a condition type. */
      type ConditionConfig = {
        icon: string;
        label: string;
        pseudo?: boolean;
        special?: string;
        reference?: string;
        description?: string;
        levels?: number;
        statuses?: TypeKey[]; // e.g., 'incapacitated' might apply 'blinded' status
        riders?: TypeKey[];   // e.g., 'exhaustion' might apply other conditions
        reduction?: {
          rolls: number;
          speed: number;
        };
      };
    }

    namespace Language {
      /** Configuration object structure for a language. */
      interface LanguageConfig {
        label: string;
        selectable?: boolean;
        /** Allows nesting for dialects or related languages */
        children?: Record<string, string | LanguageConfig>;
      }
    }


    namespace ArmorProficiency {
      // --- Armor Group Definitions ---
      interface DefaultArmorGroupTypes {
        'lgt': true; // Light
        'med': true; // Medium
        'hvy': true; // Heavy
        'shl': true; // Shield
      }

      /**
       * Override interface for declaration merging.
       * Add custom armor group types here.
       * @example
       * declare global {
       * namespace dnd5e.types.ArmorProficiency {
       * interface OverrideGroupTypes {
       * 'exo': true // Exoskeleton
       * }
       * }
       * }
       */
      interface OverrideGroupTypes extends Record<string, boolean | never> { }

      type GroupTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultArmorGroupTypes,
        OverrideGroupTypes
      >;
      type GroupTypeKey = dnd5e.types.ExtractKeys<GroupTypes>;

      // --- Specific Armor Proficiency Definitions ---
      interface DefaultArmorProficiencyTypes extends Record<string, GroupTypeKey> {
        breastplate: 'med';
        chainmail: 'hvy';
        chainshirt: 'med';
        halfplate: 'med';
        hide: 'med';
        leather: 'lgt';
        padded: 'lgt';
        plate: 'hvy';
        ringmail: 'hvy';
        scalemail: 'med';
        shield: 'shl'; // Added shield here for consistency
        splint: 'hvy';
        studded: 'lgt';
      }

      /**
      * Override interface for declaration merging.
      * Add custom specific armor proficiencies and map them to a group key.
      * @example
      * declare global {
      * namespace dnd5e.types.ArmorProficiency {
      * interface OverrideTypes {
      * 'powerArmorFrame': 'exo'
      * }
      * }
      * }
      */
      interface OverrideTypes extends Record<string, GroupTypeKey | never> { }

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultArmorProficiencyTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      // --- Armor Proficiency Map (Trait Mapping) ---
      interface DefaultArmorProficiencyMap extends Record<string, GroupTypeKey | boolean> {
        natural: true;  // Represents natural armor
        clothing: true; // Represents wearing only clothing
        light: 'lgt';   // Proficiency in the light armor group
        medium: 'med';  // Proficiency in the medium armor group
        heavy: 'hvy';   // Proficiency in the heavy armor group
        shield: 'shl';  // Proficiency in the shield group
      }

      /**
       * Override interface for declaration merging.
       * Add custom trait keys for armor proficiency mapping.
       * @example
       * declare global {
       * namespace dnd5e.types.ArmorProficiency {
       * interface OverrideProficiencyMap {
       * 'exoskeletonProficiency': 'exo'
       * }
       * }
       * }
       */
      interface OverrideProficiencyMap extends Record<string, GroupTypeKey | boolean | never> { }

      type ProficiencyMap = dnd5e.types.MergeOverrideDefinition<
        DefaultArmorProficiencyMap,
        OverrideProficiencyMap
      >;

      // --- Armor Class Calculation Methods ---
      interface DefaultArmorClasses extends Record<string, boolean> {
        flat: true;       // AC determined by a flat value (often from items)
        natural: true;    // AC determined by natural armor calculation
        default: true;    // Standard AC calculation (armor + dex modifier)
        mage: true;       // Mage Armor calculation (e.g., 13 + Dex)
        draconic: true;   // Draconic Sorcerer calculation (e.g., 13 + Dex)
        unarmoredMonk: true; // Monk Unarmored Defense (10 + Dex + Wis)
        unarmoredBarb: true; // Barbarian Unarmored Defense (10 + Dex + Con)
        custom: true;     // Custom AC formula defined on the actor
      }

      /**
       * Override interface for declaration merging.
       * Add custom named AC calculation methods.
       * @example
       * declare global {
       * namespace dnd5e.types.ArmorProficiency {
       * interface OverrideArmorClasses {
       * 'psionicBarrier': true // Example: AC = 10 + Int
       * }
       * }
       * }
       */
      interface OverrideArmorClasses extends Record<string, boolean | never> { } // Value is typically boolean, but kept flexible if needed

      type ArmorClasses = dnd5e.types.MergeOverrideDefinition<
        DefaultArmorClasses,
        OverrideArmorClasses
      >;
      type ArmorClassKey = dnd5e.types.ExtractKeys<ArmorClasses>;

      // --- Combined Keys and Config ---
      type CompleteTypeKey = TypeKey | GroupTypeKey;

      /** Configuration object structure for an Armor Class calculation method. */
      type ArmorClassConfig = {
        label: string;
        /** Optional formula if the calculation method requires one (e.g., for 'custom') */
        formula?: string;
      };
    }


    namespace WeaponProficiency {
      // --- Weapon Group Definitions ---
      interface DefaultWeaponGroupTypes {
        sim: true; // Simple
        mar: true; // Martial
      }

      /**
       * Override interface for declaration merging.
       * Add custom weapon group types here.
       * @example
       * declare global {
       * namespace dnd5e.types.WeaponProficiency {
       * interface OverrideGroupTypes {
       * 'exo': true // Exotic
       * }
       * }
       * }
       */
      interface OverrideGroupTypes extends Record<string, boolean | never> { }

      type GroupTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultWeaponGroupTypes,
        OverrideGroupTypes
      >;
      type GroupTypeKey = dnd5e.types.ExtractKeys<GroupTypes>;

      // --- Specific Weapon Proficiency Definitions ---
      interface DefaultWeaponProficiencyTypes extends Record<string, GroupTypeKey> {
        battleaxe: 'mar';
        blowgun: 'mar';
        club: 'sim';
        dagger: 'sim';
        dart: 'sim';
        flail: 'mar';
        glaive: 'mar';
        greataxe: 'mar';
        greatclub: 'sim';
        greatsword: 'mar';
        halberd: 'mar';
        handaxe: 'sim';
        handcrossbow: 'mar';
        heavycrossbow: 'mar';
        javelin: 'sim';
        lance: 'mar';
        lightcrossbow: 'sim';
        lighthammer: 'sim';
        longbow: 'mar';
        longsword: 'mar';
        mace: 'sim';
        maul: 'mar';
        morningstar: 'mar';
        net: 'mar'; // Often considered martial despite simple usage
        pike: 'mar';
        quarterstaff: 'sim';
        rapier: 'mar';
        scimitar: 'mar';
        shortsword: 'mar';
        sickle: 'sim';
        spear: 'sim';
        shortbow: 'sim';
        sling: 'sim';
        trident: 'mar';
        warpick: 'mar';
        warhammer: 'mar';
        whip: 'mar';
        // Common Firearms (often martial)
        musket: 'mar';
        pistol: 'mar';
        // Consider adding others like rifle, shotgun if needed
      }

      /**
       * Override interface for declaration merging.
       * Add custom specific weapon proficiencies and map them to a group key.
       * @example
       * declare global {
       * namespace dnd5e.types.WeaponProficiency {
       * interface OverrideTypes {
       * 'laserPistol': 'exo'
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, GroupTypeKey | never> { }

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultWeaponProficiencyTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      // --- Weapon Proficiency Map (Trait Mapping) ---
      interface DefaultWeaponProficiencyMap extends Record<string, GroupTypeKey | boolean> {
        simpleM: 'sim';  // Proficiency in simple melee weapons group
        simpleR: 'sim';  // Proficiency in simple ranged weapons group
        martialM: 'mar'; // Proficiency in martial melee weapons group
        martialR: 'mar'; // Proficiency in martial ranged weapons group
        improv: true;    // Proficiency with improvised weapons
        natural: true;   // Proficiency with natural weapons (claws, bite, etc.)
        siege: true;     // Proficiency with siege weapons
      }

      /**
       * Override interface for declaration merging.
       * Add custom trait keys for weapon proficiency mapping.
       * @example
       * declare global {
       * namespace dnd5e.types.WeaponProficiency {
       * interface OverrideWeaponProficiencyMap {
       * 'exoticWeapons': 'exo'
       * }
       * }
       * }
       */
      interface OverrideProficiencyMap extends Record<string, GroupTypeKey | boolean | never> { }

      type ProficiencyMap = dnd5e.types.MergeOverrideDefinition<
        DefaultWeaponProficiencyMap,
        OverrideProficiencyMap
      >;

      // --- Weapon Type Map (Ranged/Melee mapping for Proficiency Groups) ---
      // Maps keys from ProficiencyMap to 'ranged' or 'melee' where applicable
      interface DefaultWeaponTypeMap extends Record<keyof DefaultWeaponProficiencyMap | string, 'ranged' | 'melee' | never> {
        simpleM: 'melee';
        simpleR: 'ranged';
        martialM: 'melee';
        martialR: 'ranged';
        siege: 'ranged'; // Typically siege engines are ranged
        // 'improv' and 'natural' can be either, so they are not explicitly mapped here.
        improv: never;
        natural: never;
        // Add mappings for any custom *groups* added via OverrideWeaponProficiencyMap if they have a fixed type
      }

      /**
       * Override interface for declaration merging.
       * Add mappings for custom proficiency *groups* (from OverrideWeaponProficiencyMap)
       * to 'ranged' or 'melee' if they have a consistent type.
       * @example
       * declare global {
       * namespace dnd5e.types.WeaponProficiency {
       * interface OverrideTypeMap {
       * 'exoticWeapons': 'ranged' // If all exotic weapons are ranged, otherwise leave as never
       * }
       * }
       * }
       */
      interface OverrideTypeMap extends Record<string, 'ranged' | 'melee' | never> { }

      type TypeMap = dnd5e.types.MergeOverrideDefinition<
        DefaultWeaponTypeMap,
        OverrideTypeMap
      >;


      // --- Combined Keys ---
      type CompleteTypeKey = TypeKey | GroupTypeKey;
    }

    interface DND5EConfig {
      actorSizes: {
        [K in dnd5e.types.ActorSize.TypeKey]: dnd5e.types.ActorSize.ActorSizeConfig<
          dnd5e.types.ActorSize.KeyToNumber<K>
        >
      },
      conditionTypes: {
        [K in dnd5e.types.Conditions.TypeKey]: dnd5e.types.Conditions.ConditionConfig;
      }

      armorIds: {
        [K in dnd5e.types.ArmorProficiency.TypeKey]: string
      },
      armorProficienciesMap: dnd5e.types.ArmorProficiency.ProficiencyMap,
      armorTypes: {
        [K in keyof dnd5e.types.ArmorProficiency.ProficiencyMap]: string
      },
      armorProficiencies: {
        [K in dnd5e.types.ArmorProficiency.GroupTypeKey]: string
      }
      armorClasses: {
        [K in dnd5e.types.ArmorProficiency.ArmorClassKey]: dnd5e.types.ArmorProficiency.ArmorClassConfig
      }

      weaponIds: {
        [K in dnd5e.types.WeaponProficiency.TypeKey]: string
      }
      weaponProficienciesMap: dnd5e.types.WeaponProficiency.ProficiencyMap
      weaponTypes: {
        [K in keyof dnd5e.types.WeaponProficiency.ProficiencyMap]: string
      },
      weaponProficiencies: {
        [K in dnd5e.types.WeaponProficiency.GroupTypeKey]: string
      }
      weaponTypeMap: {
        [K in keyof dnd5e.types.WeaponProficiency.TypeMap]: dnd5e.types.WeaponProficiency.TypeMap[K]
      }
    }
  }
}

export default TraitsField