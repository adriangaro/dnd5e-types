/**
 * `IdentifierField` — dnd5e's slug-validated string field (`module/data/fields/identifier-field.mjs`).
 * A `StringField` whose value must be a valid identifier; adds `allowType` and `types` options.
 */

declare global {
  namespace dnd5e.types.fields {
    type IdentifierField<
      Options extends IdentifierField.Options = IdentifierField.DefaultOptions,
    > = foundry.data.fields.StringField<Options>;

    namespace IdentifierField {
      type Options = fvttUtils.SimpleMerge<
        foundry.data.fields.StringField.Options,
        {
          /** Allow identifiers that are prefixed by type (e.g. `spell:mage-hand`). */
          allowType?: boolean;
          /** Item types that can be represented by this identifier. */
          types?: string[] | null;
        }
      >;

      type DefaultOptions = fvttUtils.SimpleMerge<
        foundry.data.fields.StringField.DefaultOptions,
        { allowType: false; types: null }
      >;
    }
  }
}

/**
 * Special case StringField that includes automatic validation for identifiers.
 *
 * @param options  Options which configure the behavior of the field.
 */
declare class IdentifierField<
  Options extends dnd5e.types.fields.IdentifierField.Options = dnd5e.types.fields.IdentifierField.DefaultOptions,
> extends foundry.data.fields.StringField<Options> {}

export { IdentifierField };
export {};
