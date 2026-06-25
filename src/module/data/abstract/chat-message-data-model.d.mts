/**
 * Abstract base class to add some shared functionality to all of the system's custom chat message types.
 *
 * Mirrors the runtime base
 * (`extends foundry.abstract.TypeDataModel`) with the parent pinned to the configured
 * `ChatMessage` document, so each concrete message subtype is its document's registered `.system`.
 *
 * Author-facing generic order is `<Schema, BaseData, DerivedData>` (Parent is pinned here),
 * matching {@link SystemDataModel}'s convention.
 */

type _DataSchema = foundry.data.fields.DataSchema;

export default class ChatMessageDataModel<
  Schema extends _DataSchema = fvttUtils.EmptyObject,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends foundry.abstract.TypeDataModel<Schema, ChatMessage.Implementation, BaseData, DerivedData> {
  /** Metadata for this chat message type. */
  static metadata: ChatMessageDataModel.Metadata;
  get metadata(): ChatMessageDataModel.Metadata;

  /** Template to use when rendering this message. */
  get template(): string;

  /* ---- Rendering ---- */

  /** Perform any changes to the chat message's element before displaying in the list. */
  getHTML(element: HTMLElement, options?: object): Promise<void>;
  /** Render the contents of this chat message. */
  render(options?: object): Promise<string>;
  /**
   * Prepare application rendering context data for a given render request.
   * @param options  Rendering options.
   * @returns Context data for the render operation.
   */
  protected _prepareContext(options?: object): Promise<object>;
  /** Actions taken after the message has been rendered. */
  protected _onRender(element: HTMLElement): void;

  /* ---- Event handlers ---- */

  /** Generic action-click handler extended by subclasses (when no metadata action matches). */
  protected _onClickAction(event: PointerEvent, target: HTMLElement): void;
}

declare abstract class AnyChatMessageDataModel extends ChatMessageDataModel<any, any, any> {
  constructor(...args: any[]);
}

declare namespace ChatMessageDataModel {
  interface Any extends AnyChatMessageDataModel {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyChatMessageDataModel> {}

  /** Action handler entry: a function, or `{ handler, buttons }` to restrict mouse buttons. */
  type ActionHandler =
    | ((this: ChatMessageDataModel.Any, event: PointerEvent, target: HTMLElement) => unknown)
    | { handler: (this: ChatMessageDataModel.Any, event: PointerEvent, target: HTMLElement) => unknown; buttons: number[] };

  interface Metadata {
    /** `[data-action]` handlers keyed by action name. */
    actions: Record<string, ActionHandler>;
    /** Handlebars template path used to render the message body. */
    template: string;
  }
}
