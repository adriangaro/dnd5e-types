import BaseActivityData from "./base-activity.mjs";

/**
 * Data model for a Forward activity.
 */
export default class ForwardActivityData extends BaseActivityData<
  'forward',
  {
    duration: never,
    effects: never,
    range: never,
    target: never,
    activity: foundry.data.fields.SchemaField<{
      id: foundry.data.fields.DocumentIdField
    }>
  }
> {}
