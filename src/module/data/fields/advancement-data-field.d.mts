/**
 * Data field that automatically selects the Advancement-specific configuration or value data models.
 *
 * The concrete model is resolved at runtime from `advancementType.metadata.dataModels[this.name]`, a
 * linkage not expressible structurally — so the stored value is typed as a generic data-model instance
 * (or a plain object when no model is registered). `Options` flows through so `required`/`nullable`
 * narrow the value.
 *
 * @param advancementType  Advancement class to which this field belongs.
 */
declare class AdvancementDataField<
  const Type extends foundry.abstract.DataModel.AnyConstructor = foundry.abstract.DataModel.AnyConstructor,
  const Options extends foundry.data.fields.DataField.Options<fvttUtils.AnyObject> = foundry.data.fields.ObjectField.DefaultOptions,
> extends foundry.data.fields.ObjectField<
  Options,
  foundry.data.fields.DataField.DerivedAssignmentType<fvttUtils.AnyObject, fvttUtils.SimpleMerge<foundry.data.fields.ObjectField.DefaultOptions, Options>>,
  foundry.data.fields.DataField.DerivedInitializedType<foundry.abstract.DataModel.Any | fvttUtils.AnyObject, fvttUtils.SimpleMerge<foundry.data.fields.ObjectField.DefaultOptions, Options>>,
  foundry.data.fields.DataField.DerivedInitializedType<fvttUtils.AnyObject, fvttUtils.SimpleMerge<foundry.data.fields.ObjectField.DefaultOptions, Options>>
> {
  constructor(advancementType: Type, options?: Options);

  /** Advancement class to which this field belongs. */
  advancementType: Type;

  /**
   * Get the DataModel definition for the specified field as defined in metadata.
   * @returns The DataModel class, or null.
   */
  getModel(): foundry.abstract.DataModel.AnyConstructor | null | undefined;

  /**
   * Get the defaults object for the specified field as defined in metadata.
   */
  getDefaults(): object;
}

export default AdvancementDataField;
