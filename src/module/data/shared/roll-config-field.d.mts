/**
 * `RollConfigField` — a `SchemaField` storing config for a specific roll
 * (`module/data/shared/roll-config-field.mjs`). It always injects a `roll` sub-field
 * (`{ min, max, mode }`), optionally an `ability` string, plus any extra fields passed in.
 *
 * `HasAbility = false` mirrors the runtime `{ ability: false }` (abilities' check/save).
 */

declare global {
  namespace dnd5e.types.fields {
    type RollConfigField<
      ExtraFields extends foundry.data.fields.DataSchema = {},
      HasAbility extends boolean = true,
    > = foundry.data.fields.SchemaField<
      dnd5e.types.PrettifyType<
        RollConfigField.AbilityPart<HasAbility> & {
          roll: foundry.data.fields.SchemaField<RollConfigField.RollSchema>;
        } & ExtraFields
      >
    >;

    namespace RollConfigField {
      type AbilityPart<HasAbility extends boolean> = HasAbility extends false
        ? {}
        : { ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { required: true; blank: true }> };

      /** `min`/`max` are nullable (default null); `mode` is the advantage mode (a number). */
      interface RollSchema extends foundry.data.fields.DataSchema {
        min: foundry.data.fields.NumberField<{ nullable: true; integer: true; initial: null; min: 1; max: 20 }>;
        max: foundry.data.fields.NumberField<{ nullable: true; integer: true; initial: null; min: 1; max: 20 }>;
        mode: foundry.data.fields.NumberField<{ initial: 0; choices: [-1, 0, 1] }>;
      }
    }
  }
}

/** Field for storing data for a specific type of roll. */
declare class RollConfigField<
  ExtraFields extends foundry.data.fields.DataSchema = {},
  HasAbility extends boolean = true,
> extends foundry.data.fields.SchemaField<
  dnd5e.types.PrettifyType<
    dnd5e.types.fields.RollConfigField.AbilityPart<HasAbility> & {
      roll: foundry.data.fields.SchemaField<dnd5e.types.fields.RollConfigField.RollSchema>;
    } & ExtraFields
  >
> {}

export { RollConfigField };
export {};
