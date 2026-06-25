/** Application for browsing, filtering, and searching for content between multiple compendiums. */

import type * as Filter from "../filter.mjs";
import type SelectChoices from "../documents/actor/select-choices.mjs";
import Application5e from "./api/application.mjs";

declare class CompendiumBrowser<
  RenderContext extends object = CompendiumBrowser.RenderContext,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = CompendiumBrowser.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = CompendiumBrowser.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  /* -------------------------------------------- */
  /*  Static Properties                           */
  /* -------------------------------------------- */


  /** Available filtering modes. */
  static MODES: {
    readonly BASIC: 1;
    readonly ADVANCED: 2;
  };

  /** Available tabs for the compendium browser. */
  static TABS: CompendiumBrowser.TabDescriptor[] & Record<string, foundry.applications.api.ApplicationV2.TabsConfiguration>;

  /** Batching configuration. */
  static BATCHING: {
    /** The number of pixels before reaching the end of the scroll container to begin loading additional entries. */
    readonly MARGIN: number;
    /** The number of entries to load per batch. */
    readonly SIZE: number;
  };

  /** The number of milliseconds to delay between user keypresses before executing a search. */
  static SEARCH_DELAY: number;

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** Should the selection controls be displayed? */
  get displaySelection(): boolean;

  /** Current filters selected, merging locked and active filters. */
  get currentFilters(): CompendiumBrowser.Filters;

  /** UUIDs of currently selected documents. */
  get selected(): Set<string>;

  /** The mode the browser is currently in. */
  _mode: typeof CompendiumBrowser.MODES[keyof typeof CompendiumBrowser.MODES];

  /** The function to invoke when searching results by name. */
  _debouncedSearch: (event: KeyboardEvent) => void;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** Prepare the footer context. */
  _prepareFooterContext(context: RenderContext, options: fvttUtils.DeepPartial<RenderOptions>): Promise<RenderContext>;

  /** Prepare the header context. */
  _prepareHeaderContext(context: RenderContext, options: fvttUtils.DeepPartial<RenderOptions>): Promise<RenderContext>;

  /** Prepare the sidebar context (documentClass, types, filters). */
  _prepareSidebarContext(partId: "documentClass" | "search" | "types" | "filters", context: RenderContext, options: fvttUtils.DeepPartial<RenderOptions>): Promise<RenderContext>;

  /** Prepare the results context. */
  _prepareResultsContext(context: RenderContext, options: fvttUtils.DeepPartial<RenderOptions>): Promise<RenderContext>;

  /** Prepare the tabs context. */
  _prepareTabsContext(context: RenderContext, options: fvttUtils.DeepPartial<RenderOptions>): Promise<RenderContext>;

  /** Render a single result entry. */
  _renderResult(entry: object | foundry.abstract.Document.Any, documentClass: string): Promise<HTMLElement>;

  /** Render results once loaded to avoid holding up initial app display. */
  _renderResults(): Promise<void>;

  /** Show a list of applicable source filters for the available results. */
  _renderSourceFilters(): Promise<void>;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** Apply filters based on the compendium browser's mode. */
  _applyModeFilters(mode: typeof CompendiumBrowser.MODES[keyof typeof CompendiumBrowser.MODES]): void;

  /** Apply filters based on the selected tab. */
  _applyTabFilters(id: string, options?: { keepFilters?: boolean }): void;

  /** Handle dragging an entry. */
  _onDragStart(event: DragEvent): void;

  /** Handle triggering an action via keyboard. */
  _onKeyAction(event: KeyboardEvent): void;

  /** Handle rendering a new batch of results when the user scrolls to the bottom of the list. */
  _onScrollResults(event: Event): Promise<void>;

  /** Handle searching for a Document by name. */
  _onSearchName(event: KeyboardEvent): void;

  /* -------------------------------------------- */
  /*  Database Access                             */
  /* -------------------------------------------- */

  /**
   * Retrieve a listing of documents from all compendiums for a specific Document type, with additional filters
   * optionally applied.
   */
  static fetch(documentClass: typeof foundry.abstract.Document, options?: CompendiumBrowser.FetchOptions): Promise<(object | foundry.abstract.Document.Any)[]>;

  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /** Factory method used to spawn a compendium browser and wait for the results of a selection. */
  static select(options?: Partial<CompendiumBrowser.Configuration>, renderOptions?: object): Promise<Set<string> | null>;

  /** Factory method used to spawn a compendium browser and return a single selected item or null if canceled. */
  static selectOne(options?: Partial<CompendiumBrowser.Configuration>, renderOptions?: object): Promise<string | null>;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /** Transform filter definition and additional filters values into the final filters to apply. */
  static applyFilters(definition: CompendiumBrowser.FilterDefinition, currentFilters: CompendiumBrowser.Filters): Filter.FilterDescription[];

  /** Inject the compendium browser button into the compendium sidebar. */
  static injectSidebarButton(html: HTMLElement): void;

  /** Take two filter sets and find only the filters that match between the two. */
  static intersectFilters(first: CompendiumBrowser.FilterDefinition, second?: CompendiumBrowser.FilterDefinition, currentFilters?: CompendiumBrowser.Filters): CompendiumBrowser.FilterDefinition;
}

declare namespace CompendiumBrowser {
  interface Any extends CompendiumBrowser<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CompendiumBrowser<any, any, any>> {}

  /** Render context for `CompendiumBrowser`. Open for declaration merging; extended by subclasses. */
  interface RenderContext extends Application5e.RenderContext {
    filters: Filters;
    filterDefinitions: FilterDefinition;
    displaySelection: boolean;
    invalid: boolean;
    summary: string | number;
    invalidTooltip: string;
    showModeToggle: boolean;
    isAdvanced: boolean;
    isLocked: {
      filters: boolean;
      types: boolean;
      documentClass: boolean;
    };
    name: string;
    showTypes: boolean;
    types: SelectChoices | Record<string, SelectChoices.Entry>;
    additional: {
      key: string;
      sort: number;
      value?: any;
      locked?: any;
      [key: string]: any;
    }[];
    hint: string | null;
    tabs: TabDescriptor[];
  }

  /** Configuration for `CompendiumBrowser`. Open for declaration merging; extended by subclasses. */
  interface Configuration extends Application5e.Configuration {
    filters: {
      locked: Filters;
      initial: Filters;
    };
    /** Configuration for document selection limits. */
    selection: SelectionConfiguration;
    /** Optional hint displayed in the results footer. */
    hint?: string | null;
    /** Initial mode for the browser. */
    mode?: typeof CompendiumBrowser.MODES[keyof typeof CompendiumBrowser.MODES];
    /** Initially selected tab. */
    tab?: string;
  }

  /** Render options for `CompendiumBrowser`. Open for declaration merging; extended by subclasses. */
  interface RenderOptions extends Application5e.RenderOptions {}

  /** Configuration for limiting the number of documents that can be selected. */
  interface SelectionConfiguration {
    /** Minimum number of documents that must be selected. Null means no minimum. */
    min: number | null;
    /** Maximum number of documents that must be selected. Null means no maximum. */
    max: number | null;
  }

  /** The active filters applied in the Compendium Browser. */
  interface Filters {
    /** Document type to fetch (e.g., "Actor" or "Item"). */
    documentClass?: string;
    /** Individual document subtypes to filter upon (e.g., "loot", "class", "npc"). */
    types?: Set<string>;
    /** Additional type-specific filters applied. */
    additional?: Record<string, any>;
    /** Additional arbitrary filters to apply, not displayed in the UI. */
    arbitrary?: Filter.FilterDescription[];
    /** A substring to filter by Document name. */
    name?: string;
    /** Whether locked filters are exclusive. */
    exclusive?: boolean;
  }

  /** Definition object for an additional filter control in the Compendium Browser UI. */
  interface FilterDefinitionEntry {
    /** Localizable label for the filter. */
    label: string;
    /** Type of filter control to display. */
    type: "boolean" | "range" | "set";
    /** Type-specific configuration data for the filter control. */
    config: Record<string, any>;
    /** Optional method that can be called to create FilterDescription objects based on the filter's value. */
    createFilter?: (filters: Filter.FilterDescription[], value: any, definition: FilterDefinitionEntry) => void;
  }

  /** A Map defining the available additional filters for a specific document type. */
  type FilterDefinition = Map<string, FilterDefinitionEntry>;

  /** Descriptor for a Compendium Browser tab. */
  interface TabDescriptor {
    /** The tab identifier. */
    tab: string;
    /** Localizable label for the tab. */
    label: string;
    /** SVG icon path. */
    svg?: string;
    /** Font-awesome icon class. */
    icon?: string;
    /** The class name of Documents this tab contains (e.g., "Item", "Actor"). */
    documentClass: string;
    /** The sub-types of Documents this tab contains. */
    types?: string[];
    /** Is this tab only available in the advanced browse mode? */
    advanced?: boolean;
    /** Is this tab currently active? Added dynamically. */
    active?: boolean;
  }

  /** Options for the CompendiumBrowser fetch method. */
  interface FetchOptions {
    /** Individual document subtypes to filter upon. */
    types?: Set<string>;
    /** Filters to provide further filters. */
    filters?: Filter.FilterDescription[];
    /** Should only the index for each document be returned, or the whole thing? */
    index?: boolean;
    /** Key paths for fields to index. */
    indexFields?: Set<string>;
    /** Should the contents be sorted? */
    sort?: boolean | string | ((a: any, b: any) => number);
  }
}

export default CompendiumBrowser;
