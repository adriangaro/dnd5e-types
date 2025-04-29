/**
 * Data definition for Subclass Summary journal entry pages.
 */
export default class SubclassJournalPageData extends foundry.abstract.TypeDataModel<{
  item: foundry.data.fields.StringField<{ required: true }>,
  description: foundry.data.fields.SchemaField<{
    value: foundry.data.fields.HTMLField<{ textSearch: true }>
  }>,
  style: foundry.data.fields.StringField
}, foundry.abstract.Document.Any> {}
