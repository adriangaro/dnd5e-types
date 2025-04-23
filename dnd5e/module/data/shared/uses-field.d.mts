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
  static recoverUses(this: ItemDataModel | BaseActivityData, periods: string[], rollData: object): Promise<
    { updates: object, rolls: dnd5e.dice.BasicRoll[] } |
    false
  >

  static rollRecharge(
    this: Item.Implementation | ActivityMixin.AnyActivity,
    config?: UsesField.RechargeRollProcessConfiguration,
    dialog?: dnd5e.types.BasicRollDialogConfiguration,
    message?: dnd5e.types.BasicRollMessageConfiguration
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
        period: foundry.data.fields.StringField<{ initial: "lr" }>,
        type: foundry.data.fields.StringField<{ initial: "recoverAll" }>,
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
  > = dnd5e.types.DeepMerge<
    foundry.data.fields.SchemaField.Internal.InitializedType<GetSchema<Fields>, Opts>,
    {
      recovery: {
        recharge?: {
          options: dnd5e.types.FormSelectOption[]
        }
      }[],
      rollRecharge: typeof UsesField['rollRecharge']
    }
  >
  type PersistedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
    GetSchema<Fields>,
    Opts
  >


  interface RechargeRollProcessConfiguration extends dnd5e.types.BasicRollConfiguration {
    apply?: boolean
  }
}

export default UsesField