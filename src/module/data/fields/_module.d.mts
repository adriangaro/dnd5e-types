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
    const ActivitiesField: typeof import("../fields/activities-field.mjs").ActivitiesField;
    type ActivitiesField = import("../fields/activities-field.mjs").ActivitiesField;

    const ActivityField: typeof import("../fields/activities-field.mjs").ActivityField;
    type ActivityField = import("../fields/activities-field.mjs").ActivityField;

    const ActivityCollection: typeof import("../fields/activities-field.mjs").ActivityCollection;
    type ActivityCollection = import("../fields/activities-field.mjs").ActivityCollection;

    const AdvancementCollectionField: typeof import("../fields/advancement-collection-field.mjs").AdvancementCollectionField;
    type AdvancementCollectionField = import("../fields/advancement-collection-field.mjs").AdvancementCollectionField;

    const AdvancementDataField: typeof import("../fields/advancement-data-field.mjs").default;
    type AdvancementDataField = import("../fields/advancement-data-field.mjs").default;

    const AdvancementField: typeof import("../fields/advancement-field.mjs").default;
    type AdvancementField = import("../fields/advancement-field.mjs").default;

    const AdvantageModeField: typeof import("../fields/advantage-mode-field.mjs").default;
    type AdvantageModeField = import("../fields/advantage-mode-field.mjs").default;

    const LocalDocumentField: typeof import("../fields/local-document-field.mjs").default;
    type LocalDocumentField<Concrete extends foundry.abstract.Document.Any = foundry.abstract.Document.Any> =
      import("../fields/local-document-field.mjs").default<Concrete>;

    const FormulaField: typeof import("../fields/formula-field.mjs").FormulaField;
    type FormulaField = import("../fields/formula-field.mjs").FormulaField;

    const IdentifierField: typeof import("../fields/identifier-field.mjs").IdentifierField;
    type IdentifierField = import("../fields/identifier-field.mjs").IdentifierField;

    const MappingField: typeof import("../fields/mapping-field.mjs").MappingField;
    // `MappingField`'s `Element` type param has no default, so the instance type is threaded.
    type MappingField<
      Element extends foundry.data.fields.DataField.Any,
      Keys extends string = string,
      Options extends foundry.data.fields.DataField.Options<fvttUtils.AnyObject> = dnd5e.types.fields.MappingField.DefaultOptions,
    > = import("../fields/mapping-field.mjs").MappingField<Element, Keys, Options>;
  }
}

export {};
