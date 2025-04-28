import LocalDocumentField from "../fields/local-document-field.mjs";

/**
 * Value data for Subclass advancement.
 */
export class SubclassValueData extends foundry.abstract.DataModel<
  {
    document: LocalDocumentField<
      Item.OfType<'subclass'>
    >,
    uuid: foundry.data.fields.DocumentUUIDField
  },
  dnd5e.documents.advancement.Advancement<any, any>
> { }
