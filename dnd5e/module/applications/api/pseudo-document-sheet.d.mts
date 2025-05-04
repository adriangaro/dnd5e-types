import type PseudoDocumentMixin from "@dnd5e/module/documents/mixins/pseudo-document.mjs";
import Application5e from "./application.mjs";

/**
 * Default sheet for activities.
 */
declare class PseudoDocumentSheet<
  Document extends PseudoDocumentMixin.MixinClass,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends Application5e<
  PseudoDocumentSheet.MakeRenderContext<Document, PseudoDocumentSheet.MakeConfiguration<Configuration>, RenderContext>,
  PseudoDocumentSheet.MakeConfiguration<Configuration>,
  PseudoDocumentSheet.MakeRenderOptions<RenderOptions>
> {
  #documentId: string
  #documentType: string
  #item: Item.Implementation


  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The PseudoDocument associated with this application.
   */
  get document(): Document

  /* -------------------------------------------- */

  /**
   * Is this PseudoDocument sheet visible to the current user?
   */
  get isVisible(): boolean

  /* -------------------------------------------- */

  /**
   * Is this PseudoDocument sheet editable by the current User?
   * This is governed by the editPermission threshold configured for the class.
   */
  get isEditable(): boolean

  /* -------------------------------------------- */

  get item(): Item.Implementation


  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle click events to copy the UUID of this document to clipboard.
   */
  static #onCopyUuid<This extends PseudoDocumentSheet.Any>(this: This, event: MouseEvent, target: HTMLElement)

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /**
   * Handle form submission.
   */
  static #onSubmitForm<This extends PseudoDocumentSheet.Any>(this: This, event: SubmitEvent, form: HTMLFormElement, formData: FormDataExtended): Promise<void>

  /* -------------------------------------------- */

  /**
   * Perform any pre-processing of the form data to prepare it for updating.
   */
  _prepareSubmitData(event: SubmitEvent, formData: FormDataExtended): object

  /* -------------------------------------------- */

  /**
   * Handle updating the PseudoDocument based on processed submit data.
   */
  _processSubmitData(event: SubmitEvent, submitData: object): Promise<void>

  /* -------------------------------------------- */

  /**
   * Programmatically submit a PseudoDocumentSheet instance, providing additional data to be merged with form data.
   */
  submit(options?: {
    updateData?: object
  }): Promise<void>
}

declare class AnyPseudoDocumentSheet extends PseudoDocumentSheet<any, fvttUtils.EmptyObject, fvttUtils.EmptyObject, fvttUtils.EmptyObject> {
  constructor(...args: any[])
}

declare namespace PseudoDocumentSheet {
  interface Any extends AnyPseudoDocumentSheet {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyPseudoDocumentSheet> {}

  type MakeRenderContext<
    Document extends PseudoDocumentMixin.MixinClass,
    Cfg extends MakeConfiguration<any>,
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      document: Document,
      editable: boolean,
      options: Cfg
    },
    Ctx
  >
  type RenderContext = PseudoDocumentSheet<any>['__RenderContext']

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      document: null | {
        id: string,
        metadata: {
          name: string
        },
        item: Item.Implementation
      },
      /**
       * A permission level in CONST.DOCUMENT_OWNERSHIP_LEVELS
       */
      viewPermission: typeof foundry.CONST.DOCUMENT_OWNERSHIP_LEVELS;

      /**
       * A permission level in CONST.DOCUMENT_OWNERSHIP_LEVELS
       */
      editPermission: typeof foundry.CONST.DOCUMENT_OWNERSHIP_LEVELS;
    },
    Cfg
  >
  type Configuration = PseudoDocumentSheet<any>['__Configuration']
  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = PseudoDocumentSheet<any>['__RenderOptions']
}

export default PseudoDocumentSheet