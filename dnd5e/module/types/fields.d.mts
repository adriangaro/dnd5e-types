
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
        RestrictedStringField.DerivedType<Allowed>,
        fvttUtils.SimpleMerge<
          foundry.data.fields.StringField.DefaultOptions,
          Options
        >
      >,
      string
    >;
    namespace RestrictedStringField {
      type DerivedType<
        Allowed extends string
      > = Strict extends { strict: true } ? Allowed : Allowed | (string & {})

      interface Strict {
      }
    }
  }
}
export { }