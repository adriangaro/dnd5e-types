import Application5e from "../api/application.mjs";
import type CheckboxElement from "../components/checkbox.mjs";

// Define the namespace to hold related types
declare namespace CompendiumBrowserSettingsConfig {
	/**
	 * Configuration for a single package (world, system, module) in the source settings.
	 */
	interface PackageConfig {
		/** The package title. */
		title: string;
		/** The package ID (e.g., "world", "system", "module.my-module"). */
		id: string;
		/** The number of relevant packs provided by this package. */
		count: number;
		/** True if all the relevant packs are included. */
		checked: boolean;
		/** True if only some of the relevant packs are included. */
		indeterminate: boolean;
		/** True if the package is currently selected in the sidebar. */
		active: boolean;
		/** The normalized package title for filtering. */
		filter: string;
	}

	/**
	 * Configuration for a group of packs (e.g., all Item packs) within a selected package.
	 */
	interface PackGroup {
		/** True if all members of this pack group are included. */
		checked: boolean;
		/** True if only some of this pack group are included. */
		indeterminate: boolean;
		/** Array of individual pack configurations within this group. */
		entries: PackConfig[];
	}

	/**
	 * Configuration for a single compendium pack within a group.
	 */
	interface PackConfig {
		/** The pack title. */
		title: string;
		/** The pack ID (collection string, e.g., "world.my-items"). */
		id: string;
		/** True if the pack is included. */
		checked: boolean;
	}
}
/**
 * An application for configuring which compendium packs contribute their content to the compendium browser.
 * @extends Application5e<CompendiumBrowserSourceConfiguration>
 */
export default class CompendiumBrowserSettingsConfig extends Application5e<{
  packages: {
    world: CompendiumBrowserSettingsConfig.PackageConfig;
    system: CompendiumBrowserSettingsConfig.PackageConfig;
    modules: Record<string, CompendiumBrowserSettingsConfig.PackageConfig>;
  };
  packs: {
    items: CompendiumBrowserSettingsConfig.PackGroup;
    actors: CompendiumBrowserSettingsConfig.PackGroup;
  };
  filter: string; // Added based on usage in _prepareContext
}, {
  selected: string;
}, {

}> {
  /**
   * The number of milliseconds to delay between user keypresses before executing the package filter.
   */
  static FILTER_DELAY: number

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The current package filter.
   */
  #filter: string

  /* -------------------------------------------- */

  /**
   * The currently selected package.
   */
  #selected: string

  /* -------------------------------------------- */

  _debouncedFilter: this['_onFilterPackages']

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */



  /**
   * Prepare render context for packages.
   * @param id            The package identifier.
   * @param pkg    The package.
   * @param packs    The packs belonging to this package.
   * @param sources  The packs currently selected for inclusion.
   * @protected
   */
  _preparePackageContext(
    id: string, pkg: Module, 
    packs: Set<string>, sources: Set<string>
  ): CompendiumBrowserSettingsConfig.PackageConfig

  /* -------------------------------------------- */

  /**
   * Prepare render context for pack groups.
   * @param {string} documentType    The pack group's Document type.
   * @param {Set<string>} packs      The packs provided by the selected package.
   * @param {Set<string>} sources    The packs currently selected for inclusion.
   * @returns {CompendiumSourcePackGroup5e}
   * @protected
   */
  _preparePackGroupContext(
    documentType: foundry.abstract.Document.Type, 
    packs: Set<string>, 
    sources: Set<string>
  ): CompendiumBrowserSettingsConfig.PackGroup

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /**
   * Execute the package list filter.
   * @protected
   */
  _filterPackages()

  /* -------------------------------------------- */

  /**
   * Handle filtering the package sidebar.
   * @param {KeyboardEvent} event  The triggering event.
   * @protected
   */
  _onFilterPackages(event: KeyboardEvent)

  /* -------------------------------------------- */

  /**
   * Handle toggling a compendium browser source pack.
   * @param target  The element that was toggled.
   * @protected
   */
  _onTogglePack(target: CheckboxElement): Record<string, boolean>

  /* -------------------------------------------- */

  /**
   * Handle toggling a compendium browser source package.
   * @param target  The element that was toggled.
   * @protected
   */
  _onTogglePackage(target: CheckboxElement): Record<string, boolean>

  /* -------------------------------------------- */

  /**
   * Toggle a compendium browser source.
   * @param target  The element that was toggled.
   * @protected
   */
  _onToggleSource(target: CheckboxElement): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle clearing the package filter.
   * @param event  The originating click event.
   * @param target  The target of the click event.
   */
  static #onClearPackageFilter(this: CompendiumBrowserSettingsConfig, event: PointerEvent, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle selecting a package.
   * @this {CompendiumBrowserSettingsConfig}
   * @param event  The originating click event.
   * @param target  The target of the click event.
   */
  static #onSelectPackage(this: CompendiumBrowserSettingsConfig, event: PointerEvent, target: HTMLElement)

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Collate sources for inclusion in the compendium browser.
   * @returns The set of packs that should be included in the compendium browser.
   */
  static collateSources(): Set<string>
}
