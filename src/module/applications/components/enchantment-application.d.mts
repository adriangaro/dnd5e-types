/** Application to handle applying enchantments to items from a chat card. */

declare const MaybeAdoptable: typeof HTMLElement;

/**
 * Application to handle applying enchantments to items from a chat card.
 */
declare class EnchantmentApplicationElement extends MaybeAdoptable {
  /**
   * The HTML tag named used by this element.
   */
  static tagName: string;

  /**
   * The chat message with which this enchantment is associated.
   */
  chatMessage: ChatMessage.Implementation;

  /**
   * Area where the enchantment limit & current count is displayed.
   */
  countArea: HTMLElement;

  /**
   * Area where items can be dropped to enchant.
   */
  dropArea: HTMLElement;

  /**
   * Activity providing the enchantment that will be applied.
   */
  get enchantmentActivity(): dnd5e.types.Activity.Instance;

  /**
   * Item providing the enchantment that will be applied with the proper scaling.
   */
  get enchantmentItem(): Item.Implementation;

  connectedCallback(): void;

  /**
   * Build a list of enchanted items. Will be called whenever the enchanted items are changed in order to update
   * the card list.
   */
  buildItemList(): void;

  /**
   * Handle dropping an item onto the control.
   * @param event  Triggering drop event.
   */
  _onDrop(event: DragEvent): Promise<void>;

  /**
   * Handle removing an enchantment.
   * @param event  Triggering drop event.
   */
  _onRemoveEnchantment(event: Event): Promise<void>;
}

declare namespace EnchantmentApplicationElement {
  interface Any extends EnchantmentApplicationElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof EnchantmentApplicationElement> {}
}

export default EnchantmentApplicationElement;
