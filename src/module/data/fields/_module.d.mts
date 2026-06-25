/**
 * `dnd5e.dataModels.fields` — custom DataField subclasses (`module/data/fields`). Each member is
 * exposed as BOTH a value (`const` → the constructor) and a type (`type` → the instance), inside an
 * OPEN namespace so a module can declaration-merge its own field in. Member names mirror the runtime
 * `data/fields/_module.mjs` exports.
 *
 * The field shims (`formula-field`, `identifier-field`, `mapping-field`, `advancement-collection-field`)
 * are type-only; each had a module-scoped value class appended + named-exported so it is referenceable
 * as a value here (see FIELD SHIMS rule). Every member lives in its own file mirroring the runtime
 * `data/fields/*` layout.
 */

declare global {
  namespace dnd5e.dataModels.fields {
    const ActivitiesField: typeof import("./activities-field.mjs").ActivitiesField;
    type ActivitiesField = import("./activities-field.mjs").ActivitiesField;

    const ActivityField: typeof import("./activities-field.mjs").ActivityField;
    type ActivityField = import("./activities-field.mjs").ActivityField;

    const ActivityCollection: typeof import("./activities-field.mjs").ActivityCollection;
    type ActivityCollection = import("./activities-field.mjs").ActivityCollection;

    const AdvancementCollectionField: typeof import("./advancement-collection-field.mjs").AdvancementCollectionField;
    type AdvancementCollectionField = import("./advancement-collection-field.mjs").AdvancementCollectionField;

    const AdvancementDataField: typeof import("./advancement-data-field.mjs").default;
    type AdvancementDataField = import("./advancement-data-field.mjs").default;

    const AdvancementField: typeof import("./advancement-field.mjs").default;
    type AdvancementField = import("./advancement-field.mjs").default;

    const AdvantageModeField: typeof import("./advantage-mode-field.mjs").default;
    type AdvantageModeField = import("./advantage-mode-field.mjs").default;

    const LocalDocumentField: typeof import("./local-document-field.mjs").default;
    type LocalDocumentField<Concrete extends foundry.abstract.Document.Any = foundry.abstract.Document.Any> =
      import("./local-document-field.mjs").default<Concrete>;

    const FormulaField: typeof import("./formula-field.mjs").FormulaField;
    type FormulaField = import("./formula-field.mjs").FormulaField;

    const IdentifierField: typeof import("./identifier-field.mjs").IdentifierField;
    type IdentifierField = import("./identifier-field.mjs").IdentifierField;

    const MappingField: typeof import("./mapping-field.mjs").MappingField;
    // `MappingField`'s `Element` type param has no default, so the instance type is threaded.
    type MappingField<
      Element extends foundry.data.fields.DataField.Any,
      Keys extends string = string,
      Options extends foundry.data.fields.DataField.Options<fvttUtils.AnyObject> = dnd5e.types.fields.MappingField.DefaultOptions,
    > = import("./mapping-field.mjs").MappingField<Element, Keys, Options>;
  }
}

export {};
