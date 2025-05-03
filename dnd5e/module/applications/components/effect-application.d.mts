import ChatTrayElement from "./chat-tray-element.mjs";
import TargetedApplicationMixin from "./targeted-application-mixin.mjs";

/**
 * Application to handle applying active effects from a chat card.
 */
export default class EffectApplicationElement extends TargetedApplicationMixin(ChatTrayElement) {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The chat message with which this application is associated.
   */
  chatMessage: ChatMessage.Implementation;

  /* -------------------------------------------- */

  /**
   * Active effects that will be applied by this application.
   */
  effects: ActiveEffect.Implementation[]

  /* -------------------------------------------- */

  /**
   * The list of active effects.
   */
  effectsList: HTMLUListElement;

  /* -------------------------------------------- */

  /**
   * Checked status for application targets.
   */
  #targetOptions: Map<string, boolean>

  /**
   * Options for a specific target.
   * @param {string} uuid  UUID of the target.
   * @returns {boolean}    Should this target be checked?
   */
  targetChecked(uuid: string): boolean

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  connectedCallback()
  /* -------------------------------------------- */

  /**
   * Build a list of active effects.
   */
  buildEffectsList()

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Handle applying an Active Effect to a Token.
   * @param effect      The effect to apply.
   * @param actor              The actor.
   * @returns  The created effect.
   * @throws                      If the effect could not be applied.
   * @protected
   */
  _applyEffectToActor(
    effect: ActiveEffect.Implementation, actor: Actor.Implementation
  ): Promise<ActiveEffect.Implementation>
  /* -------------------------------------------- */

  /**
   * Handle clicking the apply effect button.
   * @param event  Triggering click event.
   */
  _onApplyEffect(event: PointerEvent): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle checking or unchecking a target.
   * @param event  Triggering change event.
   */
  _onCheckTarget(event: Event)
}
