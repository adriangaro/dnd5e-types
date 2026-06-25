/**
 * Data stored in a time passed chat message.
 */

import ChatMessageDataModel from "../abstract/chat-message-data-model.mjs";
import { ActorDeltasField } from "./fields/deltas-field.mjs";

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `timePassed` chat-message subtype on the interface the funnel reads. */
    interface ChatMessage {
      timePassed: typeof import("./time-passed-message-data.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.ChatMessage.timePassed {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** Data stored in a time passed chat message. */
declare class TimePassedMessageData extends ChatMessageDataModel<
  TimePassedMessageData.Schema,
  TimePassedMessageData.Base,
  TimePassedMessageData.Derived
> {
  static override defineSchema(): TimePassedMessageData.Schema;
}

declare namespace TimePassedMessageData {
  /** Pre-Seam-D source schema (time-passed-message-data.mjs `defineSchema`). */
  type BaseSchema = {
    /** Item recovery from this time change. */
    changes: foundry.data.fields.ArrayField<
      foundry.data.fields.SchemaField<{
        /** Deltas applied to this actor over the elapsed time. */
        deltas: ActorDeltasField;
        /** UUID of the actor to which the deltas apply. */
        uuid: foundry.data.fields.DocumentUUIDField;
      }>
    >;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.ChatMessage.timePassed.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.ChatMessage.timePassed.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.ChatMessage.timePassed.OverrideDerived
  >;
}

export default TimePassedMessageData;
