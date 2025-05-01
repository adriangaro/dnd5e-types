import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for armor class calculation.
 */
declare class ArmorClassConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  ArmorClassConfig.MakeRenderContext<RenderContext>,
  ArmorClassConfig.MakeConfiguration<Configuration>,
  ArmorClassConfig.MakeRenderOptions<RenderOptions>
> {}

declare namespace ArmorClassConfig {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      data: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system.attributes.ac'>
      fields: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system.schema.fields.attributes.fields.ac.fields'>
      source: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system._source.attributes.ac'>
      calculationOptions: dnd5e.types.FormSelectOption[]
      formula: {
        disabled: boolean,
        showFlat: boolean,
        value: string
      }
      dexterity: number,
      calculations: {
        anchor: string,
        img: string,
        magicalBonus: string,
        name: string,
        value: string
      }[]
    },
    Ctx
  >
  type RenderContext = ArmorClassConfig['__RenderContext']

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type Configuration = ArmorClassConfig['__Configuration']
  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = ArmorClassConfig['__RenderOptions']

}

export default ArmorClassConfig;