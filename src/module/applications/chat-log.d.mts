/** Custom implementation of the chat log to support saving tray states. */

declare class ChatLog5e extends foundry.applications.sidebar.tabs.ChatLog {
  updateMessage(message: ChatMessage.Implementation, notify?: boolean): Promise<void>;
}

declare namespace ChatLog5e {
  interface Any extends ChatLog5e {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ChatLog5e> {}
}

export default ChatLog5e;
