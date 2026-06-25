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
    const ActorDataModel: typeof import("./system-data-model.mjs").ActorDataModel;
    type ActorDataModel = import("./system-data-model.mjs").ActorDataModel;
    const ItemDataModel: typeof import("./system-data-model.mjs").ItemDataModel;
    type ItemDataModel = import("./system-data-model.mjs").ItemDataModel;
    const ActiveEffectDataModel: typeof import("./active-effect-data-model.mjs").default;
    type ActiveEffectDataModel = import("./active-effect-data-model.mjs").default;
    const ChatMessageDataModel: typeof import("./chat-message-data-model.mjs").default;
    type ChatMessageDataModel = import("./chat-message-data-model.mjs").default;
    const SparseDataModel: typeof import("./sparse-data-model.mjs").default;
    type SparseDataModel = import("./sparse-data-model.mjs").default;
  }
}

export {};
