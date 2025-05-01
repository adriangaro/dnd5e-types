import LocalDocumentField from "../fields/local-document-field.mjs";

/**
 * Value data for Subclass advancement.
 */
export class SubclassValueData extends foundry.abstract.DataModel<
  {
    document: LocalDocumentField<
      typeof foundry.documents.BaseItem<'subclass'>
    >,
    uuid: foundry.data.fields.DocumentUUIDField
  },
  null
> { }
