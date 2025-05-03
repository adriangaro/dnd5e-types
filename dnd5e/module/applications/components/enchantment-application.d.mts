/**
 * Application to handle applying enchantments to items from a chat card.
 */
export default class EnchantmentApplicationElement extends HTMLElement {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The chat message with which this enchantment is associated.
   */
  chatMessage: ChatMessage.Implementation;

  /* -------------------------------------------- */

  /**
   * Area where the enchantment limit & current count is displayed.
   */
  countArea: HTMLElement;

  /* -------------------------------------------- */

  /**
   * Area where items can be dropped to enchant.
   */
  dropArea: HTMLElement;

  /* -------------------------------------------- */

  /**
   * Activity providing the enchantment that will be applied.
   */
  get enchantmentActivity(): dnd5e.types.Activity.OfType<'enchant'>;

  /* -------------------------------------------- */

  /**
   * Item providing the enchantment that will be applied.
   */
  get enchantmentItem(): Item.Implementation;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  connectedCallback(): void;

  /* -------------------------------------------- */

  /**
   * Build a list of enchanted items. Will be called whenever the enchanted items are changed in order to update
   * the card list.
   */
  buildItemList(): void;

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Handle dropping an item onto the control.
   * @param event  Triggering drop event.
   */
  _onDrop(event: Event): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle removing an enchantment.
   * @param event  Triggering drop event.
   */
  _onRemoveEnchantment(event: Event): Promise<void>;
}