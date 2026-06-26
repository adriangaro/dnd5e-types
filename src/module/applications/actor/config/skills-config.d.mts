/** Configuration application for actor's skills. */

import SelectChoices from "../../../documents/actor/select-choices.mjs";
import TraitsConfig from "./traits-config.mjs";

declare class SkillsConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = SkillsConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = SkillsConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = SkillsConfig.RenderOptions,
> extends TraitsConfig<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace SkillsConfig {
  interface Any extends SkillsConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SkillsConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends TraitsConfig.RenderContext<Document> {
    // `trait: "skills"` is pinned (actorKeyPath → system.skills). `Extract<…, object>` keeps the
    // override assignable to base `data: object` under the generic `Document` constraint.
    data: Extract<dnd5e.types.PathValue<Document, "system._source.skills">, object>;
    skills: SelectChoices;
    rows: number;
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends TraitsConfig.Configuration<Document> {}
  interface RenderOptions extends TraitsConfig.RenderOptions {}
}

export default SkillsConfig;
