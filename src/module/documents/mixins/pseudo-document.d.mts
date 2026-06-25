/**
 * A mixin which extends a DataModel to provide behavior shared between activities & advancement.
 * The concrete pseudo-documents (`Activity` / `Advancement`) are `PseudoDocumentMixin(BaseData)`:
 * the data model supplies schema + derived, this mixin layers the shared id/uuid/item/actor/sheet +
 * update/delete/createDialog behavior. (`ActivityMixin` / `AdvancementMixin` layer their own
 * type-specific surface atop this same shared contract.)
 */

type AnyDataModelConstructor = abstract new (...args: any[]) => foundry.abstract.DataModel.Any;

/** The behavior `PseudoDocumentMixin` adds to its base DataModel. */
export declare class PseudoDocument {
  constructor(...args: any[]);

  /**
   * Mapping of PseudoDocument UUID to the apps they should re-render.
   * @internal
   */
  static _apps: Map<string, Set<foundry.applications.api.ApplicationV2.Any>>;

  /** Existing sheets of a specific type for a specific document. */
  static _sheets: Map<unknown, foundry.applications.api.ApplicationV2.Any>;

  /** Configuration information for PseudoDocuments. */
  get metadata(): dnd5e.types.documents.mixins.PseudoDocumentsMetadata;

  /** Configuration object that defines types (`CONFIG.DND5E[\`${documentName}Types\`]`). */
  static get documentConfig(): object;
  get documentConfig(): object;

  /** The canonical name of this PseudoDocument type, for example "Activity". */
  static get documentName(): string;
  get documentName(): string;

  /** Unique identifier for this PseudoDocument within its item. */
  get id(): string;

  /** Unique ID for this PseudoDocument on an actor. */
  get relativeID(): string;

  /** Globally unique identifier for this PseudoDocument. */
  get uuid(): string | null;

  /** Item to which this PseudoDocument belongs. */
  get item(): globalThis.Item.Implementation;

  /** Actor to which this PseudoDocument's item belongs, if the item is embedded. */
  get actor(): globalThis.Actor.Implementation | null;

  /** Lazily obtain an Application instance used to configure this PseudoDocument, or null if no sheet is available. */
  get sheet(): foundry.applications.api.ApplicationV2.Any | null;

  /**
   * Render all the Application instances which are connected to this PseudoDocument.
   * @param options  Rendering options.
   */
  render(options?: object): void;

  /**
   * Register an application to respond to updates to a certain document.
   * @param doc  Pseudo document to watch.
   * @param app  Application to update.
   * @internal
   */
  static _registerApp(doc: PseudoDocument.Any, app: foundry.applications.api.ApplicationV2.Any): void;

  /**
   * Remove an application from the render registry.
   * @param doc  Pseudo document being watched.
   * @param app  Application to stop watching.
   */
  static _unregisterApp(doc: PseudoDocument.Any, app: foundry.applications.api.ApplicationV2.Any): void;

  /**
   * Update this PseudoDocument.
   * @param updates  Updates to apply to this PseudoDocument.
   * @param options  Additional context which customizes the update workflow.
   * @returns        This PseudoDocument after updates have been applied.
   */
  update(updates: object, options?: object): Promise<this>;

  /**
   * Update this PseudoDocument's data on the item without performing a database commit.
   * @param updates  Updates to apply to this PseudoDocument.
   * @returns        This PseudoDocument after updates have been applied.
   */
  updateSource(updates: object): this;

  /**
   * Delete this PseudoDocument, removing it from the database.
   * @param options  Additional context which customizes the deletion workflow.
   * @returns        The deleted PseudoDocument instance.
   */
  delete(options?: object): Promise<this>;

  /**
   * Present a Dialog form to confirm deletion of this PseudoDocument.
   * @param options        Positioning and sizing options for the resulting dialog.
   * @param options.sheet  Document sheet to display as detached child.
   * @returns              A Promise which resolves to the deleted PseudoDocument.
   */
  deleteDialog(options?: { sheet?: foundry.applications.api.ApplicationV2.Any } & object): Promise<this>;

  /**
   * Serialize salient information for this PseudoDocument when dragging it.
   * @returns  An object of drag data.
   */
  toDragData(): object;

  /**
   * Spawn a dialog for creating a new pseudo-document.
   * @param data           Data to pre-populate the document with.
   * @param createOptions
   * @param dialogOptions
   */
  static createDialog(data?: object, createOptions?: object, dialogOptions?: object): Promise<PseudoDocument.Any | null>;

  /**
   * The default display name of a pseudo-document of this type.
   * @param options
   * @param options.type
   */
  static defaultName(options: { type: string }): string;

  /**
   * Prepare the data needed for the creation dialog.
   * @param type    Specific type of the PseudoDocument to prepare.
   * @param parent  Parent document within which this PseudoDocument will be created.
   */
  static _createDialogData(
    type: string,
    parent: globalThis.Item.Implementation,
  ): { type: string; label: string; icon: string; hint?: string; disabled?: boolean };

  /**
   * Prepare default list of types if none are specified.
   * @param parent  Parent document within which this PseudoDocument will be created.
   */
  static _createDialogTypes(parent: globalThis.Item.Implementation): string[];
}

export declare namespace PseudoDocument {
  interface Any extends PseudoDocument {}
  interface AnyConstructor extends fvttUtils.Identity<typeof PseudoDocument> {}
}

/** Type of a `PseudoDocumentMixin(Base)` result — `Base`'s surface plus the {@link PseudoDocument} contract. */
export type PseudoDocumentMix<T extends AnyDataModelConstructor> = (new (
  ...args: any[]
) => fvttUtils.FixedInstanceType<T> & PseudoDocument) &
  Pick<T, keyof T> &
  Pick<typeof PseudoDocument, keyof typeof PseudoDocument>;

declare function PseudoDocumentMixin<T extends AnyDataModelConstructor>(Base: T): PseudoDocumentMix<T>;

export default PseudoDocumentMixin;
