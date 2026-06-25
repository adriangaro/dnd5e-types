/**
 * Custom chat message type used for a turn on a single bastion.
 *
 * All schema fields map to standard `foundry.data.fields` classes; no loose fields required.
 */

import ChatMessageDataModel from "../abstract/chat-message-data-model.mjs";

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `bastionTurn` chat-message subtype on the interface the funnel reads. */
    interface ChatMessage {
      bastionTurn: typeof import("./bastion-turn-message-data.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.ChatMessage.bastionTurn {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class BastionTurnMessageData extends ChatMessageDataModel<
  BastionTurnMessageData.Schema,
  BastionTurnMessageData.Base,
  BastionTurnMessageData.Derived
> {
  static override defineSchema(): BastionTurnMessageData.Schema;

  /** The actor for the chat message. */
  get actor(): Actor.Implementation | null;
}

declare namespace BastionTurnMessageData {
  /** Pre-Seam-D source schema (bastion-turn-message-data.mjs `defineSchema`). */
  type BaseSchema = {
    gold: foundry.data.fields.SchemaField<{
      claimed: foundry.data.fields.BooleanField;
      value: foundry.data.fields.NumberField;
    }>;
    items: foundry.data.fields.ArrayField<
      foundry.data.fields.SchemaField<{
        quantity: foundry.data.fields.NumberField;
        uuid: foundry.data.fields.DocumentUUIDField;
      }>
    >;
    orders: foundry.data.fields.ArrayField<
      foundry.data.fields.SchemaField<{
        id: foundry.data.fields.DocumentIdField;
        order: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Facility.Order.TypeKey | "", { required: true; blank: true }>;
      }>
    >;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.ChatMessage.bastionTurn.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.ChatMessage.bastionTurn.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.ChatMessage.bastionTurn.OverrideDerived
  >;
}

export default BastionTurnMessageData;
