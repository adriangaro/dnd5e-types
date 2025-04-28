import { ActorDeltasField } from "../data/chat-message/fields/deltas-field.mjs";

/**
 * Custom combatant with custom initiative roll handling.
 */
declare class Combatant5e<
  SubType extends Combatant.SubType = Combatant.SubType
> extends Combatant<
  SubType
> {
  /**
   * Create a chat message representing actor changes and displaying possible actions for this turn.
   * @param {object} [data={}]
   * @param {ActorDeltasData} [data.deltas]
   * @param {string[]} [data.periods]
   * @param {BasicRoll[]} [data.rolls]
   * @returns {ChatMessage5e|void}
   */
  createTurnMessage(data: { 
    deltas: ActorDeltasField.Data, 
    periods: dnd5e.types.ActivityActivation.TypeKey[], 
    rolls: dnd5e.dice.BasicRoll[]
  }): Promise<ChatMessage.Implementation | void>

  /* -------------------------------------------- */

  /**
   * Key for the group to which this combatant should belong, or `null` if it can't be grouped.
   */
  getGroupingKey(): string | null


  /* -------------------------------------------- */

  /**
   * Reset combat-related uses.
   */
  recoverCombatUses(periods: dnd5e.types.RecoveryPeriod.CombatTypeKey[]): Promise<void>

  /* -------------------------------------------- */

  /**
   * Trigger this combatant's dynamic token to refresh.
   */
  refreshDynamicRing()
}

declare namespace Combatant5e {
  interface CombatRecoveryResults {
    actor: Actor.UpdateData;
    item: Item.UpdateData[];
    rolls: dnd5e.dice.BasicRoll[];
  }
}

export default Combatant5e;

declare module "fvtt-types/configuration" {
  interface DocumentClassConfig {
    Combatant: typeof Combatant5e<Combatant.SubType>
  }

  interface ConfiguredCombatant<SubType extends Combatant.SubType> {
    document: Combatant5e<SubType>;
  }
}

