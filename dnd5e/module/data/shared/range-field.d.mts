import type { ItemDataModel } from "../abstract.mjs"
import type BaseActivityData from "../activity/base-activity.mjs"


declare class RangeField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends RangeField.Options<
    Schema
  > = RangeField.DefaultOptions,
  const AssignmentType = RangeField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = RangeField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = RangeField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  RangeField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)

  static prepareData(this: BaseActivityData | ItemDataModel, rollData: object, labels?: object): void
}

declare namespace RangeField {
  type BaseFields = {
    value: dnd5e.dataModels.fields.FormulaField<{
      deterministic: true
    }>
    units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Range.CompleteTypeKey>,
    special: foundry.data.fields.StringField
  }

  type GetSchema<
    Fields extends foundry.data.fields.DataSchema,
  > = fvttUtils.SimpleMerge<
    BaseFields,
    Fields
  >
  type Options<
    Fields extends foundry.data.fields.DataSchema,
  > = foundry.data.fields.SchemaField.Options<
    GetSchema<Fields>
  >
  export import DefaultOptions = foundry.data.fields.SchemaField.DefaultOptions
  
  type AssignmentType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.AssignmentType<
    GetSchema<Fields>,
    Opts
  >

  type InitializedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = fvttUtils.Merge<
    foundry.data.fields.SchemaField.Internal.InitializedType<
      GetSchema<Fields>, Opts
    >,
    {
      scalar: boolean
    }
  >

  type PersistedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
    GetSchema<Fields>,
    Opts
  >
}

export default RangeField

declare global {
  namespace dnd5e.types {
    namespace Range {
      interface DefaultDurationUnits extends Record<string, true> {
        self: true
        touch: true
        spec: true
        any: true
      }

      interface OverrideTypes extends Record<string, true | never> {
    
      }
    
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultDurationUnits,
        OverrideTypes
      >
    
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      type CompleteTypeKey = TypeKey | Distance.TypeKey
    }

    namespace Distance {
      interface DefaultUnitTypes extends Record<string, true> {
        ft: true
        mi: true
        m: true
        km: true
      }

      interface OverrideTypes extends Record<string, true | never> {
    
      }
    
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultUnitTypes,
        OverrideTypes
      >
    
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /**
       * The valid units of measure for movement distances in the game system.
       * By default this uses the imperial units of feet and miles.
       */
      movementUnits: {
        [K in Distance.TypeKey]: DND5EConfig.UnitConfiguration
      }
      /**
       * The types of range that are used for measuring actions and effects.
       */
      rangeTypes: {
        [K in Range.TypeKey]: string
      }
      /**
       * The valid units of measure for the range of an action or effect. A combination of `DND5E.movementUnits` and
       * `DND5E.rangeUnits`.
       */
      distanceUnits: {
        [K in Range.TypeKey]: string
      } & {
        [K in Distance.TypeKey]: string
      }
    }
  }
}