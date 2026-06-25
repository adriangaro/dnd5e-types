/**
 * The abstract spine of the dnd5e data-model mirror, re-derived for current fvtt-types. The
 * actor/item variants live alongside in `actor-data-model.d.mts` / `item-data-model.d.mts`.
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
