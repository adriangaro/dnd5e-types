/**
 * TypedCollectionField — the polymorphic, expandable, id-keyed collection primitive used by
 * activities and advancements (an Item holds a map of heterogeneous DataModel subtypes keyed
 * by random id, discriminated by `type`).
 *
 * Built on the Seam-A registry engine: given a registry `Reg` (a `Record<typeKey, DataModel
 * constructor>` produced by `MergeOverrideDefinition`), it derives the discriminated SOURCE and
 * INSTANCE unions and an `ObjectField` whose entries are `Record<id, union>`.
 *
 * IMPORTANT (hard-won): the union MUST be computed with MAPPED TYPES over the registry
 * (`{ [K in keyof Reg]: … }`). The seemingly-equivalent `MappingField<TypedSchemaField<Reg>>`
 * COLLAPSES the union to `{}` — reading a field's initialized-data brand through a constrained
 * generic `Element` parameter does not resolve the lazily-computed union. Mapped types over the
 * registry distribute correctly; brand-property access on a generic does not.
 */

declare global {
  namespace dnd5e.types.fields {
    /**
     * Any constructor that exposes a `defineSchema` — broad enough to also accept MIXED document
     * classes (`ActivityMixin(DataModel)`), which lose protected statics like `_schema` through the
     * mixin and so don't satisfy the strict `DataModel.AnyConstructor`. We read the schema from
     * `defineSchema` directly (see {@link SchemaOf}) rather than via `DataModel.SchemaOfClass`.
     */
    type AnyDataModelConstructor = (abstract new (...args: any[]) => foundry.abstract.DataModel.Any) & {
      defineSchema(): foundry.data.fields.DataSchema;
    };

    /** A registry of model/document subtype constructors keyed by their string `type`. */
    type ModelRegistry = Record<string, dnd5e.types.fields.AnyDataModelConstructor>;

    /** A registered constructor's schema, via its `defineSchema` return (index signatures stripped). */
    type SchemaOf<T extends dnd5e.types.fields.AnyDataModelConstructor> =
      fvttUtils.RemoveIndexSignatures<ReturnType<T["defineSchema"]>> extends infer S extends
        foundry.data.fields.DataSchema
        ? S
        : never;

    /** Discriminated union of every registered subtype's SOURCE (`_source`) shape. */
    type RegistrySource<
      Reg extends dnd5e.types.fields.ModelRegistry,
      K extends string = dnd5e.types.ExtractKeys<Reg>,
    > = { [P in K]: dnd5e.types.SourceOf<dnd5e.types.fields.SchemaOf<Reg[P]>> }[K];

    /** Discriminated union of every registered subtype's INSTANCE (initialized + mixin behavior). */
    type RegistryInstance<
      Reg extends dnd5e.types.fields.ModelRegistry,
      K extends string = dnd5e.types.ExtractKeys<Reg>,
    > = { [P in K]: fvttUtils.FixedInstanceType<Reg[P]> }[K];

    /**
     * The id-keyed collection FIELD. SOURCE = `Record<id, RegistrySource>`, INITIALIZED =
     * `Record<id, RegistryInstance>`. (Consumers usually overlay the initialized read type with a
     * `Collection<Instance>` via Seam-D, since the runtime `initialize()` returns a Collection.)
     */
    type TypedCollectionField<
      Reg extends dnd5e.types.fields.ModelRegistry,
      Keys extends string = string,
    > = foundry.data.fields.ObjectField<
      dnd5e.types.fields.MappingField.DefaultOptions,
      Record<Keys, dnd5e.types.fields.RegistrySource<Reg>>,
      Record<Keys, dnd5e.types.fields.RegistryInstance<Reg>>,
      Record<Keys, dnd5e.types.fields.RegistrySource<Reg>>
    >;
  }
}

export {};
