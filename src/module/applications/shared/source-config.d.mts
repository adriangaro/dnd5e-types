/** Application for configuring the source data on actors and items. */

import DocumentSheet5e from "../api/document-sheet.mjs";

declare class SourceConfig<
  Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any,
  RenderContext extends object = SourceConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = SourceConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = SourceConfig.RenderOptions,
> extends DocumentSheet5e<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace SourceConfig {
  interface Any extends SourceConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SourceConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any>
    extends DocumentSheet5e.RenderContext<Document> {
    buttons: { icon: string; label: string; type: string }[];
    data: dnd5e.types.fields.SourceField.SourceData;
    fields: foundry.data.fields.DataSchema;
    keyPath: string;
    source: foundry.data.fields.SchemaField.SourceData<dnd5e.types.fields.SourceField.Schema>;
    sourceUuid?: string;
    sourceAnchor?: string;
    rulesVersions: { value: "" | "2024" | "2014"; label: string }[];
    identifier?: {
      field: foundry.data.fields.DataField.Any;
      placeholder: string;
      value: string;
    };
  }

  interface Configuration<Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any>
    extends DocumentSheet5e.Configuration<Document> {
    keyPath?: string;
  }

  interface RenderOptions extends DocumentSheet5e.RenderOptions {}
}

export default SourceConfig;
