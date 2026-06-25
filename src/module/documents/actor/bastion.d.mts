/**
 * A singleton class that manages global Bastion activity.
 *
 * Unlike the document classes, this is a plain singleton helper class (not registered into any
 * fvtt-types config); only its public API is modeled here. Private (`#`) helpers from the runtime
 * are intentionally omitted.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface Bastion` — downstream packages add
 * methods/getters by augmenting that interface. Dependencies whose types aren't ported yet
 * (chat-message system data, attack dialog) are intentionally loose (`object`/`unknown`) and tightened
 * as those land.
 */

declare class Bastion {
  /* ---- Public API ---- */

  /** Advance all bastions by a turn. */
  advanceAllBastions(): Promise<void>;

  /** Advance all the facilities of a given Actor by one bastion turn. */
  advanceAllFacilities(
    actor: Actor.Implementation,
    options?: {
      /** The number of days the bastion turn spanned. @defaultValue `7` */
      duration?: number;
      /** Update the actor's facilities. @defaultValue `true` */
      performUpdates?: boolean;
      /**
       * Print a chat message summary of the turn. If set to "auto" then the message will only be
       * created if an order is completed. @defaultValue `true`
       */
      summary?: boolean | "auto";
      /** Trigger events like recovery that are tied to turns, not days. @defaultValue `true` */
      turn?: boolean;
    },
  ): Promise<{ message?: ChatMessage.Implementation; updates: object[] }>;

  /** Advance the given facility by one bastion turn. */
  advanceTurn(
    facility: globalThis.Item.OfType<"facility">,
    options?: {
      /** The number of days the bastion turn spanned. @defaultValue `7` */
      duration?: number;
      /** Update the facility. @defaultValue `true` */
      performUpdates?: boolean;
      /** Trigger events like recovery that are tied to turns, not days. @defaultValue `true` */
      turn?: boolean;
    },
  ): Promise<Bastion.TurnResult>;

  /** Resolve a bastion attack against a given Actor's bastion. Returns the number of defenders who died. */
  resolveAttack(
    actor: Actor.Implementation,
    formula: string,
    options?: {
      /** Print a chat message summary of the attack. */
      summary?: boolean;
      /** The maximum number on a die roll that is considered a defender death. */
      threshold?: number;
    },
  ): Promise<number>;

  /* ---- Helpers ---- */

  /** Confirm the bastion turn should be advanced. */
  confirmAdvance(): Promise<void>;

  /** Initialize the bastion UI. */
  initializeUI(): void;

  /** Prompt the DM to resolve a bastion attack against a specific Actor. */
  promptAttack(actor?: Actor.Implementation | null): Promise<unknown>;
}

declare namespace Bastion {
  /** Result of advancing a single facility by one bastion turn. */
  interface TurnResult {
    /** The order that was completed, if any. */
    order?: dnd5e.types.Facility.Order.TypeKey;
    /** Gold generated during the turn. */
    gold?: number;
    /** Items produced during the turn. */
    items?: TurnItem[];
    /** Updates applied to the facility. */
    updates: object;
  }

  /** An item produced as part of order completion. */
  interface TurnItem {
    /** The UUID of the generated Item. */
    uuid: string;
    /** The quantity of items generated. */
    quantity: number;
  }
}

declare interface Bastion {}

export default Bastion;
