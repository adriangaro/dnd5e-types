type _NumberOptions = { required: true, nullable: true, min: 0, initial: null }

declare class SensesField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends SensesField.Options<
    Schema
  > = SensesField.DefaultOptions,
  const AssignmentType = SensesField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = SensesField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = SensesField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  SensesField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)
}

declare namespace SensesField {
  type BaseFields = {
    darkvision: foundry.data.fields.NumberField<_NumberOptions>,
    blindsight: foundry.data.fields.NumberField<_NumberOptions>,
    tremorsense: foundry.data.fields.NumberField<_NumberOptions>,
    truesight: foundry.data.fields.NumberField<_NumberOptions>,
    units: foundry.data.fields.StringField<{
      required: true, nullable: true, blank: false
    }>,
    special: foundry.data.fields.StringField<{ required: true }>,
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
      initialUnits?: foundry.data.fields.NumberField.Options['initial']
    }
  >;

  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.DefaultOptions,
    {
      initialUnits: null
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
  > = foundry.data.fields.SchemaField.Internal.InitializedType<
    GetSchema<Fields>,
    MergedOptions<Fields, Opts>
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
    namespace Senses {
      interface DefaultSensesTypes {
        blindsight: true;
        darkvision: true;
        tremorsense: true;
        truesight: true;
      }

      /**
       * Override interface for declaration merging.
       * NOTE: Modifying or adding senses types is not currently supported
       * by the core D&D5e system logic. This interface exists primarily
       * for potential future expansion or for use by custom systems/modules
       * that specifically implement handling for new senses types.
       * Attempting to add types here without corresponding system support
       * will likely have no effect.
       *
       * @example No overrides are supported by default.
       */
      // Defined with `never` key to prevent accidental merging in standard setups.
      interface OverrideTypes extends Record<never, boolean | never> {}

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
      DefaultSensesTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }
  }

  interface DND5EConfig {
    /**
     * The set of possible sensory perception types which an Actor may have.
     */
    senses: {
      [K in dnd5e.types.Senses.TypeKey]: string
    }
  }
}

export default SensesField