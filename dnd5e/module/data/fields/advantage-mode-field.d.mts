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
  #values: dnd5e.dice.D20Roll.AdvantageMode[]

}

declare namespace AdvantageModeField {
  export import Options = foundry.data.fields.NumberField.Options
  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.NumberField.DefaultOptions,
    {
      choices: dnd5e.dice.D20Roll.AdvantageMode[],
      initial: dnd5e.dice.D20Roll.AdvantageMode
    }
  >
  /**
     * A helper type for the given options type merged into the default options of the NumberField class.
     * @typeParam Options - the options that override the default options
     */
  type MergedOptions<Opts extends Options> = fvttUtils.SimpleMerge<
    DefaultOptions,
    Opts
  >;

  /**
   * A shorthand for the assignment type of a NumberField class.
   * @typeParam Options - the options that override the default options
   */
  type AssignmentType<Opts extends Options> = foundry.data.fields.DataField.DerivedAssignmentType<
    number,
    MergedOptions<Opts>
  >;

  /**
   * A shorthand for the initialized type of a NumberField class.
   * @typeParam Options - the options that override the default options
   */
  type InitializedType<Opts extends Options> = foundry.data.fields.DataField.DerivedInitializedType<
    dnd5e.dice.D20Roll.AdvantageMode,
    MergedOptions<Opts>
  >;
}
type d = AdvantageModeField.InitializedType<{}>
export default AdvantageModeField;