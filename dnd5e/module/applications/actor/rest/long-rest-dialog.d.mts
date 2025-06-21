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
> {}


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