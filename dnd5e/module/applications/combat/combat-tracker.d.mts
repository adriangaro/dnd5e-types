import ContextMenu5e from "../context-menu.mjs";
import { formatNumber, getPluralRules } from "../../utils.mjs";



/**
 * An extension of the base CombatTracker class to provide some 5e-specific functionality.
 */
export default class CombatTracker5e extends foundry.applications?.sidebar?.tabs?.CombatTracker {
  /* -------------------------------------------- */

  /**
   * Adjust initiative tracker to group combatants.
   * @param html  The combat tracker being rendered.
   */
  renderGroups(html: HTMLElement)

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Retrieve an appropriate group name for a list of combatants.
   * @param combatants  The combatants.
   */
  static getGroupName(combatants: Combatant.Implementation[]): string
}
