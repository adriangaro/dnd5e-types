/** Application for configuring a journal entry's listing in Table of Contents and its pages. */

import DocumentSheet5e from "../../api/document-sheet.mjs";

declare class JournalTOCConfig<
  Document extends JournalEntry.Implementation = JournalEntry.Implementation,
  RenderContext extends object = JournalTOCConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = JournalTOCConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = JournalTOCConfig.RenderOptions,
> extends DocumentSheet5e<Document, RenderContext, Configuration, RenderOptions> {
  /** The compendium being configured. */
  get compendium(): CompendiumCollection.Any;

  /** @override */
  get title(): string;

  /** @override */
  get subtitle(): string;
}

declare namespace JournalTOCConfig {
  interface Any extends JournalTOCConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof JournalTOCConfig<any, any, any, any>> {}

  interface RenderContext<Document extends JournalEntry.Implementation = JournalEntry.Implementation>
    extends Omit<DocumentSheet5e.RenderContext<Document>, "fields"> {
    fields: JournalTOCConfig.FieldDescriptor[];
  }

  interface Configuration<Document extends JournalEntry.Implementation = JournalEntry.Implementation>
    extends DocumentSheet5e.Configuration<Document> {}

  interface RenderOptions extends DocumentSheet5e.RenderOptions {}

  /** Descriptor for a field rendered in the Table of Contents config form. */
  interface FieldDescriptor {
    field: foundry.data.fields.DataField.Any;
    name: string;
    value: any;
    label?: string;
    localize?: boolean;
    placeholder?: string;
    input?: any;
    options?: foundry.applications.fields.FormSelectOption[];
    visible?: boolean;
  }
}

export default JournalTOCConfig;
