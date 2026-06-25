/**
 * Runtime API fragment for `dnd5e.dataModels.abstract`.
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.abstract {
    const SystemDataModel: typeof import("./system-data-model.mjs").default;
    type SystemDataModel = import("./system-data-model.mjs").default;
    const ActorDataModel: typeof import("./actor-data-model.mjs").default;
    type ActorDataModel = import("./actor-data-model.mjs").default;
    const ItemDataModel: typeof import("./item-data-model.mjs").default;
    type ItemDataModel = import("./item-data-model.mjs").default;
    const ActiveEffectDataModel: typeof import("./active-effect-data-model.mjs").default;
    type ActiveEffectDataModel = import("./active-effect-data-model.mjs").default;
    const ChatMessageDataModel: typeof import("./chat-message-data-model.mjs").default;
    type ChatMessageDataModel = import("./chat-message-data-model.mjs").default;
    const SparseDataModel: typeof import("./sparse-data-model.mjs").default;
    type SparseDataModel = import("./sparse-data-model.mjs").default;
  }
}

export {};
