declare class LocalDocumentField<
  ModelInstance extends foundry.abstract.Document.Any,
  Options extends LocalDocumentField.Options = LocalDocumentField.DefaultOptions,
  AssignmentType = LocalDocumentField.AssignmentType<Options>,
  InitializedType = LocalDocumentField.InitializedType<ModelInstance, Options>,
  PersistedType extends string | null | undefined = LocalDocumentField.PersistedType<Options>,
> extends foundry.data.fields.DocumentIdField<
  Options,
  AssignmentType,
  InitializedType,
  PersistedType> {
  model: new (...args: any[]) => ModelInstance;
  _findCollection(model: new (...args: any[]) => ModelInstance, collection: string): foundry.abstract.EmbeddedCollection<ModelInstance, foundry.abstract.Document.Any>
}

declare namespace LocalDocumentField {
  type Options = fvttUtils.Merge<
    foundry.data.fields.StringField.Options<string>,
    {
      idOnly?: boolean,
      fallback?: boolean
    }
  >
  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.DocumentIdField.DefaultOptions,
    {
      nullable: true,
      readonly: false,
      idOnly: false,
      fallback: false
    }
  >
  export import AssignmentType = foundry.data.fields.DocumentIdField.AssignmentType
  type InitializedType<
    ModelInstance extends foundry.abstract.Document.Any,
    Options extends LocalDocumentField.Options
  > = foundry.data.fields.DataField.DerivedInitializedType<
    ModelInstance,
    fvttUtils.Merge<Options, DefaultOptions>
  >;
  export import PersistedType = foundry.data.fields.DocumentIdField.InitializedType
}

export default LocalDocumentField