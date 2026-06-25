/**
 * Follows the item-grant pattern (design D8): `configuration` is an EmbeddedDataField over a local
 * config DataModel ({@link BaseScaleValueConfigData}). There is NO registered `value` data model
 * (`metadata.dataModels` only supplies `configuration`), so `value` resolves to a plain ObjectField.
 * The document (`documents/advancement/scale-value.d.mts`) is `AdvancementMixin(this)` and registers
 * as `"ScaleValue"`.
 */

import BaseAdvancementData from "./base-advancement.mjs";

declare global {
  namespace dnd5e.types.Advancement {
    namespace ScaleValue {
      /** Allowed scale value sub-types (keys of the runtime `TYPES` map). */
      type TypeKey = "string" | "number" | "cr" | "dice" | "distance" | "usage";

      /** The `configuration` model schema. */
      type ConfigSchema = {
        identifier: dnd5e.types.fields.IdentifierField<{ required: true }>;
        type: foundry.data.fields.StringField<{ required: true; initial: "string" }, TypeKey, TypeKey, TypeKey>;
        distance: foundry.data.fields.SchemaField<{
          units: foundry.data.fields.StringField<{ required: true }>;
        }>;
        scale: dnd5e.types.fields.MappingField<foundry.data.fields.ObjectField, string, { required: true }>;
      };

      type Schema = dnd5e.types.Advancement.BaseSchema<
        "ScaleValue",
        foundry.data.fields.EmbeddedDataField<typeof BaseScaleValueConfigData>,
        foundry.data.fields.ObjectField
      >;

      /** Information on how a scale value of this type is configured. */
      interface TypeMetadata {
        /** Name of this type. */
        label: string;
        /** Hint for this type shown in the scale value configuration. */
        hint: string;
        /** Hint for the identifier for this type. */
        identifier: string;
        /** When using the default editing interface, should numeric inputs be used? */
        isNumeric: boolean;
      }

      /** Schema for string-based scale value types. */
      type StringTypeSchema = {
        value: foundry.data.fields.StringField<{ required: true }>;
      };

      /** Schema for number-based scale value types. */
      type NumberTypeSchema = {
        value: foundry.data.fields.NumberField<{ required: true }>;
      };

      /** Schema for CR scale value type. */
      type CRTypeSchema = {
        value: foundry.data.fields.NumberField<{ required: true; min: 0 }>;
      };

      /** Schema for dice scale value type. */
      type DiceTypeSchema = {
        number: foundry.data.fields.NumberField<{ nullable: true; integer: true }>;
        faces: foundry.data.fields.NumberField<{ required: true; integer: true }>;
        modifiers: foundry.data.fields.SetField<foundry.data.fields.StringField<{ required: true }>>;
      };

      /** Schema for usage scale value type. */
      type UsageTypeSchema = {
        value: foundry.data.fields.NumberField<{ nullable: true; integer: true; min: 0 }>;
        period: foundry.data.fields.StringField<{ blank: false }>;
      };
    }
  }
}

/** Embedded configuration DataModel. */
declare class BaseScaleValueConfigData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.ScaleValue.ConfigSchema,
  foundry.abstract.DataModel.Any
> {
  static LOCALIZATION_PREFIXES: string[];
  static override defineSchema(): dnd5e.types.Advancement.ScaleValue.ConfigSchema;
  static override migrateData(source: fvttUtils.AnyMutableObject): fvttUtils.AnyMutableObject;
}

/**
 * Data field that automatically selects the appropriate ScaleValueType based on the selected type.
 * @deprecated since DnD5e 6.0, until DnD5e 6.2 — use a regular `ObjectField` instead.
 */
declare class ScaleValueEntryField extends foundry.data.fields.ObjectField {}

/**
 * Base scale value data type that stores generic string values.
 */
declare class ScaleValueType extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.ScaleValue.StringTypeSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.ScaleValue.StringTypeSchema;

  /** Configuration information for this scale value type. */
  static get metadata(): dnd5e.types.Advancement.ScaleValue.TypeMetadata;

  /**
   * Attempt to convert another scale value type to this one.
   * @param original  Original type to attempt to convert.
   * @param options   Options which affect DataModel construction.
   */
  static convertFrom(original: ScaleValueType, options?: object): ScaleValueType | null;

  /**
   * Retrieve field data with associated values (static form).
   * @param level      Level for which this data is being prepared.
   * @param value      Value for this level.
   * @param lastValue  Previous value used to generate placeholders.
   */
  static getFields(level: number, value: ScaleValueType, lastValue?: ScaleValueType): Record<string, object>;

  /**
   * Create a placeholder value for the provided field.
   * @param name       Name of the field.
   * @param lastValue  Scale value from a lower level.
   */
  static getPlaceholder(name: string, lastValue?: ScaleValueType): string;

  /** This scale value prepared to be used in roll formulas. */
  get formula(): string | null;

  /** This scale value formatted for display. */
  get display(): string | null;

  /**
   * Retrieve field data with associated values (instance form).
   * @param level      Level for which this data is being prepared.
   * @param lastValue  Previous value used to generate placeholders.
   */
  getFields(level: number, lastValue?: ScaleValueType): Record<string, object>;

  /** Shortcut to the prepared value when used in roll formulas. */
  toString(): string;
}

/**
 * Scale value data type that stores numeric values.
 */
declare class ScaleValueTypeNumber extends ScaleValueType {
  static override get metadata(): dnd5e.types.Advancement.ScaleValue.TypeMetadata;
  static override convertFrom(original: ScaleValueType, options?: object): ScaleValueTypeNumber | null;
  override get formula(): string | null;
}

/**
 * Scale value data type that stores challenge ratings.
 */
declare class ScaleValueTypeCR extends ScaleValueTypeNumber {
  static override get metadata(): dnd5e.types.Advancement.ScaleValue.TypeMetadata;
  override get display(): string | null;
}

/**
 * Scale value data type that stores dice values.
 */
declare class ScaleValueTypeDice extends ScaleValueType {
  static override get metadata(): dnd5e.types.Advancement.ScaleValue.TypeMetadata;

  /** List of die faces that can be chosen. */
  static FACES: number[];

  static override convertFrom(original: ScaleValueType, options?: object): ScaleValueTypeDice | null;
  static override getFields(level: number, value: ScaleValueType, lastValue?: ScaleValueType): Record<string, object>;
  static override getPlaceholder(name: string, lastValue?: ScaleValueType): string;

  override get formula(): string | null;

  /** The entire die, with leading "d" and any modifiers, e.g., "d4" or "d4r1". */
  get die(): string;

  /** The die modifiers. */
  get mods(): string;

  /** The die value to be rolled with the leading "d" (e.g. "d4"). */
  get denom(): string;
}

/**
 * Scale value data type that stores distance values.
 */
declare class ScaleValueTypeDistance extends ScaleValueTypeNumber {
  static override get metadata(): dnd5e.types.Advancement.ScaleValue.TypeMetadata;
  override get display(): string | null;
}

/**
 * Scale value data that stores a feature's usage number.
 */
declare class ScaleValueTypeUsage extends ScaleValueTypeNumber {
  static override get metadata(): dnd5e.types.Advancement.ScaleValue.TypeMetadata;
  static override convertFrom(original: ScaleValueType, options?: object): ScaleValueTypeUsage | null;
  static override getFields(level: number, value: ScaleValueType, lastValue?: ScaleValueType): Record<string, object>;
  static override getPlaceholder(name: string, lastValue?: ScaleValueType): string;
  override get display(): string | null;
}

/** The available types of scaling value. */
export declare const TYPES: {
  string: typeof ScaleValueType;
  number: typeof ScaleValueTypeNumber;
  cr: typeof ScaleValueTypeCR;
  dice: typeof ScaleValueTypeDice;
  distance: typeof ScaleValueTypeDistance;
  usage: typeof ScaleValueTypeUsage;
};

declare class BaseScaleValueAdvancementData extends BaseAdvancementData<dnd5e.types.Advancement.ScaleValue.Schema> {
  static override defineSchema(): dnd5e.types.Advancement.ScaleValue.Schema;
}

export default BaseScaleValueAdvancementData;
export { BaseScaleValueConfigData, ScaleValueEntryField, ScaleValueType, ScaleValueTypeNumber, ScaleValueTypeCR, ScaleValueTypeDice, ScaleValueTypeDistance, ScaleValueTypeUsage };
