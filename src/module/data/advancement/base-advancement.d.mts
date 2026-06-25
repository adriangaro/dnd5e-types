/**
 * Base data model for advancement.
 *
 * Like activities, a plain `foundry.abstract.DataModel` pseudo-document (no TypeDataModel lifecycle).
 * Its distinguishing feature is the dual polymorphic `configuration`/`value` (each an
 * `AdvancementDataField` resolved at runtime from `metadata.dataModels[name]`). Because that linkage
 * is runtime-only, the base schema is parameterized over the concrete `configuration`/`value` fields
 * (design D8): every concrete advancement supplies them explicitly via {@link BaseAdvancementData.Schema}.
 */

declare global {
  namespace dnd5e.types.Advancement {
    /** The shared advancement schema, parameterized over the per-type config/value fields. */
    type BaseSchema<
      Type extends string,
      ConfigField extends foundry.data.fields.DataField.Any,
      ValueField extends foundry.data.fields.DataField.Any,
    > = {
      _id: foundry.data.fields.DocumentIdField;
      type: foundry.data.fields.StringField<{ required: true; initial: Type }, Type, Type, Type>;
      configuration: ConfigField;
      value: ValueField;
      flags: foundry.data.fields.DocumentFlagsField<"Item">;
      level: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
      title: foundry.data.fields.StringField;
      hint: foundry.data.fields.HTMLField;
      icon: foundry.data.fields.FilePathField<{ categories: ["IMAGE"]; base64: true }>;
      classRestriction: foundry.data.fields.StringField<{ choices: ["primary", "secondary"] }>;
    };

    interface Metadata {
      name: string;
      label: string;
      multiLevel?: boolean;
      validItemTypes?: Set<string>;
    }
  }
}

declare class BaseAdvancementData<
  Schema extends foundry.data.fields.DataSchema = foundry.data.fields.DataSchema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  // Parent pinned to abstract `Document.Any`, NOT the concrete `Item.Implementation`: an advancement
  // data model lives in an item's `system.advancement` collection, so a concrete item parent loops
  // `Item.system → advancement collection → Advancement.Instance → parent → Item.system`. That cycle
  // trips tsc's recursion limiter the moment a consumer registers a new advancement type (tsgo is
  // fine). Abstracting the parent breaks it while leaving `this.parent` a Document.
> extends foundry.abstract.TypeDataModel<Schema, foundry.abstract.Document.Any, BaseData, DerivedData> {
  /**
   * Name of this advancement type that will be stored in config and used for lookups.
   * @type {string}
   * @protected
   */
  static get typeName(): string;

  static override defineSchema(): foundry.data.fields.DataSchema;
}

declare namespace BaseAdvancementData {
  interface Any
    extends BaseAdvancementData<foundry.data.fields.DataSchema, fvttUtils.AnyObject, fvttUtils.AnyObject> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof BaseAdvancementData> {}
}

export default BaseAdvancementData;
