import SystemDataModel from "../abstract.mjs";
import MappingField from "../fields/mapping-field.mjs";

/**
 * A template for currently held currencies.
 */
declare class CurrencyTemplate extends SystemDataModel<
  dnd5e.types.MergeSchemas<
    {
      currency: MappingField<
        foundry.data.fields.NumberField<{
          required: true, nullable: false, integer: true, min: 0, initial: 0
        }>,
        dnd5e.types.Currency.TypeKey,
        { initialKeys: dnd5e.types.Currency.TypeKey[], initialKeysOnly: true, label: "DND5E.Currency" }
      >
    },
    {}
  >
> {
  constructor(...args: any[])
  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Get the weight of all of the currency. Always returns 0 if currency weight is disabled in settings.
   */
  get currencyWeight(): number
}
declare global {
  namespace dnd5e.types {
    namespace Currency {
      // --- Base Currency Definitions ---
      // Values represent the conversion rate relative to a base unit (often Gold Pieces = 1)
      interface DefaultCurrencyTypes extends Record<string, number> {
        "cp": 100;  // Copper Pieces (100 CP = 1 GP)
        "sp": 10;   // Silver Pieces (10 SP = 1 GP)
        "ep": 2;    // Electrum Pieces (2 EP = 1 GP)
        "gp": 1;    // Gold Pieces (Base Unit)
        "pp": 0.1; // Platinum Pieces (1 PP = 10 GP)
      }

      /**
       * Override interface for declaration merging.
       * Add custom currency types and their conversion rate relative to the base unit (GP=1).
       * @example
       * declare global {
       * namespace dnd5e.types.Currency {
       * interface OverrideTypes {
       * "zp": 1000 // Zircon Pieces (example, 1000 ZP = 1 GP)
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, number | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultCurrencyTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Configuration object structure for a currency type. */
      interface CurrencyTypeConfig<T extends TypeKey> {
        /**
         * Localized label for the currency.
         */
        label: string;
        /**
         * Localized abbreviation for the currency.
         */
        abbreviation: T;
        /** Number by which this currency should be multiplied to arrive at a standard value. */
        conversion: Types[T];
        /**
         * Icon representing the currency in the interface.
         */
        icon: string;
      }
    }

    interface DND5EConfig {
      /**
       * The valid currency denominations with localized labels, abbreviations, and conversions.
       * The conversion number defines how many of that currency are equal to one GP.
       */
      currencies: {
        [K in dnd5e.types.Currency.TypeKey]: dnd5e.types.Currency.CurrencyTypeConfig<K>
      }
    }
  }
}

export default CurrencyTemplate;
