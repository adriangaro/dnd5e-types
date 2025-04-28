import type { ItemDataModel } from "../abstract.mjs"
import type BaseActivityData from "../activity/base-activity.mjs"


declare class DurationField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends DurationField.Options<
    Schema
  > = DurationField.DefaultOptions,
  const AssignmentType = DurationField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = DurationField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = DurationField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  DurationField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)

  static prepareData(this: BaseActivityData | ItemDataModel, rollData: object, labels?: object): void
  static getEffectDuration(this: DurationField.InitializedType<{}>): ActiveEffect.DurationData
}

declare namespace DurationField {
  type BaseFields = {
    value: dnd5e.dataModels.fields.FormulaField<{
      deterministic: true
    }>
    units: dnd5e.types.fields.RestrictedStringField<
      dnd5e.types.DurationUnits.TypeKey,
      {
        initial: 'inst'
      }
    >,
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
    foundry.data.fields.SchemaField.Internal.InitializedType<GetSchema<Fields>, Opts>,
    {
      scalar: boolean
      getEffectData(): ActiveEffect.DurationData
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

declare global {
  namespace dnd5e.types {
    namespace DurationUnits {
      
      interface DefaultDurationUnits extends Record<string, 'special' | 'scalar' | 'permanent'> {
        inst: 'special',
        spec: 'special'
        
        day: 'scalar',
        hour: 'scalar',
        minute: 'scalar',
        month: 'scalar',
        round: 'scalar',
        second: 'scalar',
        turn: 'scalar',
        week: 'scalar',
        year: 'scalar',

        disp: 'permanent',
        dstr: 'permanent',
        perm: 'permanent'
      }

      interface OverrideTypes extends Record<string, 'special' | 'scalar' | 'permanent' | never> {
    
      }
    
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultDurationUnits,
        OverrideTypes
      >
    
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      type PermanentTypeKey = dnd5e.types.FilterKeysByValue<Types, TypeKey, 'permanent'>
      type ScalarTypeKey = dnd5e.types.FilterKeysByValue<Types, TypeKey, 'scalar'>
      type SpecialTypeKey = dnd5e.types.FilterKeysByValue<Types, TypeKey, 'special'>

      interface ScalarUnitConfig {
        label: string,
        conversion: number,
        combat?: boolean,
        counted?: string,
        option?: boolean
      }
    }

    interface DND5EConfig {
      scalarTimePeriods: {
        [K in dnd5e.types.DurationUnits.ScalarTypeKey]: string
      },
      permanentTimePeriods: {
        [K in dnd5e.types.DurationUnits.PermanentTypeKey]: string
      },
      specialTimePeriods: {
        [K in dnd5e.types.DurationUnits.SpecialTypeKey]: string
      },
      timeUnits: {
        [K in dnd5e.types.DurationUnits.ScalarTypeKey]: dnd5e.types.DurationUnits.ScalarTypeKey
      },
      timePeriods: DND5EConfig['scalarTimePeriods'] & DND5EConfig['permanentTimePeriods'] & DND5EConfig['specialTimePeriods']
    }
  }
}

export default DurationField