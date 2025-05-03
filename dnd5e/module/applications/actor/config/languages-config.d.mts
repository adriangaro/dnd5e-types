import type SelectChoices from "../../../documents/actor/select-choices.mjs";
import type TraitsConfig from "./traits-config.d.mts";

/**
 * Configuration application for languages.
 */
declare class LanguagesConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends TraitsConfig<
  LanguagesConfig.MakeRenderContext<RenderContext>,
  LanguagesConfig.MakeConfiguration<Configuration>,
  LanguagesConfig.MakeRenderOptions<RenderOptions>
> {
  // No specific methods/properties to declare in the boilerplate
}

declare namespace LanguagesConfig {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      communication: {
        label: string;
        unitOptions: dnd5e.types.FormSelectOption[]
        data: any;
        fields: foundry.data.fields.DataSchema;
        keyPath: string;
      }[];
    },
    Ctx
  >;
  type RenderContext = LanguagesConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  type Configuration = LanguagesConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  type RenderOptions = LanguagesConfig['__RenderOptions'];
}

export default LanguagesConfig;
