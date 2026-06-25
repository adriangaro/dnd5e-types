/** Shared base configuration application for Item Grant & Item Choice advancement. */

import AdvancementConfig from "./advancement-config-v2.mjs";

/**
 * Shared base configuration application for Item Grant & Item Choice advancement.
 */
declare class ItemSharedConfig<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
  RenderContext extends object = ItemSharedConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ItemSharedConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ItemSharedConfig.RenderOptions,
> extends AdvancementConfig<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace ItemSharedConfig {
  interface Any extends ItemSharedConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ItemSharedConfig<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance>
    extends AdvancementConfig.RenderContext<Document> {
    manualSort: boolean;
  }
  interface Configuration extends AdvancementConfig.Configuration {}
  interface RenderOptions extends AdvancementConfig.RenderOptions {}
}

export default ItemSharedConfig;
