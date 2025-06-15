import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for an actor's death saves.
 */
declare class DeathConfig<
  Document extends DeathConfig.ValidDocument = DeathConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  Document,
  DeathConfig.MakeRenderContext<RenderContext, Document>,
  DeathConfig.MakeConfiguration<Configuration>,
  DeathConfig.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** @override */
  get title(): string;

  /** @override */
  get otherLabel(): string;
}

declare namespace DeathConfig {
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { attributes: { death: any } } }>

  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Document extends ValidDocument = ValidDocument
  > = dnd5e.types.DeepMerge<
    {
      global: {
        data: dnd5e.types.GetTypeFromPath<Document, 'system._source.bonuses.abilities'>,
        fields: dnd5e.types.GetTypeFromPath<Document, 'system.schema.fields.bonuses.fields.abilities.fields'>
      }
    },
    Ctx
  >;
  type RenderContext = DeathConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified in the provided .mjs
    },
    Cfg
  >;
  type Configuration = DeathConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // Add specific render options for DeathConfig if needed
    },
    Opt
  >;
  type RenderOptions = DeathConfig['__RenderOptions'];
}

export default DeathConfig;
