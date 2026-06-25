/**
 * The abstract spine of the dnd5e data-model mirror (+ actor/item variants), re-derived for
 * current fvtt-types.
 *
 * dnd5e composes schemas at runtime two ways, both of which we mirror so downstream patches
 * land exactly where the system composes data:
 *   1. `SystemDataModel.mixin(...templates)` folds each template's `defineSchema()` via
 *      `mergeSchema` (a shallow `Object.assign`) → modeled by {@link SystemDataModel.Mixed}.
 *   2. concrete models override `defineSchema()` and `mergeSchema(super.defineSchema(), {…})`
 *      → modeled by composing `dnd5e.types.MergeSchemas` in each model's `.Schema` alias.
 *
 * Each model carries the real `TypeDataModel` generics `<Schema, Parent, BaseData, DerivedData>`
 * (note our author-facing order is `<Schema, BaseData, DerivedData>`; `Parent` is pinned per
 * layer), inheriting fvtt-types' brand + protected-override + derived-data staging machinery.
 */

type _DataSchema = foundry.data.fields.DataSchema;

/* ============================== SystemDataModel ============================== */

declare class SystemDataModel<
  Schema extends _DataSchema = fvttUtils.EmptyObject,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  Parent extends foundry.abstract.Document.Any = foundry.abstract.Document.Any,
> extends foundry.abstract.TypeDataModel<Schema, Parent, BaseData, DerivedData> {
  /* ---- static config (system-data-model.mjs:28-95) ---- */
  static _enableV10Validation: boolean;
  /** System type this model represents (e.g. `"character"`). Set by concrete subclasses. */
  static _systemType: string;
  /**
   * Base templates used for construction.
   * @internal runtime-private — templates folded by `mixin`.
   */
  static _schemaTemplates: SystemDataModel.AnyConstructor[];
  /** The field names of the base templates used for construction. */
  static get _schemaTemplateFields(): ReadonlySet<string>;
  /** A list of properties that should not be mixed-in to the final type. */
  static readonly _immiscible: ReadonlySet<string>;
  static get metadata(): SystemDataModel.Metadata;
  /** Filters available for this item type when using the compendium browser. */
  static get compendiumBrowserFilters(): dnd5e.types.CompendiumBrowserFilterDefinition;
  static override LOCALIZATION_PREFIXES: string[];

  /** Base implementation returns `{}`; concrete models override with their real schema. */
  static override defineSchema(): _DataSchema;

  /**
   * Merge two schema definitions together as well as possible.
   * @param a  First schema that forms the basis for the merge. **Will be mutated.**
   * @param b  Second schema that will be merged in, overwriting any non-mergeable properties.
   * @returns  Fully merged schema.
   */
  static mergeSchema<A extends _DataSchema, B extends _DataSchema>(a: A, b: B): dnd5e.types.MergeSchemas<A, B>;

  /* ---- template hook stubs (system-data-model.mjs:153-279) ---- */
  /**
   * Performs cleaning without calling DataModel.cleanData.
   * @param source   The source data.
   * @param options  Additional options (see DataModel.cleanData).
   * @param _state   Internal options used during cleaning recursion.
   * @protected
   */
  static _cleanData(source?: fvttUtils.AnyObject, options?: fvttUtils.AnyObject, _state?: fvttUtils.AnyObject): void;
  /**
   * Performs joint validation without calling DataModel.validateJoint.
   * @param data  The source data.
   * @throws      An error if a validation failure is detected.
   * @protected
   */
  static _validateJoint(data: fvttUtils.AnyObject): void;
  /**
   * Performs migration without calling DataModel.migrateData.
   * @param source  The source data.
   * @protected
   */
  static _migrateData(source: fvttUtils.AnyObject): void;
  /**
   * Performs shimming without calling DataModel.shimData.
   * @param data     The source data.
   * @param options  Additional options (see DataModel.shimData).
   * @protected
   */
  static _shimData(data: fvttUtils.AnyObject, options?: fvttUtils.AnyObject): void;

  /** Mix templates into this model — see {@link SystemDataModel.Mixed} (type-position use). */
  static mixin<
    This extends SystemDataModel.AnyConstructor,
    const Templates extends readonly SystemDataModel.AnyConstructor[],
  >(this: This, ...templates: Templates): SystemDataModel.Mixed<This, Templates>;

  /* ---- instance ---- */
  get metadata(): SystemDataModel.Metadata;
  get embeddedDescriptionKeyPath(): string | null;
}

declare abstract class AnySystemDataModel extends SystemDataModel<any, any, any, any> {
  constructor(...args: any[]);
}

declare namespace SystemDataModel {
  interface Any extends AnySystemDataModel {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnySystemDataModel> {}

  interface Metadata {
    systemFlagsModel?: foundry.abstract.DataModel.AnyConstructor | null;
  }

  /** Fold a template tuple's schemas left-to-right (mirrors the `defineSchema` loop). */
  type MergeTemplateSchemas<T extends readonly SystemDataModel.AnyConstructor[]> =
    T extends readonly [
      infer Head extends SystemDataModel.AnyConstructor,
      ...infer Tail extends readonly SystemDataModel.AnyConstructor[],
    ]
      ? dnd5e.types.MergeSchemas<dnd5e.types.GetSchema<Head>, MergeTemplateSchemas<Tail>>
      : fvttUtils.EmptyObject;

  /**
   * The schema a `.mixin(...templates)` adds, recoverable for downstream composition.
   * (The declaration chain composes via each model's `.Schema` alias rather than `extends`-ing
   * a mixin result, which sidesteps the dual-construct-signature pitfall — so this is exposed
   * for type-position use, e.g. `dnd5e.types.MergeSchemas<MySchema, SystemDataModel.MixedSchema<...>>`.)
   */
  type MixedSchema<
    This extends SystemDataModel.AnyConstructor,
    Templates extends readonly SystemDataModel.AnyConstructor[],
  > = dnd5e.types.MergeSchemas<dnd5e.types.GetSchema<This>, MergeTemplateSchemas<Templates>>;

  /**
   * Type of a `.mixin(...templates)` result: a subclass of `This`. Schema augmentation is
   * surfaced via {@link MixedSchema}; the instance keeps `This`'s shape so the result stays a
   * cleanly extendable, single-construct-signature class type.
   */
  type Mixed<
    This extends SystemDataModel.AnyConstructor,
    Templates extends readonly SystemDataModel.AnyConstructor[],
  > = This & {
    new (...args: ConstructorParameters<typeof AnySystemDataModel>): InstanceType<This>;
  };
}

export default SystemDataModel;

/* ============================== ActorDataModel ============================== */

export declare class ActorDataModel<
  Schema extends _DataSchema = fvttUtils.EmptyObject,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  // Parent pinned to abstract `Document.Any`, NOT `Actor.Implementation` — same cycle-break as
  // `ItemDataModel` below: an actor model IS its document's `.system`, so a concrete parent loops
  // `Actor.Implementation → Actor.system → <subtype> → this` and trips tsc's recursion limiter at
  // scale (tsgo tolerates it; tsc emits false-positive circularity past ~18 source files).
> extends SystemDataModel<Schema, BaseData, DerivedData, foundry.abstract.Document.Any> {
  static override get metadata(): ActorDataModel.Metadata;
  override get metadata(): ActorDataModel.Metadata;
  override get embeddedDescriptionKeyPath(): string;

  /** Derived scale values, populated by `_prepareScaleValues` (actor-data-model.mjs). */
  scale: Record<string, dnd5e.types.AdvancementScaleValue>;

  /** Section of the group sheet this actor will render within. */
  get groupSection(): string;

  /** Other actors that are available for currency transfers from this actor. */
  get transferDestinations(): globalThis.Actor.Implementation[];

  /** Data preparation steps to perform after item data has been prepared, but before active effects are applied. */
  prepareEmbeddedData(): void;

  /** Derive any values that have been scaled by the Advancement system. Mutates `system.scale`. */
  protected _prepareScaleValues(): void;

  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Actor.
   * @param options
   * @returns Roll data for this actor.
   */
  getRollData(options?: { deterministic?: boolean }): ActorDataModel.RollData<this>;

  /**
   * Reset combat-related uses.
   * @param periods  Which recovery periods should be considered.
   * @param results  Updates to perform on the actor and containing items.
   */
  recoverCombatUses(
    periods: string[],
    results: dnd5e.types.documents.CombatRecoveryResults,
  ): Promise<void>;
}

declare abstract class AnyActorDataModel extends ActorDataModel<any, any, any> {
  constructor(...args: any[]);
}

export declare namespace ActorDataModel {
  interface Any extends AnyActorDataModel {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyActorDataModel> {}

  interface Metadata extends SystemDataModel.Metadata {
    supportsAdvancement: boolean;
  }

  type RollData<This extends object> = fvttUtils.InterfaceToObject<
    This & { prof: import("../../../documents/actor/proficiency.mjs").default }
  >;
}

/* ============================== ItemDataModel ============================== */

export declare class ItemDataModel<
  Schema extends _DataSchema = fvttUtils.EmptyObject,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  // Parent is pinned to `Document.Any`, NOT `Item.Implementation`, on purpose: an item model is its
  // document's registered `.system`, so referencing the concrete `Item` here makes any EAGER
  // evaluation of the model (e.g. the `.mixin(...)` result) loop back through
  // `Item.Implementation → Item.system → <subtype> → this`. Keeping the parent abstract is exactly
  // how the reference types break the item-contains-item cycle. (`this.parent` widens to a Document.)
> extends SystemDataModel<Schema, BaseData, DerivedData, foundry.abstract.Document.Any> {
  static override get metadata(): ItemDataModel.Metadata;

  /** The handlebars template for rendering item tooltips. */
  static ITEM_TOOLTIP_TEMPLATE: string;

  /**
   * Handle any specific item changes when an item is dropped onto an actor.
   * @param event     The concluding DragEvent which provided the drop data.
   * @param actor     Actor onto which the item was dropped.
   * @param itemData  The item data requested for creation. Will be mutated.
   */
  static onDropCreate(event: DragEvent, actor: globalThis.Actor.Implementation, itemData: object): void;

  override get metadata(): ItemDataModel.Metadata;
  override get embeddedDescriptionKeyPath(): string;

  /** Can this item's advancement level be taken from an associated class? */
  get advancementClassLinked(): boolean;

  /** The level at which this item's advancement is applied. */
  get advancementLevel(): number;

  /** The item that is ultimately responsible for adding this item through the advancement system. */
  get advancementRootItem(): globalThis.Item.Implementation | void;

  /** Whether this item's activities can have scaling configured for their consumption. */
  get canConfigureScaling(): boolean;

  /** Whether this item's activities should prompt for scaling when used. */
  get canScale(): boolean;

  /** Whether this item's activities can have scaling configured for their damage. */
  get canScaleDamage(): boolean;

  /** Modes that can be used when making an attack with this item. */
  get attackModes(): foundry.applications.fields.FormSelectOption[];

  /** Set of abilities that can automatically be associated with this item. */
  get availableAbilities(): Set<string> | null;

  /** Scaling increase for this item type. */
  get scalingIncrease(): number | null;

  /** Parts making up the subtitle on the item's tooltip. */
  get tooltipSubtitle(): string[];

  prepareBaseData(): void;

  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Item.
   * @param options
   * @returns Roll data for this item.
   */
  getRollData(options?: { deterministic?: boolean }): ItemDataModel.RollData<this>;

  /**
   * Render a rich tooltip for this item.
   * @param enrichmentOptions  Options for text enrichment.
   */
  richTooltip(
    enrichmentOptions?: foundry.applications.ux.TextEditor.EnrichmentOptions,
  ): Promise<{ content: string; classes: string[] }>;

  /**
   * Prepare item card template data.
   * @param enrichmentOptions  Options for text enrichment (may include `activity`).
   */
  getCardData(enrichmentOptions?: fvttUtils.AnyObject): Promise<fvttUtils.AnyObject>;

  /**
   * Determine the cost to craft this Item.
   * @param options
   * @param options.baseItem  Ignore base item if `"none"`, include full base item gold price if
   *                          `"buy"`, include base item craft costs if `"craft"`.
   */
  getCraftCost(options?: { baseItem?: "buy" | "craft" | "none" }): Promise<{ days: number; gold: number }>;

  /** Prepare item favorite data. */
  getFavoriteData(): Promise<dnd5e.types.data.abstract.FavoriteData5e>;

  /**
   * Prepare type-specific data for the Item sheet.
   * @param context  Sheet context data.
   */
  getSheetData(context: fvttUtils.AnyObject): Promise<void>;
}

declare abstract class AnyItemDataModel extends ItemDataModel<any, any, any> {
  constructor(...args: any[]);
}

export declare namespace ItemDataModel {
  interface Any extends AnyItemDataModel {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyItemDataModel> {}

  interface Metadata extends SystemDataModel.Metadata {
    /**
     * Only for physical items. When fetching item as gear from an NPC, prefer the compendium
     * source over the embedded version.
     */
    compendiumGearSource: boolean;
    enchantable: boolean;
    hasEffects: boolean;
    singleton: boolean;
    /** Configuration for displaying this item type in its own section in creature inventories. */
    inventory?: dnd5e.types.applications.components.InventorySectionDescriptor;
  }

  type RollData<This> = fvttUtils.InterfaceToObject<{ item: This }>;

  /* ---- proper `ItemDataModel.mixin(...)` representation (see {@link ItemDataModelMixin}) ---- */

  /**
   * Instance members a template ADDS: its full instance minus `DataModel` base members and minus
   * its own schema fields (those arrive via the merged `Schema`). Leaves exactly the template's
   * methods/getters, and — crucially — holds no `Item.system` schema reference, so intersecting it
   * does not re-enter the item-contains-item cycle.
   */
  type TemplateInstance<T extends dnd5e.types.fields.AnyDataModelConstructor> = Omit<
    fvttUtils.FixedInstanceType<T>,
    keyof foundry.abstract.DataModel.Any | keyof dnd5e.types.InitializedOf<dnd5e.types.fields.SchemaOf<T>>
  >;

  /**
   * Keys the runtime `mixin` NEVER copies from a template's static side (`SystemDataModel._immiscible`
   * plus the intrinsic constructor members). Notably `defineSchema`/`mergeSchema` — each template's
   * `defineSchema` returns ITS OWN schema, so mixing them would force the concrete model's
   * `defineSchema` to be assignable to every template's (it isn't, e.g. `container` narrows `quantity`).
   */
  type ImmiscibleStaticKey =
    | "defineSchema"
    | "mergeSchema"
    | "schema"
    | "cleanData"
    | "_cleanData"
    | "validateJoint"
    | "_validateJoint"
    | "migrateData"
    | "_migrateData"
    | "shimData"
    | "_shimData"
    | "mixin"
    | "prototype"
    | "name"
    | "length";

  /** Static members a template ADDS (drops the construct signature, immiscible keys, and protected statics). */
  type TemplateStatics<T extends dnd5e.types.fields.AnyDataModelConstructor> = Omit<
    Pick<T, keyof T>,
    ImmiscibleStaticKey
  >;

  /** Every mixed template's instance methods, intersected (homomorphic tuple map → union → AND). */
  type MixedInstance<Templates extends readonly dnd5e.types.fields.AnyDataModelConstructor[]> =
    fvttUtils.UnionToIntersection<{ [K in keyof Templates]: TemplateInstance<Templates[K]> }[number]>;

  /** Every mixed template's statics, intersected. */
  type MixedStatics<Templates extends readonly dnd5e.types.fields.AnyDataModelConstructor[]> =
    fvttUtils.UnionToIntersection<{ [K in keyof Templates]: TemplateStatics<Templates[K]> }[number]>;

  /**
   * Type of a real `ItemDataModel.mixin(...templates)` result — what the runtime produces by copying
   * BOTH static and instance members of every template onto a fresh `ItemDataModel` subclass. A
   * single-construct, extendable class type that surfaces, in one shape:
   *   - the merged schema + derived overlay  → `ItemDataModel<Schema, BaseData, DerivedData>`
   *   - every template's INSTANCE methods    → {@link MixedInstance}
   *   - `ItemDataModel`'s own statics        → `Pick<typeof ItemDataModel, …>`
   *   - every template's STATICS             → {@link MixedStatics}
   */
  type Mix<
    Schema extends _DataSchema,
    BaseData extends fvttUtils.AnyObject,
    DerivedData extends fvttUtils.AnyObject,
    Templates extends readonly dnd5e.types.fields.AnyDataModelConstructor[],
  > = (new (...args: any[]) => ItemDataModel<Schema, BaseData, DerivedData> & MixedInstance<Templates>) &
    // `Identity<typeof ItemDataModel>` (NOT `Pick<…, keyof …>`) preserves the exact static shape that
    // makes the result a valid `DataModel.AnyConstructor` for registration — a `Pick` projection drops
    // enough that fvtt-types' `ValidDataModel` constraint rejects it. Mirrors the reference types'
    // `ConcreteImmiscible` carrier.
    fvttUtils.Identity<typeof ItemDataModel> &
    MixedStatics<Templates>;
}

/**
 * Declarations-only carrier for the runtime `ItemDataModel.mixin(...templates)`. Use the
 * instantiation-expression + `extends` idiom so the subclass inherits the full mixin surface
 * (schema, derived overlay, template instance methods, and ItemDataModel + template statics):
 *
 * ```ts
 * declare const Loot_base: ReturnType<typeof ItemDataModelMixin<
 *   LootData.Schema, LootData.Base, LootData.Derived, dnd5e.types.Item.Loot.Templates
 * >>;
 * declare class LootData extends Loot_base { static override defineSchema(): LootData.Schema; }
 * ```
 */
export declare function ItemDataModelMixin<
  Schema extends _DataSchema = fvttUtils.EmptyObject,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  Templates extends readonly dnd5e.types.fields.AnyDataModelConstructor[] = [],
>(...templates: Templates): ItemDataModel.Mix<Schema, BaseData, DerivedData, Templates>;

/**
 * Variant of {@link ItemDataModelMixin} that DROPS the named instance keys from the mixed surface,
 * so the subtype class body can re-declare them with an otherwise-illegal (e.g. widened) override.
 * Needed by `container`, which widens `totalWeight` to `number | Promise<number>` (a `Promise` when
 * the container lives in a compendium) — an override TS would reject against the base's `number`.
 * Conformance to `DataModel.AnyConstructor` is preserved via `Identity<typeof ItemDataModel>`.
 */
export type ItemDataModelMixinOmit<
  Schema extends _DataSchema,
  BaseData extends fvttUtils.AnyObject,
  DerivedData extends fvttUtils.AnyObject,
  Templates extends readonly dnd5e.types.fields.AnyDataModelConstructor[],
  OmitKeys extends PropertyKey,
> = (new (
  ...args: any[]
) => Omit<ItemDataModel<Schema, BaseData, DerivedData> & ItemDataModel.MixedInstance<Templates>, OmitKeys>) &
  fvttUtils.Identity<typeof ItemDataModel> &
  ItemDataModel.MixedStatics<Templates>;
