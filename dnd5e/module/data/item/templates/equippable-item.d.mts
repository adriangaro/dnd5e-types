import SystemDataModel from "../../abstract.mjs";

/**
 * Data model template with information on items that can be attuned and equipped.
 *
 * @mixin
 */
export default class EquippableItemTemplate extends SystemDataModel<{
  attunement: foundry.data.fields.StringField<{required: true, label: "DND5E.Attunement"}>,
  attuned: foundry.data.fields.BooleanField<{label: "DND5E.Attuned"}>,
  equipped: foundry.data.fields.BooleanField<{required: true, label: "DND5E.Equipped"}>
}> {
  /* -------------------------------------------- */

  /**
   * Create attunement filter configuration.
   */
  static get compendiumBrowserAttunementFilter(): dnd5e.types.CompendiumBrowserFilterDefinitionEntry

  /* -------------------------------------------- */
  /*  Data Migrations                             */
  /* -------------------------------------------- */

  /**
   * Migrate the item's attuned boolean to attunement string.
   */
  static #migrateAttunement(source: EquippableItemTemplate['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate the equipped field.
   */
  static #migrateEquipped(source: EquippableItemTemplate['_source'])

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Ensure items that cannot be attuned are not marked as attuned.
   */
  prepareFinalEquippableData()

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Chat properties for equippable items.
   */
  get equippableItemCardProperties(): string[]

  /* -------------------------------------------- */

  /**
   * Are the magical properties of this item, such as magical bonuses to armor & damage, available?
   */
  get magicAvailable(): boolean 

  /* -------------------------------------------- */
  /*  Socket Event Handlers                       */
  /* -------------------------------------------- */

  /**
   * Set as equipped for NPCs, and unequipped for PCs.
   */
  preCreateEquipped(data: object, options: object, user: User.Implementation)
}
