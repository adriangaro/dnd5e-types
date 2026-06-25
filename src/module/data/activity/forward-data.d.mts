/**
 * Data model for a Forward activity.
 *
 * A Forward activity proxies another activity on the same item. Its `defineSchema()` DELETES the
 * base `duration`, `effects`, `range`, and `target` fields (modeled here with `never` values, which
 * MergeSchemas treats as deletions) and adds a single `activity` SchemaField holding the forwarded
 * activity's id. `prepareFinalData` only reassigns `this.activation` to the forwarded activity's
 * activation (same type) and pins a NON-enumerable `canOverride` flag, so there is no DerivedData
 * overlay beyond the base.
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Forward {
    type Schema = dnd5e.types.MergeSchemas<
      dnd5e.types.Activity.BaseSchema,
      {
        type: foundry.data.fields.StringField<
          { required: true; blank: false; readOnly: true },
          "forward",
          "forward",
          "forward"
        >;
        // base fields removed by the runtime `delete schema.<key>` calls.
        duration: never;
        effects: never;
        range: never;
        target: never;
        activity: foundry.data.fields.SchemaField<{
          id: foundry.data.fields.DocumentIdField;
        }>;
      }
    >;
  }
}

declare class BaseForwardActivityData extends BaseActivityData<dnd5e.types.Activity.Forward.Schema> {
  static override defineSchema(): dnd5e.types.Activity.Forward.Schema;
}

export default BaseForwardActivityData;
