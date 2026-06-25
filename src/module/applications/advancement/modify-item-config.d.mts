/** Configuration application for modify item advancement. */

import AdvancementConfig from "./advancement-config-v2.mjs";

declare class ModifyItemConfig<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
  RenderContext extends object = ModifyItemConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ModifyItemConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ModifyItemConfig.RenderOptions,
> extends AdvancementConfig<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace ModifyItemConfig {
  interface Any extends ModifyItemConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ModifyItemConfig<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance>
    extends AdvancementConfig.RenderContext<Document> {
    allEnchantments: foundry.applications.fields.FormSelectOption[];
    changes: Array<{
      data: foundry.data.fields.SchemaField.InitializedData<
        dnd5e.types.Advancement.ModifyItem.ConfigSchema["changes"]["element"]["fields"]
      >;
      effect: ActiveEffect.Implementation;
      contentLink: string;
      fields: dnd5e.types.Advancement.ModifyItem.ConfigSchema["changes"]["element"]["fields"];
      prefix: string;
    }>;
    hasEffectsTab: boolean;
  }
  interface Configuration extends AdvancementConfig.Configuration {}
  interface RenderOptions extends AdvancementConfig.RenderOptions {}
}

export default ModifyItemConfig;
