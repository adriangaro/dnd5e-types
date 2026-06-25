/**
 * Data stored in a usage chat message.
 *
 * `ActorDeltasField` (this folder's `fields/deltas-field.mjs`) is fully ported and used here
 * as `ActorDeltasField<{ required:true; nullable:true; initial:null }>`. The `activity` getter
 * returns the known-good `dnd5e.types.Activity.Instance | undefined` instance type.
 */

import ChatMessageDataModel from "../abstract/chat-message-data-model.mjs";
import { ActorDeltasField } from "./fields/deltas-field.mjs";

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `usage` chat-message subtype on the interface the funnel reads. */
    interface ChatMessage {
      usage: typeof import("./usage-message-data.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.ChatMessage.usage {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class UsageMessageData extends ChatMessageDataModel<
  UsageMessageData.Schema,
  UsageMessageData.Base,
  UsageMessageData.Derived
> {
  static override defineSchema(): UsageMessageData.Schema;

  /** The activity for the chat message. */
  get activity(): dnd5e.types.Activity.Instance | undefined;
  /** The actor for the chat message. */
  get actor(): Actor.Implementation | undefined;
  /** The item for the chat message. */
  get item(): Item.Implementation | undefined;

  /**
   * Control visibility of chat card action buttons based on viewing user.
   * @param element  Rendered contents of the message.
   */
  protected _displayChatActionButtons(element: HTMLElement): void;
}

declare namespace UsageMessageData {
  /** Pre-Seam-D source schema (usage-message-data.mjs `defineSchema`). */
  type BaseSchema = {
    /** StringField — TODO replaced with DocumentUUIDField in dnd5e 6.0. */
    cause: foundry.data.fields.StringField;
    concentration: foundry.data.fields.DocumentIdField<{ required: false }>;
    /** Deltas applied by the item usage; nullable (no deltas recorded). */
    deltas: ActorDeltasField<{ required: true; nullable: true; initial: null }>;
    /** TODO: Replace with UUID field in DnD5e 6.0 */
    effects: foundry.data.fields.ArrayField<foundry.data.fields.StringField<{ blank: false }>>;
    scaling: foundry.data.fields.NumberField;
    spellLevel: foundry.data.fields.NumberField;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.ChatMessage.usage.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.ChatMessage.usage.OverrideBase>;
  type Derived = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.ChatMessage.usage.OverrideDerived>;
}

export default UsageMessageData;
