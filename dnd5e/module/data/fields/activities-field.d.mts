import MappingField from "./mapping-field.mjs";

/**
 * Field that stores activities on an item.
 */
export class ActivitiesField<
  const Options extends MappingField.AnyOptions = MappingField.DefaultOptions,
  const AssignmentElementType = ActivityField.AssignmentType<ActivityField.DefaultOptions>,
  const InitializedElementType = ActivityField.InitializedType<ActivityField.DefaultOptions>,
  const AssignmentType = MappingField.AssignmentType<AssignmentElementType, string, Options>,
  const InitializedType = ActivityCollection,
  const PersistedElementType = ActivityField.PersistedType<ActivityField.DefaultOptions>,
  const PersistedType extends Record<string, PersistedElementType> | null | undefined = MappingField.PersistedType<
    AssignmentElementType,
    PersistedElementType,
    string,
    Options
  >
> extends MappingField<
  ActivityField,
  string,
  Options,
  AssignmentElementType,
  InitializedElementType,
  AssignmentType,
  InitializedType,
  PersistedElementType,
  PersistedType
> {
  constructor(options: Options)
}

/* -------------------------------------------- */

/**
 * Field that stores activity data and swaps class based on activity type.
 */
export class ActivityField<
  const Options extends ActivityField.Options = ActivityField.DefaultOptions,
  const AssignmentType = ActivityField.AssignmentType<Options>,
  const InitializedType = ActivityField.InitializedType<Options>,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = ActivityField.PersistedType<Options>,
> extends foundry.data.fields.ObjectField<
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  /**
   * Get the document type for this activity.
   * @param {object} value            Activity data being prepared.
   * @returns {typeof Activity|null}  Activity document type.
   */
  getModel(value: ActivityField.AssignmentType<Options>): dnd5e.types.Activity.ImplementationClass | null

  /* -------------------------------------------- */

  /**
   * Migrate this field's candidate source data.
   */
  migrateSource(sourceData: object, fieldData: any)
}

export namespace ActivityField {
  type Options = foundry.data.fields.DataField.Options<
    foundry.data.fields.SchemaField.AssignmentData<
      dnd5e.types.Activity.Schema
    >
  >
  type DefaultOptions = foundry.data.fields.ObjectField.DefaultOptions

  type MergedOptions<
    Opts extends Options
  > = fvttUtils.SimpleMerge<DefaultOptions, Opts>;

  type AssignmentType<
    Opts extends Options
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    foundry.data.fields.SchemaField.AssignmentData<
      dnd5e.types.Activity.Schema
    >,
    MergedOptions<Opts>
  >
  type InitializedType<
    Opts extends Options
  > = foundry.data.fields.DataField.DerivedInitializedType<
    dnd5e.types.Activity.Implementation,
    MergedOptions<Opts>
  >
  type PersistedType<
    Opts extends Options
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    foundry.data.fields.SchemaField.SourceData<
      dnd5e.types.Activity.Schema
    >,
    MergedOptions<Opts>
  >
}

/* -------------------------------------------- */
/**
 * Specialized collection type for stored activities.
 */
export class ActivityCollection extends Collection<
  dnd5e.types.Activity.Implementation
> {
  constructor(model: foundry.abstract.DataModel.Any, entries: dnd5e.types.Activity.Implementation[])

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The parent DataModel to which this ActivityCollection belongs.
   */
  #model: foundry.abstract.DataModel.Any;

  /* -------------------------------------------- */

  /**
   * Pre-organized arrays of activities by type.
   */
  #types: Map<dnd5e.types.Activity.TypeKey, Set<string>>

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /**
   * Fetch an array of activities of a certain type.
   */
  getByType(type: string): dnd5e.types.Activity.Implementation[]
  getByType<T extends dnd5e.types.Activity.TypeKey>(type: T): dnd5e.types.Activity.OfType<T>[]

  /* -------------------------------------------- */

  /**
   * Generator that yields activities for each of the provided types.
   */
  getByTypes(...types: string[]): IterableIterator<dnd5e.types.Activity.Implementation>;
  getByTypes<T extends dnd5e.types.Activity.TypeKey>(...types: T[]): IterableIterator<dnd5e.types.Activity.OfType<T>>

  /* -------------------------------------------- */

  /**
   * Test the given predicate against every entry in the Collection.
   */
  every(
    predicate: (value: dnd5e.types.Activity.Implementation, index: number, collection: this) => boolean
  ): boolean;

  /* -------------------------------------------- */

  /**
   * Convert the ActivityCollection to an array of simple objects.
   */
  toObject(source?: boolean): foundry.data.fields.SchemaField.SourceData<
    dnd5e.types.Activity.Schema
  >[]
}