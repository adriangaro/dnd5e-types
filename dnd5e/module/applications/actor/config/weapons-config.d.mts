import * as Trait from "../../../documents/actor/trait.mjs";
import TraitsConfig from "./traits-config.mjs";

/**
 * Configuration application for weapon proficiencies and masteries.
 */
declare class WeaponsConfig<
  Document extends WeaponsConfig.ValidDocument = WeaponsConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends TraitsConfig<
  'weapon',
  Document,
  WeaponsConfig.MakeRenderContext<RenderContext, Document>,
  WeaponsConfig.MakeConfiguration<Configuration>,
  WeaponsConfig.MakeRenderOptions<RenderOptions>
> {}

declare namespace WeaponsConfig {
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { traits: { weaponProf: any } } }>
  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Document extends ValidDocument = ValidDocument
  > = dnd5e.types.DeepMerge<
    {
      
    },
    Ctx
  >;
  interface RenderContext extends dnd5e.types.PrettifyType<WeaponsConfig['__RenderContext']> {}

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  interface Configuration extends dnd5e.types.PrettifyType<WeaponsConfig['__Configuration']> {}

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  interface RenderOptions extends dnd5e.types.PrettifyType<WeaponsConfig['__RenderOptions']> {}
}

export default WeaponsConfig;