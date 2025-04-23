import RestMessageData from "./rest-message-data.mjs";
import TurnMessageData from "./turn-message-data.mjs";

export {
  TurnMessageData
};
export * as fields from "./fields/_module.mjs";

export const config: {
  rest: typeof RestMessageData,
  turn: typeof TurnMessageData
};

declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface ChatMessage {
      }
    }
  }
}

declare module "fvtt-types/configuration" {
  interface DataModelConfig {
    ChatMessage: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.ChatMessage>,
  }
}
