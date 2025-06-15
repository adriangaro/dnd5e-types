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
  type RenderContext = WeaponsConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  type Configuration = WeaponsConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  type RenderOptions = WeaponsConfig['__RenderOptions'];
}

export default WeaponsConfig;