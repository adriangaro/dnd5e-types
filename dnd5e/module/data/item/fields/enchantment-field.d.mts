import FormulaField from "../../fields/formula-field.mjs";
import IdentifierField from "../../fields/identifier-field.mjs";

type EnchantmentDataSchema = {
  classIdentifier: IdentifierField,
  items: foundry.data.fields.SchemaField<{
    max: FormulaField<{deterministic: true}>,
    period: foundry.data.fields.StringField
  }>,
  restrictions: foundry.data.fields.SchemaField<{
    allowMagical: foundry.data.fields.BooleanField,
    type: foundry.data.fields.StringField<
      foundry.data.fields.StringField.DefaultOptions,
      Item.SubType, Item.SubType, Item.SubType
    >
  }>
}

/**
 * A field for storing enchantment data.
 */
declare class EnchantmentField<
  Options extends EnchantmentField.Options = EnchantmentField.DefaultOptions,
  AssignmentType = EnchantmentField.AssignmentType<Options>,
  InitializedType = EnchantmentField.InitializedType<Options>,
  PersistedType extends fvttUtils.AnyObject | null | undefined = EnchantmentField.PersistedType<Options>,
> extends foundry.data.fields.EmbeddedDataField<
  typeof EnchantmentData,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {}

declare namespace EnchantmentField {
  type Options = foundry.data.fields.EmbeddedDataField.Options<typeof EnchantmentData>;
  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.EmbeddedDataField.DefaultOptions,
    {
      required: false, 
      nullable: true, 
      initial: null
    }
  >;
  type AssignmentType<
    Opts extends Options,
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    foundry.data.fields.SchemaField.AssignmentData<EnchantmentDataSchema>,
    fvttUtils.SimpleMerge<
      DefaultOptions,
      Opts
    >
  >;
  type InitializedType<
    Opts extends Options,
  > = foundry.data.fields.DataField.DerivedInitializedType<
    foundry.data.fields.SchemaField.InitializedData<EnchantmentDataSchema>,
    fvttUtils.SimpleMerge<
      DefaultOptions,
      Opts
    >
  >;
  type PersistedType<
    Opts extends Options,
  > = foundry.data.fields.DataField.DerivedInitializedType<
    foundry.data.fields.SchemaField.PersistedData<EnchantmentDataSchema>,
    fvttUtils.SimpleMerge<
      DefaultOptions,
      Opts
    >
  >;
}

export default EnchantmentField;

/**
 * Data model for enchantment configuration.
 *
 * @property {string} classIdentifier             Class identifier that will be used to determine applicable level.
 * @property {object} items
 * @property {string} items.max                   Maximum number of items that can have this enchantment.
 * @property {string} items.period                Frequency at which the enchantment be swapped.
 * @property {object} restrictions
 * @property {boolean} restrictions.allowMagical  Allow enchantments to be applied to items that are already magical.
 * @property {string} restrictions.type           Item type to which this enchantment can be applied.
 */
export class EnchantmentData extends foundry.abstract.DataModel<
  EnchantmentDataSchema,
  any
> {}

/**
 * Error to throw when an item cannot be enchanted.
 */
export class EnchantmentError extends Error {
  name: "EnchantmentError"
}
