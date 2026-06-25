/**
 * A DataModel that represents a spellcasting method.
 *
 * NOT a document subtype: these are standalone `foundry.abstract.DataModel`s that back the
 * `CONFIG.DND5E.spellcasting` registry (instantiated by `SpellcastingModel.fromConfig()`), with linear
 * inheritance `SpellcastingModel → SlotSpellcasting → SingleLevelSpellcasting | MultiLevelSpellcasting`.
 * Each level's schema = the parent schema (`...super.defineSchema()`) plus its own fields; modeled with
 * `dnd5e.types.MergeSchemas`. Seam-D `OverrideSchema` hooks are folded per class for downstream schema
 * expansion. Cross-doc refs (Actor5e/Item5e) use the configured globals; `SpellcastingDescription` is
 * loose pending its port.
 */

type _DataSchema = foundry.data.fields.DataSchema;

declare global {
  namespace dnd5e.types.Spellcasting {
    namespace SpellcastingModel {
      interface OverrideSchema extends _DataSchema {}
    }
    namespace SlotSpellcasting {
      interface OverrideSchema extends _DataSchema {}
    }
    namespace SingleLevelSpellcasting {
      interface OverrideSchema extends _DataSchema {}
    }
    namespace MultiLevelSpellcasting {
      interface OverrideSchema extends _DataSchema {}
    }

    /* ---------------------------------------------------------------------- */
    /*  Method-class registry (Seam A) — the runtime `SpellcastingModel.TYPES` */
    /* ---------------------------------------------------------------------- */
    /**
     * Registry of spellcasting METHOD-CLASS `type` ⇒ model constructor, mirroring the activity /
     * advancement registries. The key is the `config.type` value `fromConfig()` looks up
     * (`this.TYPES[config.type ?? "base"]`), NOT the per-class `TYPE` getter — note `base` maps to
     * `SpellcastingModel` whose `TYPE` is `"none"`. To register a custom method class, merge
     * `dnd5e.types.Spellcasting.OverrideTypes`:
     *
     * ```ts
     * declare global { namespace dnd5e.types.Spellcasting {
     *   interface OverrideTypes { pact: typeof MyPactSpellcasting }
     * } }
     * ```
     *
     * (Distinct from the `CONFIG.DND5E.spellcasting` METHOD registry — the keyed config of concrete
     * methods like `leveled`/`pact`, each selecting one of these classes via its `type`. That lands
     * with the CONFIG.DND5E domains.)
     */
    interface DefaultTypes {
      base: typeof import("./spellcasting-model.mjs").SpellcastingModel;
      single: typeof import("./spellcasting-model.mjs").SingleLevelSpellcasting;
      multi: typeof import("./spellcasting-model.mjs").MultiLevelSpellcasting;
    }
    interface OverrideTypes extends Record<string, dnd5e.types.fields.AnyDataModelConstructor | never> {}

    type Types = dnd5e.types.MergeOverrideDefinition<
      dnd5e.types.Spellcasting.DefaultTypes,
      dnd5e.types.Spellcasting.OverrideTypes
    >;
    type TypeKey = dnd5e.types.ExtractKeys<dnd5e.types.Spellcasting.Types>;

    /** The model CONSTRUCTOR registered for a method-class key. */
    type ModelFor<T extends dnd5e.types.Spellcasting.TypeKey = dnd5e.types.Spellcasting.TypeKey> =
      dnd5e.types.Spellcasting.Types[T];
    /** The model INSTANCE for a method-class key. */
    type InstanceOf<T extends dnd5e.types.Spellcasting.TypeKey = dnd5e.types.Spellcasting.TypeKey> =
      fvttUtils.FixedInstanceType<dnd5e.types.Spellcasting.Types[T]>;
    /** Union of every registered method-class instance. */
    type Instance = dnd5e.types.fields.RegistryInstance<dnd5e.types.Spellcasting.Types>;
  }
}

/* ============================== SpellcastingModel ============================== */

export declare class SpellcastingModel<
  Schema extends _DataSchema = SpellcastingModel.Schema,
> extends foundry.abstract.DataModel<Schema, null, { key?: string }> {
  static override defineSchema(): SpellcastingModel.Schema;

  /** Available spellcasting method classes, keyed by registry `type` (see {@link dnd5e.types.Spellcasting.Types}). */
  static get TYPES(): dnd5e.types.Spellcasting.Types;
  /** The spellcasting method type discriminator. */
  static get TYPE(): dnd5e.types.data.spellcasting.SpellcastingMethodType;

  /** The internal key of the spellcasting method. */
  get key(): string;

  /** Initialize data models from global config (`CONFIG.DND5E.spellcasting`). */
  static fromConfig(): void;

  /** Human-readable label for this spellcasting method. */
  getLabel(options?: { level?: number; format?: "long" | "short" }): string;
}

export declare namespace SpellcastingModel {
  /** Base spellcasting schema (`defineSchema`). */
  type BaseSchema = {
    img: foundry.data.fields.FilePathField<{ required: true; categories: ["IMAGE"] }>;
    label: foundry.data.fields.StringField<{ required: true }>;
    order: foundry.data.fields.NumberField<{ required: true; integer: true; nullable: false }>;
    type: foundry.data.fields.StringField<{ required: true; readonly: true }, dnd5e.types.data.spellcasting.SpellcastingMethodType>;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.Spellcasting.SpellcastingModel.OverrideSchema
  >;
}

/* ============================== SlotSpellcasting ============================== */

export declare class SlotSpellcasting<
  Schema extends _DataSchema = SlotSpellcasting.Schema,
> extends SpellcastingModel<Schema> {
  static override defineSchema(): SlotSpellcasting.Schema;

  /** Are spell slots recovered on a long rest? */
  get isLR(): boolean;
  /** Are spell slots recovered on a short rest? */
  get isSR(): boolean;
  /** Rest types that fully restore this method's spell slots. */
  get recovery(): Set<string>;
  /** Whether this spellcasting method provides spell slots. */
  get slots(): boolean;

  /** Slots made available at the given (adjusted) character level → slot level ⇒ count. */
  calculateSlots(level: number): Record<number, number>;
  /** Contribute to the actor's spellcasting progression. */
  computeProgression(
    progression: object,
    actor: Actor.Implementation | void,
    cls?: globalThis.Item.OfType<"class">,
    spellcasting?: object,
    count?: number,
  ): void;
  /** Available preparable levels when treated as a single-classed caster (ascending). */
  getAvailableLevels(actor: Actor.Implementation): number[];
  /** Internal actor-model key for spell slots provided by this method. */
  getSpellSlotKey(level?: number): string;
  /** Prepare slots provided by this method (mutates `spells`). */
  prepareSlots(spells: object, actor: Actor.Implementation | null, progression: object): void;
}

export declare namespace SlotSpellcasting {
  type BaseSchema = dnd5e.types.MergeSchemas<
    SpellcastingModel.Schema,
    {
      cantrips: foundry.data.fields.BooleanField;
      exclusive: foundry.data.fields.SchemaField<{
        slots: foundry.data.fields.BooleanField;
        spells: foundry.data.fields.BooleanField;
      }>;
      prepares: foundry.data.fields.BooleanField;
      progression: foundry.data.fields.TypedObjectField<
        foundry.data.fields.SchemaField<{
          divisor: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; positive: true }>;
          label: foundry.data.fields.StringField<{ required: true }>;
          roundUp: foundry.data.fields.BooleanField;
        }>
      >;
    }
  >;

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.Spellcasting.SlotSpellcasting.OverrideSchema
  >;
}

/* ========================= SingleLevelSpellcasting ========================= */

export declare class SingleLevelSpellcasting<
  Schema extends _DataSchema = SingleLevelSpellcasting.Schema,
> extends SlotSpellcasting<Schema> {
  static override defineSchema(): SingleLevelSpellcasting.Schema;

  /** @override */
  static override get TYPE(): "single";

  /** Whether this method only provides a single level of spell slots. */
  get isSingleLevel(): boolean;
}

export declare namespace SingleLevelSpellcasting {
  type BaseSchema = dnd5e.types.MergeSchemas<
    SlotSpellcasting.Schema,
    {
      table: foundry.data.fields.TypedObjectField<
        foundry.data.fields.SchemaField<{
          slots: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; positive: true }>;
          level: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; positive: true }>;
        }>
      >;
    }
  >;

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.Spellcasting.SingleLevelSpellcasting.OverrideSchema
  >;
}

/* ========================= MultiLevelSpellcasting ========================= */

export declare class MultiLevelSpellcasting<
  Schema extends _DataSchema = MultiLevelSpellcasting.Schema,
> extends SlotSpellcasting<Schema> {
  static override defineSchema(): MultiLevelSpellcasting.Schema;

  /** @override */
  static override get TYPE(): "multi";
}

export declare namespace MultiLevelSpellcasting {
  type BaseSchema = dnd5e.types.MergeSchemas<
    SlotSpellcasting.Schema,
    {
      table: foundry.data.fields.ArrayField<
        foundry.data.fields.ArrayField<
          foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; positive: true }>
        >
      >;
    }
  >;

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.Spellcasting.MultiLevelSpellcasting.OverrideSchema
  >;
}
