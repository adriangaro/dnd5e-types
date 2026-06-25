/**
 * Type-level tests for the kernel. Validated by `tsc` / `tsgo` (a failing assertion is a
 * compile error). Guards the foundations of the four expandability seams.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";

/* ========================================================================== *
 *  Seam A core — ExtractKeys / MergeOverrideDefinition / RemoveIndexSignatures
 * ========================================================================== */

// ExtractKeys keeps literal keys and drops `never`-valued ones.
{
  type T = { a: true; b: true; c: never };
  type _ = Expect<Equal<dnd5e.types.ExtractKeys<T>, "a" | "b">>;
}

// RemoveIndexSignatures strips the open `string` index, keeping literals.
{
  type T = { a: true; b: 1 } & Record<string, unknown>;
  type _ = Expect<Equal<keyof dnd5e.types.RemoveIndexSignatures<T>, "a" | "b">>;
}

// R2 PURITY (load-bearing): an open `OverrideTypes extends Record<string, boolean | never>`
// must NOT leak `string` into the merged key union.
{
  interface DefaultTypes {
    acr: true;
    ani: true;
  }
  interface OverrideTypes extends Record<string, boolean | never> {}
  type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
  type Key = dnd5e.types.ExtractKeys<Types>;

  type _pure = Expect<Equal<Key, "acr" | "ani">>;
  type _noLeak = Expect<Equal<Extends<string, Key>, false>>;
}

// Seam A end-to-end: a downstream merge into OverrideTypes widens TypeKey.
{
  interface DefaultTypes {
    acr: true;
  }
  interface OverrideTypes extends Record<string, boolean | never> {
    lor: true;
  }
  type Key = dnd5e.types.ExtractKeys<
    dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>
  >;
  type _ = Expect<Equal<Key, "acr" | "lor">>;
}

/* ========================================================================== *
 *  Seam D core — ApplyOverrideSchema (shallow, never-deletes)
 * ========================================================================== */

type NumberField = foundry.data.fields.NumberField;
type StringField = foundry.data.fields.StringField;
type BooleanField = foundry.data.fields.BooleanField;

// Override adds a key and replaces a conflicting one; `never` deletes.
{
  type Base = { a: NumberField; b: StringField };
  type Over = { b: BooleanField; c: NumberField; a: never };
  type M = dnd5e.types.ApplyOverrideSchema<Base, Over>;

  type _keys = Expect<Equal<keyof M, "b" | "c">>; // a deleted
  type _override = Expect<Equal<M["b"], BooleanField>>;
  type _added = Expect<Equal<M["c"], NumberField>>;
}

// An open override interface (index signature) does not leak `string` keys.
{
  interface Over extends foundry.data.fields.DataSchema {}
  type M = dnd5e.types.ApplyOverrideSchema<{ a: NumberField }, Over>;
  type _ = Expect<Equal<keyof M, "a">>;
}

/* ========================================================================== *
 *  Seam B — RestrictedStringField initialized type (project default: STRICT)
 * ========================================================================== */

{
  // Strict mode (project default): only the (expandable) key union — no `(string & {})` escape,
  // so typos/stale keys are compile errors. Consumers widen via the relevant Seam-A OverrideTypes.
  type D = dnd5e.types.fields.RestrictedStringField.DerivedType<"str" | "dex">;
  type _eq = Expect<Equal<D, "str" | "dex">>;
  type _rejectsUnknown = Expect<Equal<Extends<"anything", D>, false>>;
}
