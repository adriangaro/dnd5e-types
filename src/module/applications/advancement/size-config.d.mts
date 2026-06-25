/** Configuration application for size advancement. */

import AdvancementConfig from "./advancement-config-v2.mjs";

declare class SizeConfig<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
  RenderContext extends object = SizeConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = SizeConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = SizeConfig.RenderOptions,
> extends AdvancementConfig<Document, RenderContext, Configuration, RenderOptions> {
  /** @inheritDoc */
  prepareConfigurationUpdate(configuration: object): Promise<object>;
}

declare namespace SizeConfig {
  interface Any extends SizeConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SizeConfig<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance>
    extends AdvancementConfig.RenderContext<Document> {
    showLevelSelector: boolean;
    sizes: Record<
      dnd5e.types.ActorSize.TypeKey,
      {
        field: foundry.data.fields.BooleanField;
        input: AdvancementConfig.RenderContext<Document>["inputs"]["createCheckboxInput"];
        value: boolean;
      }
    >;
  }
  interface Configuration extends AdvancementConfig.Configuration {}
  interface RenderOptions extends AdvancementConfig.RenderOptions {}
}

export default SizeConfig;
