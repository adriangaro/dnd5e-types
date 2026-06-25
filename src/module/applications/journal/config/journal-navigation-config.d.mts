/** Application for configuring the navigation links in a journal. */

import DocumentSheet5e from "../../api/document-sheet.mjs";

declare class JournalNavigationConfig<
  Document extends foundry.abstract.Document.Any = globalThis.JournalEntry.Implementation,
  RenderContext extends object = JournalNavigationConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = JournalNavigationConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = JournalNavigationConfig.RenderOptions,
> extends DocumentSheet5e<Document, RenderContext, Configuration, RenderOptions> {
  get title(): string;

  get subtitle(): string;
}

declare namespace JournalNavigationConfig {
  interface Any extends JournalNavigationConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof JournalNavigationConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.JournalEntry.Implementation>
    extends DocumentSheet5e.RenderContext<Document> {
    fields: (dnd5e.applications.api.FieldsConfig & { label: string })[];
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.JournalEntry.Implementation>
    extends DocumentSheet5e.Configuration<Document> {}
  interface RenderOptions extends DocumentSheet5e.RenderOptions {}
}

export default JournalNavigationConfig;
