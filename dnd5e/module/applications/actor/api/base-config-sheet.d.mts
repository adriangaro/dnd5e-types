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
  BaseConfigSheet.RenderContext<RenderContext>,
  BaseConfigSheet.Configuration<Configuration>,
  BaseConfigSheet.RenderOptions<RenderOptions>
> {}

declare namespace BaseConfigSheet{
  type RenderContext<Ctx extends fvttUtils.AnyObject = {}> =  dnd5e.types.DeepMerge<
    {
      advantageModeOptions: {
        value: dnd5e.dice.D20Roll.AdvantageMode
        label: string 
      }[]
    },
    Ctx
  >
  type Configuration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type RenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
}

export default BaseConfigSheet