import type ActivityMixin from "@dnd5e/module/documents/activity/mixin.mjs"
import type { ItemDataModel } from "../abstract.mjs"
import type BaseActivityData from "../activity/base-activity.mjs"


declare class UsesField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends UsesField.Options<
    Schema
  > = UsesField.DefaultOptions,
  const AssignmentType = UsesField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = UsesField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = UsesField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  UsesField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)

  static prepareData(this: BaseActivityData | ItemDataModel, rollData: object, labels?: object): void

  static get rechargeOptions(): dnd5e.types.FormSelectOption[]
  /**
    * Create a label for uses data that matches the style seen on NPC stat blocks. Complex recovery data might result
    * in no label being generated if it doesn't represent recovery that can be normally found on a NPC.
    */
  static getStatblockLabel(this: ItemDataModel | BaseActivityData): string

  /**
   * Determine uses recovery.
   */
  static recoverUses(
    this: ItemDataModel | BaseActivityData, 
    periods: dnd5e.types.RecoveryPeriod.TypeKey[], 
    rollData: object
  ): Promise<
    { updates: object, rolls: dnd5e.dice.BasicRoll[] } |
    false
  >

  static rollRecharge(
    // this: Item.Implementation | dnd5e.types.Activity.Implementation,
    config?: UsesField.RechargeRollProcessConfiguration,
    dialog?: dnd5e.dice.BasicRoll.DialogConfiguration,
    message?: dnd5e.dice.BasicRoll.MessageConfiguration
  ): Promise<
    dnd5e.dice.BasicRoll[] |
    { rolls: dnd5e.dice.BasicRoll[], updates: object } |
    void
  >
}

declare namespace UsesField {
  type BaseFields = {
    spent: foundry.data.fields.NumberField<
      { initial: 0, min: 0, integer: true }
    >,
    max: dnd5e.dataModels.fields.FormulaField<{ deterministic: true }>,
    recovery: foundry.data.fields.ArrayField<
      foundry.data.fields.SchemaField<{
        period: dnd5e.types.fields.RestrictedStringField<dnd5e.types.RecoveryPeriod.TypeKey, { initial: "lr" }>,
        type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.RecoveryPeriod.TypeKey, { initial: "recoverAll" }>,
        formula: dnd5e.dataModels.fields.FormulaField
      }>
    >,
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
  > = fvttUtils.PrettifyType<dnd5e.types.DeepMerge<
    foundry.data.fields.SchemaField.Internal.InitializedType<GetSchema<Fields>, Opts>,
    {
      recovery: {
        recharge?: {
          options: dnd5e.types.FormSelectOption[]
        }
      }[],
      rollRecharge: typeof UsesField['rollRecharge']
    }
  >>
  type PersistedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
    GetSchema<Fields>,
    Opts
  >


  interface RechargeRollProcessConfiguration extends dnd5e.dice.BasicRoll.Configuration {
    apply?: boolean
  }
}

declare global {
  namespace dnd5e.types {
    namespace RecoveryPeriod {
      interface DefaultRecoveryPeriodGroups extends Record<string, boolean> {
        special: true,
        combat: true
      }

      interface GroupOverrideTypes extends Record<string, boolean | never> {

      }

      type GroupTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultRecoveryPeriodGroups,
        GroupOverrideTypes
      >

      type GroupTypeKey = dnd5e.types.ExtractKeys<GroupTypes>;

      interface DefaultRecoveryPeriodTypes extends Record<string, GroupTypeKey | boolean> {
        lr: true
        sr: true
        day: true
        charges: true
        dawn: true
        dusk: true
        initiative: 'special'
        turnStart: 'combat'
        turnEnd: 'combat'
        turn: 'combat'
      }

      interface OverrideTypes extends Record<string, boolean | never> {

      }

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultRecoveryPeriodTypes,
        OverrideTypes
      >

      type TypeKey = dnd5e.types.ExtractKeys<Types>;
      type CombatTypeKey = dnd5e.types.FilterKeysByValue<Types, TypeKey, 'combat'> | 'encounter'

      interface RecoveryPeriodConfig<T extends TypeKey | null = null> {
        /**
         * Localized label.
         */
        label: string,
        /**
         * Shorthand form of the label.
         */
        abbreviation: string,
        /**
         * Whether this limited use period restores charges via formula.
         */
        formula?: boolean,
        /**
         * Whether this recovery period is deprecated
         */
        deprecated?: boolean,
        /**
         * Grouping if outside the normal "time" group.
         */
        type: T extends TypeKey ? Types[T] extends string ? Types[T] : undefined : undefined
      }
    }

    interface DND5EConfig {
      /**
       * Enumerate the lengths of time over which an item can have limited use ability.
       */
      limitedUsePeriods: {
        [K in dnd5e.types.RecoveryPeriod.TypeKey]: dnd5e.types.RecoveryPeriod.RecoveryPeriodConfig<K>
      } & {
        get recoveryOptions(): {
          value: string, label: string, group?: string
        }[]
      }
    }
  }
}

export default UsesField