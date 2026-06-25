/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/fields/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.fields {
      interface AdvantageModeData {
      override: number|null; // Whether the mode has been entirely overridden.
      advantages: AdvantageModeCounts; // The advantage counts.
      disadvantages: AdvantageModeCounts; // The disadvantage counts.
      }

      interface AdvantageModeCounts {
      count: number; // The number of applications of this mode.
      suppressed?: boolean; // Whether this mode is suppressed.
      }

      // Aliased to the hand-crafted type so declaration-merging in dnd5e.types.fields.FormulaField.Options is the single source of truth.
      type FormulaFieldOptions = dnd5e.types.fields.FormulaField.Options;

      interface IdentifierFieldOptions extends foundry.data.fields.StringField.Options {
      allowType?: boolean; // @default false — Allow identifiers that are prefixed by type (e.g. `spell:mage-hand`).
      types?: string[]; // @default null — Item types that can be represented by this identifier.
      }

      interface LocalDocumentFieldOptions extends foundry.data.fields.DocumentIdField.Options {
      fallback?: boolean; // @default false — Display the string value if no matching item is found.
      }

      // Aliased to the hand-crafted type so declaration-merging in dnd5e.types.fields.MappingField is the single source of truth.
      type MappingFieldOptions = foundry.data.fields.DataField.Options<fvttUtils.AnyObject> & {
      initialKeys?: string[]; // Keys that will be created if no data is provided.
      initialValue?: MappingFieldInitialValueBuilder; // Function to calculate the initial value for a key.
      initialKeysOnly?: boolean; // @default false — Should the keys in the initialized data be limited to the keys provided by `options.initialKeys`?
      };

      /**
       * Function to calculate the initial value for a key within a {@link MappingField}.
       * @param key       The key within the object where this new value is being generated.
       * @param initial   The generic initial data provided by the contained model.
       * @param existing  Any existing mapping data.
       * @returns         Value to use as default for this key.
       */
      type MappingFieldInitialValueBuilder = (key: string, initial: any, existing: object) => object;

  }
}

export {};
