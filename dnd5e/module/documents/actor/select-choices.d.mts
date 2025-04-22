import { sortObjectEntries } from "../../utils.mjs";

interface SelectChoicesEntryInput {
  label: string;
  chosen?: boolean;
  sorting?: boolean;
  /** Nested choices as a plain object before constructor processing */
  children?: Record<string, SelectChoicesEntryInput>;
  /** Allow other potential properties */
  [key: string]: any;
}

/**
* Represents the structure of an entry WITHIN a SelectChoices instance
* after the constructor has processed it.
*/
interface SelectChoicesEntryOutput<TChildren extends Record<string, any> | undefined = undefined> {
  label: string;
  chosen?: boolean;
  sorting?: boolean;
  /** If children existed, they are now a SelectChoices instance */
  children?: TChildren extends Record<string, any> ? SelectChoices<TChildren> & _ProcessedChoices<TChildren> : undefined;
  /** 'category' is added if children were processed */
  category?: boolean;
  /** Allow other potential properties */
  [key: string]: any;
}

/**
* A mapped type that transforms an input shape `T` into the shape
* expected within a SelectChoices instance (recursive processing).
*/
type _ProcessedChoices<T extends Record<string, any>> = {
  [K in keyof T]: SelectChoicesEntryOutput<
      // Check if T[K] has a 'children' property and infer its type as C
      T[K] extends { children?: infer C }
          // THEN, check if the inferred C is actually a Record<string, any>
          ? C extends Record<string, any>
              // If YES, use C as the type argument for TChildren
              ? C
              // If NO (C is string, null, undefined, boolean, etc.), treat as undefined children
              : undefined
          // If T[K] didn't have 'children' in the first place, treat as undefined children
          : undefined
  >;
};

/**
 * Interface for the SelectChoices constructor, allowing generic type inference.
 */
interface SelectChoicesConstructor {
  /**
   * Creates an instance of SelectChoices.
   * @param choices Initial choices for the object. Keys become properties of the instance.
   * @returns An instance of SelectChoices, typed to include properties based on the input `choices`.
   */
  new <TInput extends Record<string, SelectChoicesEntryInput> = Record<string, any>>(
    choices?: TInput
  ): SelectChoices.Instance<TInput>;

  /**
   * The prototype of the SelectChoices class.
   * Needs 'any' generic here as prototype applies to all possible instances.
   */
  prototype: SelectChoices<any>;
}

/**
 * Object with a number of methods for performing actions on a nested set of choices.
 */
declare interface SelectChoices<TInput extends Record<string, any> = Record<string, any>> {
  /**
     * Index signature allowing assignment of arbitrary properties corresponding
     * to the keys in the 'choices' object passed to the constructor.
     * This reflects the internal use of Object.assign.
     * Consumers should rely on the intersection type (`SelectChoices<T> & ProcessedChoices<T>`)
     * for specific property access.
     */
  [key: string]: any; // Or more specifically: SelectChoicesEntryOutput<any> | undefined;


  /**
   * Create a set of available choice keys (only leaf nodes).
   * @param set Existing set to which the values will be added.
   * @returns A set containing the keys of all non-category entries.
   */
  asSet(set?: Set<string>): Set<string>;

  /**
   * Create a deep clone of this SelectChoices object, preserving its specific type.
   * @returns A new SelectChoices instance with the same structure and type.
   */
  clone(): SelectChoices<TInput> & _ProcessedChoices<TInput>;

  /**
   * Find key and value for the provided key or key suffix, searching recursively.
   * @param key Full prefixed key (e.g. `tool:art:alchemist`) or just the suffix (e.g. `alchemist`).
   * @returns An array with the first value being the matched key, and the second being the
   * processed entry value, or null if not found.
   */
  find(key: string): [string, SelectChoicesEntryOutput<any>] | null;

  /**
   * Execute the provided function for each entry in the object, including nested entries.
   * @param func Function to execute on each entry. Receives the trait key and its processed value.
   */
  forEach(func: (key: string, value: SelectChoicesEntryOutput<any>) => void): void;

  /**
   * Merge another SelectChoices object into this one.
   * @param other The SelectChoices object to merge into this one.
   * @param options Merging options.
   * @param options.inplace Should this SelectChoices be mutated (true) or a new one returned (false)? Defaults to true.
   * @returns If inplace is true, returns this instance (mutated). If inplace is false, returns a new
   * SelectChoices instance representing the merge result (typed based on the original instance).
   */
  merge<TOther extends Record<string, any>>(
    other: SelectChoices<TOther>,
    options?: { inplace?: boolean } // Default is true
  ): this | (SelectChoices<TInput> & _ProcessedChoices<TInput>); // Returns self if inplace, otherwise a new instance of the original's type

  /**
   * Internal sorting method.
   * @param lhs Left-hand side entry for comparison.
   * @param rhs Right-hand side entry for comparison.
   * @returns Sorting comparison result (-1, 0, 1).
   */
  _sort(lhs: SelectChoicesEntryOutput<any>, rhs: SelectChoicesEntryOutput<any>): number;

  /**
   * Sort the entries recursively using the label.
   * @param options Sorting options.
   * @param options.inplace Should this SelectChoices be mutated (true) or a new one returned (false)? Defaults to true.
   * @returns If inplace is true, returns this instance (sorted). If inplace is false, returns a new, sorted
   * SelectChoices instance with the same type structure.
   */
  sort(options?: { inplace?: boolean }): this | (SelectChoices<TInput> & _ProcessedChoices<TInput>);

  /**
   * Filters choices to only include the provided keys or those matching wildcards.
   * @param filter Keys of traits to retain or another SelectChoices object. Wildcards (`*`) are supported.
   * @param options Filtering options.
   * @param options.inplace Should this SelectChoices be mutated (true) or a new one returned (false)? Defaults to true.
   * @returns If inplace is true, returns this instance (filtered). If inplace is false, returns a new, filtered
   * SelectChoices instance with the same type structure.
   */
  filter(
    filter: Set<string> | SelectChoices<any>,
    options?: { inplace?: boolean }
  ): this | (SelectChoices<TInput> & _ProcessedChoices<TInput>);

  /**
   * Removes any traits or categories the keys of which are included in the exclusion set.
   * Note: Wildcard keys are not supported with this method.
   * @param keys Set of keys to remove from the choices.
   * @param options Exclusion options.
   * @param options.inplace Should this SelectChoices be mutated (true) or a new one returned (false)? Defaults to true.
   * @returns If inplace is true, returns this instance (with exclusions). If inplace is false, returns a new
   * SelectChoices instance with the exclusions applied and the same type structure.
   */
  exclude(
    keys: Set<string>,
    options?: { inplace?: boolean }
  ): this | (SelectChoices<TInput> & _ProcessedChoices<TInput>);
}

declare const SelectChoices: SelectChoicesConstructor;

declare namespace SelectChoices {
  type SelectChoicesEntry = SelectChoicesEntryInput;
  type ProcessedChoices<T extends Record<string, any>> = _ProcessedChoices<T>;
  type Instance<TInput extends Record<string, SelectChoicesEntryInput>> = SelectChoices<TInput> & _ProcessedChoices<TInput>
}

export default SelectChoices