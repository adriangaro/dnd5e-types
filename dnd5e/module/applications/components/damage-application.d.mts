import type { Actor5e } from "@dnd5e/module/documents/_module.mjs";
import { formatNumber } from "../../utils.mjs";
import ChatTrayElement from "./chat-tray-element.mjs";
import TargetedApplicationMixin from "./targeted-application-mixin.mjs";

/**
 * List of multiplier options as tuples containing their numeric value and rendered text.
 */
declare const MULTIPLIERS: [number, string][]

/**
 * Application to handle applying damage from a chat card.
 */
declare class DamageApplicationElement extends TargetedApplicationMixin(ChatTrayElement) {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The apply damage button within the element.
   */
  applyButton: HTMLButtonElement;

  /* -------------------------------------------- */

  /**
   * The chat message with which this damage is associated.
   */
  chatMessage: ChatMessage.Implementation;

  /* -------------------------------------------- */

  /**
   * Damage descriptions that will be applied by this application.
   */
  damages: Actor5e.DamageDescription[]

  /* -------------------------------------------- */

  /**
   * Options for each application target.
   */
  #targetOptions: Map<string, Actor5e.DamageApplicationOptions>

  /**
   * Options for a specific target.
   * @param uuid  UUID of the targeted token.
   */
  getTargetOptions(uuid: string): Actor5e.DamageApplicationOptions

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  connectedCallback()

  /* -------------------------------------------- */

  /**
   * Calculate the total damage that will be applied to an actor.
   * @param actor
   * @param options
   */
  calculateDamage(actor: Actor.Implementation, options: Actor5e.DamageApplicationOptions): {temp: number, total: number, active: Record<string, Set<string>>}

  /* -------------------------------------------- */

  /**
   * Get the label and pressed value for a specific change source.
   * @param type                       Damage type represented by this source.
   * @param change                     Change type (e.g. resistance, immunity, etc.).
   * @param options  Options object from which to determine final values.
   */
  getChangeSourceOptions(type: string, change: string , options: Actor5e.DamageApplicationOptions): {label: string, pressed: string}

  /* -------------------------------------------- */

  /**
   * Refresh the damage total on a list entry based on modified options.
   * @param token
   * @param entry
   * @param options
   */
  refreshListEntry(token: Actor.Implementation, entry: HTMLLIElement, options: Actor5e.DamageApplicationOptions)
  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Handle clicking the apply damage button.
   * @param event  Triggering click event.
   */
  _onApplyDamage(event: PointerEvent): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle clicking a multiplier button or resistance toggle.
   * @param event  Triggering click event.
   */
  _onChangeOptions(event:PointerEvent): Promise<void>
}

export default DamageApplicationElement