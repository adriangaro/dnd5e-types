import type ActivityMixin from "@dnd5e/module/documents/activity/mixin.mjs"

export class ConsumptionTargetData extends foundry.abstract.DataModel<{
  type: dnd5e.types.fields.RestrictedStringField<
    dnd5e.types.ActivityConsumption.TypeKey
  >,
  target: foundry.data.fields.StringField,
  value: dnd5e.dataModels.fields.FormulaField,
  scaling: foundry.data.fields.SchemaField<{
    mode: foundry.data.fields.StringField,
    formula: dnd5e.dataModels.fields.FormulaField
  }>
}> {
  get activity(): dnd5e.types.Activity.Any
  /* -------------------------------------------- */

  /**
   * Actor containing this consumption target, if embedded.
   */
  get actor(): Actor.Implementation

  /* -------------------------------------------- */

  /**
   * Should this consumption only be performed during initiative? This will return `true` if consuming activity or item
   * uses and those uses only recover on "combat" periods.
   */
  get combatOnly(): boolean

  /* -------------------------------------------- */

  /**
   * Item to which this consumption target's activity belongs.
   */
  get item(): Item.Implementation

  /* -------------------------------------------- */

  /**
   * List of valid targets within the current context.
   */
  get validTargets(): dnd5e.types.FormSelectOption[] | null

  /* -------------------------------------------- */
  /*  Consumption                                 */
  /* -------------------------------------------- */

  /**
   * Perform consumption according to the target type.
   */
  consume(
    config: dnd5e.types.Activity.UseConfiguration,
    updates: dnd5e.types.Activity.UsageUpdates
  ): Promise<void>
  /* -------------------------------------------- */

  /**
   * Prepare consumption updates for "Activity Uses" consumption type.
   */
  static consumeActivityUses(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    updates: dnd5e.types.Activity.UsageUpdates
  ): Promise<void>

  /* -------------------------------------------- */

  /**
   * Prepare consumption updates for "Attribute" consumption type.
   */
  static consumeAttribute(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    updates: dnd5e.types.Activity.UsageUpdates
  ): Promise<void>

  /* -------------------------------------------- */

  /**
   * Prepare consumption updates for "Hit Dice" consumption type.
   */
  static consumeHitDice(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    updates: dnd5e.types.Activity.UsageUpdates
  ): Promise<void>

  /* -------------------------------------------- */

  /**
   * Prepare consumption updates for "Item Uses" consumption type.
   */
  static consumeItemUses(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    updates: dnd5e.types.Activity.UsageUpdates
  ): Promise<void>

  /* -------------------------------------------- */

  /**
   * Prepare consumption updates for "Material" consumption type.
   */
  static consumeMaterial(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    updates: dnd5e.types.Activity.UsageUpdates
  ): Promise<void>

  /* -------------------------------------------- */

  /**
   * Prepare consumption updates for "Spell Slots" consumption type.
   */
  static consumeSpellSlots(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    updates: dnd5e.types.Activity.UsageUpdates
  ): Promise<void>

  /* -------------------------------------------- */

  /**
   * Calculate updates to activity or item uses.
   * @internal
   */
  _usesConsumption(
    config: dnd5e.types.Activity.UseConfiguration,
    options: {
      uses: dnd5e.types.UsesData,
      type: string,
      rolls: dnd5e.dice.BasicRoll[],
      delta: object
    }
  ): Promise<{ spent: number, quantity: number } | null | undefined>

  /* -------------------------------------------- */
  /*  Consumption Hints                           */
  /* -------------------------------------------- */

  /**
   * Create label and hint text indicating how much of this resource will be consumed/recovered.
   */
  getConsumptionLabels(
    config: dnd5e.types.Activity.UseConfiguration,
    options?: {
      consumed?: boolean
    }
  ): ConsumptionTargetsField.ConsumptionLabels

  /* -------------------------------------------- */

  /**
   * Create hint text indicating how much of this resource will be consumed/recovered.
   */
  static consumptionLabelsActivityUses(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    options?: {
      consumed?: boolean
    }
  ): ConsumptionTargetsField.ConsumptionLabels

  /* -------------------------------------------- */

  /**
   * Create hint text indicating how much of this resource will be consumed/recovered.
   */
  static consumptionLabelsAttribute(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    options?: {
      consumed?: boolean
    }
  ): ConsumptionTargetsField.ConsumptionLabels

  /* -------------------------------------------- */

  /**
   * Create hint text indicating how much of this resource will be consumed/recovered.
   */
  static consumptionLabelsHitDice(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    options?: {
      consumed?: boolean
    }
  ): ConsumptionTargetsField.ConsumptionLabels

  /* -------------------------------------------- */

  /**
   * Create hint text indicating how much of this resource will be consumed/recovered.
   */
  static consumptionLabelsItemUses(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    options?: {
      consumed?: boolean
    }
  ): ConsumptionTargetsField.ConsumptionLabels

  /* -------------------------------------------- */

  /**
   * Create hint text indicating how much of this resource will be consumed/recovered.
   */
  static consumptionLabelsMaterial(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    options?: {
      consumed?: boolean
    }
  ): ConsumptionTargetsField.ConsumptionLabels

  /* -------------------------------------------- */

  /**
   * Create hint text indicating how much of this resource will be consumed/recovered.
   */
  static consumptionLabelsSpellSlots(
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    options?: {
      consumed?: boolean
    }
  ): ConsumptionTargetsField.ConsumptionLabels

  /* -------------------------------------------- */

  /**
   * Resolve the cost for the consumption hint.
   * @internal
   */
  _resolveHintCost(
    config: dnd5e.types.Activity.UseConfiguration
  ): { cost: string, simplifiedCost: number, increaseKey: string, pluralRule: string }
  /* -------------------------------------------- */
  /*  Valid Targets                               */
  /* -------------------------------------------- */

  /**
   * Generate a list of targets for the "Attribute" consumption type.
   */
  static validAttributeTargets(
    this: ConsumptionTargetData
  ): dnd5e.types.FormSelectOption[]

  /* -------------------------------------------- */

  /**
   * Generate a list of targets for the "Hit Dice" consumption type.
   */
  static validHitDiceTargets(
    this: ConsumptionTargetData
  ): dnd5e.types.FormSelectOption[]

  /* -------------------------------------------- */

  /**
   * Generate a list of targets for the "Item Uses" consumption type.
   */
  static validItemUsesTargets(
    this: ConsumptionTargetData
  ): dnd5e.types.FormSelectOption[]

  /* -------------------------------------------- */

  /**
   * Generate a list of targets for the "Material" consumption type.
   */
  static validMaterialTargets(
    this: ConsumptionTargetData
  ): dnd5e.types.FormSelectOption[]

  /* -------------------------------------------- */

  /**
   * Generate a list of targets for the "Spell Slots" consumption type.
   */
  static validSpellSlotsTargets(
    this: ConsumptionTargetData
  ): dnd5e.types.FormSelectOption[]

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Resolve the amount to consume, taking scaling into account.
   */
  resolveCost(options?: {
    config?: dnd5e.types.Activity.UseConfiguration,
    evaluate?: false,
    rolls?: dnd5e.dice.BasicRoll[]
  }): dnd5e.dice.BasicRoll
  resolveCost(options?: {
    config?: dnd5e.types.Activity.UseConfiguration,
    evaluate?: true,
    rolls?: dnd5e.dice.BasicRoll[]
  }): Promise<dnd5e.dice.BasicRoll>
  resolveCost(options?: {
    config?: dnd5e.types.Activity.UseConfiguration,
    evaluate?: boolean,
    rolls?: dnd5e.dice.BasicRoll[]
  }): Promise<dnd5e.dice.BasicRoll> | dnd5e.dice.BasicRoll

  /* -------------------------------------------- */

  /**
   * Resolve the spell level to consume, taking scaling into account.
   */
  resolveLevel(options?: {
    config?: dnd5e.types.Activity.UseConfiguration,
    rolls?: dnd5e.dice.BasicRoll[]
  }): number

  /* -------------------------------------------- */

  /**
   * Resolve a scaling consumption value formula.
   * @internal
   */
  _resolveScaledRoll(
    formula: string,
    scaling: number,
    options?: {
      delta: object,
      evaluate: true,
      rolls: dnd5e.dice.BasicRoll[]
    }
  ): Promise<dnd5e.dice.BasicRoll>
  _resolveScaledRoll(
    formula: string,
    scaling: number,
    options?: {
      delta: object,
      evaluate: false,
      rolls: dnd5e.dice.BasicRoll[]
    }
  ): dnd5e.dice.BasicRoll
  _resolveScaledRoll(
    formula: string,
    scaling: number,
    options?: {
      delta: object,
      evaluate: boolean,
      rolls: dnd5e.dice.BasicRoll[]
    }
  ): Promise<dnd5e.dice.BasicRoll> | dnd5e.dice.BasicRoll
}

declare class ConsumptionTargetsField<
  const Options extends ConsumptionTargetsField.AnyOptions = ConsumptionTargetsField.DefaultOptions<
    ConsumptionTargetsField.AssignmentElementType<
      foundry.data.fields.EmbeddedDataField<typeof ConsumptionTargetData>
    >
  >,
> extends foundry.data.fields.ArrayField<
  foundry.data.fields.EmbeddedDataField<typeof ConsumptionTargetData>,
  Options
> {
  constructor(options: Options)
}

declare namespace ConsumptionTargetsField {
  export import AnyOptions = foundry.data.fields.ArrayField.AnyOptions
  export import DefaultOptions = foundry.data.fields.ArrayField.DefaultOptions
  export import AssignmentElementType = foundry.data.fields.ArrayField.AssignmentElementType


  export type ConsumptionConsumeFunction = (
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    updates: dnd5e.types.Activity.UsageUpdates
  ) => any

  export type ConsumptionLabelsFunction = (
    this: ConsumptionTargetData,
    config: dnd5e.types.Activity.UseConfiguration,
    options?: {
      consumed?: boolean | undefined;
    } | undefined
  ) => ConsumptionLabels

  export type ConsumptionLabels = {
    label: string;
    hint: string;
    notes?: {
      type: string;
      message: string;
    } | undefined;
    warn?: boolean | undefined;
  }

  export type ConsumptionValidTargetsFunction = (
    this: ConsumptionTargetData
  ) => dnd5e.types.FormSelectOption[]

}

declare global {
  namespace dnd5e.types {
    namespace ActivityConsumption {
      interface DefaultActivityConsumptionTypes {
        activityUses: true
        attribute: true
        hitDice: true
        itemUses: true
        material: true
        spellSlots: true
      }
      interface OverrideTypes extends Record<string, boolean | never> {

      }

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultActivityConsumptionTypes,
        OverrideTypes
      >

      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      type ConsumptionLabels = {
        label: string,
        hint: string,
        notes?: {
          type: string,
          message: string
        },
        warn?: boolean
      }

      type ActivityConsumptionConfig = {
        consume: (
          this: ConsumptionTargetData,
          config: dnd5e.types.Activity.UseConfiguration,
          updates: dnd5e.types.Activity.UsageUpdates
        ) => Promise<void>,
        consumptionLabels: (
          this: ConsumptionTargetData,
          config: dnd5e.types.Activity.UseConfiguration,
          options?: {
            consumed: boolean
          }
        ) => ConsumptionLabels,
        label: string,
        targetRequiresEmbedded?: boolean
        validTargets?: (
          this: ConsumptionTargetData,
        ) => dnd5e.types.FormSelectOption[]
      }

    }

    interface DND5EConfig {
      activityConsumptionTypes: {
        [K in dnd5e.types.ActivityConsumption.TypeKey]: dnd5e.types.ActivityConsumption.ActivityConsumptionConfig
      }
    }
  }
}



export default ConsumptionTargetsField

export declare class ConsumptionError extends Error {
  name: 'ConsumptionError'
}