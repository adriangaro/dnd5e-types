/** Configuration application for item choices. */

import ItemSharedConfig from "./item-shared-config.mjs";

declare class ItemChoiceConfig<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
  RenderContext extends object = ItemChoiceConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ItemChoiceConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ItemChoiceConfig.RenderOptions,
> extends ItemSharedConfig<Document, RenderContext, Configuration, RenderOptions> {
  /** Reshape the configuration update, cleaning choices and re-validating the pool. */
  prepareConfigurationUpdate(configuration: object): Promise<object>;
}

declare namespace ItemChoiceConfig {
  interface Any extends ItemChoiceConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ItemChoiceConfig<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance>
    extends ItemSharedConfig.RenderContext<Document> {
    items: {
      data: { sort: number; uuid: string };
      fields: foundry.data.fields.DataSchema;
      index: ReturnType<typeof fromUuidSync>;
    }[];
    abilityOptions: { value: dnd5e.types.Ability.TypeKey; label: string }[];
    choices: Record<string, { label: string; count?: number | null; replacement?: boolean }>;
    levelRestrictionOptions: ({ value: string; label: string } | { rule: true })[];
    listRestrictionOptions: foundry.applications.fields.FormSelectOption[];
    showContainerWarning: boolean;
    showSpellConfig: boolean;
    showRequireSpellSlot: boolean;
    canPrepare: boolean;
    spellcastingMethods: { label: string; value: string }[];
    typeOptions: ({ value: string; label: string } | { rule: true })[];
    typeRestriction?: {
      typeLabel: string;
      typeOptions: { value: string; label: string }[];
      subtypeLabel: string;
      subtypeOptions: { value: string; label: string }[] | null;
    };
  }
  interface Configuration extends ItemSharedConfig.Configuration {}
  interface RenderOptions extends ItemSharedConfig.RenderOptions {}
}

export default ItemChoiceConfig;
