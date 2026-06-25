/**
 * Custom combatant with custom initiative roll handling.
 *
 * Extends the global client `Combatant` class. No SystemDocumentMixin, no SubType generic — the
 * dnd5e Combatant carries no system-specific data model narrowing.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface Combatant5e` — downstream packages
 * add document-level methods/getters by augmenting that interface (the document analogue of the
 * data-model Seam-D override interfaces). Types whose dependencies aren't ported yet (chat-message
 * deltas/activations fields, recovery period keys, combat recovery result shapes) are intentionally
 * loose (`object`/`unknown`) and tightened as those modules land.
 */

declare class Combatant5e extends Combatant {
  /**
   * Create a chat message representing actor changes and displaying possible actions for this turn.
   */
  createTurnMessage(data?: {
    deltas?: dnd5e.types.fields.ActorDeltasField.ActorDeltasData;
    periods?: string[];
    rolls?: import("../dice/basic-roll.mjs").default[];
  }): Promise<ChatMessage.Implementation | undefined>;

  /**
   * Key for the group to which this combatant should belong in the encounter tracker, or `null` if
   * it can't be grouped.
   */
  getGroupingKey(): string | null;

  /**
   * Key for the group to which this combatant should belong when rolling initiative, or `null` if it
   * can't be grouped.
   */
  getInitiativeGroupingKey(): string | null;

  /**
   * @override
   * Returns the initiative roll for this combatant. When an actor is present, delegates to
   * `actor.getInitiativeRoll()`; otherwise falls back to a plain `CONFIG.Dice.D20Roll` using the
   * provided formula (or `"1d20"`).
   * @param formula  Optional formula override for the initiative roll.
   */
  getInitiativeRoll(formula?: string): Roll;

  /**
   * Key identifying a unique set of actors in the combat, optionally prefixed by a grouping
   * discriminator.
   */
  getUniqueKey(prefix?: string): string | null;

  /** Reset combat-related uses. */
  recoverCombatUses(periods: dnd5e.types.LimitedUsePeriod.TypeKey[]): Promise<void>;

  /** Trigger this combatant's dynamic token to refresh. */
  refreshDynamicRing(): void;

  /* ---- Socket event handlers ---- */

  /** @inheritDoc */
  protected _onDelete(options: object, userId: string): void;
}

declare namespace Combatant5e {
  /**
   * Result of preparing combat-related recovery. Extends `ActorUpdatesDescription` with an
   * additional `rolls` property for any recovery rolls performed.
   *
   * @see ActorUpdatesDescription (module/data/chat-message/fields/_types.mjs)
   */
  interface CombatRecoveryResults {
    /** Updates applied to the actor. */
    actor: object;
    /** Full data for Items to create (with IDs maintained). */
    create?: object[];
    /** IDs of items to be deleted from the actor. */
    delete?: string[];
    /** Updates applied to items on the actor. */
    item: object[];
    /** Any recovery rolls performed. */
    rolls: import("../dice/basic-roll.mjs").default[];
  }
}

interface Combatant5e {}

export default Combatant5e;
