/**
 * Field that stores activities on an item.
 * The id-keyed polymorphic collection of activities on an item (`system.activities`). A thin alias
 * over the activity registry's collection field, so new activity types flow in automatically.
 *
 * Also exports `ActivityField` (per-entry field that swaps class by activity type) and
 * `ActivityCollection` (specialized Collection returned by `initialize()`).
 */

declare global {
  namespace dnd5e.types.fields {
    type ActivitiesField = dnd5e.types.Activity.Field;
  }
}

/**
 * Module-scoped value class so `ActivitiesField` is usable as a value (constructor).
 * Extends the same `ObjectField` base that `dnd5e.types.Activity.Field`
 * (= `TypedCollectionField<Activity.Types, string>`) resolves to, reusing the existing
 * registry-derived source/instance types rather than re-spelling the schema.
 */
declare class ActivitiesField extends foundry.data.fields.ObjectField<
  dnd5e.types.fields.MappingField.DefaultOptions,
  Record<string, dnd5e.types.fields.RegistrySource<dnd5e.types.Activity.Types>>,
  Record<string, dnd5e.types.fields.RegistryInstance<dnd5e.types.Activity.Types>>,
  Record<string, dnd5e.types.fields.RegistrySource<dnd5e.types.Activity.Types>>
> {}

/**
 * Field that stores activity data and swaps class based on activity type.
 */
declare class ActivityField extends foundry.data.fields.ObjectField {
  /** @override */
  static recursive: boolean;

  /**
   * Get the document type for this activity.
   * @param value  Activity data being prepared.
   * @returns      Activity document type, or null if not found.
   */
  getModel(value: object): dnd5e.types.Activity.Types[dnd5e.types.Activity.TypeKey] | null;

}

/**
 * Specialized collection type for stored activities.
 * Produced by `ActivitiesField#initialize()`; consumers query it via `getByType`/`getByTypes`.
 */
declare class ActivityCollection
  extends foundry.utils.Collection<dnd5e.types.Activity.Instance>
  implements dnd5e.types.Activity.Collection
{
  constructor(model: foundry.abstract.DataModel.Any, entries: dnd5e.types.Activity.Instance[]);

  /**
   * Fetch an array of activities of a certain type.
   * @param type  Activity type.
   * @returns Activity[]
   */
  getByType<T extends dnd5e.types.Activity.TypeKey>(type: T): dnd5e.types.Activity.OfType<T>[];

  /**
   * Generator that yields activities for each of the provided types.
   * @param types  Types to fetch.
   * @yields Activity
   */
  getByTypes<T extends dnd5e.types.Activity.TypeKey>(
    ...types: T[]
  ): IterableIterator<dnd5e.types.Activity.OfType<T>>;

  /**
   * Convert the ActivityCollection to an array of simple objects.
   * @param source  Draw data for contained Documents from the underlying data source? Default: `true`.
   * @returns The extracted array of primitive objects.
   */
  toObject(source?: boolean): dnd5e.types.Activity.Source[];

  /**
   * Test the given predicate against every entry in the Collection.
   * @param predicate  The predicate.
   * @returns boolean
   */
  every(predicate: (value: dnd5e.types.Activity.Instance, index: number, collection: this) => boolean): boolean;
}

export { ActivitiesField, ActivityField, ActivityCollection };
export {};
