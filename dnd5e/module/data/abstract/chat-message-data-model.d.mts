/**
 * Abstract base class to add some shared functionality to all of the system's custom chat message types.
 * @abstract
 */
declare class ChatMessageDataModel<
  Schema extends foundry.data.fields.DataSchema,
  RenderContext extends fvttUtils.AnyObject = {}
> extends foundry.abstract.TypeDataModel<
  Schema,
  any
> {

  /**
   * Metadata for this chat message type.
   */
  static metadata: ChatMessageDataModel.Metadata

  get metadata(): ChatMessageDataModel.Metadata

  /* -------------------------------------------- */

  /**
   * Template to use when rendering this message.
   */
  get template(): string

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Perform any changes to the chat message's element before displaying in the list.
   * @param element  Element representing the entire chat message.
   * @param options       Options forwarded to the render function.
   */
  getHTML(element: HTMLElement, options: object): Promise<void>

  /* -------------------------------------------- */

  /**
   * Render the contents of this chat message.
   * @param options  Rendering options.
   */
  render(options?: object): Promise<string>

  /* -------------------------------------------- */

  /**
   * Prepare application rendering context data for a given render request.
   * @param options  Rendering options.
   * @protected
   */
  _prepareContext(options?: object): Promise<RenderContext>

  /* -------------------------------------------- */

  /**
   * Actions taken after the message has been rendered.
   * @protected
   */
  _onRender(element: HTMLElement)

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle click events within the card.
   * @param event  Triggering pointer event.
   */
  #onClick(event: PointerEvent)

  /* -------------------------------------------- */

  /**
   * A generic event handler for action clicks which can be extended by subclasses, called if no action is found in
   * the actions list in the message type's metadata.
   * @param event  Triggering pointer event.
   * @param target  Button with [data-action] defined.
   * @protected
   */
  _onClickAction(event: PointerEvent, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle using an activity.
   * @param event         Triggering click event.
   * @param target  Button that was clicked.
   */
  static #useActivity(this: ChatMessageDataModel<any>, event: Event, target: HTMLElement): Promise<void>
}

declare namespace ChatMessageDataModel {
  interface Metadata {
    actions: Record<string, foundry.applications.api.ApplicationV2.ClickAction>;
    template: string;
  }
}

export default ChatMessageDataModel