import MappingField from "../fields/mapping-field.mjs";
import SpellConfigurationData from "./spell-config.mjs";

/**
 * Configuration data for Item Choice advancement.
 */
export class ItemChoiceConfigurationData extends foundry.abstract.DataModel<
  {
    allowDrops: foundry.data.fields.BooleanField<{ initial: true }>,
    choices: MappingField<foundry.data.fields.SchemaField<{
      count: foundry.data.fields.NumberField<{ integer: true, min: 0 }>,
      replacement: foundry.data.fields.BooleanField
    }>>,
    pool: foundry.data.fields.ArrayField<foundry.data.fields.SchemaField<{
      uuid: foundry.data.fields.StringField
    }>>,
    restriction: foundry.data.fields.SchemaField<{
      level: foundry.data.fields.StringField,
      subtype: foundry.data.fields.StringField,
      type: foundry.data.fields.StringField
    }>,
    spell: foundry.data.fields.EmbeddedDataField<typeof SpellConfigurationData, { nullable: true, initial: null }>,
    type: foundry.data.fields.StringField<{ blank: false, nullable: true, initial: null }>
  },
  dnd5e.documents.advancement.Advancement<any, any>
> { }

/**
 * Value data for Item Choice advancement.
 */
export class ItemChoiceValueData extends foundry.abstract.DataModel<
  {
    ability: foundry.data.fields.StringField,
    added: MappingField<MappingField<foundry.data.fields.StringField>>,
    replaced: MappingField<foundry.data.fields.SchemaField<{
      level: foundry.data.fields.NumberField<{ integer: true, min: 0 }>,
      original: foundry.data.fields.ForeignDocumentField<Item.ImplementationClass, { idOnly: true }>,
      replacement: foundry.data.fields.ForeignDocumentField<Item.ImplementationClass, { idOnly: true }>
    }>>
  },

  dnd5e.documents.advancement.Advancement<any, any>
> {}
