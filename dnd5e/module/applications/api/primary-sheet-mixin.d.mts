import ItemSheet5e from "../item/item-sheet.mjs";
import DragDropApplicationMixin from "../mixins/drag-drop-mixin.mjs";
import ContextMenu5e from "../context-menu.mjs";
import type DocumentSheet5e from "./document-sheet.d.mts";
import type { SheetTabDescriptor5e } from "../mixins/sheet-v2-mixin.d.mts";
import type { 
  ItemListComparator5e, 
  SortModeConfiguration5e, 
  FilterState5e,
  ListControlDescriptor,
  ListControlConfiguration,
  TabPreferences5e 
} from "../components/item-list-controls.d.mts";


/**
 * Adds V2 sheet functionality shared between primary document sheets (Actors & Items).
 */
declare function PrimarySheetMixin<
  T extends foundry.applications.api.DocumentSheetV2.AnyConstructor
>(Base: T): typeof BasePrimarySheet5e & ReturnType<typeof DragDropApplicationMixin<T>>;

declare namespace PrimarySheetMixin {
  type MixinClass = BasePrimarySheet5e;
  
  /**
   * Available sheet modes.
   */
  interface MODES {
    readonly PLAY: 1;
    readonly EDIT: 2;
  }
  
  /**
   * Sheet mode values.
   */
  type ModeValue = MODES[keyof MODES];
  
  /**
   * Standard sort mode keys used in SORT_MODES.
   */
  type SortModeKey = "a" | "m" | "p";
  
  /**
   * Base render context for primary sheets.
   * Can be augmented by declaration merging.
   */
  interface RenderContext {
    tabs: Record<string, Partial<foundry.applications.api.ApplicationV2.Tab>>;
    mode: ModeValue | null;
    filters: Record<string, FilterState>;
  }
  
  /**
   * Base configuration for primary sheets.
   * Can be augmented by declaration merging.
   */
  interface Configuration {
    sheet: {
      modes: MODES;
      tabs: SheetTabDescriptor5e[];
    };
  }
  
  /**
   * Base render options for primary sheets.
   * Can be augmented by declaration merging.
   */
  interface RenderOptions {
    mode?: ModeValue;
  }
  
  /**
   * Re-exported types from item list controls for convenience.
   */
  type ItemListComparator = ItemListComparator5e;
  type SortModeConfiguration = SortModeConfiguration5e;
  type FilterState = FilterState5e;
  type ControlDescriptor = ListControlDescriptor;
  type ControlConfiguration = ListControlConfiguration;
  type TabPreferences = TabPreferences5e;
}

declare class BasePrimarySheet5e {
  /** @privateRemarks All mixin classes should accept anything for its constructor. */
  constructor(...args: any[]);

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  readonly [foundry.applications.api.ApplicationV2.Internal.__RenderContext]: {};

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  readonly [foundry.applications.api.ApplicationV2.Internal.__Configuration]: {};

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  readonly [foundry.applications.api.ApplicationV2.Internal.__RenderOptions]: {};

  /* -------------------------------------------- */
  /*  Static Properties                           */
  /* -------------------------------------------- */

  /**
   * Sheet tabs.
   */
  static TABS: SheetTabDescriptor5e[];

  /**
   * Available sheet modes.
   */
  static MODES: PrimarySheetMixin.MODES;

  /**
   * Methods for sorting child embedded items.
   */
  static SORT_MODES: Record<PrimarySheetMixin.SortModeKey, PrimarySheetMixin.ItemListComparator>;

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Filters for applied inventory sections.
   */
  _filters: Record<string, PrimarySheetMixin.FilterState>;

  /**
   * The mode the sheet is currently in.
   */
  _mode: PrimarySheetMixin.ModeValue | null;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Attach frame listeners.
   */
  _attachFrameListeners(): void;

  /**
   * Configure render options.
   */
  _configureRenderOptions(options: foundry.applications.api.ApplicationV2.RenderOptionsOf<this>): void;

  /**
   * Configure render parts.
   */
  _configureRenderParts(options: foundry.applications.api.ApplicationV2.RenderOptionsOf<this>): Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart>;

  /**
   * Translate header controls to context menu entries.
   */
  _getHeaderControlContextEntries(): Generator<foundry.applications.ux.ContextMenu.Entry<HTMLElement>>;

  /**
   * Render the frame.
   */
  _renderFrame(options: fvttUtils.DeepPartial<foundry.applications.api.ApplicationV2.RenderOptionsOf<this>>): Promise<HTMLElement>;

  /**
   * Handle re-rendering the mode toggle on ownership changes.
   */
  _renderModeToggle(): void;

  /**
   * Render source information in the Document's title bar.
   */
  _renderSourceFrame(html: HTMLElement): void;

  /**
   * Update the source information when re-rendering the sheet.
   */
  _renderSource(): void;

  /**
   * Prepare context data.
   */
  _prepareContext(options: fvttUtils.DeepPartial<foundry.applications.api.ApplicationV2.RenderOptionsOf<this>> & { isFirstRender?: boolean }): Promise<foundry.applications.api.ApplicationV2.RenderContextOf<this>>;

  /**
   * Prepare part context data.
   */
  _preparePartContext(partId: string, context: foundry.applications.api.ApplicationV2.RenderContextOf<this>, options: fvttUtils.DeepPartial<foundry.applications.api.ApplicationV2.RenderOptionsOf<this>>): Promise<foundry.applications.api.ApplicationV2.RenderContextOf<this>>;

  /**
   * Prepare the tab information for the sheet.
   */
  _getTabs(): Record<string, Partial<foundry.applications.api.ApplicationV2.Tab>>;

  /**
   * Toggle disabled state.
   */
  _toggleDisabled(disabled: boolean): void;

  /* -------------------------------------------- */
  /*  Life-Cycle Handlers                         */
  /* -------------------------------------------- */

  /**
   * Handle first render.
   */
  _onFirstRender(context: foundry.applications.api.ApplicationV2.RenderContextOf<this>, options: fvttUtils.DeepPartial<foundry.applications.api.ApplicationV2.RenderOptionsOf<this>>): Promise<void>;

  /**
   * Handle rendering.
   */
  _onRender(context: foundry.applications.api.ApplicationV2.RenderContextOf<this>, options: fvttUtils.DeepPartial<foundry.applications.api.ApplicationV2.RenderOptionsOf<this>>): Promise<void>;

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /**
   * Handle creating a new embedded child.
   */
  _addDocument(event: Event, target: HTMLElement): any;

  /**
   * Initialize item tooltips on an element.
   */
  _applyItemTooltips(element: HTMLElement): void;

  /**
   * Change active tab.
   */
  changeTab(tab: string, group: string, options?: Record<string, any>): void;

  /**
   * Handle removing a document.
   */
  _deleteDocument(event: Event, target: HTMLElement): Promise<any>;

  /**
   * Handle the user toggling the sheet mode.
   */
  _onChangeSheetMode(event: Event): Promise<void>;

  /**
   * Handle click actions.
   */
  _onClickAction(event: Event, target: HTMLElement): void;

  /**
   * Handle opening a document sheet.
   */
  _showDocument(event: Event, target: HTMLElement): Promise<any>;

  /* -------------------------------------------- */
  /*  Sorting                                     */
  /* -------------------------------------------- */

  /**
   * Sort child embedded documents by the given sort mode.
   */
  _sortChildren(collection: string, mode: PrimarySheetMixin.SortModeKey): Document[];

  /**
   * Sort Active Effects by the given sort mode.
   */
  _sortEffects(effects: ActiveEffect.Implementation[], mode: string): ActiveEffect.Implementation[];

  /**
   * Sort Items by the given sort mode.
   */
  _sortItems(items: Item.Implementation[], mode: string): Item.Implementation[];

  /**
   * Sort Items alphabetically.
   */
  static sortItemsAlphabetical(a: Item.Implementation, b: Item.Implementation): number;

  /**
   * Sort Items the way the user arranged them.
   */
  static sortItemsManual(a: Item.Implementation, b: Item.Implementation): number;

  /**
   * Sort Items by priority.
   */
  static sortItemsPriority(a: Item.Implementation, b: Item.Implementation): number;

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /**
   * Get allowed drop behaviors.
   */
  _allowedDropBehaviors(event: DragEvent, data: any): Set<string>;

  /**
   * Get default drop behavior.
   */
  _defaultDropBehavior(event: DragEvent, data: any): string;

  /**
   * Handle drag start.
   */
  _onDragStart(event: DragEvent): Promise<void>;
}

export default PrimarySheetMixin;
