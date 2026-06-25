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
    const BastionAttackMessageData: typeof import("./bastion-attack-message-data.mjs").default;
    type BastionAttackMessageData = import("./bastion-attack-message-data.mjs").default;

    const BastionTurnMessageData: typeof import("./bastion-turn-message-data.mjs").default;
    type BastionTurnMessageData = import("./bastion-turn-message-data.mjs").default;

    const RequestMessageData: typeof import("./request-message-data.mjs").default;
    type RequestMessageData = import("./request-message-data.mjs").default;

    const RestMessageData: typeof import("./rest-message-data.mjs").default;
    type RestMessageData = import("./rest-message-data.mjs").default;

    const TimePassedMessageData: typeof import("./time-passed-message-data.mjs").default;
    type TimePassedMessageData = import("./time-passed-message-data.mjs").default;

    const TurnMessageData: typeof import("./turn-message-data.mjs").default;
    type TurnMessageData = import("./turn-message-data.mjs").default;

    const UsageMessageData: typeof import("./usage-message-data.mjs").default;
    type UsageMessageData = import("./usage-message-data.mjs").default;

    // Config map (message type key → constructor).
    const config: {
      bastionAttack: typeof import("./bastion-attack-message-data.mjs").default;
      bastionTurn: typeof import("./bastion-turn-message-data.mjs").default;
      request: typeof import("./request-message-data.mjs").default;
      rest: typeof import("./rest-message-data.mjs").default;
      timePassed: typeof import("./time-passed-message-data.mjs").default;
      turn: typeof import("./turn-message-data.mjs").default;
      usage: typeof import("./usage-message-data.mjs").default;
    };

    // Chat-message custom fields (data/chat-message/fields/_module.mjs).
    namespace fields {
      const ActivationsField: typeof import("./fields/activations-field.mjs").default;
      type ActivationsField = import("./fields/activations-field.mjs").default;

      const ActorDeltasField: typeof import("./fields/deltas-field.mjs").ActorDeltasField;
      type ActorDeltasField = import("./fields/deltas-field.mjs").ActorDeltasField;

      const IndividualDeltaField: typeof import("./fields/deltas-field.mjs").IndividualDeltaField;
      type IndividualDeltaField = import("./fields/deltas-field.mjs").IndividualDeltaField;
    }
  }
}

export {};
