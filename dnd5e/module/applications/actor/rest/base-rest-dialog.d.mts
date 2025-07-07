import Dialog5e from "../../api/dialog.mjs";
import type { Actor5e } from "#dnd5e/module/documents/_module.mjs";

/**
 * Dialog with shared resting functionality.
 */
declare class BaseRestDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends Dialog5e<
  BaseRestDialog.MakeRenderContext<RenderContext>,
  BaseRestDialog.MakeConfiguration<Configuration>,
  BaseRestDialog.MakeRenderOptions<RenderOptions>
> {
  actor: Actor.Implementation


  /**
   * The rest configuration.
   */
  #config: Actor5e.RestConfiguration
  get config(): Actor5e.RestConfiguration

  /* -------------------------------------------- */

  /**
   * Should the user be prompted as to whether a new day has occurred?
   */
  get promptNewDay(): boolean

  /* -------------------------------------------- */

  /**
   * Was the rest button pressed?
   */
  #rested: boolean

  get rested(): boolean


  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle submission of the dialog using the form buttons.
   * @this {BaseRestDialog}
   * @param event    The form submission event.
   * @param form       The submitted form.
   * @param formData  Data from the dialog.
   */
  static #handleFormSubmission(this: BaseRestDialog, event: Event | SubmitEvent, form: HTMLFormElement, formData: foundry.applications.ux.FormDataExtended): Promise<void>

  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /**
   * A helper to handle displaying and responding to the dialog.
   * @param actor              The actor that is resting.
   * @param config  Configuration information for the rest.
   */
  static configure(actor: Actor.Implementation, config: Actor5e.RestConfiguration): Promise<Actor5e.RestConfiguration>
}

declare namespace BaseRestDialog {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      actor: Actor.Implementation,
      config: Actor5e.RestConfiguration
      result: any
      hd: dnd5e.types.GetTypeFromPath<Actor5e.Implementation, 'system.attributes.hd'>
      hp: dnd5e.types.GetTypeFromPath<Actor5e.Implementation, 'system.attributes.hp'>
      isGroup: boolean
      variant: string
    },
    Ctx
  >;
  type RenderContext = BaseRestDialog['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  type Configuration = BaseRestDialog['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  type RenderOptions = BaseRestDialog['__RenderOptions'];
}

export default BaseRestDialog;