import FormulaField from "../../fields/formula-field.mjs";
import MappingField from "../../fields/mapping-field.mjs";
import DamageTraitField from "../fields/damage-trait-field.mjs";
import SimpleTraitField from "../fields/simple-trait-field.mjs";

type LanguageSchema = {
  communication: MappingField<
    foundry.data.fields.SchemaField<{
      units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Distance.TypeKey>,
      value: foundry.data.fields.NumberField<{ min: 0 }>
    }>,
    dnd5e.types.Language.CommunicationTypeKey
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
    size: dnd5e.types.fields.RestrictedStringField<
      dnd5e.types.ActorSize.TypeKey,
      { required: true, initial: "med", label: "DND5E.Size" }
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
        dnd5e.types.fields.RestrictedStringField<dnd5e.types.Damage.Bypass>,
        {
          label: "DND5E.DamagePhysicalBypass", hint: "DND5E.DamagePhysicalBypassHint"
        }
      >
    }>,
    ci: SimpleTraitField<dnd5e.types.Condition.TypeKey, {}, { label: "DND5E.ConImm" }>
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
            languages: string[],
            ranged: string[]
          }
        }
      >
    >
  };

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

      /** Configuration data for actor sizes. */
      type ActorSizeConfig<T extends number> = {
        /**
         * Localized label.
         */
        label: string;
        /**
         * Size index, med is 0, everything below is negative, everything above is positive
         */
        value: T;
        /**
         * Localized abbreviation.
         */
        abbreviation: string;
        /**
         * Default hit die denomination for NPCs of this size.
         */
        hitDie: number;
        /**
         * Default token size.
         */
        token?: number;
        /**
         * Multiplier used to calculate carrying capacities.
         */
        capacityMultiplier?: number;
      };

      /** A map for converting between actor size keys and their numeric values. */
      type ActorSizeConversionMap = {
        [K in TypeKey]: KeyToNumber<K>
      } & {
        [V in TypeNumber]: NumberToKey<V>
      };
    }

    namespace Condition {
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

      interface ConditionConfiguration extends Omit<dnd5e.types.DND5EConfig.StatusEffectConfig5e, 'id'> {
        pseudo?: boolean;
        levels?: number;
        reduction?: { rolls: number; speed: number; };
      }
    }

    namespace Status {
      // --- Base Definitions ---
      interface DefaultStatusTypes {
        'burrowing': true;
        'concentrating': true;
        'coverHalf': true;
        'coverThreeQuarters': true;
        'coverTotal': true;
        'dead': true;
        'dodging': true;
        'ethereal': true;
        'flying': true;
        'hiding': true;
        'hovering': true;
        'marked': true;
        'sleeping': true;
        'stable': true;
      }

      /**
       * Override interface for declaration merging.
       * Add custom condition types here.
       * @example
       * declare global {
       * namespace dnd5e.types.Status {
       * interface OverrideTypes {
       * 'dazed': true
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultStatusTypes,
        OverrideTypes
      >;

      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      interface StatusConfiguration extends Omit<dnd5e.types.DND5EConfig.StatusEffectConfig5e, 'img' | 'id'> {
        icon: string
      }
    }

    namespace Language {
      interface DefaultCommunicationTypes {
        telepathy: true
      }

      /**
       * Override interface for declaration merging.
       * Add custom condition types here.
       * @example
       * declare global {
       * namespace dnd5e.types.Status {
       * interface OverrideTypes {
       * 'dazed': true
       * }
       * }
       * }
       */
      interface OverrideCommunicationTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type CommunicationTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultCommunicationTypes,
        OverrideCommunicationTypes
      >;

      type CommunicationTypeKey = dnd5e.types.ExtractKeys<CommunicationTypes>;
      /** Configuration object structure for a language. */
      interface LanguageConfig {
        label: string;
        selectable?: boolean;
        /** Allows nesting for dialects or related languages */
        children?: Record<string, string | LanguageConfig>;
      }
    }





    interface DND5EConfig {
      /**
       * Creature sizes ordered from smallest to largest.
       */
      actorSizes: {
        [K in dnd5e.types.ActorSize.TypeKey]: dnd5e.types.ActorSize.ActorSizeConfig<
          dnd5e.types.ActorSize.KeyToNumber<K>
        >
      },
      /**
       * Conditions that can affect an actor.
       */
      conditionTypes: {
        [K in dnd5e.types.Condition.TypeKey]: dnd5e.types.Condition.ConditionConfiguration;
      }

      /**
       * Various effects of conditions and which conditions apply it. Either keys for the conditions,
       * and with a number appended for a level of exhaustion.
       */
      conditionEffects: Record<
        'noMovement' | 'halfMovement' | 'crawl' | 'petrification' | 'halfHealth',
        Set<Condition.TypeKey | Status.TypeKey | `exhaustion-${number}` | (string & {})>
      >
      /**
       * Extra status effects not specified in `conditionTypes`. If the ID matches a core-provided effect, then this
       * data will be merged into the core data.
       */
      statusEffects: {
        [K in dnd5e.types.Status.TypeKey]: dnd5e.types.Status.StatusConfiguration;
      }
      /**
       * Configuration for the special bloodied status effect.
       */
      bloodied: { name: string, icon: string, threshold: number }
      /**
       * Languages a character can learn.
       */
      languages: {
        [k: string]: dnd5e.types.Language.LanguageConfig
      }
      /**
       * Communication types that take ranges such as telepathy.
       */
      communicationTypes: {
        [K in dnd5e.types.Language.CommunicationTypeKey]: { label: string }
      }
    }
  }
}

export default TraitsField