import type * as Filter from "../filter.mjs"; // Assuming Filter namespace/module exists
import type Application5e from "./api/application.mjs"; // Assuming Application5e class exists
import type { SheetTabDescriptor5e } from "./mixins/sheet-v2-mixin.d.mts";

declare namespace CompendiumBrowser {
  /**
   * Configuration for limiting the number of documents that can be selected in the Compendium Browser.
   */
  interface SelectionConfiguration {
    /** Minimum number of documents that must be selected. Null means no minimum. */
    min: number | null;
    /** Maximum number of documents that must be selected. Null means no maximum. */
    max: number | null;
  }

  /**
   * Represents the active filters applied in the Compendium Browser.
   */
  interface Filters {
    /** Document type to fetch (e.g., "Actor" or "Item"). Optional. */
    documentClass?: string;
    /** Individual document subtypes to filter upon (e.g., "loot", "class", "npc"). Optional. */
    types?: Set<string>;
    /** Additional type-specific filters applied. Structure depends on the specific document type. Optional. */
    additional?: Record<string, any>; // Use a more specific type if known
    /**
     * Additional arbitrary filters to apply, not displayed in the UI.
     * Only available as part of locked filters. Optional.
     */
    arbitrary?: Filter.FilterDescription[];
    /** A substring to filter by Document name. Optional. */
    name?: string;
  }

  /**
   * Callback function type used to create filter descriptions based on user input.
   */
  type FilterCreateFilters = (
    filters: Filter.FilterDescription[],
    value: any,
    definition: FilterDefinitionEntry
  ) => void;

  /**
   * Specific configuration for a 'set' type filter.
   */
  interface SetFilterConfig {
    keyPath: string;
    choices: Record<string, string>;
    blank?: boolean;
    multiple?: boolean;
    [key: string]: any; // Allow other properties
  }

  /**
   * Specific configuration for a 'range' type filter.
   */
  interface RangeFilterConfig {
    keyPath: string;
    min?: number;
    max?: number;
    [key: string]: any; // Allow other properties
  }

  /**
   * Specific configuration for a 'boolean' type filter.
   */
  interface BooleanFilterConfig {
    keyPath: string;
    [key: string]: any; // Allow other properties
  }


  /**
   * Definition object for an additional filter control in the Compendium Browser UI.
   */
  interface FilterDefinitionEntry {
    /** Localizable label for the filter. */
    label: string;
    /** Type of filter control to display. */
    type: "boolean" | "range" | "set";
    /** Type-specific configuration data for the filter control. */
    config: SetFilterConfig | RangeFilterConfig | BooleanFilterConfig | object; // More specific types based on 'type'
    /** Optional method that can be called to create FilterDescription objects based on the filter's value. */
    createFilter?: FilterCreateFilters;
  }

  /**
   * Type alias for a Map defining the available additional filters for a specific document type.
   * The keys are the filter identifiers, and the values are their definitions.
   */
  type FilterDefinition = Map<string, FilterDefinitionEntry>;

  /**
   * Extends SheetTabDescriptor5e for Compendium Browser specific tabs.
   */
  interface TabDescriptor5e extends SheetTabDescriptor5e {
    /** The class name of Documents this tab contains (e.g., "Item", "Actor"). */
    documentClass: foundry.abstract.Document.Type;
    /** The sub-types of Documents this tab contains. If omitted, all types of the Document class are assumed. */
    types?: string[];
    /** Is this tab only available in the advanced Browse mode? */
    advanced?: boolean;
    /** Is this tab currently active? Added dynamically. */
    active?: boolean;
  }

  /**
   * Options for the CompendiumBrowser fetch method.
   */
  interface FetchOptions {
    /** Individual document subtypes to filter upon (e.g. "loot", "class", "npc"). */
    types?: Set<string>;
    /** Filters to provide further filters. */
    filters?: Filter.FilterDescription[];
    /** Should only the index for each document be returned, or the whole thing? Defaults to true. */
    index?: boolean;
    /** Key paths for fields to index. */
    indexFields?: Set<string>;
    /**
     * Should the contents be sorted?
     * - `true` (default): Sort by name.
     * - `string`: A key path to sort by.
     * - `Function`: A custom sort function `(a, b) => number`.
     */
    sort?: boolean | string | ((a: any, b: any) => number);
  }
}

/**
 * Application for Browse, filtering, and searching for content between multiple compendiums
 */
// @ts-expect-error
declare class CompendiumBrowser extends Application5e<
  {},
  {
    filters: {
      locked: CompendiumBrowser.Filters;
      initial: CompendiumBrowser.Filters;
    };
    /** Configuration for document selection limits. */
    selection: CompendiumBrowser.SelectionConfiguration;
  },
  {}
> {

  /**
   * Application tabs.
   */
  static TABS: CompendiumBrowser.TabDescriptor5e[];

  /**
   * Available filtering modes.
   */
  static MODES: {
    readonly BASIC: 1;
    readonly ADVANCED: 2;
  };

  /**
   * Batching configuration.
   */
  static BATCHING: {
    /** The number of pixels before reaching the end of the scroll container to begin loading additional entries. */
    readonly MARGIN: number;
    /** The number of entries to load per batch. */
    readonly SIZE: number;
  };

  /**
   * The number of milliseconds to delay between user keypresses before executing a search.
   */
  static SEARCH_DELAY: number;

  /**
   * Should the selection controls be displayed?
   */
  get displaySelection(): boolean;

  /** Currently defined filters (internal state). */
  #filters: CompendiumBrowser.Filters;

  /**
   * Current filters selected, merging locked and active filters.
   */
  get currentFilters(): CompendiumBrowser.Filters;

  /** Fetched results (can be a promise or the resolved array). */
  #results: Promise<(object | Document)[]> | (object | Document)[];

  /** The index of the next result to render as part of batching. */
  #resultIndex: number;

  /** Whether rendering is currently throttled. */
  #renderThrottle: boolean;

  /** UUIDs of currently selected documents. */
  #selected: Set<string>;

  /** Get the set of selected UUIDs. */
  get selected(): Set<string>;

  /** Suffix used for localization selection messages based on min and max values. */
  get #selectionLocalizationSuffix(): string | null;

  /** The cached set of available sources to filter on. */
  #sources: Record<string, string> | undefined;

  /** The mode the browser is currently in. */
  _mode: typeof CompendiumBrowser.MODES[keyof typeof CompendiumBrowser.MODES];

  /** The debounced function to invoke when searching results by name. */
  _debouncedSearch: (event: KeyboardEvent) => void;

  /**
   * Prepare the footer context.
   * @param context Shared context provided by _prepareContext.
   * @param options Options which configure application rendering behavior.
   * @returns Context data for the footer part.
   * @protected
   */
  _prepareFooterContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /**
   * Prepare the header context.
   * @param context Shared context provided by _prepareContext.
   * @param options Options which configure rendering behavior.
   * @returns Context data for the header part.
   * @protected
   */
  _prepareHeaderContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /**
   * Prepare the sidebar context (documentClass, types, filters).
   * @param partId      The part being rendered.
   * @param context     Shared context provided by _prepareContext.
   * @param options     Options which configure application rendering behavior.
   * @returns Context data for the sidebar part.
   * @protected
   */
  _prepareSidebarContext(partId: "documentClass" | "types" | "filters", context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /**
   * Prepare the results context.
   * @param context Shared context provided by _prepareContext.
   * @param options Options which configure application rendering behavior.
   * @returns Context data for the results part.
   * @protected
   */
  _prepareResultsContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /**
   * Prepare the tabs context.
   * @param context Shared context provided by _prepareContext.
   * @param options Options which configure application rendering behavior.
   * @returns Context data for the tabs part.
   * @protected
   */
  _prepareTabsContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /**
   * Render a single result entry.
   * @param entry         The entry (index data or full Document).
   * @param documentClass The entry's Document class name.
   * @returns The rendered HTML element for the entry.
   * @protected
   */
  _renderResult(entry: object | foundry.abstract.Document.Any, documentClass: string): Promise<HTMLElement>;

  /**
   * Render results once loaded to avoid holding up initial app display.
   * @protected
   */
  _renderResults(): Promise<void>;

  /**
   * Show a list of applicable source filters for the available results.
   * @protected
   */
  _renderSourceFilters(): Promise<void>;

  /**
   * Apply filters based on the compendium browser's mode.
   * @param mode The mode to apply filters for.
   * @protected
   */
  _applyModeFilters(mode: typeof CompendiumBrowser.MODES[keyof typeof CompendiumBrowser.MODES]): void;

  /**
   * Apply filters based on the selected tab.
   * @param id The tab ID.
   * @protected
   */
  _applyTabFilters(id: string): void;

  /**
   * Adjust the states of group checkboxes to make them indeterminate if only some of their children are selected.
   * @param htmlElement Element within which to find groups.
   */
  #adjustCheckboxStates(htmlElement: HTMLElement): void;

  /**
   * Handle dragging an entry.
   * @param event The drag event.
   * @protected
   */
  _onDragStart(event: DragEvent): void;

  /**
   * Handle triggering an action via keyboard (Space key).
   * @param event The originating keyboard event.
   * @protected
   */
  _onKeyAction(event: KeyboardEvent): void;

  /**
   * Handle rendering a new batch of results when the user scrolls to the bottom of the list.
   * @param event The originating scroll event.
   * @protected
   */
  _onScrollResults(event: Event): Promise<void>;

  /**
   * Handle searching for a Document by name.
   * @param event The triggering keyboard event from the search input.
   * @protected
   */
  _onSearchName(event: KeyboardEvent): void;

  /**
   * Handle configuring compendium browser sources. (Static private)
   */
  static #onConfigureSources(): void;

  /**
   * Handle clearing the name filter. (Static private)
   * @param event  The originating click event.
   * @param target The target of the click event.
   */
  static #onClearName(this: CompendiumBrowser, event: PointerEvent, target: HTMLElement): Promise<void>;

  /**
   * Handle form submission with selection. (Static private)
   * @param event    The form submission event.
   * @param form     The submitted form element.
   * @param formData The data from the submitted form.
   */
  static #onHandleSubmit(this: CompendiumBrowser, event: SubmitEvent, form: HTMLFormElement, formData: FormDataExtended): Promise<void>;

  /**
   * Handle opening a link to an item. (Static private)
   * @param event  The originating click event.
   * @param target The capturing HTML element which defined a [data-action].
   */
  static #onOpenLink(this: CompendiumBrowser, event: PointerEvent, target: HTMLElement): Promise<void>;

  /**
   * Handle setting the document class or a filter. (Static private)
   * @param event  The originating click/change event.
   * @param target The capturing HTML element which defined a [data-action] or input element.
   */
  static #onSetFilter(this: CompendiumBrowser, event: Event, target: HTMLElement & { name?: string, value?: string, tagName?: string, ariaPressed?: string | boolean }): Promise<void>;

  /**
   * Handle setting a type restriction (checkbox change). (Static private)
   * @param event  The originating change event.
   * @param target The checkbox element.
   */
  static #onSetType(this: CompendiumBrowser, event: Event, target: HTMLInputElement & { defaultValue?: string, checked?: boolean, indeterminate?: boolean }): Promise<void>;

  /**
   * Handle toggling the collapsed state of a collapsible section. (Static private)
   * @param event  The originating click event.
   * @param target The capturing HTML element which defined a [data-action].
   */
  static #onToggleCollapse(this: CompendiumBrowser, event: PointerEvent, target: HTMLElement): Promise<void>;

  /**
   * Handle toggling the compendium browser mode (basic/advanced). (Static private)
   * @param event  The originating change event.
   * @param target The toggle element.
   */
  static #onToggleMode(this: CompendiumBrowser, event: Event, target: HTMLInputElement & { checked?: boolean }): void;

  /**
   * Retrieve a listing of documents from all compendiums for a specific Document type, with additional filters
   * optionally applied.
   * @param documentClass Document type to fetch (e.g. Actor or Item class).
   * @param options       Configuration options for fetching.
   * @returns An array of index objects or full Document instances.
   */
  static fetch(documentClass: typeof Document, options?: CompendiumBrowser.FetchOptions): Promise<(object | Document)[]>;

  /**
   * Factory method used to spawn a compendium browser and wait for the results of a selection.
   * @param options Configuration options for the browser instance.
   * @returns A Promise resolving to a Set of selected document UUIDs, or null if canceled.
   */
  static select(options?: Partial<CompendiumBrowser['__Configuration']>): Promise<Set<string> | null>;

  /**
   * Factory method used to spawn a compendium browser and return a single selected item UUID or null if canceled.
   * @param options Configuration options for the browser instance (min/max are forced to 1).
   * @returns A Promise resolving to a single selected document UUID, or null if canceled or none selected.
   */
  static selectOne(options?: Partial<CompendiumBrowser['__Configuration']>): Promise<string | null>;

  /**
   * Transform filter definition and additional filters values into the final filters to apply.
   * @param definition Filter definition provided by type.
   * @param values     Values of currently selected filters.
   * @returns An array of FilterDescription objects.
   */
  static applyFilters(definition: CompendiumBrowser.FilterDefinition, values: Record<string, any> | undefined): Filter.FilterDescription[];

  /**
   * Inject the compendium browser button into the compendium sidebar HTML.
   * @param html HTML element of the sidebar being rendered.
   */
  static injectSidebarButton(html: HTMLElement): void;

  /**
   * Take two filter definition maps and find only the filters that match between the two, adjusting ranges and sets.
   * @param first  The first filter definition map.
   * @param second The second filter definition map.
   * @returns A new Map containing only the intersecting and compatible filter definitions.
   */
  static intersectFilters(first: CompendiumBrowser.FilterDefinition, second: CompendiumBrowser.FilterDefinition): CompendiumBrowser.FilterDefinition;
}

export default CompendiumBrowser; // Export the namespace as default as well