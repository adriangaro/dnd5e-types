/**
 * Custom chat message type used for requesting an action be performed for a specific actor.
 *
 * Loose typing notes:
 *  - `data` is a free-form `ObjectField` (runtime payload handed to request handlers) → typed as-is.
 *  - The `targets[].result`/`targets[].user` `ForeignDocumentField`s resolve to documents; their
 *    inner field shape is kept loose (`DocumentIdField`) since the resolved-document overlay is the
 *    funnel's concern, not this schema's.
 *  - Public methods take/return loose types (`object`/`unknown`/`Promise<unknown>`) for unported
 *    rendering/handler deps.
 */

import ChatMessageDataModel from "../abstract/chat-message-data-model.mjs";

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `request` chat-message subtype on the interface the funnel reads. */
    interface ChatMessage {
      request: typeof import("./request-message-data.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.ChatMessage.request {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class RequestMessageData extends ChatMessageDataModel<
  RequestMessageData.Schema,
  RequestMessageData.Base,
  RequestMessageData.Derived
> {
  static override defineSchema(): RequestMessageData.Schema;

  /**
   * Highlight successes and failures in the results, if applicable.
   * @param element  The rendered chat card.
   */
  protected _highlightSuccessFailure(element: HTMLElement): void;

  protected _onRender(element: HTMLElement): void;

  /**
   * Handle associating a newly created request result message with an actor and updating this message.
   * @param message  The created chat message.
   */
  static onCreateMessage(message: ChatMessage.Implementation): void;

  /**
   * Handle associating an updated request result message with an actor and updating this message.
   * @param message   The updated chat message.
   * @param changes   The changes applied to the message.
   * @param options   Update options.
   * @param userId    The ID of the user performing the update.
   */
  static onUpdateResultMessage(
    message: ChatMessage.Implementation,
    changes: object,
    options: object,
    userId: string
  ): void;
}

declare namespace RequestMessageData {
  /** Pre-Seam-D source schema (request-message-data.mjs `defineSchema`). */
  type BaseSchema = {
    button: foundry.data.fields.SchemaField<{
      icon: foundry.data.fields.StringField;
      label: foundry.data.fields.StringField;
    }>;
    /** Free-form payload handed to request handlers. */
    data: foundry.data.fields.ObjectField;
    handler: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Request.TypeKey, { required: true; blank: false }>;
    targets: foundry.data.fields.ArrayField<
      foundry.data.fields.SchemaField<{
        /** DocumentUUIDField({ type: "Actor" }). */
        actor: foundry.data.fields.DocumentUUIDField<{ type: "Actor" }>;
        /** ForeignDocumentField(BaseChatMessage) — stored as an id, resolved to a ChatMessage. */
        result: foundry.data.fields.ForeignDocumentField<typeof foundry.documents.BaseChatMessage>;
        /** ForeignDocumentField(BaseUser) — stored as an id, resolved to a User. */
        user: foundry.data.fields.ForeignDocumentField<typeof foundry.documents.BaseUser>;
      }>
    >;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.ChatMessage.request.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.ChatMessage.request.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.ChatMessage.request.OverrideDerived
  >;
}

export default RequestMessageData;
