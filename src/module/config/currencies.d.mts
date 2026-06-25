/**
 * Currency config domain (Seam A). `CONFIG.DND5E.currencies`.
 *
 * The `Currency` namespace (DefaultTypes/Types/TypeKey) is established in `_stubs.d.mts`;
 * this file only layers in the per-entry `Config` shape and the `CONFIG.DND5E` funnel.
 */

declare global {
  namespace dnd5e.types {
    namespace Currency {
      /** Shape of each `CONFIG.DND5E.currencies[key]` entry. */
      interface Config {
        /** Localized label for the currency. */
        label: string;
        /** Localized abbreviation for the currency. */
        abbreviation: string;
        /** Number by which this currency is multiplied to arrive at a standard value. */
        conversion: number;
        /**
         * Number of digits to round currency values of this denomination to.
         * Set to `Infinity` to prevent any rounding. Defaults to `0`.
         */
        fractionalDigits?: number;
        /** Icon representing the currency in the interface. */
        icon: string;
      }
    }

    interface DND5EConfig {
      currencies: { [K in dnd5e.types.Currency.TypeKey]: dnd5e.types.Currency.Config };
    }
  }
}

export {};
