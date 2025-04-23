import Application5e from "./application.mjs";

/**
 * Application for creating dnd5e dialogs.
 */
declare class Dialog5e<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends Application5e<
  Dialog5e.RenderContext<RenderContext>,
  Dialog5e.Configuration<Configuration>,
  Dialog5e.RenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Form element within the dialog.
   */
  get form(): HTMLFormElement | null

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the content section.
   */
  _prepareContentContext(context: RenderContext, options: foundry.applications.api.HandlebarsApplicationMixin.RenderOptions): Promise<RenderContext>

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the footer.
   */
  _prepareFooterContext(context: RenderContext, options: foundry.applications.api.HandlebarsApplicationMixin.RenderOptions): Promise<RenderContext>
}

declare namespace Dialog5e {
  type RenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      buttons: {
        action?: string,
        label: string,
        icon?: string,
        class?: string
        default?: boolean,
        cssClass?: string
      }[]
    },
    Ctx
  >
  type Configuration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      buttons?: {
        action?: string,
        label: string,
        icon?: string,
        class?: string
        default?: boolean
      }[]
    },
    Cfg
  >
  type RenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      buttons?: {
        action?: string,
        label: string,
        icon?: string,
        class?: string
        default?: boolean
      }[]
    },
    Opt
  >
}

export default Dialog5e