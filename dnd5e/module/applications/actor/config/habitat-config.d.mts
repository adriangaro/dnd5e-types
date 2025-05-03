import type BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for an actor's habitat.
 */
declare class HabitatConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  HabitatConfig.MakeRenderContext<RenderContext>,
  HabitatConfig.MakeConfiguration<Configuration>,
  HabitatConfig.MakeRenderOptions<RenderOptions>
> { 
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** @override */
  get title(): string;

  /** @override */
  get otherLabel(): string;
}

declare namespace HabitatConfig {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      custom: {
        field: foundry.data.fields.DataField.Any,
        value: string,
        name: string
      }
      habitats: dnd5e.types.FormSelectOption[]
      rows: number
    },
    Ctx
  >;
  type RenderContext = HabitatConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified in the provided .mjs
    },
    Cfg
  >;
  type Configuration = HabitatConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // Add specific render options for HabitatConfig if needed
    },
    Opt
  >;
  type RenderOptions = HabitatConfig['__RenderOptions'];
}

export default HabitatConfig;
