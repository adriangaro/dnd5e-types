type _NumberOptions = { required: true, nullable: true, min: 0, step: 0.1, initial: null }



declare class MovementField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends MovementField.Options<
    Schema
  > = MovementField.DefaultOptions,
  const AssignmentType = MovementField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = MovementField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = MovementField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  MovementField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)
}

declare namespace MovementField {
  type BaseFields = {
    burrow: foundry.data.fields.NumberField<_NumberOptions>,
    climb: foundry.data.fields.NumberField<_NumberOptions>,
    fly: foundry.data.fields.NumberField<_NumberOptions>,
    swim: foundry.data.fields.NumberField<_NumberOptions>,
    walk: foundry.data.fields.NumberField<_NumberOptions>,
    units: foundry.data.fields.StringField<{
      required: true,
      nullable: true,
      blank: false
    }>,
    hover: foundry.data.fields.BooleanField<{
      required: true
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
    namespace Movement {
      interface DefaultMovementTypes {
        walk: true;
        fly: true;
        swim: true;
        burrow: true;
        climb: true;
      }

      /**
       * Override interface for declaration merging.
       * NOTE: Modifying or adding movement types is not currently supported
       * by the core D&D5e system logic. This interface exists primarily
       * for potential future expansion or for use by custom systems/modules
       * that specifically implement handling for new movement types.
       * Attempting to add types here without corresponding system support
       * will likely have no effect.
       *
       * @example No overrides are supported by default.
       */
      // Defined with `never` key to prevent accidental merging in standard setups.
      interface OverrideTypes extends Record<never, boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultMovementTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }
  }

  interface DND5EConfig {
    /**
     * The valid units of measure for movement distances in the game system.
     * By default this uses the imperial units of feet and miles.
     */
    movementTypes: {
      [K in dnd5e.types.Movement.TypeKey]: string
    }
  }
}

export default MovementField