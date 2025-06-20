/**
 * Version of embedded data field that properly initializes data models added via active effects.
 * TODO: Remove when we can fully rely on https://github.com/foundryvtt/foundryvtt/issues/12528
 */
declare class EmbeddedDataField5e<
  ModelType extends foundry.abstract.DataModel.AnyConstructor,
  Options extends EmbeddedDataField5e.Options<ModelType> = EmbeddedDataField5e.DefaultOptions,
  AssignmentType = EmbeddedDataField5e.AssignmentType<ModelType, Options>,
  InitializedType = EmbeddedDataField5e.InitializedType<ModelType, Options>,
  PersistedType extends fvttUtils.AnyObject | null | undefined = EmbeddedDataField5e.PersistedType<ModelType, Options>,
> extends foundry.data.fields.EmbeddedDataField<
  ModelType,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  /** @override */
  _castChangeDelta(delta: any): any;
}

declare namespace EmbeddedDataField5e {
  type Options<ModelType extends foundry.abstract.DataModel.AnyConstructor> = 
    foundry.data.fields.EmbeddedDataField.Options<ModelType>;
  
  type DefaultOptions = foundry.data.fields.EmbeddedDataField.DefaultOptions;
  
  type MergedOptions<
    ModelType extends foundry.abstract.DataModel.AnyConstructor,
    Opts extends Options<ModelType>
  > = fvttUtils.SimpleMerge<DefaultOptions, Opts>;
  
  type AssignmentType<
    ModelType extends foundry.abstract.DataModel.AnyConstructor,
    Opts extends Options<ModelType>
  > = foundry.data.fields.EmbeddedDataField.AssignmentType<ModelType, Opts>;
  
  type InitializedType<
    ModelType extends foundry.abstract.DataModel.AnyConstructor,
    Opts extends Options<ModelType>
  > = foundry.data.fields.EmbeddedDataField.InitializedType<ModelType, Opts>;
  
  type PersistedType<
    ModelType extends foundry.abstract.DataModel.AnyConstructor,
    Opts extends Options<ModelType>
  > = foundry.data.fields.EmbeddedDataField.PersistedType<ModelType, Opts>;
}

export default EmbeddedDataField5e;
