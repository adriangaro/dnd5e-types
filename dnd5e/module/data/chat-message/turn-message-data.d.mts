import ChatMessageDataModel from "../abstract/chat-message-data-model.mjs";
import ActivationsField from "./fields/activations-field.mjs";
import { ActorDeltasField } from "./fields/deltas-field.mjs";

/**
 * Data stored in a combat turn chat message.
 */
export default class TurnMessageData extends ChatMessageDataModel<
  {
    activations: ActivationsField,
    deltas: ActorDeltasField,
    origin: foundry.data.fields.SchemaField<{
      combat: foundry.data.fields.DocumentIdField<{ nullable: false, required: true }>,
      combatant: foundry.data.fields.DocumentIdField<{ nullable: false, required: true }>
    }>,
    trigger: foundry.data.fields.SetField<foundry.data.fields.StringField>
  },
  {

    actor: Item.Implementation,
    combat: Combat.Implementation,
    combatant: Combatant.Implementation,
    activities: ReturnType<typeof ActivationsField['processActivations']>,
    deltas: ReturnType<typeof ActorDeltasField['processDeltas']>,
  }
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The actor belonging to the combatant.
   */
  get actor(): Actor.Implementation

  /* -------------------------------------------- */

  /**
   * The combat during which this message was triggered.
   */
  get combat(): Combat.Implementation

  /* -------------------------------------------- */

  /**
   * The combatant to whom this message applies.
   */
  get combatant(): Combatant.Implementation
}

declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface ChatMessage {
        turn: typeof TurnMessageData
      }
    }
  }
}