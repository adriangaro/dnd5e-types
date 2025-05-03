import DocumentSheet5e from "../api/document-sheet.mjs";

/**
 * Pop out ProseMirror editor window for journal entries with multiple text areas that need editing.
 * @extends {DocumentSheet5e<foundry.applications.api.ApplicationV2.Configuration & JournalEditorConfiguration>}
 */
export default class JournalEditor extends DocumentSheet5e<
  JournalEntryPage.Implementation,
{
  enriched: string,
  keyPath: string,
  source: string
}, 
{

},
{

}
> {}
