/** Application to handle applying damage from a chat card. */

import ChatTrayElement from "./chat-tray-element.mjs";
import TargetedApplicationMixin from "./targeted-application-mixin.mjs";

declare class DamageApplicationElement extends TargetedApplicationMixin(ChatTrayElement) {
  /** The HTML tag named used by this element. */
  static tagName: "damage-application";

  /** The apply damage button within the element. */
  applyButton: HTMLButtonElement;

  /** The chat message with which this damage is associated. */
  chatMessage: globalThis.ChatMessage.Implementation;

  /** Damage descriptions that will be applied by this application. */
  damages: dnd5e.types.documents.DamageDescription[];

  /** @override */
  override get shouldBuildTargetList(): boolean | void;

  /**
   * Options for a specific target.
   * @param uuid  UUID of the targeted token.
   */
  getTargetOptions(uuid: string): dnd5e.types.documents.DamageApplicationOptions;

  /** @override */
  override buildTargetListEntry(data: { uuid: string; name: string }): HTMLLIElement | void;

  connectedCallback(): void;

  /**
   * Calculate the total damage that will be applied to an actor.
   */
  calculateDamage(
    actor: globalThis.Actor.Implementation,
    options: dnd5e.types.documents.DamageApplicationOptions,
  ): {
    temp: number;
    tempMax: number;
    total: number;
    active: {
      modification: Set<string>;
      resistance: Set<string>;
      vulnerability: Set<string>;
      immunity: Set<string>;
      threshold: boolean;
    };
  };

  /**
   * Create the HTML for a new change source button.
   */
  getChangeSourceButton(
    config: { change: string; icon: string; type: string },
    targetOptions: dnd5e.types.documents.DamageApplicationOptions,
  ): string;

  /**
   * Get the label and pressed value for a specific change source.
   * @param type     Damage type represented by this source.
   * @param change   Change type (e.g. resistance, immunity, etc.).
   * @param options  Options object from which to determine final values.
   */
  getChangeSourceOptions(
    type: string,
    change: string,
    options: dnd5e.types.documents.DamageApplicationOptions,
  ): { label: string; pressed: string };

  /**
   * Refresh the damage total on a list entry based on modified options.
   */
  refreshListEntry(
    token: globalThis.Actor.Implementation,
    entry: HTMLLIElement,
    options: dnd5e.types.documents.DamageApplicationOptions,
  ): void;

  /**
   * Handle clicking the apply damage button.
   * @param event  Triggering click event.
   */
  _onApplyDamage(event: PointerEvent): Promise<void>;

  /**
   * Handle clicking a multiplier button or resistance toggle.
   * @param event  Triggering click event.
   */
  _onChangeOptions(event: PointerEvent): Promise<void>;

  /** @override */
  override _onOpen(): void;

  /** @override */
  override _onVisible(): void;
}

declare namespace DamageApplicationElement {
  interface Any extends DamageApplicationElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof DamageApplicationElement> {}
}

export default DamageApplicationElement;
