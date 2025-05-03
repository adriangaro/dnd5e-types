/**
 * Custom element designed to display as a collapsible tray in chat.
 */
export default class ChatTrayElement extends HTMLElement {

  static observedAttributes: string[];

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Is the tray expanded or collapsed?
   */
  get open(): boolean

  set open(open: any)

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Handle clicks to the collapsible header.
   * @param event  Triggering click event.
   */
  _handleClickHeader(event: PointerEvent)

  /* -------------------------------------------- */

  /**
   * Handle changing the collapsed state of this element.
   * @param open  Is the element open?
   */
  _handleToggleOpen(open: boolean)
}
