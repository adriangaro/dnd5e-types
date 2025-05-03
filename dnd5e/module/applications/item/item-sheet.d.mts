import Accordion from "../accordion.mjs";
// TODO foundry.appv1?.sheets?.ItemSheet
/**
 * Override and extend the core ItemSheet implementation to handle specific item types.
 */
export default class ItemSheet5e extends ItemSheet {
  constructor(...args: any[]);


  /* -------------------------------------------- */

  /**
   * Whether advancements on embedded items should be configurable.
   */
  advancementConfigurationMode: boolean;

  /* -------------------------------------------- */

  /**
   * The description currently being edited.
   */
  editingDescriptionTarget: string;



  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /* -------------------------------------------- */

  /**
   * Get the display object used to show the advancement tab.
   * @param item  The item for which the advancement is being prepared.
   * @returns  Object with advancement data grouped by levels.
   */
  _getItemAdvancement(item: Item.Implementation): object;

  /* -------------------------------------------- */

  /**
   * Prepare tags for an Advancement.
   * @param advancement  The Advancement.
   * @protected
   */
  _getItemAdvancementTags(advancement: dnd5e.types.Advancement.Any): { label: string; icon: string }[];

  /* -------------------------------------------- */

  /**
   * Get the base weapons and tools based on the selected type.
   * @param [context]        Sheet preparation context.
   * @returns  Object with base items for this type formatted for selectOptions.
   * @protected
   */
  _getItemBaseTypes(context?: object): Promise<object | null>;

  /* -------------------------------------------- */

  /**
   * Get the text item status which is shown beneath the Item type in the top-right corner of the sheet.
   * @returns  Item status string if applicable to item's type.
   * @protected
   */
  _getItemStatus(): string | null;

  /* -------------------------------------------- */

  /**
   * Retrieve the list of fields that are currently modified by Active Effects on the Item.
   * @returns
   * @protected
   */
  _getItemOverrides(): string[];

  /* -------------------------------------------- */

  /**
   * Get the Array of item properties which are used in the small sidebar of the description tab.
   * @returns    List of property labels to be shown.
   * @private
   */
  _getItemProperties(): string[];



  /* -------------------------------------------- */

  /**
   * Handle spawning the configuration applications.
   * @param event   The click event which originated the selection.
   * @protected
   */
  _onConfigMenu(event: Event): void;

  /* -------------------------------------------- */

  /**
   * Add or remove a damage part from the damage formula.
   * @param event             The original click event.
   * @returns  Item with updates applied.
   * @private
   */
  _onDamageControl(event: Event): Promise<Item.Implementation | null>;

  /* -------------------------------------------- */

  /**
   * Handle actions on entries in the enchanted items list.
   * @param event  Triggering click event.
   * @private
   */
  _onEnchantmentAction(event: PointerEvent): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle actions on a view sheet button.
   * @param event  Triggering click event.
   * @private
   */
  _onView(event: PointerEvent): Promise<void>;


  /* -------------------------------------------- */

  /**
   * Handle the dropping of ActiveEffect data onto an Item Sheet
   * @param event                  The concluding DragEvent which contains drop data
   * @param data                      The data transfer extracted from the event
   * @returns  The created ActiveEffect object or false if it couldn't be created.
   * @protected
   */
  _onDropActiveEffect(event: DragEvent, data: object): Promise<ActiveEffect.Implementation | boolean>;

  /* -------------------------------------------- */

  /**
   * Handle the dropping of an advancement or item with advancements onto the advancements tab.
   * @param event                  The concluding DragEvent which contains drop data.
   * @param data                      The data transfer extracted from the event.
   * @returns
   */
  _onDropAdvancement(event: DragEvent, data: object): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle one of the advancement actions from the buttons or context menu.
   * @param target  Button or context menu entry that triggered this action.
   * @param action   Action being triggered.
   * @returns
   */
  _onAdvancementAction(target: Element, action: string): Promise<void> | void;

  /* -------------------------------------------- */


  /**
   * Instantiate accordion widgets.
   * @returns
   * @protected
   */
  _createAccordions(): Accordion[];
}
