/**
 * Request handler config domain (Seam A). `CONFIG.DND5E.requests`.
 *
 * Handler functions for named request/response operations (rest, skill, ...). Each value is a
 * `RequestCallback5e`: `(actor, request, config, options?) => Promise<ChatMessage>`.
 */

declare global {
  namespace dnd5e.types {
    namespace Request {
      /** The core request handlers. */
      interface DefaultTypes {
        rest: true;
        skill: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Additional options provided at request fulfillment time. */
      interface Options5e {
        /** The event forwarded from the user clicking the request button. */
        event?: Event;
      }

      /**
       * Handler signature for a named request/response operation.
       * @param actor   The actor fulfilling the request.
       * @param request The request message.
       * @param config  Additional request configuration.
       * @param options Additional options provided at fulfillment time.
       * @returns Result chat message that will be associated with request.
       */
      type Callback = (
        actor: globalThis.Actor.Implementation,
        request: globalThis.ChatMessage.Implementation,
        config: object,
        options?: Options5e
      ) => Promise<globalThis.ChatMessage.Implementation | null>;
    }

    interface DND5EConfig {
      requests: { [K in dnd5e.types.Request.TypeKey]: dnd5e.types.Request.Callback };
    }
  }
}

export {};
