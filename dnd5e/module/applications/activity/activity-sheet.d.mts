import type BaseActivityData from "@dnd5e/module/data/activity/base-activity.mjs";
import PseudoDocumentSheet from "../api/pseudo-document-sheet.mjs";

/**
 * Default sheet for activities.
 */
declare class ActivitySheet<
  Document extends dnd5e.types.Activity.Implementation,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends PseudoDocumentSheet<
  Document,
  ActivitySheet.MakeRenderContext<Document, RenderContext>,
  ActivitySheet.MakeConfiguration<Configuration>,
  ActivitySheet.MakeRenderOptions<RenderOptions>
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
   * @param context  Context being prepared.
   * @protected
   */
  _prepareActivationContext(context: this['__RenderContext']): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /**
   * Prepare a specific applied effect if present in the activity data.
   * @param context  Context being prepared.
   * @param effect                     Applied effect context being prepared.
   * @returns
   * @protected
   */
  _prepareAppliedEffectContext(context: this['__RenderContext'], effect: ActivitySheet.RenderContext['appliedEffects'][number]): ActivitySheet.RenderContext['appliedEffects'][number]

  /* -------------------------------------------- */

  /**
   * Prepare a specific damage part if present in the activity data.
   * @param context  Context being prepared.
   * @param part                       Damage part context being prepared.
   * @protected
   */
  _prepareDamagePartContext(context: this['__RenderContext'], part: ActivitySheet.RenderContext['damageParts'][number]): ActivitySheet.RenderContext['damageParts'][number]

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the effect tab.
   * @param context  Context being prepared.
   * @returns
   * @protected
   */
  _prepareEffectContext(context: this['__RenderContext']): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the identity tab.
   */
  _prepareIdentityContext(context: this['__RenderContext']): Promise<this['__RenderContext']>

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
  _markTabs(tabs: fvttUtils.DeepPartial<Record<string, foundry.applications.api.ApplicationV2.Tab>>): Record<string, foundry.applications.api.ApplicationV2.Tab>

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
  static #addEffectn<This extends ActivitySheet.Any>(this: This, event: Event, target: HTMLElement): Promise<void>

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
   * @param event          Triggering submit event.
   * @param formData  Data from the submitted form.
   * @returns
   */
  _prepareSubmitData(event: SubmitEvent, formData: FormDataExtended): object
}

declare class AnyActivitySheet extends ActivitySheet<
  dnd5e.types.Activity.Implementation, fvttUtils.EmptyObject, fvttUtils.EmptyObject, fvttUtils.EmptyObject
> {
  constructor(...args: any[])
}

declare namespace ActivitySheet {
  interface Any extends AnyActivitySheet {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyActivitySheet> {}
  
  type MakeRenderContext<
    Document extends dnd5e.types.Activity.Implementation,
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      activity: Document,
      fields: Document['schema']['fields'],
      inferred: Document['_inferredSource'],
      source: Document['_source'],
      tabs: ReturnType<ActivitySheet<Document>['_getTabs']>,

      
      tab: foundry.applications.api.ApplicationV2.Tab,
      // Activation Ctx
      data: {
        [K in ["activation", "duration", "range", "target", "uses"][number]]: 
          Document['_source'] extends { [_K in K]: infer T } ? T : never
      }
      disabled: {
        [K in ["activation", "duration", "range", "target", "uses"][number]]: 
          Document['_source'] extends { [_K in K]: any } ? boolean : never
      }
      activationTypes: dnd5e.types.FormSelectOption[]
      affectsPlaceholder: string
      durationUnits: dnd5e.types.FormSelectOption[]

      // identity
      placeholder: {
        name: string,
        img: string
      },

      // effect
      allEffects: dnd5e.types.FormSelectOption[]
      appliedEffects: {
        data: dnd5e.types.GetTypeFromPath<Document, 'effects.0'> ,
        collapsed: string
        effect: ActiveEffect.Implementation
        fields: dnd5e.types.GetTypeFromPath<Document, 'schema.fields.effects.element.fields'>
        prefix: string,
        source: dnd5e.types.GetTypeFromPath<Document, 'effects.0'>,
        contentLink: string,
        additionalSettings: any | null
      }[]
      denominationOptions: dnd5e.types.FormSelectOption[],
      damageParts: {
        data: dnd5e.types.GetTypeFromPath<Document, 'damage.parts.0'> 
        index: number,
        scalingOptions: dnd5e.types.FormSelectOption[],
        typeOptions: dnd5e.types.FormSelectOption[]
        canScale: boolean
        fields: dnd5e.types.GetTypeFromPath<Document, 'schema.fields.effects.element.fields'>
        prefix: string,
        source: dnd5e.types.GetTypeFromPath<Document, 'damage.parts.0'> 
      }[]
    },
    Ctx
  >
  type RenderContext = ActivitySheet<any>['__RenderContext']
  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type Configuration = ActivitySheet<any>['__Configuration']
  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = ActivitySheet<any>['__RenderOptions']
}

export default ActivitySheet
