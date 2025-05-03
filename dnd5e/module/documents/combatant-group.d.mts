//TODO replace with foundry.documents.CombatantGroup

/**
 * Custom CombatantGroup implementation.
 */
export default class CombatantGroup5e extends (class {}) {
  /**
   * Nominate a Combatant that will perform operations on behalf of the group.
   * @returns {Combatant5e|null}
   */
  get activeCombatant(): Combatant.Implementation | null
}
