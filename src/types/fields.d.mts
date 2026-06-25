/**
 * Custom field type helpers — Seam B.
 *
 * `RestrictedStringField<Allowed>` is a `StringField` whose initialized type is
 * `Allowed | (string & {})`: it autocompletes known keys while still accepting any
 * string, matching Foundry's loose runtime validation. It bridges Seam-A `TypeKey`
 * unions into real schema fields, e.g. `SetField<RestrictedStringField<Skill.TypeKey>>`.
 *
 * Opt into strict keys (no `(string & {})` escape hatch) by passing a `Strict` options
 * marker. Downstream modules normally don't touch this directly — they widen the
 * `TypeKey` (Seam A) and every `RestrictedStringField<TypeKey>` widens transitively.
 */

declare global {
  namespace dnd5e.types.fields {
    type RestrictedStringField<
      Allowed extends string,
      Options extends foundry.data.fields.StringField.Options = foundry.data.fields.StringField.DefaultOptions,
    > = foundry.data.fields.StringField<
      Options,
      foundry.data.fields.DataField.DerivedAssignmentType<
        Allowed,
        fvttUtils.SimpleMerge<foundry.data.fields.StringField.DefaultOptions, Options>
      >,
      foundry.data.fields.DataField.DerivedInitializedType<
        RestrictedStringField.DerivedType<Allowed>,
        fvttUtils.SimpleMerge<foundry.data.fields.StringField.DefaultOptions, Options>
      >,
      string
    >;

    namespace RestrictedStringField {
      /** Resolves to `Allowed` under strict mode, else `Allowed | (string & {})`. */
      type DerivedType<Allowed extends string> = Strict extends { strict: true }
        ? Allowed
        : Allowed | (string & {});

      /**
       * Project default: STRICT. Domain-constrained fields accept only their (expandable) key union —
       * no `(string & {})` escape hatch — so typos and stale keys are compile errors. Genuinely
       * free-form text (names, descriptions, formulas, identifiers) uses plain `StringField`, not this.
       * Consumers still widen by merging the relevant Seam-A `OverrideTypes`.
       */
      interface Strict {
        strict: true;
      }
    }
  }
}

export {};
