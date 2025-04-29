import BaseActivityData from "./base-activity.mjs";

/**
 * Data model for an order activity.
 */
export default class OrderActivityData extends BaseActivityData<
  dnd5e.types.MergeSchemas<
    {
      [K in keyof dnd5e.types.GetSchema<typeof BaseActivityData<{}>>]: never
    },
    {
      _id: foundry.data.fields.DocumentIdField<{ initial: () => string }>
      type: foundry.data.fields.StringField<{
        blank: false, required: true, readOnly: true, initial: () => string
      }>,
      name: foundry.data.fields.StringField<{ initial: undefined }>,
      img: foundry.data.fields.FilePathField<{ initial: undefined, categories: ["IMAGE"], base64: false }>,
      order: foundry.data.fields.StringField<{ required: true, blank: false, nullable: false }>
    }
  >

> {}