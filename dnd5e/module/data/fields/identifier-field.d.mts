declare class IdentifierField<
  const Options extends IdentifierField.Options = IdentifierField.DefaultOptions,
  const AssignmentType = IdentifierField.AssignmentType<Options>,
  const InitializedType = IdentifierField.InitializedType<Options>,
  const PersistedType extends string | null | undefined = IdentifierField.InitializedType<Options>,
> extends foundry.data.fields.StringField<
  Options, 
  AssignmentType, 
  InitializedType, 
  PersistedType
> { }

declare namespace IdentifierField {
  export import Options = foundry.data.fields.StringField.Options
  export import DefaultOptions = foundry.data.fields.StringField.DefaultOptions
  export import AssignmentType = foundry.data.fields.StringField.AssignmentType
  export import InitializedType = foundry.data.fields.StringField.InitializedType
}

export default IdentifierField;