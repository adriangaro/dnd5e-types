import MappingField from "../fields/mapping-field.mjs";

/**
 * A custom model to validate system flags on User Documents.
 */
export default class UserSystemFlags extends foundry.abstract.DataModel<{
  awardDestinations: foundry.data.fields.SetField<
    foundry.data.fields.ForeignDocumentField<
      Actor.ImplementationClass, 
      { idOnly: true }
    >,
    { required: false }
  >,
  creation: foundry.data.fields.SchemaField<{
    scrollExplanation: foundry.data.fields.StringField<{ initial: "reference" }>
  }>,
  sheetPrefs: MappingField<
    foundry.data.fields.SchemaField<{
      width: foundry.data.fields.NumberField<{ integer: true, positive: true }>,
      height: foundry.data.fields.NumberField<{ integer: true, positive: true }>,
      tabs: MappingField<
        foundry.data.fields.SchemaField<{
          collapseSidebar: foundry.data.fields.BooleanField<{ required: false }>,
          group: foundry.data.fields.BooleanField<{ required: false, initial: true }>,
          sort: foundry.data.fields.StringField<{ required: false, initial: "m", choices: [...(typeof foundry.documents.BaseFolder.SORTING_MODES), "p"] }>
        }>
      >
    }>
  >
}> {}
