import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for an NPC's treasure categories.
 */
declare class TreasureConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  TreasureConfig.MakeRenderContext<RenderContext>,
  TreasureConfig.MakeConfiguration<Configuration>,
  TreasureConfig.MakeRenderOptions<RenderOptions>
> {}

declare namespace TreasureConfig {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      treasure: dnd5e.types.FormSelectOption[]
    },
    Ctx
  >;
  type RenderContext = TreasureConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  type Configuration = TreasureConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  type RenderOptions = TreasureConfig['__RenderOptions'];
}

export default TreasureConfig;