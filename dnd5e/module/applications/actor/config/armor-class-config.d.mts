import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for armor class calculation.
 */
declare class ArmorClassConfig<
  Document extends ArmorClassConfig.ValidDocument = ArmorClassConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  Document,
  ArmorClassConfig.MakeRenderContext<RenderContext, Document>,
  ArmorClassConfig.MakeConfiguration<Configuration>,
  ArmorClassConfig.MakeRenderOptions<RenderOptions>
> {}

declare namespace ArmorClassConfig {
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { attributes: { ac: any } } }>
  
  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Document extends ValidDocument = ValidDocument
  > = dnd5e.types.DeepMerge<
    {
      data: dnd5e.types.GetTypeFromPath<Document, 'system.attributes.ac'>
      fields: dnd5e.types.GetTypeFromPath<Document, 'system.schema.fields.attributes.fields.ac.fields'>
      source: dnd5e.types.GetTypeFromPath<Document, 'system._source.attributes.ac'>
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