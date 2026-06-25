/** An application for configuring which compendium packs contribute their content to the compendium browser. */

import Application5e from "../api/application.mjs";
import type CheckboxElement from "../components/checkbox.mjs";

declare class CompendiumBrowserSettingsConfig<
  RenderContext extends object = CompendiumBrowserSettingsConfig.RenderContext,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = CompendiumBrowserSettingsConfig.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = CompendiumBrowserSettingsConfig.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  /**
   * The number of milliseconds to delay between user keypresses before executing the package filter.
   */
  static FILTER_DELAY: number;

  _debouncedFilter: this["_onFilterPackages"];

  /**
   * Prepare render context for packages.
   * @param id       The package identifier.
   * @param pkg      The package.
   * @param packs    The packs belonging to this package.
   * @param sources  The packs currently selected for inclusion.
   */
  _preparePackageContext(
    id: string,
    pkg: foundry.packages.World | foundry.packages.System | foundry.packages.Module,
    packs: Set<string>,
    sources: Set<string>,
  ): CompendiumBrowserSettingsConfig.PackageConfig;

  /**
   * Prepare render context for pack groups.
   * @param documentType  The pack group's Document type.
   * @param packs         The packs provided by the selected package.
   * @param sources       The packs currently selected for inclusion.
   */
  _preparePackGroupContext(
    documentType: foundry.abstract.Document.Type,
    packs: Set<string>,
    sources: Set<string>,
  ): CompendiumBrowserSettingsConfig.PackGroup;

  /**
   * Execute the package list filter.
   */
  _filterPackages(): void;

  /**
   * Handle filtering the package sidebar.
   * @param event  The triggering event.
   */
  _onFilterPackages(event: KeyboardEvent): void;

  /**
   * Handle toggling a compendium browser source pack.
   * @param target  The element that was toggled.
   */
  _onTogglePack(target: CheckboxElement): Record<string, boolean>;

  /**
   * Handle toggling a compendium browser source package.
   * @param target  The element that was toggled.
   */
  _onTogglePackage(target: CheckboxElement): Record<string, boolean>;

  /**
   * Toggle a compendium browser source.
   * @param target  The element that was toggled.
   */
  _onToggleSource(target: CheckboxElement): Promise<void>;

  /**
   * Collate sources for inclusion in the compendium browser.
   * @returns The set of packs that should be included in the compendium browser.
   */
  static collateSources(): Set<string>;
}

declare namespace CompendiumBrowserSettingsConfig {
  interface Any extends CompendiumBrowserSettingsConfig<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CompendiumBrowserSettingsConfig<any, any, any>> {}

  /** Render context for `CompendiumBrowserSettingsConfig`. */
  interface RenderContext extends Application5e.RenderContext {
    packages: {
      world: PackageConfig;
      system: PackageConfig;
      modules: Record<string, PackageConfig>;
    };
    packs: {
      actors: PackGroup;
      items: PackGroup;
    };
    filter: string;
  }

  /** Configuration for `CompendiumBrowserSettingsConfig`. */
  interface Configuration extends Application5e.Configuration {
    selected?: string;
  }

  /** Render options for `CompendiumBrowserSettingsConfig`. */
  interface RenderOptions extends Application5e.RenderOptions {}

  /** Configuration for a single package (world, system, module) in the source settings. */
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

  /** Configuration for a group of packs (e.g., all Item packs) within a selected package. */
  interface PackGroup {
    /** True if all members of this pack group are included. */
    checked: boolean;
    /** True if only some of this pack group are included. */
    indeterminate: boolean;
    /** Array of individual pack configurations within this group. */
    entries: PackConfig[];
  }

  /** Configuration for a single compendium pack within a group. */
  interface PackConfig {
    /** A short tag label (e.g. "PHB", "XGE") for dnd5e SRD packs; empty string for others. */
    tag: string;
    /** The pack title. */
    title: string;
    /** The pack ID (collection string, e.g., "world.my-items"). */
    id: string;
    /** True if the pack is included. */
    checked: boolean;
  }
}

export default CompendiumBrowserSettingsConfig;
