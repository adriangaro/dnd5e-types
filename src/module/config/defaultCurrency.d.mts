/**
 * Default currency for data-model defaults, starting wealth, facility prices. `CONFIG.DND5E.defaultCurrency`.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      /** Currency key used as the default (e.g. `"gp"`). */
      defaultCurrency: dnd5e.types.Currency.TypeKey;
    }
  }
}

export {};
