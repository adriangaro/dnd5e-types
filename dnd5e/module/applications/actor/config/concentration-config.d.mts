import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for an actor's concentration checks.
 */
declare class ConcentrationConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  ConcentrationConfig.MakeRenderContext<RenderContext>,
  ConcentrationConfig.MakeConfiguration<Configuration>,
  ConcentrationConfig.MakeRenderOptions<RenderOptions>
> { }

declare namespace ConcentrationConfig {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      data: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system._source.attributes.concentration'>
      fields: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system.schema.fields.attributes.fields.concentration.fields'>
      abilityOptions: dnd5e.types.FormSelectOption[]
      global: {
        data: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system._source.bonuses.abilities'>,
        fields: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system.schema.fields.bonuses.fields.abilities.fields'>
      }
    },
    Ctx
  >
  type RenderContext = ConcentrationConfig['__RenderContext']

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type Configuration = ConcentrationConfig['__Configuration']
  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = ConcentrationConfig['__RenderOptions']

}

export default ConcentrationConfig;