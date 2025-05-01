import type BaseAdvancement from "../advancement/base-advancement.d.mts";

/**
 * Data field that automatically selects the Advancement-specific configuration or value data models.
 */
declare class AdvancementDataField<
  const Type extends AdvancementDataField.RequiredType,
  const Options extends AdvancementDataField.Options<Type> = AdvancementDataField.DefaultOptions,
  const AssignmentType = AdvancementDataField.AssignmentType<Type, Options>,
  const InitializedType = AdvancementDataField.InitializedType<Type, Options>,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = AdvancementDataField.PersistedType<Type, Options>,
> extends foundry.data.fields.ObjectField<
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  advancementType: typeof BaseAdvancement;

  /* -------------------------------------------- */

  /**
   * Get the DataModel definition for the specified field as defined in metadata.
   */
  getModel(): Type extends never ? null : Type

  /* -------------------------------------------- */

  /**
   * Get the defaults object for the specified field as defined in metadata.
   * @returns {object}
   */
  getDefaults(): AdvancementDataField.Options<Type> | null
}


declare namespace AdvancementDataField {
  type RequiredType = ConcreteDataModelConstructor | fvttUtils.AnyObject | never
  export type ConcreteDataModelConstructor =
    // 1. Must be a concrete constructor
    fvttUtils.AnyConcreteConstructor &
    // 3. Must produce instances assignable to DataModel
    (new (...args: any) => foundry.abstract.DataModel.Any);

  type BaseData<T extends RequiredType> = T extends never ? {} : T extends ConcreteDataModelConstructor ? foundry.data.fields.SchemaField.AssignmentData<
    dnd5e.types.GetSchema<T>
  > : T
  type Options<T extends RequiredType> = foundry.data.fields.DataField.Options<BaseData<T>>;
  type DefaultOptions = foundry.data.fields.ObjectField.DefaultOptions;
  type MergedOptions<Options extends AdvancementDataField.Options<RequiredType>> = fvttUtils.SimpleMerge<DefaultOptions, Options>;
  type AssignmentType<
    T extends RequiredType,
    Options extends AdvancementDataField.Options<T>
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    BaseData<T>,
    MergedOptions<Options>
  >;
  type InitializedType<
    T extends RequiredType,
    Options extends AdvancementDataField.Options<T>
  > = foundry.data.fields.DataField.DerivedInitializedType<
    T extends ConcreteDataModelConstructor ? InstanceType<T> : T,
    MergedOptions<Options>
  >;
  type PersistedType<
    T extends RequiredType,
    Options extends AdvancementDataField.Options<T>
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    BaseData<T>,
    MergedOptions<Options>
  >;
}

export default AdvancementDataField