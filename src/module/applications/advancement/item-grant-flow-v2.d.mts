/** Inline application that presents the player with a list of items to be added. */

import AdvancementFlow from "./advancement-flow-v2.mjs";

declare class ItemGrantFlow<
  RenderContext extends object = ItemGrantFlow.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ItemGrantFlow.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ItemGrantFlow.RenderOptions,
> extends AdvancementFlow<RenderContext, Configuration, RenderOptions> {
  /** Get the context information for selected spell abilities. */
  getSelectAbilities(): {
    field: foundry.data.fields.StringField;
    options: Array<{ value: dnd5e.types.Ability.TypeKey; label: string | undefined }>;
    value: string;
  } | null;
}

declare namespace ItemGrantFlow {
  interface Any extends ItemGrantFlow<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ItemGrantFlow<any, any, any>> {}

  interface RenderContext extends AdvancementFlow.RenderContext {
    abilities: {
      field: foundry.data.fields.StringField;
      options: Array<{ value: dnd5e.types.Ability.TypeKey; label: string | undefined }>;
      value: string;
    } | null;
    optional: boolean;
    items: object[];
  }
  interface Configuration extends AdvancementFlow.Configuration {}
  interface RenderOptions extends AdvancementFlow.RenderOptions {}
}

export default ItemGrantFlow;
