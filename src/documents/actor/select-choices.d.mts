/**
 * Object with a number of methods for performing actions on a nested set of choices (e.g. traits,
 * tools, languages) to be displayed in a grouped select list or a trait selector. Not a Foundry
 * Document; a standalone utility object whose own enumerable keys are the choice entries and whose
 * methods operate over that nested tree.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface SelectChoices` — downstream packages
 * add members by augmenting that interface. The per-entry shape ({@link SelectChoices.Entry}) is kept
 * loose (extra properties allowed) so consumers can attach domain-specific metadata.
 */

declare class SelectChoices {
  /**
   * @param choices  Initial choices for the object. Keys become own properties of the instance;
   *                 any entry with `children` has those children wrapped in a nested SelectChoices.
   */
  constructor(choices?: Record<string, SelectChoices.Entry>);

  /**
   * Index signature: own enumerable keys map to processed choice entries.
   * The `| unknown` union is required by TS so that method signatures (functions, getters) remain
   * assignable to the index type; all runtime-added own enumerable properties are `Entry` values.
   */
  [key: string]: SelectChoices.Entry | unknown;

  /** Are there no entries in this choices object. */
  get isEmpty(): boolean;

  /**
   * Create a list of form options for this object.
   * @param options
   * @param options.parentLabel  Category label prefix.
   */
  asOptions(options?: { parentLabel?: string }): foundry.applications.fields.FormSelectOption[];

  /**
   * Create a set of available choice keys (leaf nodes only).
   * @param set  Existing set to which the values will be added.
   */
  asSet(set?: Set<string>): Set<string>;

  /** Create a (deep) clone of this object. */
  clone(): SelectChoices;

  /**
   * Find key and value for the provided key or key suffix, searching recursively.
   * @param key  Full prefixed key (e.g. `tool:art:alchemist`) or just the suffix (e.g. `alchemist`).
   * @returns An array of [matched key, value], or `null` if not found.
   */
  find(key: string): [string, SelectChoices.Entry] | null;

  /**
   * Execute the provided function for each entry in the object, including nested entries.
   * @param func  Function to execute on each entry. Receives the trait key and value.
   */
  forEach(func: (key: string, value: SelectChoices.Entry) => void): void;

  /**
   * Merge another SelectChoices object into this one.
   * @param other
   * @param options
   * @param options.inplace  Should this SelectChoices be mutated or a new one returned? (default `true`)
   */
  merge(other: SelectChoices, options?: { inplace?: boolean }): SelectChoices;

  /**
   * Internal sorting method.
   * @protected
   */
  _sort(lhs: SelectChoices.Entry, rhs: SelectChoices.Entry): number;

  /**
   * Sort the entries (recursively) using the label.
   * @param options
   * @param options.inplace  Should this SelectChoices be mutated or a new one returned? (default `true`)
   */
  sort(options?: { inplace?: boolean }): SelectChoices;

  /**
   * Filters choices in place to only include the provided keys.
   * @param filter             Keys of traits to retain or another SelectChoices object.
   * @param options
   * @param options.inplace    Should this SelectChoices be mutated or a new one returned? (default `true`)
   * @returns                  This SelectChoices with filter applied.
   *
   * @example
   * const choices = new SelectChoices({
   *   categoryOne: { label: "One" },
   *   categoryTwo: { label: "Two", children: {
   *     childOne: { label: "Child One" },
   *     childTwo: { label: "Child Two" }
   *   } }
   * });
   *
   * // Results in only categoryOne
   * choices.filter(new Set(["categoryOne"]));
   *
   * // Results in only categoryTwo, but none if its children
   * choices.filter(new Set(["categoryTwo"]));
   *
   * // Results in categoryTwo and all of its children
   * choices.filter(new Set(["categoryTwo:*"]));
   *
   * // Results in categoryTwo with only childOne
   * choices.filter(new Set(["categoryTwo:childOne"]));
   *
   * // Results in categoryOne, plus categoryTwo with only childOne
   * choices.filter(new Set(["categoryOne", "categoryTwo:childOne"]));
   *
   * @example
   * const choices = new SelectChoices({
   *   "type:categoryOne": { label: "One" },
   *   "type:categoryTwo": { label: "Two", children: {
   *     "type:categoryOne:childOne": { label: "Child One" },
   *     "type:categoryOne:childTwo": { label: "Child Two" }
   *   } }
   * });
   *
   * // Results in no changes
   * choices.filter(new Set(["type:*"]));
   *
   * // Results in only categoryOne
   * choices.filter(new Set(["type:categoryOne"]));
   *
   * // Results in categoryTwo and all of its children
   * choices.filter(new Set(["type:categoryTwo:*"]));
   *
   * // Results in categoryTwo with only childOne
   * choices.filter(new Set(["type:categoryTwo:childOne"]));
   */
  filter(filter: Set<string> | SelectChoices, options?: { inplace?: boolean }): SelectChoices;

  /**
   * Removes in place any traits or categories the keys of which are included in the exclusion set.
   * Note: Wildcard keys are not supported with this method.
   * @param keys               Set of keys to remove from the choices.
   * @param options
   * @param options.inplace    Should this SelectChoices be mutated or a new one returned? (default `true`)
   * @returns                  This SelectChoices with excluded keys removed.
   *
   * @example
   * const choices = new SelectChoices({
   *   categoryOne: { label: "One" },
   *   categoryTwo: { label: "Two", children: {
   *     childOne: { label: "Child One" },
   *     childTwo: { label: "Child Two" }
   *   } }
   * });
   *
   * // Results in categoryOne being removed
   * choices.exclude(new Set(["categoryOne"]));
   *
   * // Results in categoryOne and childOne being removed, but categoryTwo and childTwo remaining
   * choices.exclude(new Set(["categoryOne", "categoryTwo:childOne"]));
   */
  exclude(keys: Set<string>, options?: { inplace?: boolean }): SelectChoices;
}

declare namespace SelectChoices {
  /** Flat option shape produced by {@link SelectChoices.asOptions} (mirrors foundry's select-option descriptor). */
  type OptionEntry = foundry.applications.fields.FormSelectOption;

  /**
   * A single nested choice entry. Kept loose: consumers may attach arbitrary metadata, and `children`
   * is a nested {@link SelectChoices} after constructor processing (or a plain object as input).
   */
  interface Entry {
    /** Label, either pre- or post-localized. */
    label: string;
    /** Has this choice been selected? */
    chosen?: boolean;
    /** Is this entry disabled in the select list? */
    disabled?: boolean;
    /**
     * Should this value be sorted? If there are a mixture at a level, unsorted values are listed
     * first followed by sorted values.
     */
    sorting?: boolean;
    /** Marks an entry that has nested children (added during construction). */
    category?: boolean;
    /**
     * Nested choices. As input a plain object; after construction a {@link SelectChoices} instance.
     * If wildcard filtering support is desired, child trait keys should be prefixed (e.g.
     * `parent:child` rather than just `child`).
     */
    children?: SelectChoices | Record<string, Entry>;
    [key: string]: unknown;
  }
}

export default SelectChoices;
