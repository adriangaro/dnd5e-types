/** Inline application that presents the player with a choice of subclass. */

import AdvancementFlow from "./advancement-flow-v2.mjs";

declare class SubclassFlow<
  RenderContext extends object = SubclassFlow.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = SubclassFlow.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = SubclassFlow.RenderOptions,
> extends AdvancementFlow<RenderContext, Configuration, RenderOptions> {
  /** Handle dropping subclass onto the flow. */
  protected _onDrop(event: DragEvent): Promise<void>;
}

declare namespace SubclassFlow {
  interface Any extends SubclassFlow<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SubclassFlow<any, any, any>> {}

  interface RenderContext extends AdvancementFlow.RenderContext {
    subclass: globalThis.Item.OfType<"subclass"> | null;
  }
  interface Configuration extends AdvancementFlow.Configuration {}
  interface RenderOptions extends AdvancementFlow.RenderOptions {}
}

export default SubclassFlow;
