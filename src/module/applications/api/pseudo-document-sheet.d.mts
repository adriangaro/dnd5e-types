/**
 * Default sheet for activities.
 *
 * Base sheet for pseudo-documents (activities, advancements) — data models embedded in an item that
 * behave like documents. Generic over the pseudo-document type.
 */

import Application5e from "./application.mjs";

declare class PseudoDocumentSheet<
  Document extends foundry.abstract.DataModel.Any = foundry.abstract.DataModel.Any,
  RenderContext extends object = PseudoDocumentSheet.RenderContext<Document>,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = PseudoDocumentSheet.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = PseudoDocumentSheet.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  /** The PseudoDocument associated with this application. */
  get document(): Document;

  /** Is this PseudoDocument sheet visible to the current user? */
  get isVisible(): boolean;

  /**
   * Is this PseudoDocument sheet editable by the current User?
   * This is governed by the editPermission threshold configured for the class.
   */
  get isEditable(): boolean;

  /** The item the pseudo-document belongs to. */
  get item(): globalThis.Item.Implementation;

  /** Pre-process the form data prior to updating. */
  _prepareSubmitData(event: SubmitEvent, formData: foundry.applications.ux.FormDataExtended): object | Promise<object>;

  /** Update the PseudoDocument based on processed submit data. */
  _processSubmitData(event: SubmitEvent, submitData: object): Promise<void>;

  /** Programmatically submit, merging additional data with the form data. */
  submit(options?: { updateData?: object }): Promise<void>;
}

declare namespace PseudoDocumentSheet {
  interface Any extends PseudoDocumentSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof PseudoDocumentSheet<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.DataModel.Any = foundry.abstract.DataModel.Any>
    extends Application5e.RenderContext {
    document: Document;
    editable: boolean;
    options: PseudoDocumentSheet.Configuration;
  }

  interface Configuration extends Application5e.Configuration {
    document: null | {
      id: string;
      metadata: dnd5e.types.documents.mixins.PseudoDocumentsMetadata;
      item: globalThis.Item.Implementation;
    };
    /** A permission level in `CONST.DOCUMENT_OWNERSHIP_LEVELS`. */
    viewPermission: foundry.CONST.DOCUMENT_OWNERSHIP_LEVELS;
    /** A permission level in `CONST.DOCUMENT_OWNERSHIP_LEVELS`. */
    editPermission: foundry.CONST.DOCUMENT_OWNERSHIP_LEVELS;
  }

  interface RenderOptions extends Application5e.RenderOptions {}
}

export default PseudoDocumentSheet;
