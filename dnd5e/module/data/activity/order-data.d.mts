import BaseActivityData from "./base-activity.mjs";

/**
 * Data model for an order activity.
 */
declare class OrderActivityData extends BaseActivityData<
  'order',
  dnd5e.types.MergeSchemas<
    {
      sort: never,
      activation: never,
      consumption: never,
      description: never,
      duration: never,
      effects: never,
      range: never,
      target: never,
      uses: never
    },
    {
      order: foundry.data.fields.StringField<{ required: true, blank: false, nullable: false }>
    }
  >

> {}

export default OrderActivityData;