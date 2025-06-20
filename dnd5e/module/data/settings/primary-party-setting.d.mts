/**
 * Data model for tracking information on the primary party.
 */
declare class PrimaryPartySetting extends foundry.abstract.DataModel<{
  actor: foundry.data.fields.ForeignDocumentField<typeof foundry.documents.BaseActor>
}> {}

declare namespace PrimaryPartySetting {
  type Data = fvttUtils.PrettifyType<foundry.data.fields.SchemaField.InitializedData<dnd5e.types.GetSchema<typeof PrimaryPartySetting>>>;
}

export default PrimaryPartySetting;
