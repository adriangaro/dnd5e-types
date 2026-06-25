/**
 * Data model for an heal activity.
 *
 * SIMPLE activity DATA MODEL: adds a single embedded `healing` DamageField. `prepareFinalData` only
 * calls `prepareDamageLabel`, which writes to `labels.damage`/`labels.damages` — these ride the base
 * `labels` record, so no DerivedData overlay is needed (defaults to base).
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Heal {
    type Schema = dnd5e.types.MergeSchemas<
      dnd5e.types.Activity.BaseSchema,
      {
        type: foundry.data.fields.StringField<
          { required: true; blank: false; readOnly: true },
          "heal",
          "heal",
          "heal"
        >;
        healing: dnd5e.types.fields.DamageField;
      }
    >;
  }
}

declare class BaseHealActivityData extends BaseActivityData<dnd5e.types.Activity.Heal.Schema> {
  static override defineSchema(): dnd5e.types.Activity.Heal.Schema;
}

export default BaseHealActivityData;
