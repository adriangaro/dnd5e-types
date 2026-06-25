/** Configuration application for an actor's abilities. */

import BaseProficiencyConfig from "./base-proficiency-config.mjs";

/** Configuration application for an actor's abilities. */
declare class AbilityConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = AbilityConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = AbilityConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = AbilityConfig.RenderOptions,
> extends BaseProficiencyConfig<Document, RenderContext, Configuration, RenderOptions> {
  get propertyConfig(): dnd5e.types.Ability.Config;
}

declare namespace AbilityConfig {
  interface Any extends AbilityConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AbilityConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseProficiencyConfig.RenderContext<Document> {
    proficiencyOptions: { value: dnd5e.types.ProficiencyLevel.TypeKey; label: string }[];
    checkLabel: string;
    saveLabel: string;
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseProficiencyConfig.Configuration<Document> {}
  interface RenderOptions extends BaseProficiencyConfig.RenderOptions {}
}

export default AbilityConfig;
