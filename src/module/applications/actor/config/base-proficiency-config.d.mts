/** Base application for configuring an actor's abilities, skills, or tools. */

import BaseConfigSheet from "../api/base-config-sheet.mjs";

declare class BaseProficiencyConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = BaseProficiencyConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = BaseProficiencyConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = BaseProficiencyConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {
  /** @override */
  get title(): string;

  /**
   * Configuration data for the ability being edited.
   * @type {object}
   * @abstract
   */
  get propertyConfig(): object;

  /**
   * Label for the specific skill or tool being configured.
   */
  get propertyLabel(): string;
}

declare namespace BaseProficiencyConfig {
  interface Any extends BaseProficiencyConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof BaseProficiencyConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.RenderContext<Document> {
    // `data` is the proficiency slice at a runtime-chosen keyPath (`${keyPath}.${options.key}`),
    // so it stays `object` — no single static type is faithful. `global` is the fixed bonuses slice.
    data: object;
    fields: foundry.data.fields.DataSchema;
    label: string;
    prefix: string;
    global?: {
      data: dnd5e.types.PathValue<Document, "system._source.bonuses.abilities">;
      fields: foundry.data.fields.DataSchema;
    };
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {
    key: string | null;
    trait: dnd5e.types.Trait.TypeKey | null;
  }
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default BaseProficiencyConfig;
