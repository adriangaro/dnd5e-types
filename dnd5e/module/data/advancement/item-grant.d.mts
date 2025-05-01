import SpellConfigurationData from "./spell-config.mjs";

/**
 * Configuration data for the Item Grant advancement.
 */
export default class ItemGrantConfigurationData extends foundry.abstract.DataModel<
  {
    items: foundry.data.fields.ArrayField<foundry.data.fields.SchemaField<{
      uuid: foundry.data.fields.StringField,
      optional: foundry.data.fields.BooleanField
    }>, { required: true }>,
    optional: foundry.data.fields.BooleanField<{ required: true }>,
    spell: foundry.data.fields.EmbeddedDataField<typeof SpellConfigurationData, { required: true, nullable: true, initial: null }>
  },
  null
> {}
