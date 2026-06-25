/** A custom element that encapsulates functionality for sorting, filtering, searching, and grouping lists of items. */

import type InventoryElement from "./inventory.mjs";

declare const MaybeAdoptable: typeof HTMLElement;

declare class ItemListControlsElement extends MaybeAdoptable {
  /** Well-known controls configurations. */
  static CONFIG: Record<string, dnd5e.types.applications.components.ListControlConfiguration>;

  /** The HTML tag named used by this element. */
  static tagName: string;

  /** The amount of time to wait after a user's keypress before the name search filter is applied, in milliseconds. */
  static FILTER_DEBOUNCE_MS: number;

  /** The Application instance that houses this item control. */
  get app(): foundry.applications.api.ApplicationV2.Any;

  /** The configured filtering options. */
  get filters(): Record<string, string>;

  /** The list element that this element manages. */
  get list(): HTMLElement;

  /** The current filter state. */
  get state(): dnd5e.types.applications.components.FilterState5e;

  /** The tab this element is part of. */
  get tab(): string;

  /** The search input. */
  protected _inputElement: HTMLInputElement;

  /** The individual filtering controls. */
  protected _controls: Record<string, HTMLButtonElement>;

  /** The user's preferences for this tab. */
  get prefs(): dnd5e.types.data.user.TabPreferences5e;

  /** Whether to keep empty sections visible. */
  get keepEmpty(): boolean;

  /** @override */
  connectedCallback(): void;

  /** Initialize controls based on grouping preferences. */
  protected _initGrouping(): void;

  /** Initialize controls based on sorting preferences. */
  protected _initSorting(): void;

  /** Apply the filters to the managed list. */
  _applyFilters(): void;

  /** Group the managed items. */
  protected _applyGrouping(): void;

  /** Sort the managed list. */
  protected _applySorting(): void;

  /** Handle clearing all filters. */
  protected _onClearFilters(): void;

  /** Handle cycling through the sorting or grouping modes. */
  protected _onCycleMode(event: PointerEvent): Promise<void>;

  /** Handle the user filtering by name. */
  protected _onFilterName(event: KeyboardEvent): void;
}

declare namespace ItemListControlsElement {
  interface Any extends ItemListControlsElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ItemListControlsElement> {}
}

export default ItemListControlsElement;
