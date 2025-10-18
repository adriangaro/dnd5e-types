import DocumentSheet5e from "../../api/document-sheet.mjs";

/**
 * Base document sheet from which all actor configuration sheets should be based.
 */
declare class BaseConfigSheet<
  Document extends Actor.Implementation = Actor.Implementation,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends DocumentSheet5e<
  Document,
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
  interface RenderContext extends dnd5e.types.PrettifyType<BaseConfigSheet['__RenderContext']> {}
  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  interface Configuration extends dnd5e.types.PrettifyType<BaseConfigSheet['__Configuration']> {}
  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  interface RenderOptions extends dnd5e.types.PrettifyType<BaseConfigSheet['__RenderOptions']> {}
}

export default BaseConfigSheet