/**
 * `FormulaField` — a `StringField` holding a roll formula
 * (`module/data/fields/formula-field.mjs`). Adds a `deterministic` option; at the type
 * level it reads/writes a `string`.
 */

declare global {
  namespace dnd5e.types.fields {
    type FormulaField<
      Options extends FormulaField.Options = FormulaField.DefaultOptions,
    > = foundry.data.fields.StringField<Options>;

    namespace FormulaField {
      type Options = fvttUtils.SimpleMerge<
        foundry.data.fields.StringField.Options,
        { deterministic?: boolean }
      >;

      type DefaultOptions = fvttUtils.SimpleMerge<
        foundry.data.fields.StringField.DefaultOptions,
        { deterministic: false }
      >;
    }
  }

}

/** Module-scoped value class so `FormulaField` is usable as a value (constructor). */
declare class FormulaField<
  Options extends dnd5e.types.fields.FormulaField.Options = dnd5e.types.fields.FormulaField.DefaultOptions,
> extends foundry.data.fields.StringField<Options> {
  /** Is this formula not allowed to have dice values? */
  deterministic: boolean;
}

export { FormulaField };
export {};
