import FormulaField from "../../fields/formula-field.mjs";


/**
 * Data field for class & subclass spellcasting information.
 */
declare class SpellcastingField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends SpellcastingField.Options<
    Schema
  > = SpellcastingField.DefaultOptions,
  const AssignmentType = SpellcastingField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = SpellcastingField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = SpellcastingField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  SpellcastingField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType

> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)
}

declare namespace SpellcastingField {
  type BaseFields = {
    progression: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Spellcasting.Progression.TypeKey, {
      initial: "none",
      blank: false,
      label: "DND5E.SpellProgression"
    }>,
    ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey, { label: "DND5E.SpellAbility" }>,
    preparation: foundry.data.fields.SchemaField<{
      formula: FormulaField<{ label: "DND5E.SpellPreparation.Formula" }>
    }>
  }

  type GetSchema<
    Fields extends foundry.data.fields.DataSchema,
  > = fvttUtils.SimpleMerge<
    BaseFields,
    Fields
  >

  type Options<
    Fields extends foundry.data.fields.DataSchema
  > = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.Options<
      GetSchema<Fields>
    >,
    {
    }
  >;

  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.DefaultOptions,
    {
    }
  >

  type MergedOptions<
  Fields extends foundry.data.fields.DataSchema, Opts extends Options<GetSchema<Fields>>
> = fvttUtils.SimpleMerge<DefaultOptions, Opts>;

  type AssignmentType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.AssignmentType<
    GetSchema<Fields>,
    MergedOptions<Fields, Opts>
  >

  type InitializedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = dnd5e.types.DeepMerge<
    foundry.data.fields.SchemaField.Internal.InitializedType<
      GetSchema<Fields>,
      MergedOptions<Fields, Opts>
    >,
    {
      preparation: {
        max: number
      },
      type: string,
      levels: any // TODO:
      attack: number,
      save: number
    }
  >

  type PersistedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
    GetSchema<Fields>,
    MergedOptions<Fields, Opts> 
  >
}
declare global {
  namespace dnd5e.types {
    namespace Spellcasting {
      interface DefaultSpellcastingTypes extends Record<string, Progression.TypeKey | boolean> {
        leveled: 'artificer' | 'full' | 'half' | 'third';
        pact: true;
      }

      /**
       * Override interface for declaration merging.
       * Add custom currency types and their conversion rate relative to the base unit (GP=1).
       * @example
       * declare global {
       * namespace dnd5e.types.Spellcasting {
       * interface OverrideTypes {
       * "rune": "small" | "big"
       * }
       * }
       * }
       */
      // Defined with `never` key to prevent accidental merging in standard setups.
      interface OverrideTypes extends Record<string, Progression.TypeKey | boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultSpellcastingTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      type SpellCastingConfig<T extends TypeKey> = {
        /**
         * Localized label.
         */
        label: string,
        /**
         * Image used when rendered as a favorite on the sheet.
         */
        img: string,

        /**
         * Are these spell slots additionally restored on a short rest?
         */
        shortRest?: boolean
      } & (Types[T] extends boolean ? {} :
        {
          /**
         * Any progression modes for this type.
         */
          progression: Record<
            Exclude<Types[T], boolean>,
            {
              /**
               * Localized label.
               */
              label: string,
              /**
               * Value by which the class levels are divided to determine spellcasting level.
               */
              divisor?: number,
              /**
               * Should fractional values should be rounded up by default?
               */
              roundUp?: boolean
            }
          >,
        }
        )

      namespace Progression {
        interface DefaultProgressionTypes {
          artificer: true
          full: true
          half: true
          third: true
          pact: true,
          none: true
        }

        /**
         * Override interface for declaration merging.
         * Add custom currency types and their conversion rate relative to the base unit (GP=1).
         * @example
         * declare global {
         * namespace dnd5e.types.Spellcasting.Progression {
         * interface OverrideTypes {
         * "quarter": true
         * }
         * }
         * }
         */
        // Defined with `never` key to prevent accidental merging in standard setups.
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultProgressionTypes,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace PreparationModes {
        interface DefaultPreparationModesTypes {
          always: true,
          atwill: true,
          innate: true,
          pact: true,
          prepared: true,
          ritual: true
        }

        /**
         * Override interface for declaration merging.
         * Add custom currency types and their conversion rate relative to the base unit (GP=1).
         * @example
         * declare global {
         * namespace dnd5e.types.Spellcasting.PreparationModes {
         * interface OverrideTypes {
         * "psionic": true
         * }
         * }
         * }
         */
        // Defined with `never` key to prevent accidental merging in standard setups.
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultPreparationModesTypes,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        type SpellPreparationModeConfig = {
          /**
           * Localized name of this spell preparation type.
           */
          label: string,
          /**
           * Whether this preparation mode allows for upcasting.
           */
          upcast?: boolean,
          /**
           * Whether this mode allows for cantrips in a spellbook.
           */
          prepares?: boolean,
          /**
           * The sort order of this mode in a spellbook.
           */
          cantrips?: boolean,
          /**
           * Whether this preparation mode prepares spells.
           */
          order?: number
        }
      }

      namespace ListType {
        interface DefaultListTypes {
          class: true,
          subclass: true,
          background: true,
          race: true,
          other: true
        }

        /**
         * Override interface for declaration merging.
         * Add custom currency types and their conversion rate relative to the base unit (GP=1).
         * @example
         * declare global {
         * namespace dnd5e.types.Spellcasting.DefaultListTypes {
         * interface OverrideTypes {
         * "rune": true
         * }
         * }
         * }
         */
        // Defined with `never` key to prevent accidental merging in standard setups.
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultListTypes,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Level {
        // --- Base Definitions ---
        interface DefaultSpellLevels {
          '0': true; // Cantrip
          '1': true; // 1st Level
          '2': true; // 2nd Level
          '3': true; // 3rd Level
          '4': true; // 4th Level
          '5': true; // 5th Level
          '6': true; // 6th Level
          '7': true; // 7th Level
          '8': true; // 8th Level
          '9': true; // 9th Level
        }

        /**
         * Override interface for declaration merging.
         * Add custom spell levels (e.g., for epic levels) here.
         * @example
         * declare global {
         * namespace dnd5e.types.Spellcasting.Level {
         * interface OverrideTypes {
         * '10': true // 10th Level (Epic)
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultSpellLevels,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Scaling {
        // --- Base Definitions ---
        interface DefaultScalingTypes {
          cantrip: true,
          none: true,
          level: true
        }

        /**
         * Override interface for declaration merging.
         * Add custom spell levels (e.g., for epic levels) here.
         * @example
         * declare global {
         * namespace dnd5e.types.Spellcasting.Scaling {
         * interface OverrideTypes {
         * 'charLevel': true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultScalingTypes,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace School {
        // --- Base Definitions ---
        interface DefaultSchoolTypes {
          abj: true,
          con: true,
          div: true,
          enc: true,
          evo: true,
          ill: true,
          nec: true,
          trs: true
        }

        /**
         * Override interface for declaration merging.
         * Add custom spell levels (e.g., for epic levels) here.
         * @example
         * declare global {
         * namespace dnd5e.types.Spellcasting.School {
         * interface OverrideTypes {
         * 'psionics': true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultSchoolTypes,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        type SpellSchoolConfig = {
          /**
           *  Localized label.
           */
          label: string,
          /**
           * Spell school icon.
           */
          icon: string,
          /**
           * Fully written key used as alternate for enrichers.
           */
          fullKey: string,
          /**
           * Reference to a rule page describing this school.
           */
          reference?: string,
        }
      }
    }


    interface DND5EConfig {
      spellcastingTypes: {
        [K in dnd5e.types.Spellcasting.TypeKey]: dnd5e.types.Spellcasting.SpellCastingConfig<K>
      }
      /**
       * Ways in which a class can contribute to spellcasting levels.
       */
      spellProgression: {
        [K in dnd5e.types.Spellcasting.Progression.TypeKey]: string
      }
      /**
       * Various different ways a spell can be prepared.
       */
      spellPreparationModes: {
        [K in dnd5e.types.Spellcasting.PreparationModes.TypeKey]: dnd5e.types.Spellcasting.PreparationModes.SpellPreparationModeConfig
      }
      /**
       * Types of spell lists.
       */
      spellListTypes: {
        [K in dnd5e.types.Spellcasting.ListType.TypeKey]: string
      },
      /**
       * Valid spell levels.
       */
      spellLevels: {
        [K in dnd5e.types.Spellcasting.Level.TypeKey]: string
      },
      /**
       * The available choices for how spell damage scaling may be computed.
       */
      spellScalingModes: {
        [K in dnd5e.types.Spellcasting.Scaling.TypeKey]: string
      },
      /**
       * Schools to which a spell can belong.
       */
      spellSchools: {
        [K in dnd5e.types.Spellcasting.School.TypeKey]: dnd5e.types.Spellcasting.School.SpellSchoolConfig
      }
      /**
       * Define the standard slot progression by character level.
       * The entries of this array represent the spell slot progression for a full spell-caster.
       */
      SPELL_SLOT_TABLE: number[][]
      /**
       * Define the pact slot & level progression by pact caster level.
       */
      pactCastingProgression: Record<number, {
        slots: number,
        level: number
      }>
      /**
       * Spell scroll item ID within the `DND5E.sourcePacks` compendium or a full UUID for each spell level.
       */
      spellScrollIds: Record<number, string>
    }
  }
}

export default SpellcastingField