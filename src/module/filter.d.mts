// dnd5e filter module: predicate engine for matching data against filter descriptions; re-exported as the Filter API namespace.

/**
 * A filter description.
 */
export interface FilterDescription {
  /** Key on the data object to check. */
  k: string;
  /** Value to compare. */
  v: any;
  /** Operator or comparison function to use. */
  o?: 'AND' | 'NAND' | 'OR' | 'NOR' | 'XOR' | 'NOT' | '_' | 'exact' | 'contains' | 'icontains' | 'startswith' | 'istartswith' | 'endswith' | 'has' | 'hasany' | 'hasall' | 'in' | 'gt' | 'gte' | 'lt' | 'lte';
}

/**
 * Check some data against a filter to determine if it matches.
 * @throws When an unknown comparison function is referenced in the filter.
 */
export declare function performCheck(data: object, filter?: FilterDescription | FilterDescription[]): boolean;

/**
 * Determine the unique keys referenced by a set of filters.
 */
export declare function uniqueKeys(filter?: FilterDescription[]): Set<string>;

/* -------------------------------------------- */
/*  Operator Functions                          */
/* -------------------------------------------- */

/**
 * Operator functions.
 */
export declare const OPERATOR_FUNCTIONS: Record<string, (...args: any[]) => boolean>;

/**
 * Perform an AND check against all filters.
 */
export declare function AND(data: object, filter: FilterDescription[]): boolean;

/**
 * Perform an NAND check against all filters.
 */
export declare function NAND(data: object, filter: FilterDescription[]): boolean;

/**
 * Perform an OR check against all filters.
 */
export declare function OR(data: object, filter: FilterDescription[]): boolean;

/**
 * Perform an NOR check against all filters.
 */
export declare function NOR(data: object, filter: FilterDescription[]): boolean;

/**
 * Perform an XOR check against all filters.
 */
export declare function XOR(data: object, filter: FilterDescription[]): boolean;

/**
 * Invert the result of a nested check.
 */
export declare function NOT(data: object, filter: FilterDescription): boolean;

/* -------------------------------------------- */
/*  Comparison Functions                        */
/* -------------------------------------------- */

/**
 * Currently supported comparison functions.
 */
export declare const COMPARISON_FUNCTIONS: Record<string, (...args: any[]) => boolean>;

/**
 * Check for an exact match. The default comparison mode if none is provided.
 */
export declare function exact(data: any, value: any): boolean;

/**
 * Check that data contains value.
 */
export declare function contains(data: any, value: any): boolean;

/**
 * Case-insensitive check that data contains value.
 */
export declare function icontains(data: any, value: any): boolean;

/**
 * Check that data starts with value.
 */
export declare function startswith(data: any, value: any): boolean;

/**
 * Case-insensitive check that data starts with value.
 */
export declare function istartswith(data: any, value: any): boolean;

/**
 * Check that data ends with value.
 */
export declare function endswith(data: any, value: any): boolean;

/**
 * Check that the data collection has the provided value.
 */
export declare function has(data: any, value: any): boolean;

/**
 * Check that the data collection has any of the provided values.
 */
export declare function hasany(data: any, value: any): boolean;

/**
 * Check that the data collection has all of the provided values.
 */
export declare function hasall(data: any, value: any): boolean;

/**
 * Check that data matches one of the provided values.
 */
export declare function in_(data: any, value: any): boolean;

/**
 * Check that value is greater than data.
 */
export declare function gt(data: any, value: any): boolean;

/**
 * Check that value is greater than or equal to data.
 */
export declare function gte(data: any, value: any): boolean;

/**
 * Check that value is less than data.
 */
export declare function lt(data: any, value: any): boolean;

/**
 * Check that value is less than or equal to data.
 */
export declare function lte(data: any, value: any): boolean;
