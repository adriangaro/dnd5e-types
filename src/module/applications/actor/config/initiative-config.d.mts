/** Configuration application for an actor's initiative. */

import BaseConfigSheet from "../api/base-config-sheet.mjs";

declare class InitiativeConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = InitiativeConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = InitiativeConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = InitiativeConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {
  /** @override */
  get title(): string;
}

declare namespace InitiativeConfig {
  interface Any extends InitiativeConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof InitiativeConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.RenderContext<Document> {
    abilityOptions: foundry.applications.fields.FormSelectOption[];
    data: object;
    fields: foundry.data.fields.DataSchema;
    ability: {
      label: string;
      global: { field: foundry.data.fields.DataField.Any | undefined; name: string; value: string | undefined };
      local: { field: foundry.data.fields.DataField.Any; name: string; value: string | undefined };
    };
    flags: {
      alert: { field: foundry.data.fields.DataField.Any; name: string; value: boolean | undefined };
    };
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {}
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default InitiativeConfig;
