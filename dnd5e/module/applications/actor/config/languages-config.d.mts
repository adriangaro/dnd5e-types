import type SelectChoices from "../../../documents/actor/select-choices.mjs";
import type TraitsConfig from "./traits-config.d.mts";

/**
 * Configuration application for languages.
 */
declare class LanguagesConfig<
  Document extends LanguagesConfig.ValidDocument = LanguagesConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends TraitsConfig<
  'languages',
  Document,
  LanguagesConfig.MakeRenderContext<RenderContext, Document>,
  LanguagesConfig.MakeConfiguration<Configuration>,
  LanguagesConfig.MakeRenderOptions<RenderOptions>
> {
  // No specific methods/properties to declare in the boilerplate
}

declare namespace LanguagesConfig {
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { traits: { languages: any } } }>
  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Document extends ValidDocument = ValidDocument
  > = dnd5e.types.DeepMerge<
    {
      communication: {
        label: string;
        unitOptions: dnd5e.types.FormSelectOption[]
        data: dnd5e.types.GetTypeFromPath<Document, `system.traits.languages.communication.${dnd5e.types.Language.CommunicationTypeKey}`>;
        fields: dnd5e.types.GetTypeFromPath<Document, 'system.schema.fields.traits.fields.languages.fields.communication.model.fields'>;
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
