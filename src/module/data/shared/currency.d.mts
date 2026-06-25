/**
 * A template for currencies that can be used by Actors and Items. The runtime `CurrencyTemplate`
 * mixin model contributes the `currency` mapping field, keyed by the configured currency domain.
 */

import SystemDataModel from "../abstract/system-data-model.mjs";

declare global {
  namespace dnd5e.types.Actor {
    /** currency.mjs — the currency map. */
    interface CurrencySchema extends foundry.data.fields.DataSchema {
      currency: dnd5e.types.fields.MappingField<
        foundry.data.fields.NumberField<{ required: true; nullable: false; min: 0; initial: 0 }>,
        dnd5e.types.Currency.TypeKey
      >;
    }
  }
}

/** currency.mjs — the real `CurrencyTemplate` mixin model. */
declare class CurrencyTemplate extends SystemDataModel<dnd5e.types.Actor.CurrencySchema> {
  static override defineSchema(): dnd5e.types.Actor.CurrencySchema;
}

export default CurrencyTemplate;
