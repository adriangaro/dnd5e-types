import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for overriding actor spell slots.
 */
declare class SpellSlotsConfig<
  Document extends SpellSlotsConfig.ValidDocument = SpellSlotsConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  Document,
  SpellSlotsConfig.MakeRenderContext<RenderContext, Document>,
  SpellSlotsConfig.MakeConfiguration<Configuration>,
  SpellSlotsConfig.MakeRenderOptions<RenderOptions>
> {}


declare namespace SpellSlotsConfig {
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { spells: any } }>

  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Document extends ValidDocument = ValidDocument
  > = dnd5e.types.DeepMerge<
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
