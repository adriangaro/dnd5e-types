declare class LocalDocumentField<
  DocumentType extends foundry.abstract.Document.AnyConstructor,
  Options extends LocalDocumentField.Options = LocalDocumentField.DefaultOptions,
  AssignmentType = LocalDocumentField.AssignmentType<DocumentType, Options>,
  InitializedType = LocalDocumentField.InitializedType<DocumentType, Options>,
  PersistedType extends string | null | undefined = LocalDocumentField.PersistedType<Options>,
> extends foundry.data.fields.DocumentIdField<
  Options,
  AssignmentType,
  InitializedType,
  PersistedType> {
  model: DocumentType;
  _findCollection(model: DocumentType, collection: string): foundry.abstract.EmbeddedCollection<
    foundry.abstract.Document.ToConfiguredInstance<DocumentType>, any
  >
}

declare namespace LocalDocumentField {
  interface Options extends foundry.data.fields.StringField.Options<string> {
    //                                          ^ Making this more concrete leads to excessively deep instantiation
    idOnly?: boolean;
    fallback?: boolean
  }
  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.DocumentIdField.DefaultOptions,
    {
      nullable: true,
      readonly: false,
      idOnly: false,
      fallback: false
    }
  >
  type MergedOptions<Opts extends Options> = fvttUtils.SimpleMerge<DefaultOptions, Opts>;

  type AssignmentType<
    ConcreteDocument extends foundry.abstract.Document.AnyConstructor,
    Opts extends Options,
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    string, MergedOptions<Opts>
  >;

  type InitializedType<
    ConcreteDocument extends foundry.abstract.Document.AnyConstructor,
    Opts extends Options,
  > = foundry.data.fields.DataField.DerivedInitializedType<
    Opts["idOnly"] extends true ? string : foundry.abstract.Document.ToConfiguredInstance<ConcreteDocument>,
    MergedOptions<Opts>
  >;
  type PersistedType<Opts extends Options> = foundry.data.fields.DataField.DerivedInitializedType<string, MergedOptions<Opts>>;
}

export default LocalDocumentField