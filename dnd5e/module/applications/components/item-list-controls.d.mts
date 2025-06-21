import type InventoryElement from "./inventory.d.mts";

/**
 * Filter state for item lists, representing current filtering criteria.
 */
export interface FilterState5e {
  /** Current name filter text. */
  name: string;
  /** Set of property filters currently applied. */
  properties: Set<string>;
}

/**
 * Comparator function for sorting items in lists.
 */
export type ItemListComparator5e = (a: Item.Implementation, b: Item.Implementation) => number;

/**
 * Descriptor for a single control option (filter, sort, or group).
 */
export interface ListControlDescriptor {
  /** Unique key to identify this control option. */
  key: string;
  /** Human-readable label for the option. */
  label: string;
  /** Optional Font Awesome icon classes. */
  icon?: string;
  /** Optional CSS classes applied when this option is active. */
  classes?: string;
  /** Optional dataset properties for rendering. */
  dataset?: Record<string, string>;
}

/**
 * Complete configuration for an item list control element.
 */
export interface ListControlConfiguration {
  /** Placeholder text for the main search input. */
  label: string;
  /** CSS selector or identifier for the associated item list. */
  list: string;
  /** Available filter options. */
  filters: ListControlDescriptor[];
  /** Available sorting options. */
  sorting: ListControlDescriptor[];
  /** Available grouping options. */
  grouping: ListControlDescriptor[];
}

/**
 * User preferences for a specific tab in item list controls.
 */
export interface TabPreferences5e {
  /** Current sort mode key. */
  sort?: string;
  /** Current group mode key. */
  group?: string;
  /** Additional preference properties. */
  [key: string]: any;
}

/**
 * Configuration for a sort mode option.
 * @deprecated Use ListControlDescriptor instead.
 */
export interface SortModeConfiguration5e {
  /** Icon class for the sort mode. */
  icon: string;
  /** Localization key for the sort mode label. */
  label: string;
  /** Comparator function for this sort mode. */
  comparator: ItemListComparator5e;
}

/**
 * A custom element that encapsulates functionality for sorting, filtering, searching, and grouping lists of items.
 * Provides a unified interface for managing item lists with search, filter, sort, and group capabilities.
 */
export default class ItemListControlsElement extends HTMLElement {
  /* -------------------------------------------- */
  /*  Configuration                               */
  /* -------------------------------------------- */

  /**
   * Well-known controls configurations.
   */
  static CONFIG: Record<string, ListControlConfiguration>;

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The amount of time to wait after a user's keypress before the name search filter is applied, in milliseconds.
   */
  static FILTER_DEBOUNCE_MS: number;

  /**
   * The Application instance that houses this item control.
   */
  get app(): foundry.applications.api.ApplicationV2;

  /**
   * Reference to the application that contains this component.
   */
  #app: foundry.applications.api.ApplicationV2;
  
  /**
   * The configured filtering options.
   */
  get filters(): Record<string, string>;

  /**
   * Reference to the configured filtering options.
   */
  #filters: Record<string, string>;

  /**
   * The configured grouping modes.
   */
  #groups: Record<string, ListControlDescriptor>;

  /**
   * The managing inventory element.
   */
  #inventory: InventoryElement;

  /**
   * The list element that this element manages.
   */
  get list(): HTMLElement;

  /**
   * Reference to the list element.
   */
  #list: HTMLElement;

  /**
   * The configured sort modes.
   */
  #modes: Record<string, ListControlDescriptor>;

  /**
   * The current filter state.
   */
  get state(): FilterState5e;

  /**
   * Reference to the current filter state.
   */
  #state: FilterState5e;

  /**
   * The tab this element is part of.
   */
  get tab(): string;

  /**
   * Reference to the tab identifier.
   */
  #tab: string;

  /**
   * The search input element.
   * @protected
   */
  protected _inputElement: HTMLInputElement;

  /**
   * Individual filtering control elements.
   * @protected
   */
  protected _controls: Record<string, HTMLButtonElement>;

  /**
   * The user's preferences for this tab.
   */
  get prefs(): TabPreferences5e;

  /**
   * Whether to keep empty sections visible when filtering.
   */
  get keepEmpty(): boolean;

  /* -------------------------------------------- */
  /*  Lifecycle                                   */
  /* -------------------------------------------- */

  /** @override */
  connectedCallback(): void;

  /* -------------------------------------------- */
  /*  Initialization                              */
  /* -------------------------------------------- */

  /**
   * Construct the element's internal markup.
   * @private
   */
  #buildHTML(): void;

  /**
   * Initialize controls based on grouping preferences.
   * @protected
   */
  protected _initGrouping(): void;

  /**
   * Initialize controls based on sorting preferences.
   * @protected
   */
  protected _initSorting(): void;

  /**
   * Parse configuration markup for this element.
   * @param list - The configuration to parse.
   * @returns Parsed control descriptors.
   * @private
   */
  #parseControlOptions(list: string): Record<string, ListControlDescriptor>;

  /* -------------------------------------------- */
  /*  Filtering, Grouping, & Sorting              */
  /* -------------------------------------------- */

  /**
   * Apply the filters to the managed list.
   * @internal
   */
  _applyFilters(): void;

  /**
   * Group the managed items.
   * @protected
   */
  protected _applyGrouping(): void;

  /**
   * Sort the managed list.
   * @protected
   */
  protected _applySorting(): void;

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /**
   * Handle clearing all filters.
   * @protected
   */
  protected _onClearFilters(): void;

  /**
   * Handle cycling through the sorting or grouping modes.
   * @param event - The triggering event.
   * @protected
   */
  protected _onCycleMode(event: PointerEvent): Promise<void>;

  /**
   * Handle the user filtering by name.
   * @param event - The triggering event.
   * @protected
   */
  protected _onFilterName(event: KeyboardEvent): void;
}