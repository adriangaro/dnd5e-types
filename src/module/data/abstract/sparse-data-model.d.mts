/**
 * Data Model variant that does not export fields with an `undefined` value during `toObject(true)`.
 */
declare class SparseDataModel<
  Schema extends foundry.data.fields.DataSchema = foundry.data.fields.DataSchema,
  Parent extends foundry.abstract.DataModel.Any | null = null,
> extends foundry.abstract.DataModel<Schema, Parent> {}

export default SparseDataModel;
