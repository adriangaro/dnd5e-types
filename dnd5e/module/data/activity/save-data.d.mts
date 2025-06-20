import { simplifyBonus } from "../../utils.mjs";
import FormulaField from "../fields/formula-field.mjs";
import DamageField from "../shared/damage-field.mjs";
import BaseActivityData, { type DamageIndexesPrep } from "./base-activity.mjs";
import AppliedEffectField from "./fields/applied-effect-field.mjs";
/**
 * Data model for an save activity.
 */
declare class SaveActivityData extends BaseActivityData<
  'save',
  dnd5e.types.MergeSchemas<
    {
      damage: foundry.data.fields.SchemaField<{
        onSave: foundry.data.fields.StringField,
        parts: foundry.data.fields.ArrayField<DamageField>
      }>,
      effects: foundry.data.fields.ArrayField<AppliedEffectField<{
        onSave: foundry.data.fields.BooleanField
      }>>,
      save: foundry.data.fields.SchemaField<{
        ability: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey, {required: true, nullable: false}>
        >,
        dc: foundry.data.fields.SchemaField<{
          calculation: foundry.data.fields.StringField<{ initial: "initial" }>,
          formula: FormulaField<{ deterministic: true }>
        }>
      }>
    },
    {
      save: foundry.data.fields.SchemaField<
        {},
        foundry.data.fields.SchemaField.DefaultOptions,
        {},
        {
          dc: {
            bonus: string,
            value: number
          }
        }
      >
    } & DamageIndexesPrep
  >
> {}

export default SaveActivityData

declare global {
  namespace dnd5e.types {
    namespace Damage {
      interface DefaultScalingTypes {
        whole: true
        half: true
      }

      /**
       * Override interface for declaration merging.
       * Add custom damage types here (e.g., sonic, void).
       * @example
       * declare global {
       * namespace dnd5e.types.Damage {
       * interface OverrideDamageTypes {
       * "sonic": true
       * }
       * }
       * }
       */
      interface OverrideScalingTypes extends Record<string, boolean | never> {}

      // --- Derived Types ---
      type ScalingTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultScalingTypes,
        OverrideScalingTypes
      >;
      type ScalingTypeKey = dnd5e.types.ExtractKeys<ScalingTypes>;
    }

    interface DND5EConfig {
      /**
       * Methods by which damage scales relative to the overall scaling increase.
       */
      damageScalingModes: {
        [K in Damage.ScalingTypeKey]: {
          label: string,
          labelCantrip: string
        }
      }
    }
  }
}