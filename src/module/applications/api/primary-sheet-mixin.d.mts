/**
 * Shared V2 functionality for the PRIMARY document sheets (Actors & Items): play/edit modes, tabs,
 * inventory filters/sorting, drag-drop (via {@link DragDropApplicationMixin}), and context-menu
 * header controls. Mixed onto a `DocumentSheetV2` constructor.
 *
 * Some descriptor types (`SheetTabDescriptor5e`, the list-control/filter types) are sourced from the
 * `components/item-list-controls` leaf and the sheet-tab mixin; until those land they are declared
 * loosely in this namespace and tightened in Layer 2.
 */

import DragDropApplicationMixin from "./drag-drop-mixin.mjs";

declare function PrimarySheetMixin<T extends foundry.applications.api.DocumentSheetV2.AnyConstructor>(
  Base: T,
): typeof BasePrimarySheet5e & ReturnType<typeof DragDropApplicationMixin<T>>;

declare namespace PrimarySheetMixin {
  type MixinClass = BasePrimarySheet5e;

  /** Available sheet modes. */
  interface MODES {
    readonly PLAY: 1;
    readonly EDIT: 2;
  }

  /** Sheet mode values. */
  type ModeValue = MODES[keyof MODES];

  /** Standard sort mode keys used in `SORT_MODES`. */
  type SortModeKey = "a" | "m" | "p";

  /** A sheet tab descriptor (loose pending the sheet-tab mixin port). */
  type SheetTabDescriptor5e = dnd5e.types.applications.api.SheetTabDescriptor5e;

  /** State of a sheet filter (loose pending item-list-controls port). */
  type FilterState = dnd5e.types.applications.components.FilterState5e;
  /** Comparator used to sort embedded items (loose pending item-list-controls port). */
  type ItemListComparator = dnd5e.types.applications.components.ItemListComparator5e;

  /** Render context contributed by primary sheets. */
  interface RenderContext {
    tabs: Record<string, Partial<foundry.applications.api.ApplicationV2.Tab>>;
    owner: boolean;
    locked: boolean;
    editable: boolean;
    tab?: Partial<foundry.applications.api.ApplicationV2.Tab>;
  }

  /** Configuration contributed by primary sheets. */
  interface Configuration {
    sheet: {
      modes: MODES;
      tabs: SheetTabDescriptor5e[];
    };
  }

  /** Render options contributed by primary sheets. */
  interface RenderOptions {
    mode?: ModeValue;
  }
}

declare class BasePrimarySheet5e {
  /** @privateRemarks All mixin classes accept anything for their constructor. */
  constructor(...args: any[]);

  /* -------------------------------------------- */
  /*  Static Properties                           */
  /* -------------------------------------------- */

  /** Sheet tabs. */
  static TABS: PrimarySheetMixin.SheetTabDescriptor5e[];

  /** Available sheet modes. */
  static MODES: PrimarySheetMixin.MODES;

  /** Methods for sorting child embedded items. */
  static SORT_MODES: Record<PrimarySheetMixin.SortModeKey, PrimarySheetMixin.ItemListComparator>;

  /** Sort Items alphabetically. */
  static sortItemsAlphabetical(a: globalThis.Item.Implementation, b: globalThis.Item.Implementation): number;
  /** Sort Items the way the user arranged them. */
  static sortItemsManual(a: globalThis.Item.Implementation, b: globalThis.Item.Implementation): number;
  /** Sort Items by priority. */
  static sortItemsPriority(a: globalThis.Item.Implementation, b: globalThis.Item.Implementation): number;

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** Filters for applied inventory sections. */
  _filters: Record<string, PrimarySheetMixin.FilterState>;

  /** The mode the sheet is currently in. */
  _mode: PrimarySheetMixin.ModeValue | null;

  /** Is the sheet in edit mode? */
  get isEditMode(): boolean;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  protected _configureRenderOptions(
    options: foundry.applications.api.ApplicationV2.RenderOptions & PrimarySheetMixin.RenderOptions,
  ): void;
  protected _configureRenderParts(
    options: object,
  ): Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart>;
  /**
   * Render source information in the Document's title bar.
   * @param html - The outer frame HTML.
   */
  _renderSourceFrame(html: HTMLElement): void;

  /**
   * Update the source information when re-rendering the sheet.
   */
  _renderSource(): void;

  /**
   * Prepare the tab information for the sheet.
   * @returns A record of tab id to partial tab configuration.
   */
  _getTabs(): Record<string, Partial<foundry.applications.api.ApplicationV2.Tab>>;
  _toggleDisabled(disabled: boolean): void;
  _getHeaderControlContextEntries(): Generator<foundry.applications.ux.ContextMenu.Entry<HTMLElement>>;

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /**
   * Handle creating a new embedded child.
   * @param event - Triggering click event.
   * @param target - Button that was clicked.
   * @returns
   * @protected
   * @abstract
   */
  _addDocument(event: Event, target: HTMLElement): any;

  /**
   * Initialize item tooltips on an element.
   * @param element - The tooltipped element.
   */
  _applyItemTooltips(element: HTMLElement): void;
  changeTab(tab: string, group: string, options?: Record<string, any>): void;
  /**
   * Handle removing an document.
   * @param event - Triggering click event.
   * @param target - Button that was clicked.
   * @returns Return `false` to prevent default behavior.
   */
  _deleteDocument(event: Event, target: HTMLElement): Promise<any>;
  /**
   * Handle the user toggling the sheet mode.
   * @param event - Triggering click event.
   * @param target - Button that was clicked.
   */
  _onChangeSheetMode(event: Event, target?: HTMLElement): Promise<void>;
  _onClickAction(event: Event, target: HTMLElement): void;
  protected _onRevealSecret(event: Event): void;
  /**
   * Handle opening a document sheet.
   * @param event - Triggering click event.
   * @param target - Button that was clicked.
   * @returns Return `false` to prevent default behavior.
   */
  _showDocument(event: Event, target: HTMLElement): Promise<any>;
  /**
   * Open a document's sheet, rendering it as a child of this application if supported.
   * @param doc - The document whose sheet should be opened.
   * @param options - Options passed to render.
   */
  _openDocumentSheet(
    doc: foundry.abstract.Document.Any,
    options?: foundry.applications.api.ApplicationV2.RenderOptions,
  ): void;

  /* -------------------------------------------- */
  /*  Sorting                                     */
  /* -------------------------------------------- */

  /**
   * Sort child embedded documents by the given sort mode.
   * @param collection - The embedded collection name.
   * @param mode - The sort mode.
   * @returns The sorted documents.
   */
  _sortChildren(collection: string, mode: string): foundry.abstract.Document.Any[];
  /**
   * Sort Active Effects by the given sort mode.
   * @param effects - The effects to sort.
   * @param mode - The sort mode.
   * @returns The sorted effects.
   */
  _sortEffects(
    effects: globalThis.ActiveEffect.Implementation[],
    mode: string,
  ): globalThis.ActiveEffect.Implementation[];
  /**
   * Sort Items by the given sort mode.
   * @param items - The items to sort.
   * @param mode - The sort mode.
   * @returns The sorted items.
   */
  _sortItems(items: globalThis.Item.Implementation[], mode: string): globalThis.Item.Implementation[];

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  _allowedDropBehaviors(event: DragEvent, data: any): Set<dnd5e.types.DropEffectValue>;
  _defaultDropBehavior(event: DragEvent, data: any): dnd5e.types.DropEffectValue;
  _onDragStart(event: DragEvent): Promise<void>;
}

export default PrimarySheetMixin;
