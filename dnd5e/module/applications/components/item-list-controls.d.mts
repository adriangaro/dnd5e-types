import type FilterStateElement from "./filter-state.d.mts";

/**
 * @typedef {object} SortModeConfiguration5e
 * @property {string} icon
 * @property {string} label
 * @property {ItemListComparator5e} comparator
 */
/**
 * @callback ItemListComparator5e
 * @param {object} a
 * @param {object} b
 * @returns {number}
 */

interface SortModeConfiguration5e {
  icon: string;
  label: string;
  comparator: ItemListComparator5e;
}

type ItemListComparator5e = (a: any, b: any) => number; // Using any for now, can refine if needed

// Basic type for TabPreferences5e, can be refined if a definition is found elsewhere
interface TabPreferences5e {
  sort?: string;
  group?: boolean;
  [key: string]: any;
}

/**
 * A custom element that encapsulates functionality for sorting, filtering, searching, and grouping lists of items.
 */
export default class ItemListControlsElement extends HTMLElement {
  /** @override */
  connectedCallback(): void;

  /* -------------------------------------------- */
  /*  Properties & Getters                        */
  /* -------------------------------------------- */

  /**
   * Sort mode configuration.
   */
  static SORT_MODES: Record<string, SortModeConfiguration5e>;

  /**
   * The amount of time to wait after a user's keypress before the name search filter is applied, in milliseconds.
   */
  static FILTER_DEBOUNCE_MS: number;

  #app: FormApplication; // Assuming it's a FormApplication based on usage

  /**
   * The Application instance that houses this item control.
   */
  get app(): FormApplication;

  #list: HTMLElement;

  /**
   * The list element that this element manages.
   */
  get list(): HTMLElement;

  #state: FilterStateElement; // Assuming FilterState5e is FilterStateElement

  /**
   * The current filter state.
   */
  get state(): FilterStateElement;

  #tab: string;

  /**
   * The tab this element is part of.
   */
  get tab(): string;

  /**
   * The search input.
   * @protected
   */
  protected _inputElement: HTMLInputElement;

  /**
   * The available filtering choices.
   * @protected
   */
  protected _filterItems: NodeListOf<HTMLButtonElement>;

  /**
   * The individual filtering controls.
   * @protected
   */
  protected _controls: Record<string, HTMLButtonElement>;

  /**
   * The user's preferences for this tab.
   */
  get prefs(): TabPreferences5e;

  /**
   * Whether to keep empty sections visible.
   */
  get keepEmpty(): boolean;

  /**
   * Get the current sort mode.
   */
  get sortMode(): "a" | "p" | "m";

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /**
   * Construct the element's internal markup.
   * @private
   */
  #buildHTML(): void;

  /**
   * Initialize the elements based on the filter state.
   * @protected
   */
  protected _initFilters(): void;

  /* -------------------------------------------- */

  /**
   * Initialize the elements based on the grouping preferences.
   * @protected
   */
  protected _initGrouping(): void;

  /* -------------------------------------------- */

  /**
   * Initialize the element sorting.
   * @protected
   */
  protected _initSorting(): void;

  /* -------------------------------------------- */

  /**
   * Apply the filters to the managed list.
   * @protected
   */
  protected _applyFilters(): void;

  /* -------------------------------------------- */

  /**
   * Group the managed items.
   * @protected
   */
  protected _applyGrouping(): void;

  /* -------------------------------------------- */

  /**
   * Sort the managed list.
   * @protected
   */
  protected _applySorting(): void;

  /* -------------------------------------------- */

  /**
   * Handle toggling a filter item.
   * @param event  The triggering event.
   * @protected
   */
  protected _onToggleFilterItem(event: PointerEvent): void;

  /* -------------------------------------------- */

  /**
   * Handle toggling the sorting or grouping modes.
   * @param event  The triggering event.
   * @protected
   */
  protected _onToggleMode(event: PointerEvent): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle the user filtering by name.
   * @param event  The triggering event.
   * @protected
   */
  protected _onFilterName(event: Event): void; // Changed to Event as input event is not PointerEvent

  /* -------------------------------------------- */

  /**
   * Handle clearing the filters.
   * @protected
   */
  protected _onClearFilters(): void;
}