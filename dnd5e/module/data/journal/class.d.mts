/**
 * Data definition for Class Summary journal entry pages.
 */
export default class ClassJournalPageData extends foundry.abstract.TypeDataModel<{
  item: foundry.data.fields.StringField<{ required: true }>,
  description: foundry.data.fields.SchemaField<{
    value: foundry.data.fields.HTMLField<{ textSearch: true }>,
    additionalHitPoints: foundry.data.fields.HTMLField<{ textSearch: true }>,
    additionalTraits: foundry.data.fields.HTMLField<{ textSearch: true }>,
    additionalEquipment: foundry.data.fields.HTMLField<{ textSearch: true }>,
    subclass: foundry.data.fields.HTMLField<{ textSearch: true }>
  }>,
  style: foundry.data.fields.StringField,
  subclassHeader: foundry.data.fields.StringField<{ textSearch: true }>,
  subclassItems: foundry.data.fields.SetField<foundry.data.fields.StringField>
}, foundry.abstract.Document.Any> {}
