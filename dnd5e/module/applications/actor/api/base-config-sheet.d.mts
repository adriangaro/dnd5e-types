import DocumentSheet5e from "../../api/document-sheet.mjs";

/**
 * Base document sheet from which all actor configuration sheets should be based.
 */
declare class BaseConfigSheet<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends DocumentSheet5e<
  Actor.Implementation,
  BaseConfigSheet.MakeRenderContext<RenderContext>,
  BaseConfigSheet.MakeConfiguration<Configuration>,
  BaseConfigSheet.MakeRenderOptions<RenderOptions>
> {}

declare namespace BaseConfigSheet{
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> =  dnd5e.types.DeepMerge<
    {
      advantageModeOptions: {
        value: dnd5e.dice.D20Roll.AdvantageMode
        label: string 
      }[]
    },
    Ctx
  >
  type RenderContext = BaseConfigSheet['__RenderContext']
  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type Configuration = BaseConfigSheet['__Configuration']
  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = BaseConfigSheet['__RenderOptions']
}

export default BaseConfigSheet