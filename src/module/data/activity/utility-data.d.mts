/**
 * Data model for an utility activity.
 *
 * CANONICAL EXAMPLE (simple activity DATA MODEL): adds a top-level `roll` field, no extra derived
 * data beyond the base `labels`. The document (`documents/activity/utility.d.mts`) is
 * `ActivityMixin(this)` and registers the type.
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Utility {
    type Schema = dnd5e.types.MergeSchemas<
      dnd5e.types.Activity.BaseSchema,
      {
        type: foundry.data.fields.StringField<
          { required: true; blank: false; readOnly: true },
          "utility",
          "utility",
          "utility"
        >;
        roll: foundry.data.fields.SchemaField<{
          /** Arbitrary formula that can be rolled. */
          formula: dnd5e.types.fields.FormulaField;
          /** Label for the rolling button. */
          name: foundry.data.fields.StringField;
          /** Should the roll configuration dialog be displayed? */
          prompt: foundry.data.fields.BooleanField;
          /** Should the rolling button be visible to all players? */
          visible: foundry.data.fields.BooleanField;
        }>;
      }
    >;
  }
}

/**
 * Data model for an utility activity.
 * @extends {BaseActivityData<UtilityActivityData>}
 * @mixes UtilityActivityData
 */
declare class BaseUtilityActivityData extends BaseActivityData<dnd5e.types.Activity.Utility.Schema> {
  static override defineSchema(): dnd5e.types.Activity.Utility.Schema;
  static override transformTypeData(source: object, activityData: object, options: object): object;
}

export default BaseUtilityActivityData;
