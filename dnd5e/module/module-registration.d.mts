/* -------------------------------------------- */
/*  Module Data                                 */
/* -------------------------------------------- */

/**
 * Scan module manifests for any data that should be integrated into the system configuration.
 */
export function registerModuleData(): void;

declare const registerMethods: Function[];

/* -------------------------------------------- */

/**
 * Register package source books from `flags.dnd5e.sourceBooks`.
 * @param manifest  Manifest from which to register data.
 * @returns Description of the data registered.
 */
declare function registerSourceBooks(manifest: Module | System | World): string | void;

/* -------------------------------------------- */

/**
 * Register package spell lists from `flags.dnd5e.spellLists`.
 * @param manifest  Manifest from which to register data.
 * @returns Description of the data registered.
 */
declare function registerSpellLists(manifest: Module | System | World): string | void;

/* -------------------------------------------- */
/*  Compendium Packs                            */
/* -------------------------------------------- */

/**
 * Apply any changes to compendium packs during the setup hook.
 */
export function setupModulePacks(): void;

declare const setupMethods: Function[];

/* -------------------------------------------- */

/**
 * Set application based on `flags.dnd5e.display`.
 * @param pack  Pack to set up.
 * @returns Description of the step.
 */
declare function setupPackDisplay(pack: Compendium<any>): string | void;

/* -------------------------------------------- */

declare let collectionSortingModes: Record<string, string>;
declare let sortingChanged: boolean;

/**
 * Set default sorting order based on `flags.dnd5e.sorting`.
 * @param pack  Pack to set up.
 * @returns Description of the step.
 */
declare function setupPackSorting(pack: Compendium<any>): string | void;
