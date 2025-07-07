import FormulaField from "../fields/formula-field.mjs";
import ActivationField from "../shared/activation-field.mjs";
import DurationField from "../shared/duration-field.mjs";
import RangeField from "../shared/range-field.mjs";
import TargetField from "../shared/target-field.mjs";
import UsesField from "../shared/uses-field.mjs";
import AppliedEffectField from "./fields/applied-effect-field.mjs";
import ConsumptionTargetsField from "./fields/consumption-targets-field.mjs";
export type DamageIndexesPrep = {
  damage: foundry.data.fields.SchemaField<
    {},
    foundry.data.fields.SchemaField.DefaultOptions,
    {},
    {
      parts: {
        _index: number
      }[]
    }
  >
}

/**
 * Data model for activities.
 */
declare class BaseActivityData<
  Type extends string = string,
  Schema extends foundry.data.fields.DataSchema = {}
> extends foundry.abstract.DataModel<
  dnd5e.types.FilterNever<
    dnd5e.types.MergeSchemas<
      dnd5e.types.MergeSchemas<
        {
          _id: foundry.data.fields.DocumentIdField<{ initial: () => string }>,
          type: foundry.data.fields.StringField<
            {
              blank: false, required: true, readOnly: true, initial: () => string
            },
            Type
          >,
          name: foundry.data.fields.StringField<{ initial: undefined }>,
          img: foundry.data.fields.FilePathField<{ initial: undefined, categories: ["IMAGE"], base64: false }>,
          sort: foundry.data.fields.IntegerSortField,
          activation: ActivationField<{
            override: foundry.data.fields.BooleanField
          }>,
          consumption: foundry.data.fields.SchemaField<{
            scaling: foundry.data.fields.SchemaField<{
              allowed: foundry.data.fields.BooleanField,
              max: FormulaField<{ deterministic: true }>
            }>,
            spellSlot: foundry.data.fields.BooleanField<{ initial: true }>,
            targets: ConsumptionTargetsField
          }>,
          description: foundry.data.fields.SchemaField<{
            chatFlavor: foundry.data.fields.StringField
          }>,
          duration: DurationField<{
            concentration: foundry.data.fields.BooleanField,
            override: foundry.data.fields.BooleanField
          }>,
          effects: foundry.data.fields.ArrayField<AppliedEffectField>,
          range: RangeField<{
            override: foundry.data.fields.BooleanField
          }>,
          target: TargetField<{
            override: foundry.data.fields.BooleanField,
            prompt: foundry.data.fields.BooleanField<{ initial: true }>
          }>,
          uses: UsesField
        },
        {
          consumption: foundry.data.fields.SchemaField<
            {},
            foundry.data.fields.SchemaField.DefaultOptions,
            {},
            {
              targets: {
                _index: number
              }[]
            }
          >
          effects: foundry.data.fields.ArrayField<
            AppliedEffectField,
            foundry.data.fields.ArrayField.DefaultOptions,
            foundry.data.fields.ArrayField.AssignmentElementType<AppliedEffectField>,
            foundry.data.fields.ArrayField.InitializedElementType<AppliedEffectField> & {
              _index: number
            }
          >
          uses: foundry.data.fields.SchemaField<
            {},
            foundry.data.fields.SchemaField.DefaultOptions,
            {},
            {
              recovery: {
                _index: number
              }[]
            }
          >
        }
      >,
      Schema
    >
  >,
  null
> {
  type: Type;
  labels: Record<
    string,
    string
  >;
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The primary ability for this activity that will be available as `@mod` in roll data.
   */
  get ability(): dnd5e.types.Ability.TypeKey | null

  /* -------------------------------------------- */

  /**
   * Helper property to translate this activity type into the old `actionType`.
   */
  get actionType(): string

  /* -------------------------------------------- */

  /**
   * A specific set of activation-specific labels displayed in chat cards.
   */
  get activationLabels(): {
    activation: string,
    duration: string,
    range: string,
    reach: string,
    target: string
  } | null

  /* -------------------------------------------- */

  /**
   * Effects that can be applied from this activity.
   */
  get applicableEffects(): ActiveEffect.Implementation[] | null

  /* -------------------------------------------- */

  /**
   * Can consumption scaling be configured?
   */
  get canConfigureScaling(): boolean

  /* -------------------------------------------- */

  /**
   * Is scaling possible with this activity?
   */
  get canScale(): boolean

  /* -------------------------------------------- */

  /**
   * Can this activity's damage be scaled?
   */
  get canScaleDamage(): boolean

  /* -------------------------------------------- */

  /**
   * Is this activity on a spell scroll that is scaled.
   */
  get isScaledScroll(): boolean

  /* -------------------------------------------- */

  /**
   * Is this activity on a spell?
   */
  get isSpell(): boolean

  /* -------------------------------------------- */

  /**
   * Does this activity or its item require concentration?
   */
  get requiresConcentration(): boolean

  /* -------------------------------------------- */

  /**
   * Does activating this activity consume a spell slot?
   */
  get requiresSpellSlot(): boolean

  /* -------------------------------------------- */

  /**
   * Retrieve the spellcasting ability that can be used with this activity.
   */
  get spellcastingAbility(): dnd5e.types.Ability.TypeKey | null

  /* -------------------------------------------- */
  /*  Data Migrations                             */
  /* -------------------------------------------- */

  /**
   * Static ID used for the automatically generated activity created during migration.
   */
  static INITIAL_ID: string

  /* -------------------------------------------- */

  /**
   * Migrate data from the item to a newly created activity.
   */
  static createInitialActivity(source: Item.Implementation['_source'], options?: {
    offset: number
  })

  /* -------------------------------------------- */

  /**
   * Fetch data from the item source and transform it into an activity's activation object.
   */
  static transformActivationData(source: Item.Implementation['_source'], options: object): BaseActivityData['activation']

  /* -------------------------------------------- */

  /**
   * Fetch data from the item source and transform it into an activity's consumption object.
   */
  static transformConsumptionData(source: Item.Implementation['_source'], options: object): BaseActivityData['consumption']

  /* -------------------------------------------- */

  /**
   * Transform an old damage part into the new damage part format.
   */
  static transformDamagePartData(source: Item.Implementation['_source'], [formula, type]: [string, string]): object
  /* -------------------------------------------- */

  /**
   * Fetch data from the item source and transform it into an activity's description object.
   */
  static transformDescriptionData(source: Item.Implementation['_source'], options: object): BaseActivityData['description']

  /* -------------------------------------------- */

  /**
   * Fetch data from the item source and transform it into an activity's duration object.
   */
  static transformDurationData(source: Item.Implementation['_source'], options: object): BaseActivityData['duration']

  /* -------------------------------------------- */

  /**
   * Fetch data from the item source and transform it into an activity's effects array.
   */
  static transformEffectsData(source: Item.Implementation['_source'], options: object): BaseActivityData['effects']

  /* -------------------------------------------- */

  /**
   * Fetch data from the item source and transform it into an activity's range object.
   */
  static transformRangeData(source: Item.Implementation['_source'], options: object): BaseActivityData['range']

  /* -------------------------------------------- */

  /**
   * Fetch data from the item source and transform it into an activity's target object.
   */
  static transformTargetData(source: Item.Implementation['_source'], options: object): BaseActivityData['target']

  /* -------------------------------------------- */

  /**
   * Perform any type-specific data transformations.
   */
  static transformTypeData(source: Item.Implementation['_source'], activityData: object, options: object): object

  /* -------------------------------------------- */

  /**
   * Fetch data from the item source and transform it into an activity's uses object.
   */
  static transformUsesData(source: Item.Implementation['_source'], options: object): BaseActivityData['uses']

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare context to display this activity in a parent sheet.
   */
  prepareSheetContext(): this

  /* -------------------------------------------- */

  _inferredSource: this['_source']
  /**
   * Prepare data related to this activity.
   */
  prepareData()
  // prepareData() {
  //   this.name = this.name || game.i18n.localize(this.metadata?.title);
  //   this.img = this.img || this.metadata?.img;
  //   this.labels ??= {};
  //   const addBaseIndices = data => data?.forEach((d, idx) => Object.defineProperty(d, "_index", { value: idx }));
  //   addBaseIndices(this.consumption?.targets);
  //   addBaseIndices(this.damage?.parts);
  //   addBaseIndices(this.effects);
  //   addBaseIndices(this.uses?.recovery);
  // }

  /* -------------------------------------------- */

  /**
   * Perform final preparation after containing item is prepared.
   * @param rollData  Deterministic roll data from the activity.
   */
  prepareFinalData(rollData: ReturnType<this['getRollData']>)
  /* -------------------------------------------- */

  
  getRollData(...args: any[]): any

  /**
   * Prepare the label for a compiled and simplified damage formula.
   * @param rollData  Deterministic roll data from the item.
   */

  prepareDamageLabel(rollData: ReturnType<this['getRollData']>): {
    formula: string,
    damageType: dnd5e.types.Damage.TypeKey | null,
    label: string,
    base: object
  }
  /**
   * @deprecated
   */
  prepareDamageLabel(parts: dnd5e.types.Damage.Data[], rollData: ReturnType<this['getRollData']>): {
    formula: string,
    damageType: dnd5e.types.Damage.TypeKey | null,
    label: string,
    base: object
  }

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Retrieve the action type reflecting changes based on the provided attack mode.
   */
  getActionType(attackMode?: string): "mwak" | "rwak" | "msak" | "rsak"

  /* -------------------------------------------- */

  /**
   * Get the roll parts used to create the damage rolls.
   * @param config  Existing damage configuration to merge into this one.
   * @param options Damage configuration options.
   * @param options.rollData Use pre-existing roll data.
   */
  getDamageConfig(
    config?: Partial<dnd5e.dice.DamageRoll.ProcessConfiguration>,
    options?: BaseActivityData.DamageConfigOptions<this>
  ): dnd5e.dice.DamageRoll.ProcessConfiguration

  /* -------------------------------------------- */

  /**
   * Process a single damage part into a roll configuration.
   * @param {DamageData} damage                                   Damage to prepare for the roll.
   * @param {Partial<DamageRollProcessConfiguration>} rollConfig  Roll configuration being built.
   * @param {object} rollData                                     Roll data to populate with damage data.
   * @param {number} [index=0]                                    Index of the damage part.
   * @returns {DamageRollConfiguration}
   * @protected
   */
  _processDamagePart(damage: dnd5e.types.Damage.Data, rollConfig: Partial<dnd5e.dice.DamageRoll.ProcessConfiguration>, rollData: ReturnType<dnd5e.types.GetKey<this, 'getRollData'>>, index?: number): dnd5e.dice.DamageRoll.Configuration

  /* -------------------------------------------- */

  /**
   * Add an `canOverride` property to the provided object and, if `override` is `false`, replace the data on the
   * activity with data from the item.
   * @internal
   */
  _setOverride(keyPath: string)
}

declare class AnyBaseActivityData extends BaseActivityData<string, {
  [k in keyof dnd5e.types.GetSchema<typeof BaseActivityData<string, {}>>]: never
}> {
  constructor(...args: any[])
}

declare namespace BaseActivityData {
  interface Any extends AnyBaseActivityData { }
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyBaseActivityData> { }

  interface DamageConfigOptions<This extends Any> {
    rollData?: ReturnType<This['getRollData']>
  }
}

export default BaseActivityData;