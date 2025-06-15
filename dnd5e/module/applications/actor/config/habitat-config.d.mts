import type BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for an actor's habitat.
 */
declare class HabitatConfig<
  Document extends HabitatConfig.ValidDocument = HabitatConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  Document,
  HabitatConfig.MakeRenderContext<RenderContext, Document>,
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
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { details: { habitat: any } } }>

  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Document extends ValidDocument = ValidDocument
  > = dnd5e.types.DeepMerge<
    {
      custom: {
        field: foundry.data.fields.DataField.Any,
        value: string,
        name: string
      }
      habitats: {
        label: string,
        id: string,
        checked: boolean,
        disabled?: boolean,
        subtype?: string | undefined,
        subtypes?: boolean
      }[]
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
