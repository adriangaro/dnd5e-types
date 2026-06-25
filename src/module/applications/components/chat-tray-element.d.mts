/** Custom element designed to display as a collapsible tray in chat. */

declare class ChatTrayElement extends HTMLElement {
  static observedAttributes: string[];

  /**
   * Is the tray expanded or collapsed?
   */
  get open(): boolean;
  set open(open: boolean);

  /**
   * Whether the tray is visible in the chat log.
   */
  get visible(): boolean;
  set visible(visible: boolean);

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;

  /**
   * Handle clicks to the collapsible header.
   * @param event  Triggering click event.
   */
  _handleClickHeader(event: PointerEvent): void;

  /**
   * Handle changing the collapsed state of this element.
   * @param open  Is the element open?
   */
  _handleToggleOpen(open: boolean): void;

  /**
   * Optionally perform some action when this element is toggled open.
   */
  protected _onOpen(): void;

  /**
   * Optionally perform some action when this element becomes visible.
   */
  protected _onVisible(): void;
}

declare namespace ChatTrayElement {
  interface Any extends ChatTrayElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ChatTrayElement> {}
}

export default ChatTrayElement;
