import DamageField from "../shared/damage-field.mjs";
import BaseActivityData from "./base-activity.mjs";

/**
 * Data model for an heal activity.
 */
export default class HealActivityData extends BaseActivityData<
  'heal',
  dnd5e.types.MergeSchemas<
    {
      healing: DamageField<dnd5e.types.Healing.TypeKey>
    },
    {}
  >
> {}
