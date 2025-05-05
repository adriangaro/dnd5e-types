declare interface UnitConfiguration {
  conversion: number;
  counted?: string;
  formattingUnit?: string;
}

declare interface SelectChoices {
  [key: string]: {
    label: string;
    chosen?: boolean;
    children?: SelectChoices;
  };
}

/* -------------------------------------------- */
/*  Formatters                                  */
/* -------------------------------------------- */

/**
 * Format a Challenge Rating using the proper fractional symbols.
 * @param value                   CR value to format.
 * @param [options={}]
 * @param [options.narrow=true]  Use narrow fractions (e.g. ⅛) rather than wide ones (e.g. 1/8).
 */
export function formatCR(value: number | null, { narrow }?: { narrow?: boolean }): string;

/* -------------------------------------------- */

/**
 * Form a number using the provided length unit.
 * @param value         The length to format.
 * @param unit          Length unit as defined in `CONFIG.DND5E.movementUnits`.
 * @param [options={}]  Formatting options passed to `formatNumber`.
 */
export function formatLength(value: number, unit: string, options?: object): string;

/* -------------------------------------------- */

/**
 * Format a modifier for display with its sign separate.
 * @param mod  The modifier.
 */
export function formatModifier(mod: number): Handlebars.SafeString;

/* -------------------------------------------- */

/**
 * A helper for using Intl.NumberFormat within handlebars.
 * @param value    The value to format.
 * @param options  Options forwarded to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat}
 * @param [options.numerals]  Format the number as roman numerals.
 * @param [options.ordinal]   Use ordinal formatting.
 * @param [options.words]     Write out number as full word, if possible.
 */
export function formatNumber(value: number, { numerals, ordinal, words, ...options }?: { numerals?: boolean, ordinal?: boolean, words?: boolean } & Intl.NumberFormatOptions): string;

/**
 * Roman numerals.
 */
declare const _roman: Record<string, number>;

/**
 * Format a number as roman numerals.
 * @param n  The number to format.
 */
declare function _formatNumberAsNumerals(n: number): string;

/* -------------------------------------------- */

/**
 * Format a number using an ordinal format.
 * @param n        The number to format.
 * @param options  Options forwarded to `formatNumber`.
 */
declare function _formatNumberAsOrdinal(n: number, options?: object): string;

/* -------------------------------------------- */

/**
 * Produce a number with the parts wrapped in their own spans.
 * @param value      A number for format.
 * @param [options]  Formatting options.
 */
export function formatNumberParts(value: number, options?: object): string;

/* -------------------------------------------- */

/**
 * A helper for using Intl.NumberFormat within handlebars for format a range.
 * @param min      The lower end of the range.
 * @param max      The upper end of the range.
 * @param options  Options forwarded to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat}
 */
export function formatRange(min: number, max: number, options: object): string;

/* -------------------------------------------- */

/**
 * A helper function to format textarea text to HTML with linebreaks.
 * @param value  The text to format.
 */
export function formatText(value: string | null | undefined): Handlebars.SafeString;

/* -------------------------------------------- */

/**
 * A helper function that formats a time in a human-readable format.
 * @param value         Time to display.
 * @param unit          Units as defined in `CONFIG.DND5E.timeUnits`.
 * @param [options={}]  Formatting options passed to `formatNumber`.
 */
export function formatTime(value: number, unit: string, options?: object): string;

/* -------------------------------------------- */

/**
 * Form a number using the provided volume unit.
 * @param value         The volume to format.
 * @param unit          Volume unit as defined in `CONFIG.DND5E.volumeUnits`.
 * @param [options={}]  Formatting options passed to `formatNumber`.
 */
export function formatVolume(value: number, unit: string, options?: object): string;

/* -------------------------------------------- */

/**
 * Form a number using the provided weight unit.
 * @param value         The weight to format.
 * @param unit          Weight unit as defined in `CONFIG.DND5E.weightUnits`.
 * @param [options={}]  Formatting options passed to `formatNumber`.
 */
export function formatWeight(value: number, unit: string, options?: object): string;

/* -------------------------------------------- */

/**
 * Format a number using one of core's built-in unit types.
 * @param value                   Value to display.
 * @param unit                    Name of the unit to use.
 * @param config                    Configuration data for the unit.
 * @param [options={}]            Formatting options passed to `formatNumber`.
 * @param [options.parts=false]  Format to parts.
 */
declare function _formatSystemUnits(value: number, unit: string, config: UnitConfiguration, { parts, ...options }?: { parts?: boolean } & object): string;

/* -------------------------------------------- */

/**
 * Cached store of Intl.PluralRules instances.
 */
declare const _pluralRules: Record<string, Intl.PluralRules>;

/**
 * Get a PluralRules object, fetching from cache if possible.
 * @param [options={}]
 * @param [options.type=cardinal]
 */
export function getPluralRules({ type }?: { type?: "cardinal" | "ordinal" }): Intl.PluralRules;

/* -------------------------------------------- */
/*  Formulas                                    */
/* -------------------------------------------- */

/**
 * Return whether a string is a valid reroll, explosion, min, or max dice modifier.
 * @param mod      The modifier to test.
 */
export function isValidDieModifier(mod: string): boolean;

/* -------------------------------------------- */

/**
 * Handle a delta input for a number value from a form.
 * @param input  Input that contains the modified value.
 * @param target         Target document to be updated.
 */
export function parseInputDelta(input: HTMLInputElement, target: Document): number | void;

/* -------------------------------------------- */

/**
 * Prepare the final formula value for a model field.
 * @param model  Model for which the value is being prepared.
 * @param keyPath                        Path to the field within the model.
 * @param label                          Label to use in preparation warnings.
 * @param rollData                       Roll data to use when replacing formula values.
 */
export function prepareFormulaValue(model: Item.Implementation['system'] | dnd5e.types.Activity.Any, keyPath: string, label: string, rollData: object): void;

/* -------------------------------------------- */

/**
 * Replace referenced data attributes in the roll formula with values from the provided data.
 * If the attribute is not found in the provided data, display a warning on the actor.
 * @param formula           The original formula within which to replace.
 * @param data              The data object which provides replacements.
 * @param [options={}]
 * @param [options.actor]            Actor for which the value is being prepared.
 * @param [options.item]              Item for which the value is being prepared.
 * @param [options.missing="0"]  Value to use when replacing missing references, or `null` to not replace.
 * @param [options.property]          Name of the property to which this formula belongs.
 */
export function replaceFormulaData(formula: string, data: object, { actor, item, missing, property }?: { actor?: Actor.Implementation, item?: Item.Implementation, missing?: string | null, property?: string }): string;

/* -------------------------------------------- */

/**
 * Convert a bonus value to a simple integer for displaying on the sheet.
 * @param bonus  Bonus formula.
 * @param [data={}]          Data to use for replacing @ strings.
 * @protected
 */
export function simplifyBonus(bonus: number | string | null | undefined, data?: object): number;

/* -------------------------------------------- */
/*  IDs                                         */
/* -------------------------------------------- */

/**
 * Create an ID from the input truncating or padding the value to make it reach 16 characters.
 * @param id
 */
export function staticID(id: string): string;

/* -------------------------------------------- */
/*  Keybindings Helper                          */
/* -------------------------------------------- */

declare const CODES: Record<string, string[]>;
declare const MODIFIER_KEYS: Record<string, string>;

/**
 * Track which KeyboardEvent#code presses associate with each modifier.
 * Added support for treating Meta separate from Control.
 */
declare const MODIFIER_CODES: {
  Alt: string[];
  Control: string[];
  Meta: string[];
  Shift: string[];
};

/**
 * Based on the provided event, determine if the keys are pressed to fulfill the specified keybinding.
 * @param event    Triggering event.
 * @param action  Keybinding action within the `dnd5e` namespace.
 */
export function areKeysPressed(event: Event | null | undefined, action: string): boolean;

/* -------------------------------------------- */
/*  Logging                                     */
/* -------------------------------------------- */

/**
 * Log a console message with the "D&D 5e" prefix and styling.
 * @param message                    Message to display.
 * @param [options={}]
 * @param [options.color="#6e0000"]  Color to use for the log.
 * @param [options.extras=[]]         Extra options passed to the logging method.
 * @param [options.level="log"]      Console logging method to call.
 */
export function log(message: string, { color, extras, level }?: { color?: string, extras?: any[], level?: "log" | "debug" | "info" | "warn" | "error" }): void;

/* -------------------------------------------- */
/*  Object Helpers                              */
/* -------------------------------------------- */

/**
 * Transform an object, returning only the keys which match the provided filter.
 * @param obj         Object to transform.
 * @param [filter]  Filtering function. If none is provided, it will just check for truthiness.
 */
export function filteredKeys<T>(obj: Record<string, T>, filter?: (value: T) => boolean): string[];

/* -------------------------------------------- */

/**
 * Check whether an object exists without transversing any getters, preventing any deprecation warnings from triggering.
 * @param object
 * @param keyPath
 */
export function safePropertyExists(object: object, keyPath: string): boolean;

/* -------------------------------------------- */

/**
 * Sort the provided object by its values or by an inner sortKey.
 * @param obj                 The object to sort.
 * @param [sortKey]  An inner key upon which to sort or sorting function.
 */
export function sortObjectEntries<T>(obj: Record<string, T>, sortKey?: string | ((lhs: T, rhs: T) => number)): Record<string, T>;

/* -------------------------------------------- */

/**
 * Retrieve the indexed data for a Document using its UUID. Will never return a result for embedded documents.
 * @param uuid  The UUID of the Document index to retrieve.
 */
export function indexFromUuid(uuid: string): object | null;

/* -------------------------------------------- */

/**
 * Creates an HTML document link for the provided UUID.
 * Try to build links to compendium content synchronously to avoid DB lookups.
 * @param uuid                    UUID for which to produce the link.
 * @param [options]
 * @param [options.tooltip]       Tooltip to add to the link.
 * @param [options.renderBroken]  If a UUID cannot found, render it as a broken link instead of returning the
 *                                         empty string.
 */
export function linkForUuid(uuid: string, { tooltip, renderBroken }?: { tooltip?: string, renderBroken?: boolean }): string;

/* -------------------------------------------- */
/*  Targeting                                   */
/* -------------------------------------------- */

/**
 * Important information on a targeted token.
 */
export interface TargetDescriptor5e {
  /** The UUID of the target. */
  uuid: string;
  /** The target's image. */
  img: string;
  /** The target's name. */
  name: string;
  /** The target's armor class, if applicable. */
  ac: number | null;
}

/**
 * Grab the targeted tokens and return relevant information on them.
 */
export function getTargetDescriptors(): TargetDescriptor5e[];

/* -------------------------------------------- */

/**
 * Get currently selected tokens in the scene or user's character's tokens.
 */
export function getSceneTargets(): Token.Implementation[];

/* -------------------------------------------- */
/*  Conversions                                 */
/* -------------------------------------------- */

/**
 * Convert the provided length to another unit.
 * @param value                   The length being converted.
 * @param from                    The initial units.
 * @param to                      The final units.
 * @param [options={}]
 * @param [options.strict=true]  Throw an error if either unit isn't found.
 */
export function convertLength(value: number, from: string, to: string, { strict }?: { strict?: boolean }): number;

/* -------------------------------------------- */

/**
 * Convert the provided time value to another unit. If no final unit is provided, then will convert it to the largest
 * unit that can still represent the value as a whole number.
 * @param value                    The time being converted.
 * @param from                     The initial unit as defined in `CONFIG.DND5E.timeUnits`.
 * @param [options={}]
 * @param [options.combat=false]  Use combat units when auto-selecting units, rather than normal units.
 * @param [options.strict=true]   Throw an error if from unit isn't found.
 * @param [options.to]             The final units, if explicitly provided.
 */
export function convertTime(value: number, from: string, { combat, strict, to }?: { combat?: boolean, strict?: boolean, to?: string }): { value: number, unit: string };

/* -------------------------------------------- */

/**
 * Convert the provided weight to another unit.
 * @param value                   The weight being converted.
 * @param from                    The initial unit as defined in `CONFIG.DND5E.weightUnits`.
 * @param to                      The final units.
 * @param [options={}]
 * @param [options.strict=true]  Throw an error if either unit isn't found.
 */
export function convertWeight(value: number, from: string, to: string, { strict }?: { strict?: boolean }): number;

/* -------------------------------------------- */

/**
 * Convert from one unit to another using one of core's built-in unit types.
 * @param value                                Value to display.
 * @param from                                 The initial unit.
 * @param to                                   The final unit.
 * @param config                    Configuration data for the unit.
 * @param options
 * @param [options.message]  Method used to produce the error message if unit not found.
 * @param [options.strict]                    Throw an error if either unit isn't found.
 */
declare function _convertSystemUnits(value: number, from: string, to: string, config: object, { message, strict }: { message?: (unit: string) => string, strict?: boolean }): number;

/* -------------------------------------------- */

/**
 * Default units to use depending on system setting.
 * @param type  Type of units to select.
 */
export function defaultUnits(type: "length" | "weight"): string;

/* -------------------------------------------- */
/*  Validators                                  */
/* -------------------------------------------- */

/**
 * Ensure the provided string contains only the characters allowed in identifiers.
 * @param identifier
 */
declare function isValidIdentifier(identifier: string): boolean;

export const validators: {
  isValidIdentifier: typeof isValidIdentifier;
};

/* -------------------------------------------- */

/**
 * Determine whether the provided unit is usable within `Intl.NumberFormat`.
 * @param unit
 */
export function isValidUnit(unit: string): boolean;

/* -------------------------------------------- */

/**
 * Test if a given string is serialized JSON, and parse it if so.
 * @param raw  The raw value.
 */
export function parseOrString(raw: string): any;

/* -------------------------------------------- */
/*  Handlebars Template Helpers                 */
/* -------------------------------------------- */

/**
 * Define a set of template paths to pre-load. Pre-loaded templates are compiled and cached for fast access when
 * rendering. These paths will also be available as Handlebars partials by using the file name
 * (e.g. "dnd5e.actor-traits").
 */
export function preloadHandlebarsTemplates(): Promise<void>;

/* -------------------------------------------- */

/**
 * A helper that converts the provided object into a series of `data-` entries.
 * @param object   Object to convert into dataset entries.
 * @param options  Handlebars options.
 */
declare function dataset(object: object | null | undefined, options: Handlebars.HelperOptions): Handlebars.SafeString;

/* -------------------------------------------- */

/**
 * A helper to create a set of <option> elements in a <select> block grouped together
 * in <optgroup> based on the provided categories.
 *
 * @param choices          Choices to format.
 * @param [options]
 * @param [options.localize]     Should the label be localized?
 * @param [options.blank]         Name for the empty option, if one should be added.
 * @param [options.labelAttr]     Attribute pointing to label string.
 * @param [options.chosenAttr]    Attribute pointing to chosen boolean.
 * @param [options.childrenAttr]  Attribute pointing to array of children.
 */
declare function groupedSelectOptions(choices: SelectChoices, options?: { hash?: { localize?: boolean, blank?: string, labelAttr?: string, chosenAttr?: string, childrenAttr?: string } }): Handlebars.SafeString;

/* -------------------------------------------- */

/**
 * A helper that fetch the appropriate item context from root and adds it to the first block parameter.
 * @param context  Current evaluation context.
 * @param options  Handlebars options.
 */
declare function itemContext(context: object, options: Handlebars.HelperOptions): string;

/* -------------------------------------------- */

/**
 * Conceal a section and display a notice if unidentified.
 * @param conceal  Should the section be concealed?
 * @param options   Handlebars options.
 */
declare function concealSection(conceal: boolean, options: Handlebars.HelperOptions): string;

/* -------------------------------------------- */

/**
 * Construct an object from the provided arguments.
 * @param options       Handlebars options.
 * @param options.hash
 */
declare function makeObject({ hash }: Handlebars.HelperOptions): object;

/* -------------------------------------------- */

/**
 * Register custom Handlebars helpers used by 5e.
 */
export function registerHandlebarsHelpers(): void;

/* -------------------------------------------- */
/*  Config Pre-Localization                     */
/* -------------------------------------------- */

/**
 * Storage for pre-localization configuration.
 */
declare const _preLocalizationRegistrations: object;

/**
 * Mark the provided config key to be pre-localized during the init stage.
 * @param configKeyPath          Key path within `CONFIG.DND5E` to localize.
 * @param [options={}]
 * @param [options.key]          If each entry in the config enum is an object,
 *                                        localize and sort using this property.
 * @param [options.keys=[]]    Array of localization keys. First key listed will be used for sorting
 *                                        if multiple are provided.
 * @param [options.sort=false]  Sort this config enum, using the key if set.
 */
export function preLocalize(configKeyPath: string, { key, keys, sort }?: { key?: string, keys?: string[], sort?: boolean }): void;

/* -------------------------------------------- */

/**
 * Execute previously defined pre-localization tasks on the provided config object.
 * @param config  The `CONFIG.DND5E` object to localize and sort. *Will be mutated.*
 */
export function performPreLocalization(config: object): void;

/* -------------------------------------------- */

/**
 * Localize the values of a configuration object by translating them in-place.
 * @param obj       The configuration object to localize.
 * @param [keys]  List of inner keys that should be localized if this is an object.
 * @private
 */
declare function _localizeObject(obj: object, keys?: string[]): void;

/* -------------------------------------------- */
/*  Localization                                */
/* -------------------------------------------- */

/**
 * A cache of already-fetched labels for faster lookup.
 */
declare const _attributeLabelCache: {
  activity: Map<string, string>;
  actor: Map<string, string>;
  item: Map<string, string>;
};

/**
 * Convert an attribute path to a human-readable label. Assumes paths are on an actor unless an reference item
 * is provided.
 * @param attr              The attribute path.
 * @param [options]
 * @param [options.actor]  An optional reference actor.
 * @param [options.item]    An optional reference item.
 */
export function getHumanReadableAttributeLabel(attr: string, { actor, item }?: { actor?: Actor.Implementation, item?: Item.Implementation }): string | void;

/* -------------------------------------------- */

/**
 * Perform pre-localization on the contents of a SchemaField. Necessary because the `localizeSchema` method
 * on `Localization` is private.
 * @param schema
 * @param prefixes
 */
export function localizeSchema(schema: foundry.data.fields.SchemaField<any>, prefixes: string[]): void;

/* -------------------------------------------- */

/**
 * Split a semi-colon-separated list and clean out any empty entries.
 * @param input
 */
export function splitSemicolons(input: string): string[];

/* -------------------------------------------- */
/*  Migration                                   */
/* -------------------------------------------- */

/**
 * Synchronize the spells for all Actors in some collection with source data from an Item compendium pack.
 * @param actorPack      An Actor compendium pack which will be updated
 * @param spellsPack     An Item compendium pack which provides source data for spells
 */
export function synchronizeActorSpells(actorPack: CompendiumCollection<any>, spellsPack: CompendiumCollection<any>): Promise<void>;

/* -------------------------------------------- */

/**
 * A helper function to synchronize spell data for a specific Actor.
 * @param actor
 * @param spellsMap
 * @private
 */
declare function _synchronizeActorSpells(actor: Actor.Implementation, spellsMap: Record<string, Item.Implementation>): { toDelete: string[], toCreate: object[] };
