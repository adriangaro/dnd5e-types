/**
 * `module/utils.mjs` — shared utility helpers for the dnd5e system: formatters, formula
 * helpers, unit conversions, ID/keybinding/localization/Handlebars utilities, and validators.
 */

import type { ItemDataModel } from "./data/abstract/system-data-model.mjs";
import type BaseActivityData from "./data/activity/base-activity.mjs";

/* -------------------------------------------- */
/*  Collections                                 */
/* -------------------------------------------- */

/** Create a list of options for all documents within a collection grouped by folders. */
export declare function getCollectionDocumentOptions(
  collection: foundry.documents.abstract.DirectoryCollectionMixin.AnyMixed,
  options?: { disabled?: (entry: object) => boolean },
): foundry.applications.fields.FormSelectOption[];

/* -------------------------------------------- */
/*  Currencies                                  */
/* -------------------------------------------- */

/** Round a specific denomination to the number of digits specified in the configuration. */
export declare function roundCurrency(value: number, denomination: string): number;

/* -------------------------------------------- */
/*  Formatters                                  */
/* -------------------------------------------- */

/**
 * Format a Challenge Rating using the proper fractional symbols.
 * @param options.narrow - Use narrow fractions (e.g. ⅛) rather than wide ones (e.g. 1/8). Defaults to `true`.
 */
export declare function formatCR(value: number | null, options?: { narrow?: boolean }): string;

/** Create a valid identifier from the provided string. */
export declare function formatIdentifier(input: string): string;

/** Form a number using the provided length unit. */
export declare function formatLength(
  value: number,
  unit: dnd5e.types.MovementUnit.TypeKey,
  options?: Intl.NumberFormatOptions & {
    blank?: string;
    numerals?: boolean;
    ordinal?: boolean;
    words?: boolean;
    parts?: boolean;
  },
): string;

/** Format a modifier for display with its sign separate. */
export declare function formatModifier(mod: number): Handlebars.SafeString;

/** A helper for using Intl.NumberFormat within handlebars. */
export declare function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions & {
    blank?: string;
    numerals?: boolean;
    ordinal?: boolean;
    words?: boolean;
  },
): string;

/** Produce a number with the parts wrapped in their own spans. */
export declare function formatNumberParts(
  value: number,
  options?: Intl.NumberFormatOptions & { numerals?: boolean; ordinal?: boolean; words?: boolean },
): string;

/** Form a number using the provided travel speed unit. */
export declare function formatTravelSpeed(
  value: number,
  unit: dnd5e.types.TravelUnit.TypeKey,
  options?: Intl.NumberFormatOptions & {
    blank?: string;
    numerals?: boolean;
    ordinal?: boolean;
    words?: boolean;
    parts?: boolean;
    period?: string;
  },
): string;

/** A helper for using Intl.NumberFormat within handlebars to format a range. */
export declare function formatRange(min: number, max: number, options?: Intl.NumberFormatOptions): string;

/** A helper function to format textarea text to HTML with linebreaks. */
export declare function formatText(value: string): Handlebars.SafeString;

/** A helper function that formats a time in a human-readable format. */
export declare function formatTime(
  value: number,
  unit: dnd5e.types.TimeUnit.TypeKey,
  options?: Intl.NumberFormatOptions & {
    blank?: string;
    numerals?: boolean;
    ordinal?: boolean;
    words?: boolean;
  },
): string;

/** Form a number using the provided volume unit. */
export declare function formatVolume(
  value: number,
  unit: dnd5e.types.VolumeUnit.TypeKey,
  options?: Intl.NumberFormatOptions & {
    blank?: string;
    numerals?: boolean;
    ordinal?: boolean;
    words?: boolean;
    parts?: boolean;
  },
): string;

/** Form a number using the provided weight unit. */
export declare function formatWeight(
  value: number,
  unit: dnd5e.types.WeightUnit.TypeKey,
  options?: Intl.NumberFormatOptions & {
    blank?: string;
    numerals?: boolean;
    ordinal?: boolean;
    words?: boolean;
    parts?: boolean;
  },
): string;

/** Get a PluralRules object, fetching from cache if possible. */
export declare function getPluralRules(options?: { type?: Intl.PluralRulesOptions["type"] }): Intl.PluralRules;

/* -------------------------------------------- */
/*  Formulas                                    */
/* -------------------------------------------- */

/** Return whether a string is a valid reroll, explosion, min, or max dice modifier. */
export declare function isValidDieModifier(mod: string): boolean;

/** Convert a delta string into a number. */
export declare function parseDelta(raw: string, target: number): number;

/** Handle a delta input for a number value from a form. */
export declare function parseInputDelta(
  input: HTMLInputElement,
  target: foundry.abstract.Document.Any,
): number | void;

/** Prepare the final formula value for a model field. */
export declare function prepareFormulaValue(
  model: ItemDataModel.Any | BaseActivityData.Any,
  keyPath: string,
  label: string,
  rollData: dnd5e.types.documents.RollData,
): void;

/**
 * Replace referenced data attributes in the roll formula with values from the provided data.
 * If the attribute is not found in the provided data, display a warning on the actor.
 */
export declare function replaceFormulaData(
  formula: string,
  data: object,
  options?: {
    actor?: globalThis.Actor.Implementation;
    item?: globalThis.Item.Implementation;
    missing?: string | null;
    property?: string;
  },
): string;

/** Convert a bonus value to a simple integer for displaying on the sheet. */
export declare function simplifyBonus(bonus: number | string | null, data?: object): number;

/* -------------------------------------------- */
/*  IDs                                         */
/* -------------------------------------------- */

/** Create an ID from the input truncating or padding the value to make it reach 16 characters. */
export declare function staticID(id: string): string;

/* -------------------------------------------- */
/*  Keybindings Helper                          */
/* -------------------------------------------- */

/** Based on the provided event, determine if the keys are pressed to fulfill the specified keybinding. */
export declare function areKeysPressed(event: Event, action: string): boolean;

/* -------------------------------------------- */
/*  Logging                                     */
/* -------------------------------------------- */

/** Log a console message with the "D&D 5e" prefix and styling. */
export declare function log(
  message: string,
  options?: { color?: string; extras?: any[]; level?: string },
): void;

/* -------------------------------------------- */
/*  Object Helpers                              */
/* -------------------------------------------- */

/** Transform an object, returning only the keys which match the provided filter. */
export declare function filteredKeys(obj: object, filter?: (value: any) => boolean): string[];

/** Check whether an object exists without traversing any getters, preventing deprecation warnings. */
export declare function safePropertyExists(object: object, keyPath: string): boolean;

/** Sort the provided object by its values or by an inner sortKey. */
export declare function sortObjectEntries<T extends object>(
  obj: T,
  sortKey?: string | ((lhs: any, rhs: any) => number),
): T;

/** Retrieve the indexed data for a Document using its UUID. Never returns a result for embedded documents. */
export declare function indexFromUuid(uuid: string): object | null;

/**
 * Creates an HTML document link for the provided UUID.
 * Try to build links to compendium content synchronously to avoid DB lookups.
 */
export declare function linkForUuid(
  uuid: string,
  options?: { tooltip?: string; renderBroken?: string },
): string;

/* -------------------------------------------- */
/*  Targeting                                   */
/* -------------------------------------------- */

/** Grab the targeted tokens and return relevant information on them. */
export declare function getTargetDescriptors(): Array<{
  name: string;
  img: string;
  uuid: string;
  ac: number | null;
}>;

/** Get currently selected tokens in the scene or user's character's tokens. */
export declare function getSceneTargets(
  actor?: globalThis.Actor.Implementation,
): foundry.canvas.placeables.Token.Implementation[];

/* -------------------------------------------- */
/*  Conversions                                 */
/* -------------------------------------------- */

/** Convert the provided length to another unit. */
export declare function convertLength(
  value: number,
  from: dnd5e.types.MovementUnit.TypeKey,
  to: dnd5e.types.MovementUnit.TypeKey,
  options?: { strict?: boolean },
): number;

/**
 * Convert the provided time value to another unit. If no final unit is provided, then will convert it to the largest
 * unit that can still represent the value as a whole number.
 */
export declare function convertTime(
  value: number,
  from: dnd5e.types.TimeUnit.TypeKey,
  options?: { combat?: boolean; strict?: boolean; to?: dnd5e.types.TimeUnit.TypeKey },
): { value: number; unit: dnd5e.types.TimeUnit.TypeKey };

/** Convert the provided travel speed to another unit. */
export declare function convertTravelSpeed(
  value: number,
  from: dnd5e.types.TravelUnit.TypeKey,
  options: { strict?: boolean; to: dnd5e.types.TravelUnit.TypeKey },
): { value: number; unit: dnd5e.types.TravelUnit.TypeKey };

/** Convert the provided weight to another unit. */
export declare function convertWeight(
  value: number,
  from: dnd5e.types.WeightUnit.TypeKey,
  to: dnd5e.types.WeightUnit.TypeKey,
  options?: { strict?: boolean },
): number;

/** Default units to use depending on system setting. */
export declare function defaultUnits(type: "length" | "travel" | "volume" | "weight"): string;

/* -------------------------------------------- */
/*  Validators                                  */
/* -------------------------------------------- */

/** Collection of identifier/regex validators. */
export declare const validators: {
  IDENTIFIER_REGEX: RegExp;
  isValidIdentifier(identifier: string, options?: { allowType?: boolean }): boolean;
};

/** Determine whether the provided unit is usable within `Intl.NumberFormat`. */
export declare function isValidUnit(unit: string): boolean;

/** Test if a given string is serialized JSON, and parse it if so. */
export declare function parseOrString(raw: string): any;

/* -------------------------------------------- */
/*  Handlebars Template Helpers                 */
/* -------------------------------------------- */

/**
 * Define a set of template paths to pre-load. Pre-loaded templates are compiled and cached for fast access when
 * rendering. These paths will also be available as Handlebars partials by using the file name
 * (e.g. "dnd5e.actor-traits").
 */
export declare function preloadHandlebarsTemplates(): Promise<Function[]>;

/** Create an icon element dynamically from a FontAwesome class string or an SVG/image path. */
export declare function generateIcon(
  icon: string,
  options?: { alt?: string; classes?: string },
): HTMLElement | null;

/** Register custom Handlebars helpers used by 5e. */
export declare function registerHandlebarsHelpers(): void;

/* -------------------------------------------- */
/*  Config Pre-Localization                     */
/* -------------------------------------------- */

/**
 * Mark the provided config key to be pre-localized during the init stage.
 * @param options.keys - Array of localization keys. First key listed will be used for sorting if multiple are provided.
 */
export declare function preLocalize(
  configKeyPath: string,
  options?: { key?: string; keys?: string[]; sort?: boolean },
): void;

/**
 * Execute previously defined pre-localization tasks on the provided config object.
 * @param config - The `CONFIG.DND5E` object to localize and sort. *Will be mutated.*
 */
export declare function performPreLocalization(config: object): void;

/* -------------------------------------------- */
/*  Localization                                */
/* -------------------------------------------- */

/**
 * Convert an attribute path to a human-readable label.
 * Assumes paths are on an actor unless a reference item is provided.
 */
export declare function getHumanReadableAttributeLabel(
  attr: string,
  options?: { actor?: globalThis.Actor.Implementation; item?: globalThis.Item.Implementation },
): string | void;

/**
 * Perform pre-localization on the contents of a SchemaField.
 * Necessary because the `localizeSchema` method on `Localization` is private.
 */
export declare function localizeSchema(
  schema: foundry.data.fields.SchemaField.Any,
  prefixes: string[],
): void;

/** Split a semi-colon-separated list and clean out any empty entries. */
export declare function splitSemicolons(input?: string): string[];

/* -------------------------------------------- */
/*  Migration                                   */
/* -------------------------------------------- */

/** Synchronize the spells for all Actors in a collection with source data from an Item compendium pack. */
export declare function synchronizeActorSpells(
  actorPack: foundry.documents.collections.CompendiumCollection.Any,
  spellsPack: foundry.documents.collections.CompendiumCollection.Any,
): Promise<void>;
