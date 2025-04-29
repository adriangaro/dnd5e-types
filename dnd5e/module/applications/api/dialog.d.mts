import Application5e from "./application.mjs";

/**
 * Application for creating dnd5e dialogs.
 */
declare class Dialog5e<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends Application5e<
  Dialog5e.MakeRenderContext<RenderContext>,
  Dialog5e.MakeConfiguration<Configuration>,
  Dialog5e.MakeRenderOptions<RenderOptions>
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
  _prepareContentContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the footer.
   */
  _prepareFooterContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>
}

declare namespace Dialog5e {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
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
  type RenderContext = Dialog5e['__RenderContext']

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
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
  type Configuration = Dialog5e['__Configuration']
  
  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
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
  type RenderOptions = Dialog5e['__RenderOptions']
}

export default Dialog5e