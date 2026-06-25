/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/chat-message/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.chatMessage {
      interface BastionAttackMessageSystemData {
      damaged: string|null; // Facility that was damage by the attack.
      deaths?: number; // Number of defenders killed in the attack.
      resolved: boolean; // Have the effects of the attack been fully resolved?
      undefended: boolean; // Was the bastion undefended when it was attacked?
      }

      interface BastionTurnMessageSystemData {
      gold: {
        claimed: boolean; // Has this gold been claimed by the actor?
        value: number; // Amount of gold produced by this turn.
      };
      items: dnd5e.types.documents.BastionTurnItem[];
      orders: BastionTurnOrder[];
      }

      interface BastionTurnOrder {
      id: string; // ID of the facility that was issued the order.
      order: string; // Order that was issued.
      }

      interface RequestMessageSystemData {
      button: {
        icon?: string; // Font awesome code or path to SVG icon for the request button.
        label?: string; // Label used for the button.
      };
      data: Record<string, unknown>; // Arbitrary data passed to the request handling method in addition to actor.
      handler: string; // Name of the request handler specified in the config.
      targets: RequestTargetData[]; // Actors that were the target of the request.
      }

      interface RequestTargetData {
      actor: string; // Actor for whom the request was made.
      result?: globalThis.ChatMessage.Implementation; // Chat message indicating the result of the request.
      user?: globalThis.User.Implementation; // Specific user who should handle the request. If not present, then any owner of the actor is able to handle it.
      }

      interface RestMessageSystemData {
      activations: dnd5e.types.data.chatMessage.fields.ActivationsData; // Activities that can be used after this rest, stored as relative UUIDs.
      deltas: dnd5e.types.data.chatMessage.fields.ActorDeltasData; // Actor/item recovery from this turn change.
      request?: globalThis.ChatMessage.Implementation; // Rest request chat message for which this rest was performed.
      type: dnd5e.types.RestType.TypeKey; // Type of rest performed.
      }

      interface TimePassedMessageSystemData {
      changes: DocumentDeltasData[]; // Item recovery from this time change.
      }

      interface DocumentDeltasData {
      deltas: dnd5e.types.data.chatMessage.fields.ActorDeltasData; // Data deltas for a actor update.
      uuid: string; // UUID of the actor to which the deltas apply.
      }

      interface TurnMessageSystemData {
      activations: dnd5e.types.data.chatMessage.fields.ActivationsData; // Activities that can be used with these periods, stored as relative UUIDs.
      deltas: dnd5e.types.data.chatMessage.fields.ActorDeltasData; // Actor/item recovery from this turn change.
      origin: {
        combat: string; // ID of the triggering combat.
        combatant: string; // ID of the relevant combatant within the combat.
      };
      periods: Set<string>; // Combat state change that triggered this message.
      }

      interface UsageMessageSystemData {
      cause?: string; // Relative ID of the activity that caused this one on the same actor.
      deltas: dnd5e.types.data.chatMessage.fields.ActorDeltasData; // Actor/item consumption from this turn change.
      effects: string[]; // Relative UUIDs of effects that can be applied.
      }

  }
}

export {};
