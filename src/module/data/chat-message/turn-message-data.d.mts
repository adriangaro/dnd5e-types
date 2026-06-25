/**
 * Data stored in a combat turn chat message.
 */

import ChatMessageDataModel from "../abstract/chat-message-data-model.mjs";
import ActivationsField from "./fields/activations-field.mjs";
import { ActorDeltasField } from "./fields/deltas-field.mjs";

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `turn` chat-message subtype on the interface the funnel reads. */
    interface ChatMessage {
      turn: typeof import("./turn-message-data.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.ChatMessage.turn {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** Data stored in a combat turn chat message. */
declare class TurnMessageData extends ChatMessageDataModel<
  TurnMessageData.Schema,
  TurnMessageData.Base,
  TurnMessageData.Derived
> {
  static override defineSchema(): TurnMessageData.Schema;

  /** The actor belonging to the combatant. */
  get actor(): Actor.Implementation | void;
  /** The combat during which this message was triggered. */
  get combat(): Combat.Implementation | undefined;
  /** The combatant to whom this message applies. */
  get combatant(): Combatant.Implementation | undefined;
}

declare namespace TurnMessageData {
  /** Pre-Seam-D source schema (turn-message-data.mjs `defineSchema`). */
  type BaseSchema = {
    /** Relative UUIDs of activations available this turn. */
    activations: ActivationsField;
    /** Deltas applied to the actor + items this turn. */
    deltas: ActorDeltasField;
    origin: foundry.data.fields.SchemaField<{
      combat: foundry.data.fields.DocumentIdField<{ nullable: false; required: true }>;
      combatant: foundry.data.fields.DocumentIdField<{ nullable: false; required: true }>;
    }>;
    trigger: foundry.data.fields.SetField<foundry.data.fields.StringField>;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.ChatMessage.turn.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.ChatMessage.turn.OverrideBase>;
  type Derived = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.ChatMessage.turn.OverrideDerived>;
}

export default TurnMessageData;
