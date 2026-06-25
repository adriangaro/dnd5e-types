/**
 * `MappingField` — dnd5e's keyed-object field (`module/data/fields/mapping-field.mjs`).
 * An `TypedObjectField` whose entries are all the same element field, keyed by a string union.
 *
 * Extends fvtt-types' `TypedObjectField` and parameterized by a KEY UNION so
 * CONFIG-driven maps type as `Record<Ability.TypeKey, AbilityData>` rather than open
 * `Record<string, …>`. When a module widens the key union (Seam A), every MappingField
 * keyed by it widens transitively.
 */

declare global {
  namespace dnd5e.types.fields {
    /**
     * Callback for building the initial value for a new key in a MappingField.
     * @param key      The key within the object where this new value is being generated.
     * @param initial  The generic initial data provided by the contained model.
     * @param existing Any existing mapping data.
     * @returns Value to use as default for this key.
     */
    type MappingFieldInitialValueBuilder = (
      key: string,
      initial: unknown,
      existing?: object,
    ) => object;

    /**
     * Options for MappingField, extending DataField.Options with dnd5e-specific fields.
     */
    interface MappingFieldOptions
      extends foundry.data.fields.TypedObjectField.Options<fvttUtils.AnyObject> {
      /** Keys that will be created if no data is provided. */
      initialKeys?: string[] | null | undefined;
      /** Function to calculate the initial value for a key. */
      initialValue?: MappingFieldInitialValueBuilder | null | undefined;
      /** Should the keys in the initialized data be limited to the keys provided by `options.initialKeys`? */
      initialKeysOnly?: boolean | undefined;
      /** Should keys be expanded (dot-notation) when processing the mapping? */
      expandKeys?: boolean | undefined;
    }

    /**
     * @template Element  The field describing each entry's value.
     * @template Keys     The union of allowed keys (defaults to `string`).
     * @template Options  Field options.
     */
    type MappingField<
      Element extends foundry.data.fields.DataField.Any,
      Keys extends string = string,
      Options extends MappingFieldOptions = MappingField.DefaultOptions,
    > = foundry.data.fields.TypedObjectField<
      Element,
      Options,
      Record<Keys, foundry.data.fields.DataField.AssignmentTypeFor<Element>>,
      Record<Keys, foundry.data.fields.DataField.InitializedTypeFor<Element>>,
      Record<Keys, foundry.data.fields.DataField.PersistedTypeFor<Element>>
    >;

    namespace MappingField {
      /** dnd5e adds `initialKeys` / `initialValue` / `initialKeysOnly` / `expandKeys`; the map itself is required + present. */
      interface DefaultOptions extends MappingFieldOptions {
        required: true;
        nullable: false;
        initialKeys: null;
        initialValue: null;
        initialKeysOnly: false;
        expandKeys: false;
      }
    }
  }
}

/** Module-scoped value class so `MappingField` is usable as a value (constructor). */
declare class MappingField<
  Element extends foundry.data.fields.DataField.Any,
  Keys extends string = string,
  Options extends dnd5e.types.fields.MappingFieldOptions = dnd5e.types.fields.MappingField.DefaultOptions,
> extends foundry.data.fields.TypedObjectField<
  Element,
  Options,
  Record<Keys, foundry.data.fields.DataField.AssignmentTypeFor<Element>>,
  Record<Keys, foundry.data.fields.DataField.InitializedTypeFor<Element>>,
  Record<Keys, foundry.data.fields.DataField.PersistedTypeFor<Element>>
> {
  /**
   * @param model   The DataField instance which should be embedded as each entry's value.
   * @param options Options which configure the behavior of the field.
   * @param context Additional context which describes the field.
   */
  constructor(
    model: Element,
    options?: Options,
    context?: foundry.data.fields.DataField.ConstructionContext,
  );

  /**
   * The embedded DataField definition which is contained in this field.
   * Alias for `element` (set in the constructor as `this.model = this.element`).
   */
  model: Element;

  /**
   * Get the initial value for the provided key.
   * @param key    Key within the object being built.
   * @param object Any existing mapping data.
   * @returns Initial value based on provided field type.
   */
  protected _getInitialValueForKey(
    key: string,
    object?: object,
  ): foundry.data.fields.DataField.InitializedTypeFor<Element>;
}

export { MappingField };
export {};
