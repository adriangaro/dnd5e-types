/**
 * Data model for activities.
 *
 * At runtime an activity is a plain `foundry.abstract.DataModel` pseudo-document. In TYPES we model
 * it on `foundry.abstract.TypeDataModel` (Schema, Parent=Item, BaseData, DerivedData) — even though
 * it doesn't extend it at runtime — so the imperative `prepareData`/`prepareFinalData` outputs are
 * expressed as a `DerivedData` overlay that auto-surfaces on the instance (including nested key
 * replacement like `save.dc.value`), exactly like the actor models. This file is ONLY the data model
 * (schema + derived); the pseudo-document behavior is layered by `ActivityMixin` in
 * `documents/activity/mixin.d.mts`, and concrete documents are `ActivityMixin(BaseXActivityData)`.
 */

declare global {
  namespace dnd5e.types.Activity {
    /** The 14 shared fields every activity carries (base-activity.mjs defineSchema). */
    interface BaseSchema extends foundry.data.fields.DataSchema {
      _id: foundry.data.fields.DocumentIdField;
      type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Activity.TypeKey, { required: true; blank: false; readOnly: true }>;
      name: foundry.data.fields.StringField;
      img: foundry.data.fields.FilePathField<{ categories: ["IMAGE"]; base64: false }>;
      sort: foundry.data.fields.IntegerSortField;
      activation: dnd5e.types.fields.ActivationField<{ override: foundry.data.fields.BooleanField }>;
      consumption: foundry.data.fields.SchemaField<{
        scaling: foundry.data.fields.SchemaField<{
          allowed: foundry.data.fields.BooleanField;
          max: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        }>;
        spellSlot: foundry.data.fields.BooleanField<{ initial: true }>;
        targets: dnd5e.types.fields.ConsumptionTargetsField;
      }>;
      description: foundry.data.fields.SchemaField<{
        chatFlavor: foundry.data.fields.StringField;
        value: foundry.data.fields.HTMLField;
      }>;
      duration: dnd5e.types.fields.DurationField<{
        concentration: foundry.data.fields.BooleanField;
        override: foundry.data.fields.BooleanField;
      }>;
      effects: foundry.data.fields.ArrayField<dnd5e.types.fields.AppliedEffectField>;
      flags: foundry.data.fields.DocumentFlagsField<"Item">;
      range: dnd5e.types.fields.RangeField<{ override: foundry.data.fields.BooleanField }>;
      target: dnd5e.types.fields.TargetField<{
        override: foundry.data.fields.BooleanField;
        prompt: foundry.data.fields.BooleanField<{ initial: true }>;
      }>;
      uses: dnd5e.types.fields.UsesField;
      visibility: foundry.data.fields.SchemaField<{
        identifier: dnd5e.types.fields.IdentifierField;
        level: foundry.data.fields.SchemaField<{
          min: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
          max: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
        }>;
        requireAttunement: foundry.data.fields.BooleanField;
        requireIdentification: foundry.data.fields.BooleanField;
        requireMagic: foundry.data.fields.BooleanField;
      }>;
    }

    /** prepareData/prepareFinalData outputs shared by all activities. */
    interface BaseDerived extends fvttUtils.AnyObject {
      labels: Record<string, string>;
    }

    interface Metadata {
      name: string;
      label: string;
      type: string;
      img: string;
      title: string;
      hint?: string;
      usage: {
        actions: Record<string, unknown>;
        chatCard: string;
        dialog: typeof dnd5e.applications.activity.ActivityUsageDialog;
      };
    }
  }
}

declare class BaseActivityData<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Activity.BaseSchema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = dnd5e.types.Activity.BaseDerived,
  // Parent pinned to abstract `Document.Any`, NOT concrete `Item.Implementation` — see the identical
  // cycle-break on BaseAdvancementData. An activity lives in an item's `system.activities`
  // collection, so a concrete item parent loops back through `Item.system` and trips tsc's recursion
  // limiter when a consumer registers a new activity type. tsgo tolerates it; this keeps tsc clean.
> extends foundry.abstract.TypeDataModel<Schema, foundry.abstract.Document.Any, BaseData, DerivedData> {
  // Loose return (like the advancement base) so subtypes that DELETE base keys (forward, cast) still
  // produce a `defineSchema` override assignable to this one. The real per-type schema is recovered
  // via `SchemaOf<T>` off each concrete override.
  static override defineSchema(): foundry.data.fields.DataSchema;

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The primary ability for this activity that will be available as `@mod` in roll data.
   */
  get ability(): string | null;

  /**
   * Helper property to translate this activity type into the old `actionType`.
   */
  get actionType(): string;

  /** A specific set of activation-specific labels displayed in chat cards. */
  get activationLabels(): object | null;

  /** Effects that can be applied from this activity. */
  get applicableEffects(): ActiveEffect.Implementation[] | null;

  /** Can consumption scaling be configured? */
  get canConfigureScaling(): boolean;

  /** Is scaling possible with this activity? */
  get canScale(): boolean;

  /** Can this activity's damage be scaled? */
  get canScaleDamage(): boolean;

  /** Is this activity a rider for a non-applied enchantment? */
  get isRider(): boolean;

  /** Is this activity on a spell scroll that is scaled. */
  get isScaledScroll(): boolean;

  /**
   * Is this activity on a spell?
   */
  get isSpell(): boolean;

  /**
   * Determine the level used to determine visibility limits, based on the spell level for spells or either the
   * character or class level, depending on whether `classIdentifier` is set.
   */
  get relevantLevel(): number;

  /** Does this activity or its item require concentration? */
  get requiresConcentration(): boolean;

  /** Does activating this activity consume a spell slot? */
  get requiresSpellSlot(): boolean;

  /** Retrieve the spellcasting ability that can be used with this activity. */
  get spellcastingAbility(): dnd5e.types.Ability.TypeKey | null;

  /* -------------------------------------------- */
  /*  Data Migration                              */
  /* -------------------------------------------- */

  static override LOCALIZATION_PREFIXES: string[];

  /** Static ID used for the automatically generated activity created during migration. */
  static INITIAL_ID: string;

  /**
   * Migrate data from the item to a newly created activity.
   * @param source              Item's candidate source data.
   * @param options
   * @param options.offset      Adjust the default ID using this number when creating multiple activities.
   */
  static createInitialActivity(source: object, options?: { offset?: number }): void;

  /**
   * Fetch data from the item source and transform it into an activity's activation object.
   * @param source    Item's candidate source data to transform.
   * @param options   Additional options passed to the creation process.
   * @returns         Creation data for new activity.
   */
  static transformActivationData(source: object, options: object): object;

  /**
   * Fetch data from the item source and transform it into an activity's consumption object.
   * @param source    Item's candidate source data to transform.
   * @param options   Additional options passed to the creation process.
   * @returns         Creation data for new activity.
   */
  static transformConsumptionData(source: object, options: object): object;

  /**
   * Transform an old damage part into the new damage part format.
   * @param source   Item's candidate source data to transform.
   * @param part     The damage part to transform.
   * @returns        Creation data for new activity.
   */
  static transformDamagePartData(source: object, part: [string, string]): object;

  /**
   * Fetch data from the item source and transform it into an activity's description object.
   * @param source    Item's candidate source data to transform.
   * @param options   Additional options passed to the creation process.
   * @returns         Creation data for new activity.
   */
  static transformDescriptionData(source: object, options: object): object;

  /**
   * Fetch data from the item source and transform it into an activity's duration object.
   * @param source    Item's candidate source data to transform.
   * @param options   Additional options passed to the creation process.
   * @returns         Creation data for new activity.
   */
  static transformDurationData(source: object, options: object): object;

  /**
   * Fetch data from the item source and transform it into an activity's effects array.
   * @param source    Item's candidate source data to transform.
   * @param options   Additional options passed to the creation process.
   * @returns         Creation data for new activity.
   */
  static transformEffectsData(source: object, options: object): object[];

  /**
   * Fetch data from the item source and transform it into an activity's range object.
   * @param source    Item's candidate source data to transform.
   * @param options   Additional options passed to the creation process.
   * @returns         Creation data for new activity.
   */
  static transformRangeData(source: object, options: object): object;

  /**
   * Fetch data from the item source and transform it into an activity's target object.
   * @param source    Item's candidate source data to transform.
   * @param options   Additional options passed to the creation process.
   * @returns         Creation data for new activity.
   */
  static transformTargetData(source: object, options: object): object;

  /**
   * Perform any type-specific data transformations. Override seam for subclasses.
   * @param source        Item's candidate source data to transform.
   * @param activityData  In progress creation data.
   * @param options       Additional options passed to the creation process.
   * @returns             Creation data for new activity.
   */
  static transformTypeData(source: object, activityData: object, options: object): object;

  /**
   * Fetch data from the item source and transform it into an activity's uses object.
   * @param source    Item's candidate source data to transform.
   * @param options   Additional options passed to the creation process.
   * @returns         Creation data for new activity.
   */
  static transformUsesData(source: object, options: object): object;

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare data related to this activity.
   */
  prepareData(): void;

  /**
   * Perform final preparation after containing item is prepared.
   * @param rollData  Deterministic roll data from the activity.
   */
  prepareFinalData(rollData?: dnd5e.types.documents.ActivityRollData): void;

  /**
   * Prepare the label for a compiled and simplified damage formula.
   * @param rollData  Deterministic roll data from the item.
   */
  prepareDamageLabel(rollData: dnd5e.types.documents.ActivityRollData): void;

  /**
   * Prepare context to display this activity in a parent sheet.
   */
  prepareSheetContext(): object;

  /* -------------------------------------------- */
  /*  Socket Event Handlers                       */
  /* -------------------------------------------- */

  /**
   * Perform preliminary operations before an Activity is created.
   * A return value of false indicates the creation operation should be cancelled.
   * @param data  The initial data object provided to the document creation request.
   * @protected
   */
  protected override _preCreate(data: object, options: object, user: globalThis.User.Implementation): Promise<boolean | void>;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Retrieve the action type reflecting changes based on the provided attack mode.
   * @param attackMode
   */
  getActionType(attackMode?: string): dnd5e.types.ItemActionType.TypeKey;

  /**
   * Get the roll parts used to create the damage rolls.
   * @param config          Existing damage configuration to merge into this one.
   * @param options         Damage configuration options.
   */
  getDamageConfig(
    config?: Partial<dnd5e.types.Dice.DamageRollProcessConfiguration>,
    options?: {
      formulaOptions?: Partial<dnd5e.types.data.shared.DamageFormulaOptions>;
      rollData?: dnd5e.types.documents.ActivityRollData;
    },
  ): dnd5e.types.Dice.DamageRollProcessConfiguration;

  /**
   * Process a single damage part into a roll configuration.
   * @param damage      Damage to prepare for the roll.
   * @param rollConfig  Roll configuration being built.
   * @param rollData    Roll data to populate with damage data.
   * @param index       Index of the damage part.
   * @param options     Options to configure the formula.
   * @protected
   */
  protected _processDamagePart(
    damage: object,
    rollConfig: Partial<dnd5e.types.Dice.DamageRollProcessConfiguration>,
    rollData: dnd5e.types.documents.ActivityRollData,
    index?: number,
    options?: Partial<dnd5e.types.data.shared.DamageFormulaOptions>,
  ): dnd5e.types.Dice.DamageRollConfiguration;

  /**
   * Remap a UUID or identifier in a consumption target to the ID of an item on the actor.
   * @param target
   * @internal
   */
  _remapConsumptionTarget(target: string): string;

  /**
   * Add a `canOverride` property to the provided object and, if `override` is false, replace the
   * data on the activity with data from the item.
   * @param keyPath  Path of the property to set on the activity.
   * @param item     Item to act as the source of the override.
   * @internal
   */
  _setOverride(keyPath: string, item?: Item.Implementation): void;
}

declare namespace BaseActivityData {
  interface Any extends BaseActivityData<foundry.data.fields.DataSchema, fvttUtils.AnyObject, fvttUtils.AnyObject> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof BaseActivityData> {}
}

export default BaseActivityData;
