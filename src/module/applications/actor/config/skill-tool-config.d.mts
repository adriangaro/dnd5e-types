/** Configuration application for an actor's skills & tools. */

import BaseProficiencyConfig from "./base-proficiency-config.mjs";

declare class SkillToolConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = SkillToolConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = SkillToolConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = SkillToolConfig.RenderOptions,
> extends BaseProficiencyConfig<Document, RenderContext, Configuration, RenderOptions> {
  /** Configuration data for the ability being edited. */
  get propertyConfig(): dnd5e.types.core.SkillConfiguration | dnd5e.types.core.ToolConfiguration;
}

declare namespace SkillToolConfig {
  interface Any extends SkillToolConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SkillToolConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseProficiencyConfig.RenderContext<Document> {
    abilityOptions: foundry.applications.fields.FormSelectOption[];
    proficiencyOptions: foundry.applications.fields.FormSelectOption[];
    section: string;
    global?: {
      data: object;
      fields: foundry.data.fields.DataSchema;
      skill: boolean;
    };
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseProficiencyConfig.Configuration<Document> {}
  interface RenderOptions extends BaseProficiencyConfig.RenderOptions {}
}

export default SkillToolConfig;
