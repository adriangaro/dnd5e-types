/** Configuration application for item grants. */

import ItemSharedConfig from "./item-shared-config.mjs";

declare class ItemGrantConfig<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
  RenderContext extends object = ItemGrantConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ItemGrantConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ItemGrantConfig.RenderOptions,
> extends ItemSharedConfig<Document, RenderContext, Configuration, RenderOptions> {
  /** Reshape the configuration update, defaulting the spell ability list when present. */
  prepareConfigurationUpdate(configuration: object): Promise<object>;
}

declare namespace ItemGrantConfig {
  interface Any extends ItemGrantConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ItemGrantConfig<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance>
    extends ItemSharedConfig.RenderContext<Document> {
    items: {
      data: object;
      fields: foundry.data.fields.DataSchema;
      index: ReturnType<typeof fromUuidSync>;
    }[];
    abilityOptions: { value: dnd5e.types.Ability.TypeKey; label: string }[];
    showContainerWarning: boolean;
    showSpellConfig: boolean;
    showRequireSpellSlot: boolean;
    canPrepare: boolean;
    spellcastingMethods: { label: string; value: string }[];
  }
  interface Configuration extends ItemSharedConfig.Configuration {}
  interface RenderOptions extends ItemSharedConfig.RenderOptions {}
}

export default ItemGrantConfig;
