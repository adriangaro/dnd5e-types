import IdentifierField from "../fields/identifier-field.mjs";
import MappingField from "../fields/mapping-field.mjs";

/**
 * Data model for the Scale Value advancement type.
 */
export class ScaleValueConfigurationData extends foundry.abstract.DataModel<
  {
    identifier: IdentifierField<{ required: true }>,
    type: foundry.data.fields.StringField<{ required: true, initial: "string", choices: dnd5e.types.ScaleValue.TypeKey[] }, dnd5e.types.ScaleValue.TypeKey, dnd5e.types.ScaleValue.TypeKey, dnd5e.types.ScaleValue.TypeKey>,
    distance: foundry.data.fields.SchemaField<{
      units: foundry.data.fields.StringField<{ required: true }>
    }>,
    scale: MappingField<ScaleValueEntryField, string, { required: true }>
  },
  dnd5e.documents.advancement.Advancement<any, any>
> { }


/**
 * Data field that automatically selects the appropriate ScaleValueType based on the selected type.
 */
export class ScaleValueEntryField<
  const Options extends ScaleValueEntryField.Options = ScaleValueEntryField.DefaultOptions,
  const AssignmentType = ScaleValueEntryField.AssignmentType<Options>,
  const InitializedType = ScaleValueEntryField.InitializedType<Options>,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = ScaleValueEntryField.PersistedType<Options>,
> extends foundry.data.fields.ObjectField<
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {}


export declare namespace ScaleValueEntryField {
  type BaseData = dnd5e.types.ScaleValue.ScaleValueAssignmentData
  type Options = foundry.data.fields.DataField.Options<BaseData>;
  export import DefaultOptions = foundry.data.fields.ObjectField.DefaultOptions;
  type MergedOptions<Options extends ScaleValueEntryField.Options> = fvttUtils.SimpleMerge<DefaultOptions, Options>;
  type AssignmentType<
    Options extends ScaleValueEntryField.Options
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    BaseData,
    MergedOptions<Options>
  >;
  type InitializedType<
    Options extends ScaleValueEntryField.Options
  > = foundry.data.fields.DataField.DerivedInitializedType<
    dnd5e.types.ScaleValue.Any,
    MergedOptions<Options>
  >;
  type PersistedType<
    Options extends ScaleValueEntryField.Options
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    BaseData,
    MergedOptions<Options>
  >;
}

/**
 * Base scale value data type that stores generic string values.
 */
export class ScaleValueType<
  Schema extends foundry.data.fields.DataSchema = {
    value: foundry.data.fields.StringField<{ required: true }>
  }
> extends foundry.abstract.DataModel<
  Schema,
  dnd5e.documents.advancement.Advancement<any, any>
> {
  /**
   * Configuration information for this scale value type.
   */
  static get metadata(): {
    label: string,
    hint: string,
    identifier: string,
    isNumeric: boolean
  }

  /* -------------------------------------------- */

  /**
   * Attempt to convert another scale value type to this one.
   */
  static convertFrom<This extends ScaleValueType<any>>(original: This, options): This

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * This scale value prepared to be used in roll formulas.
   */
  get formula(): string | null

  /* -------------------------------------------- */

  /**
   * This scale value formatted for display.
   */
  get display(): string | null

  /* -------------------------------------------- */

  /**
   * Shortcut to the prepared value when used in roll formulas.
   */
  toString(): string

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Retrieve field data with associated values.
   */
  static getFields(level: number, value: ScaleValueType, lastValue: ScaleValueType): Record<string, object>

  /* -------------------------------------------- */

  /**
   * Create a placeholder value for the provided field.
   */
  static getPlaceholder(name: string, lastValue: ScaleValueType): string
}


/**
 * Scale value data type that stores numeric values.
 */
export class ScaleValueTypeNumber extends ScaleValueType<{
  value: foundry.data.fields.NumberField<{ required: true }>
}> { }


/**
 * Scale value data type that stores challenge ratings.
 */
export class ScaleValueTypeCR extends ScaleValueTypeNumber { }


/**
 * Scale value data type that stores dice values.
 *
 * @property {number} number  Number of dice.
 * @property {number} faces   Die faces.
 */
export class ScaleValueTypeDice extends ScaleValueType<{
  number: foundry.data.fields.NumberField<{ nullable: true, integer: true }>,
  faces: foundry.data.fields.NumberField<{ required: true, integer: true }>,
  modifiers: foundry.data.fields.SetField<foundry.data.fields.StringField<{ required: true }>>
}> {
  /**
   * List of die faces that can be chosen.
   */
  static FACES: [2, 3, 4, 6, 8, 10, 12, 20, 100];


  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */


  /**
   * The entire die, with leading "d" and any modifiers, e.g., "d4" or "d4r1".
   */
  get die(): string

  /* -------------------------------------------- */

  /**
   * The die modifiers.
   */
  get mods(): string

  /* -------------------------------------------- */

  /**
   * The die value to be rolled with the leading "d" (e.g. "d4").
   */
  get denom(): string
}


/**
 * Scale value data type that stores distance values.
 *
 * @property {number} value  Numeric value.
 */
export class ScaleValueTypeDistance extends ScaleValueTypeNumber { }


declare global {
  namespace dnd5e.types {
    namespace ScaleValue {
      interface DefaultScaleValueTypes {
        string: typeof ScaleValueType,
        number: typeof ScaleValueTypeNumber,
        cr: typeof ScaleValueTypeCR,
        dice: typeof ScaleValueTypeDice,
        distance: typeof ScaleValueTypeDistance
      }

      /**
         * Override interface for declaration merging.
         * Add custom item rarity here.
         * @example
         * declare global {
         * namespace dnd5e.types.ScaleValue {
         * interface OverrideTypes {
         * charges: typeof ScaleValueTypeCharges
         * }
         * }
         * }
         */
      interface OverrideTypes extends Record<never, typeof ScaleValueType | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultScaleValueTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      type SchemaMap = {
        [K in keyof Types]: dnd5e.types.GetSchema<Types[K]>
      }

      type ScaleValueAssignmentData<T extends TypeKey = TypeKey> = foundry.data.fields.SchemaField.AssignmentData<
        SchemaMap[T]
      >
      type AnyClass = Types[TypeKey];
      type Any = fvttUtils.FixedInstanceType<Types[TypeKey]>;
    }
  }
}


/**
 * The available types of scaling value.
 */
export const TYPES: dnd5e.types.ScaleValue.Types;
