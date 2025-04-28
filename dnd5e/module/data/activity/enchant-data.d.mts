import IdentifierField from "../fields/identifier-field.mjs";
import BaseActivityData from "./base-activity.mjs";
import AppliedEffectField from "./fields/applied-effect-field.mjs";


/**
 * Data model for a enchant activity.
 *
 */
export default class EnchantActivityData extends BaseActivityData<
  dnd5e.types.MergeSchemas<
    {
      effects: foundry.data.fields.ArrayField<
        AppliedEffectField<{
          level: foundry.data.fields.SchemaField<{
            min: foundry.data.fields.NumberField<{ min: 0, integer: true }>,
            max: foundry.data.fields.NumberField<{ min: 0, integer: true }>
          }>,
          riders: foundry.data.fields.SchemaField<{
            activity: foundry.data.fields.SetField<foundry.data.fields.DocumentIdField>,
            effect: foundry.data.fields.SetField<foundry.data.fields.DocumentIdField>,
            item: foundry.data.fields.SetField<foundry.data.fields.DocumentUUIDField>
          }>
        }, 'enchantment'>
      >
      enchant: foundry.data.fields.SchemaField<{
        identifier: IdentifierField
      }>,
      restrictions: foundry.data.fields.SchemaField<{
        allowMagical: foundry.data.fields.BooleanField,
        categories: foundry.data.fields.SetField<foundry.data.fields.StringField>,
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<
            dnd5e.types.ItemProperties.TypeKey
          >
        >,
        type: dnd5e.types.fields.RestrictedStringField<Item.SubType>
      }>
    },
    {}
  >
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  get actionType(): "ench"

  /* -------------------------------------------- */

  get applicableEffects(): null

  /* -------------------------------------------- */

  /**
   * Enchantments that have been applied by this activity.
   */
  get appliedEnchantments(): ActiveEffect.OfType<'enchantment'>[]

  /* -------------------------------------------- */

  /**
   * Enchantments that can be applied based on spell/character/class level.
   */
  get availableEnchantments(): this['effects']

  /* -------------------------------------------- */

  /**
   * List of item types that are enchantable.
   */
  static get enchantableTypes(): Set<Item.SubType>
}

type d = dnd5e.types.PrettifyType<EnchantActivityData['effects'][number]>