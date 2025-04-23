import ChatMessageDataModel from "../abstract/chat-message-data-model.mjs";
import ActivationsField from "./fields/activations-field.mjs";
import { ActorDeltasField } from "./fields/deltas-field.mjs";


/**
 * Data stored in a rest chat message.
 */
export default class RestMessageData extends ChatMessageDataModel<{
  activations: ActivationsField,
  deltas: ActorDeltasField,
  type: foundry.data.fields.StringField
}, {
  actor: Item.Implementation,
  content: string,
  activities: ReturnType<typeof ActivationsField['processActivations']>,
  deltas: ReturnType<typeof ActorDeltasField['processDeltas']>,
}> {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The actor for the chat message.
   */
  get actor(): Actor.Implementation
}

declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface ChatMessage {
        rest: typeof RestMessageData
      }
    }
  }
}