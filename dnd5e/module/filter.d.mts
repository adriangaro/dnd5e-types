/**
 * Represents a single filter condition.
 */
export interface FilterDescription {
  /** The key or path to the data property to check. */
  k: string;
  /** The value to compare against, or nested filters for operators. */
  v: any;
  /** The operator or comparison function to use (e.g., "AND", "contains", "gt"). Optional, defaults to exact match. */
  o?: string;
}

/**
 * Checks if the given data matches the provided filter(s).
 *
 * @param data - The data object to check.
 * @param filter - A single FilterDescription or an array of FilterDescriptions. Defaults to an empty array (always true).
 * @returns True if the data matches the filter(s), false otherwise.
 * @throws If an invalid comparison function is specified in a filter.
 */
export declare function performCheck(data: object, filter?: FilterDescription | FilterDescription[]): boolean;

/**
 * Determines the unique keys (data paths) referenced by a set of filters.
 * Useful for knowing which data properties are needed for filtering.
 *
 * @param filter - An array of FilterDescriptions to examine. Defaults to an empty array.
 * @returns A Set containing the unique keys found in the filters.
 */
export declare function uniqueKeys(filter?: FilterDescription[]): Set<string>;

// --- Operator Functions ---

/**
 * Performs an AND check against all filters. Returns true if all filters match.
 * @param data - The data object to check.
 * @param filter - An array of FilterDescriptions representing the operands.
 * @returns The boolean result of the operation.
 */
export declare function AND(data: object, filter: FilterDescription[]): boolean;

/**
 * Performs a NAND check against all filters. Returns true if not all filters match.
 * @param data - The data object to check.
 * @param filter - An array of FilterDescriptions representing the operands.
 * @returns The boolean result of the operation.
 */
export declare function NAND(data: object, filter: FilterDescription[]): boolean;

/**
 * Performs an OR check against all filters. Returns true if at least one filter matches.
 * @param data - The data object to check.
 * @param filter - An array of FilterDescriptions representing the operands.
 * @returns The boolean result of the operation.
 */
export declare function OR(data: object, filter: FilterDescription[]): boolean;

/**
 * Performs a NOR check against all filters. Returns true if no filters match.
 * @param data - The data object to check.
 * @param filter - An array of FilterDescriptions representing the operands.
 * @returns The boolean result of the operation.
 */
export declare function NOR(data: object, filter: FilterDescription[]): boolean;

/**
 * Performs an XOR check against all filters. Returns true if an odd number of filters match.
 * @param data - The data object to check.
 * @param filter - An array of FilterDescriptions representing the operands.
 * @returns The boolean result of the operation.
 */
export declare function XOR(data: object, filter: FilterDescription[]): boolean;

/**
 * Inverts the result of a nested check.
 * @param data - The data object to check.
 * @param filter - A single FilterDescription representing the operand to negate.
 * @returns The boolean result of the negation.
 */
export declare function NOT(data: object, filter: FilterDescription): boolean;

/**
 * A collection of logical operator functions.
 */
export declare const OPERATOR_FUNCTIONS: {
  AND: typeof AND;
  NAND: typeof NAND;
  OR: typeof OR;
  NOR: typeof NOR;
  XOR: typeof XOR;
  NOT: typeof NOT;
};

// --- Comparison Functions ---

/**
 * Checks for an exact match (===). Default comparison if 'o' is omitted.
 * @param dataValue - The value extracted from the data object.
 * @param filterValue - The value from the FilterDescription to compare against.
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function exact(dataValue: any, filterValue: any): boolean;

/**
 * Checks if the string representation of dataValue contains the string representation of filterValue.
 * @param dataValue - The value extracted from the data object.
 * @param filterValue - The value from the FilterDescription to compare against.
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function contains(dataValue: any, filterValue: any): boolean;

/**
 * Case-insensitive check if the string representation of dataValue contains the string representation of filterValue.
 * Uses the locale provided by `game.i18n.lang`.
 * @param dataValue - The value extracted from the data object.
 * @param filterValue - The value from the FilterDescription to compare against.
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function icontains(dataValue: any, filterValue: any): boolean;

/**
 * Checks if the string representation of dataValue starts with the string representation of filterValue.
 * @param dataValue - The value extracted from the data object.
 * @param filterValue - The value from the FilterDescription to compare against.
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function startswith(dataValue: any, filterValue: any): boolean;

/**
 * Case-insensitive check if the string representation of dataValue starts with the string representation of filterValue.
 * Uses the locale provided by `game.i18n.lang`.
 * @param dataValue - The value extracted from the data object.
 * @param filterValue - The value from the FilterDescription to compare against.
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function istartswith(dataValue: any, filterValue: any): boolean;

/**
 * Checks if the string representation of dataValue ends with the string representation of filterValue.
 * @param dataValue - The value extracted from the data object.
 * @param filterValue - The value from the FilterDescription to compare against.
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function endswith(dataValue: any, filterValue: any): boolean;

/**
 * Checks if a collection (Array or Set) `dataValue` includes `filterValue`.
 * If `filterValue` is a FilterDescription object, checks if any element in `dataValue` matches that filter.
 * @param dataValue - The value extracted from the data object (expected to be a collection).
 * @param filterValue - The value from the FilterDescription to compare against, or a FilterDescription itself.
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function has(dataValue: any, filterValue: any): boolean;

/**
 * Checks if a collection `dataValue` includes *any* of the values in the collection `filterValue`.
 * @param dataValue - The value extracted from the data object (expected to be a collection).
 * @param filterValue - The value from the FilterDescription to compare against (expected to be a collection).
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function hasany(dataValue: any, filterValue: any): boolean;

/**
 * Checks if a collection `dataValue` includes *all* of the values in the collection `filterValue`.
 * @param dataValue - The value extracted from the data object (expected to be a collection).
 * @param filterValue - The value from the FilterDescription to compare against (expected to be a collection).
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function hasall(dataValue: any, filterValue: any): boolean;

/**
 * Checks if `dataValue` is present within the collection `filterValue` (Array or Set).
 * Note: This is named `in_` because `in` is a reserved keyword.
 * @param dataValue - The value extracted from the data object.
 * @param filterValue - The value from the FilterDescription to compare against (expected to be a collection).
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function in_(dataValue: any, filterValue: any): boolean;

/**
 * Checks if `dataValue` is greater than `filterValue` (>).
 * @param dataValue - The value extracted from the data object.
 * @param filterValue - The value from the FilterDescription to compare against.
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function gt(dataValue: any, filterValue: any): boolean;

/**
 * Checks if `dataValue` is greater than or equal to `filterValue` (>=).
 * @param dataValue - The value extracted from the data object.
 * @param filterValue - The value from the FilterDescription to compare against.
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function gte(dataValue: any, filterValue: any): boolean;

/**
 * Checks if `dataValue` is less than `filterValue` (<).
 * @param dataValue - The value extracted from the data object.
 * @param filterValue - The value from the FilterDescription to compare against.
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function lt(dataValue: any, filterValue: any): boolean;

/**
 * Checks if `dataValue` is less than or equal to `filterValue` (<=).
 * @param dataValue - The value extracted from the data object.
 * @param filterValue - The value from the FilterDescription to compare against.
 * @returns True if the comparison condition is met, false otherwise.
 */
export declare function lte(dataValue: any, filterValue: any): boolean;

/**
 * A collection of comparison functions. The key "_" maps to `exact`.
 */
export declare const COMPARISON_FUNCTIONS: {
  _: typeof exact;
  exact: typeof exact;
  contains: typeof contains;
  icontains: typeof icontains;
  startswith: typeof startswith;
  istartswith: typeof istartswith;
  endswith: typeof endswith;
  has: typeof has;
  hasany: typeof hasany;
  hasall: typeof hasall;
  in: typeof in_; // Mapped to in_ function
  gt: typeof gt;
  gte: typeof gte;
  lt: typeof lt;
  lte: typeof lte;
};