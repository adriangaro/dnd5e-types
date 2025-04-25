import type Proficiency from "../documents/actor/proficiency.d.mts";

interface _InternalResolvedSchemaInterface extends foundry.abstract.TypeDataModel.AnyConstructor {
  new <
    Schema extends foundry.data.fields.DataSchema,
    _ComputedInstance extends foundry.abstract.TypeDataModel<Schema, foundry.abstract.Document.Any>
  >(
    ...args: ConstructorParameters<typeof foundry.abstract.TypeDataModel<Schema, foundry.abstract.Document.Any>>
  ): foundry.abstract.TypeDataModel<Schema, foundry.abstract.Document.Any> & _ComputedInstance
}

declare const _InternalResolvedSchemaConst: _InternalResolvedSchemaInterface;

// @ts-expect-error Ignore the error, this is a workaround for a dynamic class.
declare class _InternalResolvedSchema<
  Schema extends foundry.data.fields.DataSchema,
  InstanceMembers,
  // This does not work if inlined. It's weird to put it here but it works.
  _ComputedInstance extends foundry.abstract.TypeDataModel<Schema, foundry.abstract.Document.Any> = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.InitializedData<Schema>,
    // The merge is written this way because properties in the data model _cannot_ be allowed to be overridden by the base or derived data.
    // In theory this could be allowed but it causes a few difficulties.
    // The fundamental issue is that allowing this would cause subclasses to no longer guaranteed to be valid subtypes.
    // A particularly thorny but not fully fundamental issue is that it also causes difficulties with `this` inside of classes generic over `BaseData`.
    foundry.abstract.TypeDataModel<Schema, foundry.abstract.Document.Any> &
    InstanceMembers
  >,
> extends _InternalResolvedSchemaConst<Schema, _ComputedInstance> { }

declare class ResolvedSchemaAndTypeDataModel<
  Schema extends foundry.data.fields.DataSchema,
  Templates extends SystemDataModel.AnyConstructor[] = [],
  FinalSchema extends foundry.data.fields.DataSchema = fvttUtils.SimpleMerge<
    SystemDataModel.Internal.CalculateSchemaRecursive<
      // remove generic SystemDataModel.AnyConstructor[] since it will break usage of dnd5e.types.GetSchema<typeof SystemDataModel> if no ctor params are passed
      SystemDataModel.Internal.EnsureTemplates<Templates>
    >,
    // remove generic SystemDataModel.AnyConstructor[] since it will break usage of dnd5e.types.GetSchema<typeof SystemDataModel> if no ctor params are passed
    fvttUtils.RemoveIndexSignatures<SystemDataModel.Internal.EnsureSchema<Schema>>
  >,
  InstanceMembers = SystemDataModel.Internal.MixedInstance<Templates>
> extends _InternalResolvedSchema<FinalSchema, InstanceMembers> {
}

declare class SystemDataModel<
  Schema extends foundry.data.fields.DataSchema = {},
  Templates extends SystemDataModel.AnyConstructor[] = []
> extends ResolvedSchemaAndTypeDataModel<Schema, Templates> {

  static mixin<
    This extends SystemDataModel.AnyRootConstructor,
    Templates extends SystemDataModel.AnyConstructor[],
  >(
    this: This,
    ...templates: Templates
  ): SystemDataModel.Internal.MakeMixin<
    This, SystemDataModel.Internal.EnsureTemplates<Templates>
  >;

  static LOCALIZATION_PREFIXES: string[];

  /**
   * Enable V10 validation compatibility. Set to false in subclasses to disable.
   * @inheritDoc
   */
  static _enableV10Validation: boolean;

  /**
   * System type that this system data model represents (e.g., "character", "npc", "vehicle").
   * Should be defined by subclasses.
   */
  static _systemType: string;

  /**
   * Base templates used for construction. These are other SystemDataModel subclasses used as mixins.
   * Managed internally by the `mixin` method.
   * @private
   */
  static readonly _schemaTemplates: any[];

  /**
   * A list of properties that should not be mixed-in from templates to the final type.
   * @private
   */
  static readonly _immiscible: Readonly<Set<string>>;

  /**
   * Metadata that describes this DataModel. Can be extended by subclasses.
   */
  static get metadata(): SystemDataModel.Metadata;

  /**
   * The field names derived from the base templates used for construction.
   * @private
   */
  static get _schemaTemplateFields(): Readonly<Set<string>>;

  /**
   * Filters available for this item type when using the compendium browser.
   * Should be overridden by subclasses to provide relevant filters.
   * @returns Filters definition.
   */
  static get compendiumBrowserFilters(): dnd5e.types.CompendiumBrowserFilterDefinition;

  /**
   * Merge two schema definitions together.
   * @param a   First schema (basis). *Will be mutated.*
   * @param b   Second schema to merge in.
   * @returns   The mutated first schema (a).
   */
  static mergeSchema<
    T extends foundry.data.fields.DataSchema,
    U extends foundry.data.fields.DataSchema
  >(a: T, b: U): fvttUtils.PrettifyType<
    fvttUtils.SimpleMerge<T, U>
  >;

  /**
   * Performs cleaning logic specific to this model and its templates, without calling the base DataModel.cleanData.
   * @param [source]          The source data.
   * @param [options={}] Additional options.
   */
  static _cleanData(...args: Parameters<typeof foundry.abstract.TypeDataModel['cleanData']>): void;


  /**
   * Performs joint validation logic specific to this model and its templates, without calling the base DataModel.validateJoint.
   * @param data         The source data.
   * @throws             An error if validation fails.
   */
  static _validateJoint(...args: Parameters<typeof foundry.abstract.TypeDataModel['validateJoint']>): void;


  /**
   * Performs migration logic specific to this model and its templates, without calling the base DataModel.migrateData.
   * @param source       The source data.
   */
  static _migrateData(...args: Parameters<typeof foundry.abstract.TypeDataModel['migrateData']>): void;

  /**
   * Performs shimming logic specific to this model and its templates, without calling the base DataModel.shimData.
   * @param data             The source data.
   * @param [options] Additional options.
   */
  static _shimData(...args: Parameters<typeof foundry.abstract.TypeDataModel['shimData']>): void;

  /**
   * Accessor for the static metadata object of this DataModel definition.
   */
  get metadata(): SystemDataModel.Metadata

  /**
   * Key path to the description used for default embeds.
   * Should be overridden by subclasses if applicable.
   */
  get embeddedDescriptionKeyPath(): string | null;
}

declare abstract class AnySystemDataModel extends SystemDataModel<{}, []> {
  constructor(...args: never);
}

declare namespace SystemDataModel {
  interface Any extends AnySystemDataModel { }
  interface AnyRootConstructor extends fvttUtils.Identity<typeof AnySystemDataModel> {
    new <
      Schema extends foundry.data.fields.DataSchema,
      Templates extends SystemDataModel.AnyRootConstructor[] = []
    >(...args: never): AnySystemDataModel
  }
  interface AnyConstructor extends fvttUtils.Identity<typeof AnySystemDataModel> {
    new(...args: never): AnySystemDataModel
  }

  namespace Internal {
    type Immisiciable = ["length", "mixed", "name", "prototype", "cleanData", "_cleanData",
      "_initializationOrder", "validateJoint", "_validateJoint", "migrateData", "_migrateData",
      "shimData", "_shimData", "defineSchema"][number]
    type RootSchemaDependent = ["schema", '_source', 'clone', 'validate', 'updateSource', 'toObject', 'toJSON'][number]
    // type OmitMembers<T> =
    //   Omit<T, '_schema' | 'schema' | 'defineSchema' | '_schemaTemplateFields'>

    type FilterAnyConstructor<T extends readonly any[]> =
      T extends readonly [] // Base Case: If the tuple is empty, return an empty tuple.
      ? []
      : T extends readonly [infer Head, ...infer Tail] // Recursive Step: Split the tuple into the first element (Head) and the rest (Tail).
      ? IsExactly<Head, SystemDataModel.AnyConstructor> extends true // Check if the Head element is exactly AnyConstructor.
      ? FilterAnyConstructor<Tail> // If yes, discard Head and recursively filter the Tail.
      : [Head, ...FilterAnyConstructor<Tail>] // If no, keep Head and prepend it to the recursively filtered Tail.
      // Fallback: Should not be reached if T is a tuple, but handles non-tuple array types gracefully (returns empty).
      // Adjust if general array filtering needs different behavior.
      : [];
    type GetMetadata<T> = T extends ({
      metadata: SystemDataModel.Metadata
    }) ? T['metadata'] extends infer U ? U : never : never

    /** Recursively merges schemas from a tuple of constructors. */
    type CalculateSchemaRecursive<
      TTypes extends readonly (fvttUtils.AnyConcreteConstructor | unknown)[]
    > =
      TTypes extends readonly [infer Head extends fvttUtils.AnyConcreteConstructor, ...infer Tail extends (fvttUtils.AnyConcreteConstructor | unknown)[]]
      ? fvttUtils.SimpleMerge<dnd5e.types.GetSchema<Head>, CalculateSchemaRecursive<Tail>>
      : {}; // Base case: empty tuple results in empty schema


    /**
     * Calculates the combined instance type by intersecting the instance types
     * of all constructors in the tuple `T`.
     * It maps each constructor `C` in `T` to its `InstanceType<C>`, creates a union
     * of these instance types, and then uses `UnionToIntersection` to get the final
     * intersection type.
     */
    type MixedInstance<T extends readonly fvttUtils.AnyConcreteConstructor[]> =
      T extends readonly fvttUtils.AnyConcreteConstructor[] // Ensure T is an array of constructors
      ? Omit<fvttUtils.UnionToIntersection<InstanceType<T[number]>>, 'schema' | '_source'> // T[number] creates a union of tuple elements
      : never;

    /**
    * Calculates the combined static type by intersecting the types of the
    * constructors themselves (which hold the static members).
    * It creates a union of the constructor types `C` in `T` and then uses
    * `UnionToIntersection` to intersect them.
    */
    type MixedStatic<T extends readonly fvttUtils.AnyConcreteConstructor[]> =
      T extends readonly fvttUtils.AnyConcreteConstructor[] // Ensure T is an array of constructors
      ? Omit<fvttUtils.UnionToIntersection<T[number]>, Immisiciable> // T[number] creates a union of the constructor types
      : never;

    type IsExactly<A, B> = [A] extends [B]
      ? [B] extends [A]
      ? true
      : false
      : false;

    type EnsureTemplates<
      Templates
    > = IsExactly<Templates, SystemDataModel.AnyConstructor[]> extends true ? [] : Templates

    type EnsureSchema<
      Schema
    > = IsExactly<Schema, foundry.data.fields.DataSchema> extends true ? {} : Schema


    type MakeMixin<
      Root extends SystemDataModel.AnyRootConstructor,
      Templates extends SystemDataModel.AnyConstructor[] = [],
    > = Omit<Root, Immisiciable> & typeof SystemDataModel<{}, []> & MixedStatic<Templates> & {
      new <
        Schema extends foundry.data.fields.DataSchema = {},
        NewTemplates extends SystemDataModel.AnyConstructor[] = []
      >(
        ...args: ConstructorParameters<Root>
      ): SystemDataModel<
        fvttUtils.SimpleMerge<
          fvttUtils.RemoveIndexSignatures<EnsureSchema<dnd5e.types.GetSchema<Root>>>,
          fvttUtils.RemoveIndexSignatures<EnsureSchema<Schema>>
        >,
        [...EnsureTemplates<Templates>, ...EnsureTemplates<NewTemplates>]
        // for some reason there are infex sigantures in InstanceType of Root
      > & Omit<fvttUtils.RemoveIndexSignatures<InstanceType<Root>>, RootSchemaDependent>
    }
  }


  /**
   * Metadata structure for SystemDataModel.
   */
  interface Metadata {
    /** Model that represents flags data within the system's namespace. */
    systemFlagsModel?: foundry.abstract.DataModel.AnyConstructor;
    /** Does this model represent an item type that should only exist once on an owning actor? */
    singleton?: boolean;
  }
}

export default SystemDataModel;

// ACTOR


export declare class ActorDataModel<
  Schema extends foundry.data.fields.DataSchema = {},
  Templates extends SystemDataModel.AnyConstructor[] = []
> extends SystemDataModel<
  Schema,
  Templates
> {
  static get metadata(): ActorDataModel.Metadata
  get metadata(): ActorDataModel.Metadata

  /**
    * @override
    */
  get embeddedDescriptionKeyPath(): string;

  /**
   * Other actors that are available for currency transfers from this actor.
   */
  get transferDestinations(): Actor.Implementation[];

  /**
   * Stores derived scale values from items, prepared by _prepareScaleValues.
   * The keys are item identifiers, and values are the corresponding scale values.
   */
  scale: Record<string, any>; // Define 'any' or a specific ScaleValue type if known

  /**
   * Data preparation steps to perform after item data has been prepared, but before active effects are applied.
   */
  prepareEmbeddedData(): void;

  /**
   * Derive any values that have been scaled by the Advancement system.
   * Mutates the value of the `system.scale` object.
   * @protected
   */
  _prepareScaleValues(): void;

  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Actor.
   * @param [options]
   * @param [options.deterministic] Whether to force deterministic values for data properties that could be
   * either a die term or a flat term.
   * @returns The prepared roll data object.
   */
  getRollData(options?: { deterministic?: boolean }): ActorDataModel.RollData<this>;

  /**
   * Reset combat-related uses.
   * @param periods                Which recovery periods should be considered.
   * @param results                Updates to perform on the actor and containing items.
   * @returns A promise that resolves when recovery is complete.
   */
  recoverCombatUses(periods: string[], results: dnd5e.types.CombatRecoveryResults): Promise<void>;
}

declare abstract class AnyActorDataModel extends ActorDataModel<any> {
  constructor(...args: never);
}


export declare namespace ActorDataModel {
  interface Any extends AnyActorDataModel { }
  interface AnyConstructor extends fvttUtils.Identity<typeof ActorDataModel> { }

  type RollData<This> = This & {
    prof: Proficiency
  }

  type Metadata = fvttUtils.SimpleMerge<
    SystemDataModel.Metadata,
    {
      supportsAdvancement: true
    }
  >
}


// ITEM

export declare class ItemDataModel<
  Schema extends foundry.data.fields.DataSchema = {},
  Templates extends SystemDataModel.AnyConstructor[] = []
> extends SystemDataModel<
  Schema,
  Templates
> {
  static ITEM_TOOLTIP_TEMPLATE: string;
  static get metadata(): ItemDataModel.Metadata
  get metadata(): ItemDataModel.Metadata
  /**
     * Modes that can be used when making an attack with this item.
     */
  get attackModes(): dnd5e.types.FormSelectOption[];

  /**
   * Set of abilities that can automatically be associated with this item.
   */
  get availableAbilities(): Set<string> | null;

  /**
   * @override
   */
  get embeddedDescriptionKeyPath(): string;

  /**
   * Scaling increase for this item type.
   */
  get scalingIncrease(): number | null;

  /**
   * Render a rich tooltip for this item.
   * @param [enrichmentOptions={}]   Options for text enrichment.
   * @returns A promise resolving to the tooltip content and classes.
   */
  richTooltip(enrichmentOptions?: TextEditor.EnrichmentOptions): Promise<{ content: string, classes: string[] }>;

  /**
   * Prepare item card template data.
   * @param [options={}]             Options for text enrichment and activity selection.
   * @param [options.activity]       Specific activity on item to use for customizing the data.
   * @returns A promise resolving to the card data object.
   */
  getCardData(options?: TextEditor.EnrichmentOptions & { activity?: dnd5e.types.Activity.Any }): Promise<object>;

  /**
   * Determine the cost to craft this Item.
   * @param [options]
   * @param [options.baseItem="craft"]   Ignore base item if "none". Include full base item gold
   * price if "buy". Include base item craft costs if "craft".
   * @returns A promise resolving to the crafting cost in days and gold.
   */
  getCraftCost(options?: { baseItem?: "buy" | "craft" | "none" }): Promise<{ days: number, gold: number }>;

  /**
   * Prepare item favorite data.
   * @returns A promise resolving to the favorite data object.
   */
  getFavoriteData(): Promise<ItemDataModel.FavoriteData>;

  /**
   * Prepare type-specific data for the Item sheet.
   * @param context   Sheet context data.
   * @returns A promise that resolves when sheet data preparation is complete.
   */
  getSheetData(context: object): Promise<void>; // Use more specific context type if known

  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Item.
   * @param [options]
   * @param [options.deterministic] Whether to force deterministic values for data properties that could be
   * either a die term or a flat term.
   * @returns The prepared roll data object.
   */
  getRollData(options?: { deterministic?: boolean }): ItemDataModel.RollData<this>;
}

declare abstract class AnyItemDataModel extends ItemDataModel<any> {
  constructor(...args: never);
}

export declare namespace ItemDataModel {
  interface Any extends AnyItemDataModel { }
  interface AnyConstructor extends fvttUtils.Identity<typeof ItemDataModel> { }

  type RollData<This> = {
    item: This
  } & ReturnType<Actor.Implementation['getRollData']>

  type Metadata = fvttUtils.SimpleMerge<
    SystemDataModel.Metadata,
    {
      enchantable: boolean,
      inventoryItem: boolean,
      inventoryOrder: number,
      singleton: boolean
    }
  >
  export type FavoriteData = {
    img: string;
    title: string;
    subtitle?: string | string[] | undefined;
    value?: number | undefined;
    quantity?: number | undefined;
    modifier?: string | number | undefined;
    passive?: number | undefined;
    range?: {
      value?: string,
      long?: string | null
    }
    save?: {
      ability?: string,
      dc?: string
    },
    uses?: {
      value?: number,
      max?: number,
      name?: string
    }
    toggle?: boolean;
    suppressed?: boolean | undefined;
  }
}

export declare class SparseDataModel<
  Schema extends foundry.data.fields.DataSchema,
  Parent extends foundry.abstract.DataModel.Any | null = null,
  ExtraConstructorOptions extends fvttUtils.AnyObject = {},
> extends foundry.abstract.DataModel<
  Schema, Parent, ExtraConstructorOptions
> { }