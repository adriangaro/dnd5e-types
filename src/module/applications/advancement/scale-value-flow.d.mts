/** Inline application that displays any changes to a scale value. */

import AdvancementFlow from "./advancement-flow-v2.mjs";

declare class ScaleValueFlow<
  RenderContext extends object = ScaleValueFlow.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ScaleValueFlow.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ScaleValueFlow.RenderOptions,
> extends AdvancementFlow<RenderContext, Configuration, RenderOptions> {
  static override PARTS: (typeof AdvancementFlow)["PARTS"];
}

declare namespace ScaleValueFlow {
  interface Any extends ScaleValueFlow<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ScaleValueFlow<any, any, any>> {}

  interface RenderContext extends AdvancementFlow.RenderContext {
    initial: string | undefined;
    final: string;
  }
  interface Configuration extends AdvancementFlow.Configuration {}
  interface RenderOptions extends AdvancementFlow.RenderOptions {}
}

export default ScaleValueFlow;
