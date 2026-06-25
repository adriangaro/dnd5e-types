/**
 * Expandability core — the kernel behind Seam A (open keyed config records) and the
 * shared `dnd5e.types` namespace. Deliberately small: the heavy lifting (source vs
 * initialized, derived merging) is done by fvtt-types' own `SchemaField.*` helpers and
 * plain intersection, not by hand-rolled deep-merge machinery.
 *
 * Depends on the global `fvttUtils` bridge established in `../index.d.mts`.
 */

declare global {
  namespace dnd5e.types {
    /** Flattens a mapped/intersection type for nicer display. */
    type PrettifyType<T> = {
      [K in keyof T]: T[K];
    } & {};

    /** Public re-export of fvtt-types' index-signature stripper (keeps only literal keys). */
    type RemoveIndexSignatures<T extends object> = fvttUtils.RemoveIndexSignatures<T>;

    /** Drops props whose value is `never` (so a `never` override deletes a key). */
    type FilterNever<T> = {
      [K in keyof T as [T[K]] extends [never] ? never : K]: T[K];
    };

    /**
     * Literal keys of `_T` whose value is not `never`, after stripping index signatures.
     * The basis of every domain `TypeKey`.
     */
    type ExtractKeys<_T extends object, T = fvttUtils.RemoveIndexSignatures<_T>> = {
      [K in keyof T]: [T[K]] extends [never] ? never : K;
    }[keyof T];

    /**
     * Seam A engine: merges a closed `DefaultTypes` map with an open `OverrideTypes`
     * map, dropping index signatures and `never` entries so the result is a clean
     * literal-keyed record. Downstream modules merge a key into `OverrideTypes` to widen
     * the corresponding `Types`/`TypeKey`.
     */
    type MergeOverrideDefinition<
      T extends object,
      U extends object,
      Ret extends object = fvttUtils.SimpleMerge<
        fvttUtils.RemoveIndexSignatures<T>,
        fvttUtils.RemoveIndexSignatures<U>
      >,
    > = {
      [K in ExtractKeys<Ret>]: Ret[K];
    };

    /**
     * The canonical Seam-A convention every open record follows. Not used directly —
     * documents the five fixed names a domain namespace must expose:
     *
     * ```ts
     * namespace Skill {
     *   interface DefaultTypes { acr: true; ani: true; }
     *   interface OverrideTypes extends Record<string, boolean | never> {} // downstream merge point
     *   type Types   = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
     *   type TypeKey = dnd5e.types.ExtractKeys<Types>;
     *   interface Config { label: string; }
     * }
     * ```
     */
    type ExpandableEnum<DefaultTypes extends object, OverrideTypes extends object> =
      MergeOverrideDefinition<DefaultTypes, OverrideTypes>;

    /**
     * Reverse lookup over a key→value map: the union of keys whose value is assignable to `Value`.
     * Used to query relationship maps, e.g. `FindKeyByValue<WeaponProficiency.WeaponMap, "mar">`
     * → every weapon id mapped to the martial group.
     */
    type FindKeyByValue<Map extends Record<PropertyKey, any>, Value> = {
      [K in keyof Map]: Map[K] extends Value ? K : never;
    }[keyof Map];

    /**
     * Override specific fields of `Base` with `Own`, where `Own`'s types are NOT assignable to
     * `Base`'s (so plain `interface Child extends Base` would error). `Own` wins on shared keys.
     *
     * This is the ESCAPE HATCH for the rare incompatible-override case — the cleaner-than-`MakeX`
     * replacement for the old generic threading. The DEFAULT for config hierarchies is still plain
     * `interface Child extends Parent` (propagating + augmentable + handles compatible narrowing);
     * reach for `Override` only when a child must redefine a parent field to an unrelated type.
     *
     * To keep a `Override`-based child augmentable, pair it with a dedicated seam interface:
     * ```ts
     * interface FooOverrides {}                               // consumer merge point
     * type Foo = dnd5e.types.Override<Base, { k: NewType }> & FooOverrides;
     * ```
     */
    type Override<Base extends object, Own extends object> = fvttUtils.PrettifyType<
      Omit<Base, keyof Own> & Own
    >;
  }
}

export {};
