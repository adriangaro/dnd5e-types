/** Pop out ProseMirror editor window for journal entries with multiple text areas that need editing. */

import DocumentSheet5e from "../api/document-sheet.mjs";

declare class JournalEditor<
  Document extends foundry.abstract.Document.Any = JournalEntryPage.Implementation,
  RenderContext extends object = JournalEditor.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = JournalEditor.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = JournalEditor.RenderOptions,
> extends DocumentSheet5e<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace JournalEditor {
  interface Any extends JournalEditor<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof JournalEditor<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = JournalEntryPage.Implementation>
    extends Omit<DocumentSheet5e.RenderContext<Document>, "source"> {
    enriched: string;
    keyPath: string | null;
    source: string;
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = JournalEntryPage.Implementation>
    extends DocumentSheet5e.Configuration<Document> {
    /** Key path to the text field on the document being edited. */
    textKeyPath: string | null;
  }
  interface RenderOptions extends DocumentSheet5e.RenderOptions {}
}

export default JournalEditor;
