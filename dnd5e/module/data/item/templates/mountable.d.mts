import SystemDataModel from "../../abstract.mjs";

/**
 * Data model template for equipment that can be mounted on a vehicle.
 * @mixin
 */
export default class MountableTemplate extends SystemDataModel<{
  cover: foundry.data.fields.NumberField<{ min: 0, max: 1 }>,
  crewed: foundry.data.fields.BooleanField,
  hp: foundry.data.fields.SchemaField<
    {
      conditions: foundry.data.fields.StringField,
      dt: foundry.data.fields.NumberField<{ integer: true, min: 0 }>,
      max: foundry.data.fields.NumberField<{ integer: true, min: 0 }>,
      value: foundry.data.fields.NumberField<{ integer: true, min: 0 }>
    },
    { required: false, initial: undefined }
  >,
  speed: foundry.data.fields.SchemaField<
    {
      conditions: foundry.data.fields.StringField,
      value: foundry.data.fields.NumberField<{ min: 0 }>
    },
    { required: false, initial: undefined }
  >
}> { }
