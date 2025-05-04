import Dialog5e from "../api/dialog.mjs";

/**
 * Dialog for configuring the usage of an activity.
 */
declare class ActivityUsageDialog<
  Document extends dnd5e.types.Activity.Any,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends Dialog5e<
  ActivityUsageDialog.MakeRenderContext<Document, RenderContext>,
  ActivityUsageDialog.MakeConfiguration<Document, Configuration>,
  ActivityUsageDialog.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * ID of the activity being activated.
   
   */
  #activityId: string;

  /**
   * Activity being activated.
   */
  get activity(): Document

  /* -------------------------------------------- */

  /**
   * Actor using this activity.
   */
  get actor(): Actor.Implementation

  /* -------------------------------------------- */

  /**
   * Activity usage configuration data.
   */
  #config: dnd5e.types.Activity.UseConfiguration

  get config(): dnd5e.types.Activity.UseConfiguration

  /* -------------------------------------------- */

  /**
   * Item that contains the activity.
   */
  #item: Item.Implementation

  get item(): Item.Implementation

  /* -------------------------------------------- */

  /**
   * Was the use button clicked?
  #used: boolean

  get used(): boolean

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the concentration section.
   * @param context  Context being prepared.
   * @param options   Options which configure application rendering behavior.
   * @returns
   * @protected
   */
  _prepareConcentrationContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the consumption section.
   * @param context  Context being prepared.
   * @param options   Options which configure application rendering behavior.
   * @returns
   * @protected
   */
  _prepareConsumptionContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the creation section.
   * @param context  Context being prepared.
   * @param options   Options which configure application rendering behavior.
   * @returns
   * @protected
   */
  _prepareCreationContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the footer.
   * @param context  Context being prepared.
   * @param options   Options which configure application rendering behavior.
   * @returns
   * @protected
   */
  _prepareFooterContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the scaling section.
   * @param context  Context being prepared.
   * @param options   Options which configure application rendering behavior.
   * @returns
   * @protected
   */
  _prepareScalingContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /**
   * Determine whether a particular element should be displayed based on the `display` options.
   * @param section  Key path describing the section to be displayed.
   * @returns
   */
  _shouldDisplay(section: string): boolean

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle form submission.
   * @param event          Triggering submit event.
   * @param form       The form that was submitted.
   * @param formData  Data from the submitted form.
   */
  static #onSubmitForm<This extends ActivityUsageDialog.AnyConstructor>(this: This, event: SubmitEvent, form: HTMLFormElement, formData: FormDataExtended): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle clicking the use button.
   * @param event         Triggering click event.
   * @param target  Button that was clicked.
   */
  static #onUse<This extends ActivityUsageDialog.AnyConstructor>(this: This, event: Event, target: HTMLElement): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Perform any pre-processing of the form data to prepare it for updating.
   * @param event          Triggering submit event.
   * @param formData  Data from the submitted form.
   * @returns
   */
  _prepareSubmitData(event: SubmitEvent, formData: FormDataExtended): Promise<object>;

  /* -------------------------------------------- */

  /**
   * Handle updating the usage configuration based on processed submit data.
   * @param event  Triggering submit event.
   * @param submitData  Prepared object for updating.
   */
  _processSubmitData(event: SubmitEvent, submitData: object): Promise<void>;

  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /**
   * Display the activity usage dialog.
   * @param activity                Activity to use.
   * @param config  Configuration data for the usage.
   * @param options                   Additional options for the application.
   * @returns           Form data object with results of the activation.
   */
  static create(
    activity: dnd5e.types.Activity.Any,
    config: dnd5e.types.Activity.UseConfiguration,
    options: ActivityUsageDialog.Configuration
  ): Promise<dnd5e.types.Activity.UseConfiguration>
}

declare class AnyActivityUsageDialog extends ActivityUsageDialog<any, fvttUtils.EmptyObject, fvttUtils.EmptyObject, fvttUtils.EmptyObject> {}

declare namespace ActivityUsageDialog {
  interface Any extends AnyActivityUsageDialog {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyActivityUsageDialog> {}

  type MakeRenderContext<
    Document extends dnd5e.types.Activity.Any,
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      activity: Document
      linkedActivity: dnd5e.types.Activity.Any | null
      hasConcentration: boolean
      hasConsumption: boolean
      hasCreation: boolean
      hasScaling: boolean

      notes: {
        type: 'info' | 'warn' | 'error',
        message: string
      }[]
      fields: dnd5e.applications.api.Application5e.FieldsConfig[]
      template: dnd5e.applications.api.Application5e.FieldsConfig
      spellSlots: dnd5e.applications.api.Application5e.FieldsConfig
      scaling: dnd5e.applications.api.Application5e.FieldsConfig & {
        max: number
        showRange: boolean
      }

    },
    Ctx
  >
  type RenderContext = ActivityUsageDialog<any>['__RenderContext']
  type MakeConfiguration<
    Document extends dnd5e.types.Activity.Any,
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      activity: Document,
      config: dnd5e.types.Activity.UseConfiguration
    },
    Cfg
  >
  type Configuration = ActivityUsageDialog<any>['__Configuration']
  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = ActivityUsageDialog<any>['__RenderOptions']
}

export default ActivityUsageDialog