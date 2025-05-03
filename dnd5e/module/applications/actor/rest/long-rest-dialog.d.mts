import BaseRestDialog from "./base-rest-dialog.mjs";


/**
 * Dialog for configuring a long rest.
 */
declare class LongRestDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseRestDialog<
  LongRestDialog.MakeRenderContext<RenderContext>,
  LongRestDialog.MakeConfiguration<Configuration>,
  LongRestDialog.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /**
   * A helper constructor function which displays the Long Rest confirmation dialog and returns a Promise once its
   * workflow has been resolved.
   * @param options
   * @param options.actor  Actor that is taking the long rest.
   * @returns              Promise that resolves when the rest is completed or rejects when canceled.
   */
  static longRestDialog(options: { actor: Actor.Implementation }): ReturnType<typeof BaseRestDialog['configure']> 
}


declare namespace LongRestDialog {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      
    },
    Ctx
  >;
  type RenderContext = LongRestDialog['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  type Configuration = LongRestDialog['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  type RenderOptions = LongRestDialog['__RenderOptions'];
}

export default LongRestDialog;