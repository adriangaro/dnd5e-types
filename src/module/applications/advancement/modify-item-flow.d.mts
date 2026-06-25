/** Inline application that presents the player with a list of items to be modified. */

import AdvancementFlow from "./advancement-flow-v2.mjs";

declare class ModifyItemFlow<
  RenderContext extends object = ModifyItemFlow.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ModifyItemFlow.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ModifyItemFlow.RenderOptions,
> extends AdvancementFlow<RenderContext, Configuration, RenderOptions> {}

declare namespace ModifyItemFlow {
  interface Any extends ModifyItemFlow<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ModifyItemFlow<any, any, any>> {}

  interface RenderContext extends AdvancementFlow.RenderContext {
    changes: Array<{
      enchantment: foundry.abstract.Document.Any | ActiveEffect.Implementation;
      items: Item.Implementation[];
    }>;
  }
  interface Configuration extends AdvancementFlow.Configuration {}
  interface RenderOptions extends AdvancementFlow.RenderOptions {}
}

export default ModifyItemFlow;
