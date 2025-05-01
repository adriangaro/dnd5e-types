/**
 * Base configuration application for advancements that can be extended by other types to implement custom
 * editing interfaces.
 *
 * @param {Advancement} advancement            The advancement item being edited.
 * @param {object} [options={}]                Additional options passed to FormApplication.
 * @param {string} [options.dropKeyPath=null]  Path within advancement configuration where dropped items are stored.
 *                                             If populated, will enable default drop & delete behavior.
 */
export default class AdvancementConfig<
  Document extends dnd5e.documents.advancement.Advancement.Any,
  Options extends FormApplication.Options = FormApplication.Options
> extends FormApplication<
  Options, Document
> {
  protected override _updateObject(event: Event, formData?: object): Promise<unknown>;
  /* -------------------------------------------- */

  /**
   * The ID of the advancement being created or edited.
   */
  #advancementId: string;

  /* -------------------------------------------- */

  /**
   * Parent item to which this advancement belongs.
   */
  item: Item.Implementation;

  /* -------------------------------------------- */

  /**
   * The advancement being created or edited.
   */
  get advancement(): Document

  /* -------------------------------------------- */

  /**
   * Perform any changes to configuration data before it is saved to the advancement.
   */
  prepareConfigurationUpdate(configuration: Document['configuration']): Promise<Document['configuration']>

  /* -------------------------------------------- */

  /**
   * Helper method to take an object and apply updates that remove any empty keys.
   * @protected
   */
  static _cleanedObject(object: object): object

  /* -------------------------------------------- */
  /*  Drag & Drop for Item Pools                  */
  /* -------------------------------------------- */

  /**
   * Handle deleting an existing Item entry from the Advancement.
   * @protected
   */
  _onItemDelete(event: Event): Promise<Item.Implementation>

  /* -------------------------------------------- */

  /**
   * Called when an item is dropped to validate the Item before it is saved. An error should be thrown
   * if the item is invalid.
   * @throws An error if the item is invalid.
   * @protected
   */
  _validateDroppedItem(event: Event, item: Item.Implementation)
}
