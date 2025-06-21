import TransformationSetting from "../../data/settings/transformation-setting.mjs";
import Dialog5e from "../api/dialog.mjs";

/**
 * Dialog that controls transforming an actor using another actor.
 */
declare class TransformDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends Dialog5e<
  TransformDialog.MakeRenderContext<RenderContext>,
  TransformDialog.MakeConfiguration<Configuration>,
  TransformDialog.MakeRenderOptions<RenderOptions>
> {
  
  constructor(options: TransformDialog.MakeConfiguration<Configuration>);

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Settings that should be applied during transformation.
   */
  #settings: TransformationSetting | null;

  get settings(): TransformationSetting | null;

  /* -------------------------------------------- */

  /**
   * Was the transform button clicked?
   */
  #shouldTransform: boolean;

  get shouldTransform(): boolean;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @override */
  _preparePartContext(partId: string, context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the details section.
   * @param context Context being prepared.
   * @param options Options which configure application rendering behavior.
   * @returns Updated context.
   * @protected
   */
  protected _prepareDetailsContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the presets section.
   * @param context Context being prepared.
   * @param options Options which configure application rendering behavior.
   * @returns Updated context.
   * @protected
   */
  protected _preparePresetsContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the settings section.
   * @param context Context being prepared.
   * @param options Options which configure application rendering behavior.
   * @returns Updated context.
   * @protected
   */
  protected _prepareSettingsContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Disable inputs based on other checked fields.
   * @param changed The recently changed checkbox, if any.
   */
  #disableFields(changed?: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Handle applying a preset to the settings.
   * @param event Triggering click event.
   * @param target Button that was clicked.
   */
  static #setPreset<This extends TransformDialog.Any>(this: This, event: Event, target: HTMLElement): Promise<void>;

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /**
   * Handle updating the preset display when fields are changed and transforming when the submit button is pressed.
   * @param event The form submission event.
   * @param form The submitted form.
   * @param formData Data from the dialog.
   */
  static #handleFormSubmission<This extends TransformDialog.Any>(this: This, event: Event | SubmitEvent, form: HTMLFormElement, formData: foundry.applications.ux.FormDataExtended): Promise<void>;

  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /**
   * Display the transform dialog.
   * @param host Actor that will be transformed.
   * @param source Actor whose data will be applied to the host.
   * @param options Additional options for the application.
   * @returns Transformation settings to apply.
   */
  static promptSettings(host: Actor.Implementation, source: Actor.Implementation, options?: TransformDialog.Configuration): Promise<TransformationSetting | null>;
}

// Any class for generic flexibility
declare class AnyTransformDialog extends TransformDialog<any, any, any> {
  constructor(...args: any[]);
}

// Complete namespace with all required types
declare namespace TransformDialog {
  // Required interfaces for extensibility
  interface Any extends AnyTransformDialog {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyTransformDialog> {}

  // Make... types for extension support
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // Details section context
      sourceActor?: Actor.Implementation;
      hostActor?: Actor.Implementation;
      
      // Presets section context
      presets?: Record<string, {
        icon: string;
        label: string;
        selected: boolean;
      }>;
      noneSelected?: boolean;
      
      // Settings section context
      categories?: Array<{
        category: string;
        title: string;
        hint: string;
        settings: Array<{
          field: foundry.data.fields.DataField;
          disabled?: boolean;
          input?: any;
          name: string;
          value: any;
        }>;
      }>;
    },
    Ctx
  >;

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // Transform dialog specific configuration
      transform?: {
        host?: Actor.Implementation | null;
        settings?: TransformationSetting | null;
        source?: Actor.Implementation | null;
      };
    },
    Cfg
  >;

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // Dialog render options (usually minimal)
    },
    Opt
  >;

  // Type aliases for convenience
  type RenderContext = TransformDialog['__RenderContext'];
  type Configuration = TransformDialog['__Configuration'];
  type RenderOptions = TransformDialog['__RenderOptions'];
}

export default TransformDialog; 