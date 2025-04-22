import LocalDocumentField from "../fields/local-document-field.mjs";

/**
 * Value data for Subclass advancement.
 */
export class SubclassValueData extends foundry.abstract.DataModel<
  {
    document: LocalDocumentField<
      Item.ImplementationClass,
      LocalDocumentField.DefaultOptions,
      LocalDocumentField.AssignmentType<{}>,
      foundry.data.fields.DataField.DerivedInitializedType<
        Item.OfType<'subclass'>,
        LocalDocumentField.DefaultOptions
      >
    >,
    uuid: foundry.data.fields.DocumentUUIDField
  },
  dnd5e.documents.advancement.Advancement<any, any>
> { }
