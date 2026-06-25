/** Inline application that presents the player with a trait choices. */

import SelectChoices from "../../documents/actor/select-choices.mjs";
import AdvancementFlow from "./advancement-flow-v2.mjs";

declare class TraitFlow<
  RenderContext extends object = TraitFlow.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = TraitFlow.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = TraitFlow.RenderOptions,
> extends AdvancementFlow<RenderContext, Configuration, RenderOptions> {
  /** Trait configuration from `CONFIG.DND5E.traits` for this advancement's trait type. */
  get traitConfig(): dnd5e.types.Trait.Config;
}

declare namespace TraitFlow {
  interface Any extends TraitFlow<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof TraitFlow<any, any, any>> {}

  interface RenderContext extends AdvancementFlow.RenderContext {
    added?: {
      field: foundry.data.fields.StringField;
      options: Array<SelectChoices.OptionEntry | { value: string; label: string }>;
    };
    slots: { key: string; label: string | null; icon: string | null; showDelete: boolean }[];
  }
  interface Configuration extends AdvancementFlow.Configuration {}
  interface RenderOptions extends AdvancementFlow.RenderOptions {}
}

export default TraitFlow;
