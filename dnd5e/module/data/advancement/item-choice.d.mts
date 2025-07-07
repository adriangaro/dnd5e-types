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
    type: dnd5e.types.fields.RestrictedStringField<Item.SubType, { blank: false, nullable: true, initial: null }>
  },
  null
> { }

/**
 * Value data for Item Choice advancement.
 */
export class ItemChoiceValueData extends foundry.abstract.DataModel<
  {
    ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey>,
    added: MappingField<MappingField<foundry.data.fields.StringField>>,
    replaced: MappingField<foundry.data.fields.SchemaField<{
      level: foundry.data.fields.NumberField<{ integer: true, min: 0 }>,
      original: foundry.data.fields.ForeignDocumentField<Item.ImplementationClass, { idOnly: true }>,
      replacement: foundry.data.fields.ForeignDocumentField<Item.ImplementationClass, { idOnly: true }>
    }>>
  },
  null
> {}

type d = ItemChoiceValueData['replaced']