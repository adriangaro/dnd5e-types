import { ItemDataModel } from "../abstract.mjs"
import type BaseActivityData from "../activity/base-activity.mjs"



declare class ActivationField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends ActivationField.Options<
    Schema
  > = ActivationField.DefaultOptions,
  const AssignmentType = ActivationField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = ActivationField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = ActivationField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  ActivationField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)

  static prepareData(this: BaseActivityData | ItemDataModel, rollData: object, labels?: object): void
}


declare namespace ActivationField {
  type BaseFields = {
    type: dnd5e.types.fields.RestrictedStringField<
      dnd5e.types.ActivityActivation.TypeKey | '',
      {
        initial: 'action'
      }
    >,
    value: foundry.data.fields.NumberField,
    condition: foundry.data.fields.StringField
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
      scaler: boolean
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

    namespace ActivityActivation {
      interface DefaultActivityActivationTypes {
        action: true
        bonus: true
        day: true
        encounter: true
        hour: true
        lair: true,
        legendary: true,
        longRest: true,
        minute: true,
        mythic: true,
        reaction: true,
        shortRest: true,
        special: true,
        turnEnd: true,
        turnStart: true
      }

      interface OverrideTypes extends Record<string, boolean | never> {

      }

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultActivityActivationTypes,
        OverrideTypes
      >

      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      type ActivityActivationConfig = {
        /**
         * Localized label for the activation type.
         */
        label: string,
        /**
         * Localized label for the activation type header.
         */
        header?: string,
        /**
         * Localized label for the presentational group.
         */
        group?: string,
        /**
         * Classify this item as a passive feature on NPC sheets.
         */
        passive?: boolean,
        /**
         * Does this activation type have a numeric value attached?
         */
        scalar?: boolean
      }

    }
    interface DND5EConfig {
      /**
       * Configuration data for activation types on activities.
       */
      activityActivationTypes: {
        [K in dnd5e.types.ActivityActivation.TypeKey]: dnd5e.types.ActivityActivation.ActivityActivationConfig
      }
      // TODO: should this be configurable? seem deprecated and replaced by activityActivationTypes
      /**
       * Ways in which to activate an item that cannot be labeled with a cost.
       */
      staticAbilityActivationTypes: {
        none: string,
        special: string
      }
      /**
       * Various ways in which an item or ability can be activated.
       */
      abilityActivationTypes: DND5EConfig['staticAbilityActivationTypes'] & {
        action: string,
        bonus: string,
        reaction: string,
        minute: string,
        hour: string,
        day: string,
        legendary: string,
        mythic: string,
        lair: string,
        crew: string
      };
    }
  }
}



export default ActivationField