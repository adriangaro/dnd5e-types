import * as Trait from "../../../documents/actor/trait.mjs";
import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Base application for configuring an actor's abilities, skills, or tools.
 */
declare class BaseProficiencyConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
  > extends BaseConfigSheet<
  BaseProficiencyConfig.MakeRenderContext<RenderContext>,
  BaseProficiencyConfig.MakeConfiguration<Configuration>,
  BaseProficiencyConfig.MakeRenderOptions<RenderOptions>
  > {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Configuration data for the ability being edited.
   * @abstract
   */
  get propertyConfig(): object

  /* -------------------------------------------- */

  /**
   * Label for the specific skill or tool being configured.
   */
  get propertyLabel(): string
}

declare namespace BaseProficiencyConfig {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      data: any,
      fields: foundry.data.fields.DataSchema,
      label: string,
      prefix: string,
      global: {
        data: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system._source.bonuses.abilities'>,
        fields: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system.schema.fields.bonuses.fields.abilities.fields'>
      }
    },
    Ctx
  >
  type RenderContext = BaseProficiencyConfig['__RenderContext']

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type Configuration = BaseProficiencyConfig['__Configuration']
  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = BaseProficiencyConfig['__RenderOptions']

}

export default BaseProficiencyConfig;