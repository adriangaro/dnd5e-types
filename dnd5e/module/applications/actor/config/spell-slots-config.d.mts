import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for overriding actor spell slots.
 */
declare class SpellSlotsConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  SpellSlotsConfig.MakeRenderContext<RenderContext>,
  SpellSlotsConfig.MakeConfiguration<Configuration>,
  SpellSlotsConfig.MakeRenderOptions<RenderOptions>
> {}


declare namespace SpellSlotsConfig {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      overrides: {
        value: number,
        label: string,
        name: string,
        placeholder: number
      }[]
    },
    Ctx
  >;
  type RenderContext = SpellSlotsConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  type Configuration = SpellSlotsConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  type RenderOptions = SpellSlotsConfig['__RenderOptions'];
}

export default SpellSlotsConfig;
