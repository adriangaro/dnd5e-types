import simplifyRollFormula from "../../dice/simplify-roll-formula.mjs";
import { safePropertyExists, staticID } from "../../utils.mjs";
import FormulaField from "../fields/formula-field.mjs";
import ActivationField from "../shared/activation-field.mjs";
import DurationField from "../shared/duration-field.mjs";
import RangeField from "../shared/range-field.mjs";
import TargetField from "../shared/target-field.mjs";
import UsesField from "../shared/uses-field.mjs";
import AppliedEffectField from "./fields/applied-effect-field.mjs";
import ConsumptionTargetsField from "./fields/consumption-targets-field.mjs";


/**
 * Data for effects that can be applied.
 *
 * @typedef {object} EffectApplicationData
 * @property {string} _id  ID of the effect to apply.
 */

/**
 * Data model for activities.
 */
export default class BaseActivityData<
  Schema extends foundry.data.fields.DataSchema = {}
> extends foundry.abstract.DataModel<
  dnd5e.types.MergeSchemas<
    {
      _id: foundry.data.fields.DocumentIdField<{ initial: () => string }>,
      type: foundry.data.fields.StringField<
        {
          blank: false, required: true, readOnly: true, initial: () => string
        },
        dnd5e.types.Activity.TypeKey, dnd5e.types.Activity.TypeKey, dnd5e.types.Activity.TypeKey
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
    Schema
  >,
  Item.Implementation
> {
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
  static transformConsumptionData(source: Item.Implementation['_source'], options: object):  BaseActivityData['consumption']

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

  /**
   * Prepare data related to this activity.
   */
  prepareData() {
    this.name = this.name || game.i18n.localize(this.metadata?.title);
    this.img = this.img || this.metadata?.img;
    this.labels ??= {};
    const addBaseIndices = data => data?.forEach((d, idx) => Object.defineProperty(d, "_index", { value: idx }));
    addBaseIndices(this.consumption?.targets);
    addBaseIndices(this.damage?.parts);
    addBaseIndices(this.effects);
    addBaseIndices(this.uses?.recovery);
  }

  /* -------------------------------------------- */

  /**
   * Perform final preparation after containing item is prepared.
   * @param {object} [rollData]  Deterministic roll data from the activity.
   */
  prepareFinalData(rollData) {
    rollData ??= this.getRollData({ deterministic: true });

    if (this.activation) this._setOverride("activation");
    if (this.duration) this._setOverride("duration");
    if (this.range) this._setOverride("range");
    if (this.target) this._setOverride("target");

    Object.defineProperty(this, "_inferredSource", {
      value: Object.freeze(this.toObject(false)),
      configurable: false,
      enumerable: false,
      writable: false
    });

    if (this.activation) ActivationField.prepareData.call(this, rollData, this.labels);
    if (this.duration) DurationField.prepareData.call(this, rollData, this.labels);
    if (this.range) RangeField.prepareData.call(this, rollData, this.labels);
    if (this.target) TargetField.prepareData.call(this, rollData, this.labels);
    if (this.uses) UsesField.prepareData.call(this, rollData, this.labels);

    const actor = this.item.actor;
    if (!actor || !("consumption" in this)) return;
    for (const target of this.consumption.targets) {
      if (!["itemUses", "material"].includes(target.type) || !target.target) continue;

      // Re-link UUIDs in consumption fields to explicit items on the actor
      if (target.target.includes(".")) {
        const item = actor.sourcedItems?.get(target.target, { legacy: false })?.first();
        if (item) target.target = item.id;
      }

      // If targeted item isn't found, display preparation warning
      if (!actor.items.get(target.target)) {
        const message = game.i18n.format("DND5E.CONSUMPTION.Warning.MissingItem", {
          activity: this.name, item: this.item.name
        });
        actor._preparationWarnings.push({ message, link: this.uuid, type: "warning" });
      }
    }
  }

  /* -------------------------------------------- */

  /**
   * Prepare the label for a compiled and simplified damage formula.
   * @param {DamageData[]} parts  Damage parts to create labels for.
   * @param {object} rollData     Deterministic roll data from the item.
   */
  prepareDamageLabel(parts, rollData) {
    this.labels.damage = parts.map((part, index) => {
      let formula;
      try {
        formula = part.formula;
        if (part.base) {
          if (this.item.system.magicAvailable) formula += ` + ${this.item.system.magicalBonus ?? 0}`;
          if ((this.item.type === "weapon") && !/@mod\b/.test(formula)) formula += " + @mod";
        }
        if (!index && this.item.system.damageBonus) formula += ` + ${this.item.system.damageBonus}`;
        const roll = new CONFIG.Dice.BasicRoll(formula, rollData);
        roll.simplify();
        formula = simplifyRollFormula(roll.formula, { preserveFlavor: true });
      } catch (err) {
        console.warn(`Unable to simplify formula for ${this.name} in item ${this.item.name}${this.actor ? ` on ${this.actor.name} (${this.actor.id})` : ""
          } (${this.uuid})`, err);
      }

      let label = formula;
      if (part.types.size) {
        label = `${formula} ${game.i18n.getListFormatter({ type: "conjunction" }).format(
          Array.from(part.types)
            .map(p => CONFIG.DND5E.damageTypes[p]?.label ?? CONFIG.DND5E.healingTypes[p]?.label)
            .filter(t => t)
        )}`;
      }

      return { formula, damageType: part.types.size === 1 ? part.types.first() : null, label, base: part.base };
    });
  }

  /* -------------------------------------------- */
  /*  Socket Event Handlers                       */
  /* -------------------------------------------- */

  /**
   * Perform preliminary operations before an Activity is created.
   * @param {object} data     The initial data object provided to the document creation request.
   * @returns {boolean|void}  A return value of false indicates the creation operation should be cancelled.
   * @protected
   */
  _preCreate(data) { }

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Retrieve the action type reflecting changes based on the provided attack mode.
   * @param {string} [attackMode=""]
   * @returns {string}
   */
  getActionType(attackMode = "") {
    let actionType = this.actionType;
    if ((actionType === "mwak") && (attackMode?.startsWith("thrown") || (attackMode === "ranged"))) return "rwak";
    return actionType;
  }

  /* -------------------------------------------- */

  /**
   * Get the roll parts used to create the damage rolls.
   * @param {Partial<DamageRollProcessConfiguration>} [config={}]
   * @returns {DamageRollProcessConfiguration}
   */
  getDamageConfig(config = {}) {
    if (!this.damage?.parts) return foundry.utils.mergeObject({ rolls: [] }, config);

    const rollConfig = foundry.utils.deepClone(config);
    const rollData = this.getRollData();
    rollConfig.rolls = this.damage.parts
      .map((d, index) => this._processDamagePart(d, rollConfig, rollData, index))
      .filter(d => d.parts.length)
      .concat(config.rolls ?? []);

    return rollConfig;
  }

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
  _processDamagePart(damage, rollConfig, rollData, index = 0) {
    const scaledFormula = damage.scaledFormula(rollConfig.scaling ?? rollData.scaling);
    const parts = scaledFormula ? [scaledFormula] : [];
    const data = { ...rollData };

    if (index === 0) {
      const actionType = this.getActionType(rollConfig.attackMode);
      const bonus = foundry.utils.getProperty(this.actor ?? {}, `system.bonuses.${actionType}.damage`);
      if (bonus && !/^0+$/.test(bonus)) parts.push(bonus);
      if (this.item.system.damageBonus) parts.push(String(this.item.system.damageBonus));
    }

    const lastType = this.item.getFlag("dnd5e", `last.${this.id}.damageType.${index}`);

    return {
      data, parts,
      options: {
        type: (damage.types.has(lastType) ? lastType : null) ?? damage.types.first(),
        types: Array.from(damage.types),
        properties: Array.from(this.item.system.properties ?? [])
          .filter(p => CONFIG.DND5E.itemProperties[p]?.isPhysical)
      }
    };
  }

  /* -------------------------------------------- */

  /**
   * Add an `canOverride` property to the provided object and, if `override` is `false`, replace the data on the
   * activity with data from the item.
   * @param {string} keyPath  Path of the property to set on the activity.
   * @internal
   */
  _setOverride(keyPath) {
    const obj = foundry.utils.getProperty(this, keyPath);
    Object.defineProperty(obj, "canOverride", {
      value: safePropertyExists(this.item.system, keyPath),
      configurable: true,
      enumerable: false
    });
    if (obj.canOverride && !obj.override) {
      foundry.utils.mergeObject(obj, foundry.utils.getProperty(this.item.system, keyPath));
    }
  }
}
