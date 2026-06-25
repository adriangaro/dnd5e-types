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
 * `data/fields/roll-config-field.mjs`, and `CurrencyTemplate` in `data/actor/templates/_fields.mjs`
 * (its real `SystemDataModel` mixin) — referenced wherever their value class actually lives.
 */

declare global {
  namespace dnd5e.dataModels.shared {
    const ActivationField: typeof import("../shared/activation-field.mjs").ActivationField;
    type ActivationField = import("../shared/activation-field.mjs").ActivationField;

    const CreatureTypeField: typeof import("../shared/creature-type-field.mjs").default;
    type CreatureTypeField = import("../shared/creature-type-field.mjs").default;

    const CurrencyTemplate: typeof import("../actor/templates/_fields.mjs").CurrencyTemplate;
    type CurrencyTemplate = import("../actor/templates/_fields.mjs").CurrencyTemplate;

    const DamageField: typeof import("../shared/damage-field.mjs").DamageField;
    type DamageField = import("../shared/damage-field.mjs").DamageField;

    const DamageData: typeof import("../shared/damage-field.mjs").DamageData;
    type DamageData = import("../shared/damage-field.mjs").DamageData;

    const DurationField: typeof import("../shared/duration-field.mjs").DurationField;
    type DurationField = import("../shared/duration-field.mjs").DurationField;

    const MovementField: typeof import("../shared/movement-field.mjs").default;
    type MovementField = import("../shared/movement-field.mjs").default;

    const RangeField: typeof import("../shared/range-field.mjs").RangeField;
    type RangeField = import("../shared/range-field.mjs").RangeField;

    const RollConfigField: typeof import("../fields/roll-config-field.mjs").RollConfigField;
    type RollConfigField = import("../fields/roll-config-field.mjs").RollConfigField;

    const SensesField: typeof import("../shared/senses-field.mjs").default;
    type SensesField = import("../shared/senses-field.mjs").default;

    const SourceField: typeof import("../shared/source-field.mjs").SourceField;
    type SourceField = import("../shared/source-field.mjs").SourceField;

    const TargetField: typeof import("../shared/target-field.mjs").TargetField;
    type TargetField = import("../shared/target-field.mjs").TargetField;

    const UsesField: typeof import("../shared/uses-field.mjs").UsesField;
    type UsesField = import("../shared/uses-field.mjs").UsesField;
  }
}

export {};
