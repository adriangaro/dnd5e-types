
declare global {
  namespace dnd5e.types.fields {
    type RestrictedStringField<
      Allowed extends string,
      Options extends foundry.data.fields.StringField.Options = foundry.data.fields.StringField.DefaultOptions,
    > = foundry.data.fields.StringField<
      Options,
      foundry.data.fields.DataField.DerivedAssignmentType<
        Allowed,
        fvttUtils.SimpleMerge<
          foundry.data.fields.StringField.DefaultOptions,
          Options
        >
      >,
      foundry.data.fields.DataField.DerivedInitializedType<
        Allowed | (string & {}),
        fvttUtils.SimpleMerge<
          foundry.data.fields.StringField.DefaultOptions,
          Options
        >
      >,
      string
    >;

  }
}
export { }