/** Configuration application for an actor's concentration checks. */

import BaseConfigSheet from "../api/base-config-sheet.mjs";

/** Configuration application for an actor's concentration checks. */
declare class ConcentrationConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = ConcentrationConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = ConcentrationConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = ConcentrationConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace ConcentrationConfig {
  interface Any extends ConcentrationConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ConcentrationConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.RenderContext<Document> {
    data: dnd5e.types.PathValue<Document, "system._source.attributes.concentration">;
    fields: foundry.data.fields.DataSchema;
    abilityOptions: foundry.applications.fields.FormSelectOption[];
    global?: {
      data: dnd5e.types.PathValue<Document, "system._source.bonuses.abilities">;
      fields: foundry.data.fields.DataSchema;
    };
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {}
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default ConcentrationConfig;
