/**
 * Data stored in a rest chat message.
 *
 * `request` is a foundry `ForeignDocumentField` pointing at a ChatMessage.
 */

import ChatMessageDataModel from "../abstract/chat-message-data-model.mjs";
import ActivationsField from "./fields/activations-field.mjs";
import { ActorDeltasField } from "./fields/deltas-field.mjs";

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `rest` chat-message subtype on the interface the funnel reads. */
    interface ChatMessage {
      rest: typeof import("./rest-message-data.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.ChatMessage.rest {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}

    /**
     * The resolved value of the `request` field: a full ChatMessage of any subtype. Declared as a named
     * interface that `extends ChatMessage<…>` so TS treats it as a LAZY reference — this is the deferral
     * point that lets the self-referential schema type-check. (`ForeignDocumentField`'s default initialized
     * type, `Document.StoredForName<"ChatMessage">`, expands the per-subtype union eagerly when the field is
     * instantiated, and that union re-includes `rest` itself → TS2502. Pinning the field's InitializedType
     * to this interface keeps the complete ChatMessage type while breaking the eager expansion.)
     */
    interface StoredRequestMessage extends globalThis.ChatMessage<globalThis.ChatMessage.SubType> {}
  }
}

declare class RestMessageData extends ChatMessageDataModel<
  RestMessageData.Schema,
  RestMessageData.Base,
  RestMessageData.Derived
> {
  static override defineSchema(): RestMessageData.Schema;

  /** The actor for the chat message. */
  get actor(): Actor.Implementation | void;
}

declare namespace RestMessageData {
  /** Pre-Seam-D source schema (rest-message-data.mjs `defineSchema`). */
  type BaseSchema = {
    /** Activities that can be used after this rest, stored as relative UUIDs. */
    activations: ActivationsField;
    /** Actor/item recovery from this turn change. */
    deltas: ActorDeltasField;
    /**
     * `ForeignDocumentField(BaseChatMessage)` — resolves to the originating request ChatMessage.
     * Source/persisted form is the id string; the initialized type is the full ChatMessage, pinned via
     * the lazy {@link dnd5e.types.DataModelConfig.ChatMessage.rest.StoredRequestMessage} interface so the
     * self-referential type (a ChatMessage subtype whose system points back at a ChatMessage) resolves.
     */
    request: foundry.data.fields.ForeignDocumentField<
      typeof foundry.documents.BaseChatMessage,
      foundry.data.fields.ForeignDocumentField.DefaultOptions,
      string | dnd5e.types.DataModelConfig.ChatMessage.rest.StoredRequestMessage | null,
      dnd5e.types.DataModelConfig.ChatMessage.rest.StoredRequestMessage | null
    >;
    /** Type of rest performed. */
    type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.RestType.TypeKey, {}>;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.ChatMessage.rest.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.ChatMessage.rest.OverrideBase>;
  type Derived = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.ChatMessage.rest.OverrideDerived>;
}

export default RestMessageData;
