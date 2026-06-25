/**
 * Data model for a enchant activity.
 *
 * Overrides base `effects` (the AppliedEffectField gains a `riders` sub-schema), and adds the
 * `enchant` and `restrictions` schema fields. No system-mutating derived data (only getters), so
 * no DerivedData overlay.
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Enchant {
    type Schema = dnd5e.types.MergeSchemas<
      dnd5e.types.Activity.BaseSchema,
      {
        type: foundry.data.fields.StringField<
          { required: true; blank: false; readOnly: true },
          "enchant",
          "enchant",
          "enchant"
        >;
        // overrides base `effects` (relies on MergeSchemas last-wins).
        effects: foundry.data.fields.ArrayField<
          dnd5e.types.fields.AppliedEffectField<{
            riders: foundry.data.fields.SchemaField<{
              activity: foundry.data.fields.SetField<foundry.data.fields.DocumentIdField>;
              effect: foundry.data.fields.SetField<foundry.data.fields.DocumentIdField>;
              item: foundry.data.fields.SetField<foundry.data.fields.DocumentUUIDField<{ type: "Item" }>>;
            }>;
          }>
        >;
        enchant: foundry.data.fields.SchemaField<{
          self: foundry.data.fields.BooleanField;
        }>;
        restrictions: foundry.data.fields.SchemaField<{
          allowMagical: foundry.data.fields.BooleanField;
          categories: foundry.data.fields.SetField<foundry.data.fields.StringField>;
          properties: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperty.TypeKey, { required: true; blank: false }>>;
          type: dnd5e.types.fields.RestrictedStringField<globalThis.Item.SubType | "", { required: true; blank: true }>;
        }>;
      }
    >;
  }
}

declare class BaseEnchantActivityData extends BaseActivityData<dnd5e.types.Activity.Enchant.Schema> {
  static override defineSchema(): dnd5e.types.Activity.Enchant.Schema;

  /**
   * Enchantments that have been applied by this activity.
   */
  get appliedEnchantments(): import("../../../documents/active-effect.mjs").default[];

  /**
   * Enchantments that can be applied based on spell/character/class level.
   */
  get availableEnchantments(): dnd5e.types.data.activity.EnchantEffectApplicationData[];

  /**
   * List of item types that are enchantable.
   */
  static get enchantableTypes(): Set<string>;
}

export default BaseEnchantActivityData;
