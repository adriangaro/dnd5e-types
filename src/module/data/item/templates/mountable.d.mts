/**
 * Data model template for equipment that can be mounted on a vehicle.
 *
 * Pure `SystemDataModel` template (parent = Item) for equipment that can be mounted on a vehicle.
 * Folded into item models via `ItemDataModel.mixin(...)`; exposes its schema as a global interface
 * so it composes through `dnd5e.types.GetSchema<typeof MountableTemplate>` at the mixin site.
 */

import SystemDataModel from "../../abstract/system-data-model.mjs";

declare global {
  namespace dnd5e.types.Item.Mountable {
    interface Schema extends foundry.data.fields.DataSchema {
      cover: foundry.data.fields.NumberField<{ min: 0; max: 1 }>;
      crew: foundry.data.fields.SchemaField<{
        max: foundry.data.fields.NumberField<{ min: 0; integer: true }>;
        value: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField<{ type: "Actor" }>>;
      }>;
      hp: foundry.data.fields.SchemaField<
        {
          conditions: foundry.data.fields.StringField;
          dt: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
          max: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
          value: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
        },
        { required: false; initial: undefined }
      >;
      speed: foundry.data.fields.SchemaField<
        {
          conditions: foundry.data.fields.StringField;
          units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.MovementUnit.TypeKey, { required: true; blank: false }>;
          value: foundry.data.fields.NumberField<{ min: 0; integer: true }>;
        },
        { required: false; initial: undefined }
      >;
    }

    /** Instance methods this template MIXES onto a model (composed onto items via a companion interface). */
    interface Methods {
      /** Prepare mountable item properties. */
      prepareMountableData(): void;
    }
  }
}

export declare class MountableTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.Mountable.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends SystemDataModel<Schema, BaseData, DerivedData> {
  static override defineSchema(): dnd5e.types.Item.Mountable.Schema;
}
export declare interface MountableTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.Mountable.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends dnd5e.types.Item.Mountable.Methods {}

export default MountableTemplate;
