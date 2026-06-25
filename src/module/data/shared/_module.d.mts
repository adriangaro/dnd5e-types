/**
 * Runtime API fragment for `dnd5e.dataModels.shared` — mirrors the runtime
 * `module/data/shared/_module.mjs`, which re-exports each shared field/model as a DEFAULT export
 * (plus the named `DamageData` from `damage-field.mjs`).
 *
 * Most members are custom `SchemaField`/`EmbeddedDataField` subclasses; each carries a module-scoped
 * VALUE class alongside its `dnd5e.types.fields.*` type alias, so it is accessible as BOTH a value
 * (`const` → constructor) and a type (`type` → instance) here. The namespace is OPEN so consumers can
 * declaration-merge their own members.
 *
 * A couple of source-file locations differ from the runtime layout: `RollConfigField` lives in
 * `data/shared/roll-config-field.mjs`, and `CurrencyTemplate` in `data/shared/currency.mjs`
 * (its real `SystemDataModel` mixin) — referenced wherever their value class actually lives.
 */

declare global {
  namespace dnd5e.dataModels.shared {
    const ActivationField: typeof import("./activation-field.mjs").ActivationField;
    type ActivationField = import("./activation-field.mjs").ActivationField;

    const CreatureTypeField: typeof import("./creature-type-field.mjs").default;
    type CreatureTypeField = import("./creature-type-field.mjs").default;

    const CurrencyTemplate: typeof import("./currency.mjs").default;
    type CurrencyTemplate = import("./currency.mjs").default;

    const DamageField: typeof import("./damage-field.mjs").DamageField;
    type DamageField = import("./damage-field.mjs").DamageField;

    const DamageData: typeof import("./damage-field.mjs").DamageData;
    type DamageData = import("./damage-field.mjs").DamageData;

    const DurationField: typeof import("./duration-field.mjs").DurationField;
    type DurationField = import("./duration-field.mjs").DurationField;

    const MovementField: typeof import("./movement-field.mjs").default;
    type MovementField = import("./movement-field.mjs").default;

    const RangeField: typeof import("./range-field.mjs").RangeField;
    type RangeField = import("./range-field.mjs").RangeField;

    const RollConfigField: typeof import("./roll-config-field.mjs").RollConfigField;
    type RollConfigField = import("./roll-config-field.mjs").RollConfigField;

    const SensesField: typeof import("./senses-field.mjs").default;
    type SensesField = import("./senses-field.mjs").default;

    const SourceField: typeof import("./source-field.mjs").SourceField;
    type SourceField = import("./source-field.mjs").SourceField;

    const TargetField: typeof import("./target-field.mjs").TargetField;
    type TargetField = import("./target-field.mjs").TargetField;

    const UsesField: typeof import("./uses-field.mjs").UsesField;
    type UsesField = import("./uses-field.mjs").UsesField;
  }
}

export {};
