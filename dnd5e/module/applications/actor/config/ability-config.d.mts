import BaseProficiencyConfig from "./base-proficiency-config.mjs";

/**
 * Configuration application for an actor's abilities.
 */
declare class AbilityConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseProficiencyConfig<
  AbilityConfig.MakeRenderContext<RenderContext>,
  AbilityConfig.MakeConfiguration<Configuration>,
  AbilityConfig.MakeRenderOptions<RenderOptions>
> {}

declare namespace AbilityConfig {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      proficiencyOptions: dnd5e.types.FormSelectOption[]
    },
    Ctx
  >
  type RenderContext = AbilityConfig['__RenderContext']

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type Configuration = AbilityConfig['__Configuration']
  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = AbilityConfig['__RenderOptions']

}

export default AbilityConfig;