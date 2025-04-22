declare class AdvantageModeField<
const Options extends AdvantageModeField.Options = AdvantageModeField.DefaultOptions,
const AssignmentType = AdvantageModeField.AssignmentType<Options>,
const InitializedType = AdvantageModeField.InitializedType<Options>,
const PersistedType extends number | null | undefined = AdvantageModeField.InitializedType<Options>,
> extends foundry.data.fields.NumberField<
  Options, 
  AssignmentType, 
  InitializedType, 
  PersistedType
> {

}

declare namespace AdvantageModeField {
  export import Options = foundry.data.fields.NumberField.Options
  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.NumberField.DefaultOptions, 
    {
      choices: [-1, 0, 1],
      initial: 0
    }
  >
  export import AssignmentType = foundry.data.fields.NumberField.AssignmentType
  export import InitializedType = foundry.data.fields.NumberField.InitializedType
}

export default AdvantageModeField;