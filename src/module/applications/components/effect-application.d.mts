/** Application to handle applying active effects from a chat card. */

import ChatTrayElement from "./chat-tray-element.mjs";
import TargetedApplicationMixin from "./targeted-application-mixin.mjs";

declare class EffectApplicationElement extends TargetedApplicationMixin(ChatTrayElement) {
  /**
   * The HTML tag named used by this element.
   */
  static tagName: "effect-application";

  /**
   * The chat message with which this application is associated.
   */
  chatMessage: ChatMessage.Implementation;

  /**
   * Active effects that will be applied by this application.
   */
  effects: ActiveEffect.Implementation[];

  /**
   * The list of active effects.
   */
  effectsList: HTMLUListElement;

  /** @override */
  connectedCallback(): void;

  /**
   * Options for a specific target.
   * @param uuid  UUID of the target.
   * @returns     Should this target be checked?
   */
  targetChecked(uuid: string): boolean;

  /**
   * Build a list of active effects.
   */
  buildEffectsList(): void;

  /**
   * Handle applying an Active Effect to a Token.
   * @param effect  The effect to apply.
   * @param actor   The actor.
   * @returns       The created effect.
   * @throws        If the effect could not be applied.
   */
  _applyEffectToActor(
    effect: ActiveEffect.Implementation,
    actor: Actor.Implementation,
  ): Promise<ActiveEffect.Implementation>;

  /**
   * Handle clicking the apply effect button.
   * @param event  Triggering click event.
   */
  _onApplyEffect(event: PointerEvent): Promise<void>;

  /**
   * Handle checking or unchecking a target.
   * @param event  Triggering change event.
   */
  _onCheckTarget(event: Event): void;
}

declare namespace EffectApplicationElement {
  interface Any extends EffectApplicationElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof EffectApplicationElement> {}
}

export default EffectApplicationElement;
