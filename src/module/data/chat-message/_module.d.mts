/**
 * Runtime API fragment for `dnd5e.dataModels.chatMessage` — mirrors the runtime
 * `module/data/chat-message/_module.mjs` (the message data models, the `fields` sub-namespace, and
 * the `config` type→constructor map).
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.chatMessage {
    const BastionAttackMessageData: typeof import("../chat-message/bastion-attack-message-data.mjs").default;
    type BastionAttackMessageData = import("../chat-message/bastion-attack-message-data.mjs").default;

    const BastionTurnMessageData: typeof import("../chat-message/bastion-turn-message-data.mjs").default;
    type BastionTurnMessageData = import("../chat-message/bastion-turn-message-data.mjs").default;

    const RequestMessageData: typeof import("../chat-message/request-message-data.mjs").default;
    type RequestMessageData = import("../chat-message/request-message-data.mjs").default;

    const RestMessageData: typeof import("../chat-message/rest-message-data.mjs").default;
    type RestMessageData = import("../chat-message/rest-message-data.mjs").default;

    const TimePassedMessageData: typeof import("../chat-message/time-passed-message-data.mjs").default;
    type TimePassedMessageData = import("../chat-message/time-passed-message-data.mjs").default;

    const TurnMessageData: typeof import("../chat-message/turn-message-data.mjs").default;
    type TurnMessageData = import("../chat-message/turn-message-data.mjs").default;

    const UsageMessageData: typeof import("../chat-message/usage-message-data.mjs").default;
    type UsageMessageData = import("../chat-message/usage-message-data.mjs").default;

    // Config map (message type key → constructor).
    const config: {
      bastionAttack: typeof import("../chat-message/bastion-attack-message-data.mjs").default;
      bastionTurn: typeof import("../chat-message/bastion-turn-message-data.mjs").default;
      request: typeof import("../chat-message/request-message-data.mjs").default;
      rest: typeof import("../chat-message/rest-message-data.mjs").default;
      timePassed: typeof import("../chat-message/time-passed-message-data.mjs").default;
      turn: typeof import("../chat-message/turn-message-data.mjs").default;
      usage: typeof import("../chat-message/usage-message-data.mjs").default;
    };

    // Chat-message custom fields (data/chat-message/fields/_module.mjs).
    namespace fields {
      const ActivationsField: typeof import("../chat-message/fields/activations-field.mjs").default;
      type ActivationsField = import("../chat-message/fields/activations-field.mjs").default;

      const ActorDeltasField: typeof import("../chat-message/fields/deltas-field.mjs").ActorDeltasField;
      type ActorDeltasField = import("../chat-message/fields/deltas-field.mjs").ActorDeltasField;

      const IndividualDeltaField: typeof import("../chat-message/fields/deltas-field.mjs").IndividualDeltaField;
      type IndividualDeltaField = import("../chat-message/fields/deltas-field.mjs").IndividualDeltaField;
    }
  }
}

export {};
