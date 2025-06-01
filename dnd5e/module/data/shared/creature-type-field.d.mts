/**
 * Field for storing creature type data.
 */
declare class CreatureTypeField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends CreatureTypeField.Options<
    Schema
  > = CreatureTypeField.DefaultOptions,
  const AssignmentType = CreatureTypeField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = CreatureTypeField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = CreatureTypeField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  CreatureTypeField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)
}

declare namespace CreatureTypeField {
  export type BaseFields = {
    value: dnd5e.types.fields.RestrictedStringField<
      dnd5e.types.Creature.TypeKey | 'custom',
      { blank: true, label: "DND5E.CreatureType" }
    >,
    subtype: foundry.data.fields.StringField<{ label: "DND5E.CreatureTypeSelectorSubtype" }>,
    swarm: foundry.data.fields.StringField<{ blank: true, label: "DND5E.CreatureSwarmSize" }>,
    custom: foundry.data.fields.StringField<{ label: "DND5E.CreatureTypeSelectorCustom" }>
  }

  export type GetSchema<
    Fields extends foundry.data.fields.DataSchema,
  > = dnd5e.types.FilterNever<fvttUtils.SimpleMerge<
    BaseFields,
    Fields
  >>
  export type Options<
    Fields extends foundry.data.fields.DataSchema,
  > = foundry.data.fields.SchemaField.Options<
    Fields
  >
  export import DefaultOptions = foundry.data.fields.SchemaField.DefaultOptions

  type MergedOptions<
    Fields extends foundry.data.fields.DataSchema, Opts extends Options<GetSchema<Fields>>
  > = fvttUtils.SimpleMerge<DefaultOptions, Opts>;


  export type AssignmentType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<Fields> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.AssignmentType<
    GetSchema<Fields>,
    MergedOptions<Fields, Opts>
  >

  export type InitializedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = fvttUtils.Merge<
    foundry.data.fields.SchemaField.Internal.InitializedType<
      GetSchema<Fields>,
      MergedOptions<Fields, Opts>
    >,
    {
      label: string
      config: any
    }
  >

  export type PersistedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<Fields> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
    GetSchema<Fields>,
    MergedOptions<Fields, Opts>
  >
}

declare global {
  namespace dnd5e.types {
    namespace Creature {
      // --- Base Creature Type Definitions ---
      interface DefaultCreatureTypes extends Record<string, boolean> {
        aberration: true;
        beast: true;
        celestial: true;
        construct: true;
        dragon: true;
        elemental: true;
        fey: true;
        fiend: true;
        giant: true;
        humanoid: true;
        monstrosity: true;
        ooze: true;
        plant: true;
        undead: true;
      }

      /**
       * Override interface for declaration merging.
       * Add custom creature types here (e.g., Magical Beast).
       * @example
       * declare global {
       * namespace dnd5e.types.Creature {
       * interface OverrideTypes {
       * magicalBeast: true
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultCreatureTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Configuration object structure for a creature type. */
      interface CreatureTypeConfig {
        /**
         * Localized label.
         */
        label: string;
        /**
         * Localized plural form used in swarm name.
         */
        plural: string;
        /**
         * Icon path
         */
        icon?: string;
        /**
         * Is this type detectable by spells such as "Detect Evil and Good"?
         */
        detectAlignment?: boolean;
        /**
         * Reference to a rule page describing this type.
         */
        reference?: string;
      }
    }

    interface DND5EConfig {
      /**
       * Default types of creatures.
       */
      creatureTypes: {
        [K in dnd5e.types.Creature.TypeKey]: dnd5e.types.Creature.CreatureTypeConfig
      }
    }
  }
}

export default CreatureTypeField