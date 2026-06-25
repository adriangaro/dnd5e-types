/** System specific document creation dialog with support for icons and hints for each document type. */

import Dialog5e from "./api/dialog.mjs";

declare class CreateDocumentDialog<
  RenderContext extends object = CreateDocumentDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = CreateDocumentDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = CreateDocumentDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {
  /** Name of type of document being created. */
  get documentName(): string;

  /** Type of document being created. */
  get documentType(): typeof foundry.abstract.Document | object;

  /** The form was submitted. */
  get submitted(): boolean;

  /**
   * Prompt user for document creation.
   * @param documentType  Type of document to be created.
   * @param data          Document creation data.
   * @param createOptions Document creation options.
   * @param dialogOptions Options forwarded to dialog.
   * @param dialogOptions.ok    Options for the OK button.
   * @param dialogOptions.sheet Document sheet to display as detached child.
   * @returns {Promise<Document>}
   */
  static prompt(
    documentType: typeof foundry.abstract.Document | object,
    data?: object,
    createOptions?: { folders?: foundry.abstract.Document.DialogFoldersChoices[] | null; types?: string[] | null; [key: string]: unknown },
    dialogOptions?: { ok?: object; sheet?: object; [key: string]: unknown },
  ): Promise<foundry.abstract.Document.Any>;

  /** Handle migrating options for `createDialog` to the V13 API. */
  static migrateOptions(createOptions: object, dialogOptions: object): void;
}

declare namespace CreateDocumentDialog {
  interface Any extends CreateDocumentDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CreateDocumentDialog<any, any, any>> {}

  /** A document sub-type option presented in the dialog. */
  interface TypeData {
    selected: boolean;
    type: string;
    icon?: string;
    label?: string;
  }

  interface RenderContext extends Dialog5e.RenderContext {
    folders: foundry.abstract.Document.DialogFoldersChoices[];
    hasFolders: boolean;
    name?: string;
    folder?: string;
    types: TypeData[];
    hasTypes: boolean;
    defaultName?: string;
  }
  interface Configuration extends Dialog5e.Configuration {
    documentType?: typeof foundry.abstract.Document | object | null;
    createData?: object;
    createOptions?: object;
    folders?: foundry.abstract.Document.DialogFoldersChoices[] | null;
    types?: string[] | null;
  }
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default CreateDocumentDialog;
