/** Inline application that displays size advancement. */

import AdvancementFlow from "./advancement-flow-v2.mjs";

declare class SizeFlow<
  RenderContext extends object = SizeFlow.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = SizeFlow.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = SizeFlow.RenderOptions,
> extends AdvancementFlow<RenderContext, Configuration, RenderOptions> {}

declare namespace SizeFlow {
  interface Any extends SizeFlow<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SizeFlow<any, any, any>> {}

  interface RenderContext extends AdvancementFlow.RenderContext {
    size: {
      field: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey, { required: true; blank: false }>;
      options: { value: dnd5e.types.ActorSize.TypeKey; label: string }[];
      value: dnd5e.types.ActorSize.TypeKey | "";
    } | null;
  }
  interface Configuration extends AdvancementFlow.Configuration {}
  interface RenderOptions extends AdvancementFlow.RenderOptions {}
}

export default SizeFlow;
