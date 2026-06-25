/**
 * Data model for an order activity.
 *
 * SIMPLE activity DATA MODEL: adds one subtype-specific `order` field. `prepareData` only mutates the
 * base `img` (already in BaseSchema), so there is no DerivedData overlay beyond the base.
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Order {
    /**
     * Explicit literal schema matching the runtime defineSchema — does NOT spread BaseSchema
     * because the runtime returns a hand-written object that does not call super.defineSchema().
     */
    type Schema = {
      _id: foundry.data.fields.DocumentIdField<{ initial: () => string }>;
      type: foundry.data.fields.StringField<
        { required: true; blank: false; readOnly: true },
        "order",
        "order",
        "order"
      >;
      name: foundry.data.fields.StringField<{ initial: undefined }>;
      img: foundry.data.fields.FilePathField<{
        initial: undefined;
        categories: ["IMAGE"];
        base64: false;
      }>;
      /** The issued order. */
      order: foundry.data.fields.StringField<
        { required: true; blank: false; nullable: false },
        dnd5e.types.Facility.Order.TypeKey,
        dnd5e.types.Facility.Order.TypeKey
      >;
    };
  }
}

/**
 * Data model for an order activity.
 * @extends {BaseActivityData<OrderActivityData>}
 * @mixes OrderActivityData
 */
declare class BaseOrderActivityData extends BaseActivityData<dnd5e.types.Activity.Order.Schema> {
  static override defineSchema(): dnd5e.types.Activity.Order.Schema;

  /** @inheritDoc */
  prepareData(): void;
}

export default BaseOrderActivityData;
