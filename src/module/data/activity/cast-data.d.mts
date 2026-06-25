/**
 * Data model for a Cast activity.
 *
 * Adds a `spell` field describing the cast spell (ability/challenge/level/properties/spellbook/uuid)
 * and DELETES the base `effects` field (`effects: never` in the override, mirroring runtime
 * `delete schema.effects`). prepareFinalData only mutates existing base fields (`name`/`img`/
 * `visibility.requireMagic`) and sets non-enumerable `canOverride` flags — no new persisted/derived
 * system values — so no DerivedData overlay.
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Cast {
    type Schema = dnd5e.types.MergeSchemas<
      dnd5e.types.Activity.BaseSchema,
      {
        type: foundry.data.fields.StringField<
          { required: true; blank: false; readOnly: true },
          "cast",
          "cast",
          "cast"
        >;
        // deletes base `effects` (mirrors runtime `delete schema.effects`).
        effects: never;
        spell: foundry.data.fields.SchemaField<{
          ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { required: true; blank: true }>;
          challenge: foundry.data.fields.SchemaField<{
            attack: foundry.data.fields.NumberField;
            save: foundry.data.fields.NumberField;
            override: foundry.data.fields.BooleanField;
          }>;
          level: foundry.data.fields.NumberField;
          properties: foundry.data.fields.SetField<
            dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperty.Spell.TypeKey, { required: true; blank: false }>,
            { initial: ["vocal", "somatic", "material"] }
          >;
          spellbook: foundry.data.fields.BooleanField<{ initial: true }>;
          uuid: foundry.data.fields.DocumentUUIDField<{ type: "Item" }>;
        }>;
      }
    >;
  }
}

/**
 * Data model for a Cast activity.
 * @extends {BaseActivityData<CastActivityData>}
 * @mixes CastActivityData
 */
declare class BaseCastActivityData extends BaseActivityData<dnd5e.types.Activity.Cast.Schema> {
  static override defineSchema(): dnd5e.types.Activity.Cast.Schema;
}

export default BaseCastActivityData;
