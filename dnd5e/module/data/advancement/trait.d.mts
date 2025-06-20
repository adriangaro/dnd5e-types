/**
 * Configuration data for the TraitAdvancement.
 */
export class TraitConfigurationData extends foundry.abstract.DataModel<
  {
    allowReplacements: foundry.data.fields.BooleanField<{ required: true }>,
    choices: foundry.data.fields.ArrayField<foundry.data.fields.SchemaField<{
      count: foundry.data.fields.NumberField<{ required: true, positive: true, integer: true, initial: 1 }>,
      pool: foundry.data.fields.SetField<foundry.data.fields.StringField>
    }>>,
    grants: foundry.data.fields.SetField<foundry.data.fields.StringField, { required: true }>,
    mode: foundry.data.fields.StringField<{ required: true, blank: false, initial: "default" }>
  },
  null
> { }

/**
 * Value data for the TraitAdvancement.
 */
export class TraitValueData extends foundry.abstract.DataModel<
  {
    chosen: foundry.data.fields.SetField<foundry.data.fields.StringField, { required: false }>
  },
  null
> {}
