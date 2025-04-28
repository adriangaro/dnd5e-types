import { ConsumptionTargetData } from "../../data/activity/fields/consumption-targets-field.mjs";
import UsesField from "../../data/shared/uses-field.mjs";
import PseudoDocumentSheet from "../api/pseudo-document-sheet.mjs";

/**
 * Default sheet for activities.
 */
declare class ActivitySheet<
  Document extends dnd5e.types.Activity.Any,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends PseudoDocumentSheet<
  Document,
  ActivitySheet.RenderContext<Document, RenderContext>,
  ActivitySheet.Configuration<Configuration>,
  ActivitySheet.RenderOptions<RenderOptions>

> {
  /* -------------------------------------------- */

  /**
   * Key paths to the parts of the submit data stored in arrays that will need special handling on submission.
   */
  static CLEAN_ARRAYS: string[]


  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The Activity associated with this application.
   */
  get activity(): Document

  /* -------------------------------------------- */

  /**
   * Expanded states for additional settings sections.
   */
  #expandedSections: Map<string, boolean>

  get expandedSections(): Map<string, boolean>

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */
  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the activation tab.
   * @param {ApplicationRenderContext} context  Context being prepared.
   * @returns {ApplicationRenderContext}
   * @protected
   */
  async _prepareActivationContext(context) {
    context.tab = context.tabs.activation;

    context.data = {};
    context.disabled = {};
    for (const field of ["activation", "duration", "range", "target", "uses"]) {
      if (!this.activity[field]) continue;
      context.data[field] = this.activity[field].override ? context.source[field] : context.inferred[field];
      context.disabled[field] = this.activity[field].canOverride && !this.activity[field].override;
    }

    context.activationTypes = [
      ...Object.entries(CONFIG.DND5E.activityActivationTypes).map(([value, config]) => ({
        value,
        label: game.i18n.localize(config.label),
        group: game.i18n.localize(config.group)
      })),
      { value: "", label: game.i18n.localize("DND5E.NoneActionLabel") }
    ];
    context.affectsPlaceholder = game.i18n.localize(
      `DND5E.TARGET.Count.${context.data.target?.template?.type ? "Every" : "Any"}`
    );
    context.durationUnits = [
      { value: "inst", label: game.i18n.localize("DND5E.TimeInst") },
      ...Object.entries(CONFIG.DND5E.scalarTimePeriods).map(([value, label]) => ({
        value, label, group: game.i18n.localize("DND5E.DurationTime")
      })),
      ...Object.entries(CONFIG.DND5E.permanentTimePeriods).map(([value, label]) => ({
        value, label, group: game.i18n.localize("DND5E.DurationPermanent")
      })),
      { value: "spec", label: game.i18n.localize("DND5E.Special") }
    ];
    context.rangeUnits = [
      ...Object.entries(CONFIG.DND5E.rangeTypes).map(([value, label]) => ({ value, label })),
      ...Object.entries(CONFIG.DND5E.movementUnits).map(([value, { label }]) => ({
        value, label, group: game.i18n.localize("DND5E.RangeDistance")
      }))
    ];

    // Consumption targets
    const canScale = this.activity.canConfigureScaling;
    const consumptionTypeOptions = Array.from(this.activity.validConsumptionTypes).map(value => ({
      value,
      label: CONFIG.DND5E.activityConsumptionTypes[value].label
    }));
    context.consumptionTargets = context.source.consumption.targets.map((data, index) => {
      const typeConfig = CONFIG.DND5E.activityConsumptionTypes[data.type] ?? {};
      const showTextTarget = typeConfig.targetRequiresEmbedded && !this.item.isEmbedded;
      const target = new ConsumptionTargetData(data, { parent: this.activity });
      return {
        data,
        fields: this.activity.schema.fields.consumption.fields.targets.element.fields,
        prefix: `consumption.targets.${index}.`,
        source: context.source.consumption.targets[index] ?? data,
        typeOptions: consumptionTypeOptions,
        scalingModes: canScale ? [
          { value: "", label: game.i18n.localize("DND5E.CONSUMPTION.Scaling.None") },
          { value: "amount", label: game.i18n.localize("DND5E.CONSUMPTION.Scaling.Amount") },
          ...(typeConfig.scalingModes ?? []).map(({ value, label }) => ({ value, label: game.i18n.localize(label) }))
        ] : null,
        showTargets: "validTargets" in typeConfig,
        selectedTarget: ("validTargets" in typeConfig) && ((data.type === "Item") && data.target?.includes("."))
          ? (this.activity.actor?.sourcedItems?.get(data.target, { legacy: false })?.first()?.id ?? data.target)
          : data.target,
        targetPlaceholder: data.type === "itemUses" ? game.i18n.localize("DND5E.CONSUMPTION.Target.ThisItem") : null,
        validTargets: showTextTarget ? null : target.validTargets
      };
    });
    context.showConsumeSpellSlot = this.activity.isSpell && (this.item.system.level !== 0);
    context.showScaling = !this.activity.isSpell;

    // Uses recovery
    context.recoveryPeriods = CONFIG.DND5E.limitedUsePeriods.recoveryOptions;
    context.recoveryTypes = [
      { value: "recoverAll", label: game.i18n.localize("DND5E.USES.Recovery.Type.RecoverAll") },
      { value: "loseAll", label: game.i18n.localize("DND5E.USES.Recovery.Type.LoseAll") },
      { value: "formula", label: game.i18n.localize("DND5E.USES.Recovery.Type.Formula") }
    ];
    context.usesRecovery = context.source.uses.recovery.map((data, index) => ({
      data,
      fields: this.activity.schema.fields.uses.fields.recovery.element.fields,
      prefix: `uses.recovery.${index}.`,
      source: context.source.uses.recovery[index] ?? data,
      formulaOptions: data.period === "recharge" ? UsesField.rechargeOptions : null
    }));

    // Template dimensions
    context.dimensions = context.activity.target?.template?.dimensions;

    return context;
  }

  /* -------------------------------------------- */

  /**
   * Prepare a specific applied effect if present in the activity data.
   * @param {ApplicationRenderContext} context  Context being prepared.
   * @param {object} effect                     Applied effect context being prepared.
   * @returns {object}
   * @protected
   */
  _prepareAppliedEffectContext(context, effect) {
    return effect;
  }

  /* -------------------------------------------- */

  /**
   * Prepare a specific damage part if present in the activity data.
   * @param {ApplicationRenderContext} context  Context being prepared.
   * @param {object} part                       Damage part context being prepared.
   * @returns {object}
   * @protected
   */
  _prepareDamagePartContext(context, part) {
    return part;
  }

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the effect tab.
   * @param {ApplicationRenderContext} context  Context being prepared.
   * @returns {ApplicationRenderContext}
   * @protected
   */
  _prepareEffectContext(context: this['__Configuration']): Promise<this['__Configuration']> {
    context.tab = context.tabs.effect;

    if (context.activity.effects) {
      const appliedEffects = new Set(context.activity.effects?.map(e => e._id) ?? []);
      context.allEffects = this.item.effects
        .filter(e => e.type !== "enchantment")
        .map(effect => ({
          value: effect.id, label: effect.name, selected: appliedEffects.has(effect.id)
        }));
      context.appliedEffects = context.activity.effects.reduce((arr, data) => {
        if (!data.effect) return arr;
        const effect = {
          data,
          collapsed: this.expandedSections.get(`effects.${data._id}`) ? "" : "collapsed",
          effect: data.effect,
          fields: this.activity.schema.fields.effects.element.fields,
          prefix: `effects.${data._index}.`,
          source: context.source.effects[data._index] ?? data,
          contentLink: data.effect.toAnchor().outerHTML,
          additionalSettings: null
        };
        arr.push(this._prepareAppliedEffectContext(context, effect));
        return arr;
      }, []);
    }

    context.denominationOptions = [
      { value: "", label: "" },
      ...CONFIG.DND5E.dieSteps.map(value => ({ value, label: `d${value}` }))
    ];
    if (context.activity.damage?.parts) {
      const scaleKey = (this.item.type === "spell") && (this.item.system.level === 0) ? "labelCantrip" : "label";
      const scalingOptions = [
        { value: "", label: game.i18n.localize("DND5E.DAMAGE.Scaling.None") },
        ...Object.entries(CONFIG.DND5E.damageScalingModes).map(([value, { [scaleKey]: label }]) => ({ value, label }))
      ];
      const typeOptions = Object.entries(CONFIG.DND5E.damageTypes).map(([value, { label }]) => ({ value, label }));
      const makePart = (data, index) => this._prepareDamagePartContext(context, {
        data, index, scalingOptions, typeOptions,
        canScale: this.activity.canScaleDamage,
        fields: this.activity.schema.fields.damage.fields.parts.element.fields,
        prefix: index !== undefined ? `damage.parts.${index}.` : "_.",
        source: data
      });
      context.damageParts = [
        ...context.activity.damage.parts
          .filter(p => p._index === undefined)
          .map((data, index) => makePart(data)),
        ...context.source.damage.parts.map((data, index) => makePart(data, index))
      ];
    }

    return context;
  }

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the identity tab.
   */
  _prepareIdentityContext(context: this['__Configuration']): Promise<this['__Configuration']>

  /* -------------------------------------------- */

  /**
   * Prepare the tab information for the sheet.
   */
  _getTabs(): Record<string, foundry.applications.api.ApplicationV2.Tab>

  /* -------------------------------------------- */

  /**
   * Helper to mark the tabs data structure with the appropriate CSS class if it is active.
   * @internal
   */
  _markTabs(tabs: fvttUtils.DeepPartial<Record<string, ActivitySheet.Tab>>): Record<string, ActivitySheet.Tab>

  /* -------------------------------------------- */
  /*  Life-Cycle Handlers                         */
  /* -------------------------------------------- */

  /**
   * Apply nested tab classes.
   */
  #toggleNestedTabs()

  /* -------------------------------------------- */

  /**
   * Handle adding a new entry to the consumption list.
   */
  static #addConsumption<This extends ActivitySheet.Any>(this: This, event: Event, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle adding a new entry to the damage parts list.
   */
  static #addDamagePartn<This extends ActivitySheet.Any>(this: This, event: Event, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle creating a new active effect and adding it to the applied effects list.
   */
  static async #addEffectn<This extends ActivitySheet.Any>(this: This, event: Event, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * The data for a newly created applied effect.
   * @protected
   */
  _addEffectData(): {
    name: string,
    img: string,
    origin: string,
    transfer: boolean
  }

  /* -------------------------------------------- */

  /**
   * Handle adding a new entry to the uses recovery list.
   */
  static #addRecovery<This extends ActivitySheet.Any>(this: This, event: Event, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle removing an entry from the consumption targets list.
   */
  static #deleteConsumption<This extends ActivitySheet.Any>(this: This, event: Event, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle removing an entry from the damage parts list.
   */
  static #deleteDamagePart<This extends ActivitySheet.Any>(this: This, event: Event, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle deleting an active effect and removing it from the applied effects list.
   */
  static #deleteEffect<This extends ActivitySheet.Any>(this: This, event: Event, target: HTMLElement): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle removing an entry from the uses recovery list.
   */
  static #deleteRecovery<This extends ActivitySheet.Any>(this: This, event: Event, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle dissociating an Active Effect from this Activity.
   */
  static #dissociateEffect<This extends ActivitySheet.Any>(this: This, event: PointerEvent, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle toggling the collapsed state of an additional settings section.
   */
  static #toggleCollapsed<This extends ActivitySheet.Any>(this: This, event: Event, target: HTMLElement)

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /**
   * Perform any pre-processing of the form data to prepare it for updating.
   * @param {SubmitEvent} event          Triggering submit event.
   * @param {FormDataExtended} formData  Data from the submitted form.
   * @returns {object}
   */
  _prepareSubmitData(event: SubmitEvent, formData: FormDataExtended): object
}

declare namespace ActivitySheet {
  type Any = ActivitySheet<any, any, any, any>
  interface AnyConstructor extends fvttUtils.Identity<typeof ActivitySheet> {
    new(...args: never): Any;
  }
  type RenderContext<
    Document extends dnd5e.types.Activity.Any,
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      activity: Document,
      fields: Document['schema']['fields'],
      inferred: Document['_inferredSource'],
      source: Document['_source'],
      tabs: ReturnType<ActivitySheet<Document>['_getTabs']>,

      
      tab: ActivitySheet.Tab,
      // Activation Ctx
      data: {
        [K in ["activation", "duration", "range", "target", "uses"][number]]: 
          Document['_source'] extends { [_K in K]: infer T } ? T : never
      }
      disabled: {
        [K in ["activation", "duration", "range", "target", "uses"][number]]: 
          Document['_source'] extends { [_K in K]: any } ? boolean : never
      }
      activationTypes: {
        value: dnd5e.types.ActivityActivation.TypeKey | '',
        label: string
      }[]
      affectsPlaceholder: string
      durationUnits: {
        value: dnd5e.types.ActivityActivation.TypeKey | '',
        label: string
      }[]

      // identity
      placeholder: {
        name: string,
        img: string
      }
    },
    Ctx
  >
  type Configuration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type RenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
}

export default ActivitySheet
