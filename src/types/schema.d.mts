/**
 * Schema helpers — composition (Seam D) and convenient source/initialized aliases.
 *
 * dnd5e's runtime `SystemDataModel.mergeSchema` is a SHALLOW `Object.assign`, and template
 * composition happens by spreading field bundles into one `SchemaField`. So at the type
 * level we compose schemas with plain interface extension and override conflicting keys
 * with this small SHALLOW helper — no deep recursive merge. Derived data is layered on the
 * INITIALIZED type via intersection (see the actor models), which both adds derived props
 * and narrows nullable source fields (e.g. `hp.max: number | null` → `number`).
 */

declare global {
  namespace dnd5e.types {
    /**
     * The composition primitive: shallow, top-level "last wins" merge of two schemas —
     * mirrors dnd5e's runtime `SystemDataModel.mergeSchema` (`Object.assign`). Index
     * signatures are stripped from both operands so open downstream interfaces never leak
     * `string` keys, and a `never` value in `B` deletes the key. This is how every model in
     * the mirror composes its `defineSchema()` from field bundles + its own additions.
     */
    type MergeSchemas<
      A extends foundry.data.fields.DataSchema,
      B extends foundry.data.fields.DataSchema,
    > = dnd5e.types.PrettifyType<
      Omit<fvttUtils.RemoveIndexSignatures<A>, keyof fvttUtils.RemoveIndexSignatures<B>> &
        dnd5e.types.FilterNever<fvttUtils.RemoveIndexSignatures<B>>
    >;

    /**
     * Recover a DataModel CLASS's schema from its `static defineSchema()` return, via the
     * upstream-blessed `DataModel.SchemaOfClass`. The mirror derives every model's read/source
     * shapes from this, so the schema flows from the (mirrored) `defineSchema` exactly as the
     * runtime composes it. Index signatures are stripped to keep downstream merges precise.
     */
    type GetSchema<T extends foundry.abstract.DataModel.AnyConstructor> =
      foundry.abstract.DataModel.SchemaOfClass<T> extends infer S extends foundry.data.fields.DataSchema
        ? fvttUtils.RemoveIndexSignatures<S> extends infer C extends foundry.data.fields.DataSchema
          ? C
          : never
        : never;

    /**
     * Narrow specific keys of an already-derived object to their non-null form — the single
     * idiomatic way a derived overlay expresses "prepareData guarantees this field is set".
     * Because `T[P]` is read from the source-derived type (never re-typed by hand), renaming or
     * removing the underlying schema field breaks loudly here instead of silently leaving a
     * phantom key — i.e. this is desync-resistant by construction.
     */
    type NonNullableProps<T, K extends keyof T> = dnd5e.types.PrettifyType<
      Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
    >;

    /**
     * Index-signature-safe shallow merge of two *data* objects (not schemas) — the derived-data
     * analogue of {@link MergeSchemas}. Used to fold Seam-D `OverrideBase`/`OverrideDerived` into a
     * model's intrinsic derived overlays. Both operands have index signatures stripped first, so an
     * open downstream hook (`interface OverrideDerived extends fvttUtils.AnyObject {}`) can't wipe
     * the base keys via `Omit<…, string>` (a `never` value in `B` still deletes its key).
     */
    type MergeData<A extends object, B extends object> = dnd5e.types.PrettifyType<
      Omit<fvttUtils.RemoveIndexSignatures<A>, keyof fvttUtils.RemoveIndexSignatures<B>> &
        dnd5e.types.FilterNever<fvttUtils.RemoveIndexSignatures<B>>
    >;

    /**
     * Shallow-merge an override schema onto a base schema (Seam D). Keys in `Override`
     * replace same-named keys in `Base`; an `Override` value of `never` DELETES the key.
     * Index signatures are stripped from `Override` so an open downstream merge point
     * (`interface OverrideSchema extends foundry.data.fields.DataSchema {}`) never leaks
     * `string` keys into the result.
     *
     * Mirrors runtime `Object.assign` semantics exactly.
     */
    type ApplyOverrideSchema<
      Base extends foundry.data.fields.DataSchema,
      Override extends foundry.data.fields.DataSchema,
      O extends foundry.data.fields.DataSchema = fvttUtils.RemoveIndexSignatures<Override>,
    > = dnd5e.types.PrettifyType<
      Omit<Base, keyof O> & dnd5e.types.FilterNever<O>
    >;

    /** `_source` / `toObject()` shape of a schema. */
    type SourceOf<Schema extends foundry.data.fields.DataSchema> =
      foundry.data.fields.SchemaField.SourceData<Schema>;

    /** Initialized (read) shape of a schema, before dnd5e's derived overlay. */
    type InitializedOf<Schema extends foundry.data.fields.DataSchema> =
      foundry.data.fields.SchemaField.InitializedData<Schema>;

    /** Constructor / `.create()` input shape of a schema (nullish keys auto-optional). */
    type CreateOf<Schema extends foundry.data.fields.DataSchema> =
      foundry.data.fields.SchemaField.CreateData<Schema>;

    /**
     * The type reached by walking dotted object path `P` within `T` (e.g.
     * `PathValue<Actor.Implementation, "system.attributes.hp">`). Distributes over unions and
     * resolves to `never` when a segment is absent. Object keys only — array/tuple index segments
     * are not resolved (config render-context paths never need them).
     */
    type PathValue<T, P extends string> = P extends `${infer Key}.${infer Rest}`
      ? PathValue<fvttUtils.GetKey<T, Key>, Rest>
      : fvttUtils.GetKey<T, P>;
  }
}

export {};
