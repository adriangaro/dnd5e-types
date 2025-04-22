declare class FormulaField<
  const Options extends FormulaField.Options = FormulaField.DefaultOptions,
  const AssignmentType = FormulaField.AssignmentType<Options>,
  const InitializedType = FormulaField.InitializedType<Options>,
  const PersistedType extends string | null | undefined = FormulaField.InitializedType<Options>,
> extends foundry.data.fields.StringField<
  Options, 
  AssignmentType, 
  InitializedType, 
  PersistedType
> { }

declare namespace FormulaField {
  type Options = fvttUtils.SimpleMerge<foundry.data.fields.StringField.Options, {
    deterministic?: boolean
  }>
  type DefaultOptions = fvttUtils.SimpleMerge<foundry.data.fields.StringField.DefaultOptions, {
    deterministic: false
  }>
  export import AssignmentType = foundry.data.fields.StringField.AssignmentType
  export import InitializedType = foundry.data.fields.StringField.InitializedType
}

export default FormulaField;