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



    

    interface DND5EConfig {
      actorSizes: {
        [K in dnd5e.types.ActorSize.TypeKey]: dnd5e.types.ActorSize.ActorSizeConfig<
          dnd5e.types.ActorSize.KeyToNumber<K>
        >
      },
      conditionTypes: {
        [K in dnd5e.types.Conditions.TypeKey]: dnd5e.types.Conditions.ConditionConfig;
      }
    }
  }
}

export default TraitsField