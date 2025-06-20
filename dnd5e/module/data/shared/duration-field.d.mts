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
        required: true, 
        blank: false, 
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
  > = fvttUtils.Merge<
    foundry.data.fields.SchemaField.Internal.InitializedType<
      GetSchema<Fields>,
      MergedOptions<Fields, Opts>
    >,
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
    MergedOptions<Fields, Opts>
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
        /**
         *  Localized label for this unit.
         */
        label: string,
        /**
         * Conversion multiplier used to converting between units.
         */
        conversion: number,
        /**
         * Is this a combat-specific time unit?
         */
        combat?: boolean,
        /**
         * Localization path for counted plural forms. Only necessary if non-supported unit
         * or using non-standard name for a supported unit. List of supported units can be
         * found here: https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
         */
        counted?: string,
        /**
         * Should this be available when users can select from a list of units?
         */
        option?: boolean
      }
    }

    interface DND5EConfig {
      /**
       * Time periods that accept a numeric value.
       */
      scalarTimePeriods: {
        [K in dnd5e.types.DurationUnits.ScalarTypeKey]: string
      },
      /**
       * Time periods for spells that don't have a defined ending.
       */
      permanentTimePeriods: {
        [K in dnd5e.types.DurationUnits.PermanentTypeKey]: string
      },
      /**
       * Time periods that don't accept a numeric value.
       */
      specialTimePeriods: {
        [K in dnd5e.types.DurationUnits.SpecialTypeKey]: string
      },
      /**
       * Configuration for time units available to the system.
       */
      timeUnits: {
        [K in dnd5e.types.DurationUnits.ScalarTypeKey]: dnd5e.types.DurationUnits.ScalarUnitConfig
      },
      /**
       * The various lengths of time over which effects can occur.
       */
      timePeriods: DND5EConfig['scalarTimePeriods'] & DND5EConfig['permanentTimePeriods'] & DND5EConfig['specialTimePeriods']
    }
  }
}

export default DurationField