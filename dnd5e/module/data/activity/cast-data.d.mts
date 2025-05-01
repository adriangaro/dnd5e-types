import BaseActivityData from "./base-activity.mjs";

/**
 * Data model for a Cast activity.
 */
declare class CastActivityData extends BaseActivityData<
  'cast',
  dnd5e.types.MergeSchemas<
    {
      effects: never,
      spell: foundry.data.fields.SchemaField<{
        ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey>,
        challenge: foundry.data.fields.SchemaField<{
          attack: foundry.data.fields.NumberField,
          save: foundry.data.fields.NumberField,
          override: foundry.data.fields.BooleanField
        }>,
        level: foundry.data.fields.NumberField,
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperties.Spell.TypeKey>, { initial: ["vocal", "somatic", "material"] }
        >,
        spellbook: foundry.data.fields.BooleanField<{ initial: true }>,
        uuid: foundry.data.fields.DocumentUUIDField
      }>
    },
    {
      activation: foundry.data.fields.SchemaField<
        {},
        {},
        {},
        {
          canOverride: boolean
        }
      >,
      duration: foundry.data.fields.SchemaField<
        {},
        {},
        {},
        {
          canOverride: boolean
        }
      >,
      range: foundry.data.fields.SchemaField<
        {},
        {},
        {},
        {
          canOverride: boolean
        }
      >,
      target: foundry.data.fields.SchemaField<
        {},
        {},
        {},
        {
          canOverride: boolean
        }
      >
    }
  >
> {}

export default  CastActivityData;