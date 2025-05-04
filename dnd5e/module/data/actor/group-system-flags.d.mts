type Schema = {
  // TODO circularity
  // awardDestinations: foundry.data.fields.SetField<
  //   foundry.data.fields.ForeignDocumentField<typeof foundry.documents.BaseActor, { idOnly: true }>, 
  //   { required: false }
  // >
};

/**
 * A custom model to validate system flags on Group Actors.
 */
declare class GroupSystemFlags extends foundry.abstract.DataModel<Schema> {
  static get _schema(): foundry.data.fields.SchemaField<Schema>
  static get schema(): foundry.data.fields.SchemaField<Schema>
  static defineSchema(): Schema
}

// declare namespace GroupSystemFlags {

// }

export default GroupSystemFlags;
