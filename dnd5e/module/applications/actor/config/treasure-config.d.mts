import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for an NPC's treasure categories.
 */
declare class TreasureConfig<
  Document extends TreasureConfig.ValidDocument = TreasureConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  Document,
  TreasureConfig.MakeRenderContext<RenderContext, Document>,
  TreasureConfig.MakeConfiguration<Configuration>,
  TreasureConfig.MakeRenderOptions<RenderOptions>
> {}

declare namespace TreasureConfig {
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { details: { treasure: any } } }>
  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Document extends ValidDocument = ValidDocument
  > = dnd5e.types.DeepMerge<
    {
      treasure: dnd5e.types.FormSelectOption[]
    },
    Ctx
  >;
  interface RenderContext extends dnd5e.types.PrettifyType<TreasureConfig['__RenderContext']> {}

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  interface Configuration extends dnd5e.types.PrettifyType<TreasureConfig['__Configuration']> {}

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  interface RenderOptions extends dnd5e.types.PrettifyType<TreasureConfig['__RenderOptions']> {}
}

export default TreasureConfig;