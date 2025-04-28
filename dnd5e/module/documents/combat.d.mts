/**
 * Extended version of Combat to trigger events on combat start & turn changes.
 */
declare class Combat5e<
  SubType extends Combat.SubType = Combat.SubType
> extends Combat<
  SubType
> {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Expansion state for groups within this combat.
   * @type {Set<string>}
   */
  expandedGroups: Set<string>

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Determine which group each combatant should be added to, or if a new group should be created.
   */
  createGroups(): Map<
    string,
    { combatants: Combatant.Implementation[], expanded: boolean }
  >

  /* -------------------------------------------- */

  /**
   * Reset combat specific uses.
   * @protected
   */
  _recoverUses(types: Record<
    dnd5e.types.ActivityActivation.TypeKey, boolean
  >): Promise<void>
}

declare namespace Combat5e {
  
}

export default Combat5e;

declare module "fvtt-types/configuration" {
  interface DocumentClassConfig {
    Combat: typeof Combat5e<Combat.SubType>
  }

  interface ConfiguredCombat<SubType extends Combat.SubType> {
    document: Combat5e<SubType>;
  }
}

