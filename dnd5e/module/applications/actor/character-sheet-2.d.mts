import type { Actor5e } from "#dnd5e/module/documents/_module.mjs";
import CharacterData from "../../data/actor/character.mjs";
import * as Trait from "../../documents/actor/trait.mjs";
import { formatNumber } from "../../utils.mjs";
import CompendiumBrowser from "../compendium-browser.mjs";
import ContextMenu5e from "../context-menu.mjs";
import SheetConfig5e from "../sheet-config.mjs";
import ActorSheet5eCharacter from "./character-sheet.mjs";
import ActorSheetV2Mixin from "./sheet-v2-mixin.mjs";

/**
 * An Actor sheet for player character type actors.
 * @mixes ActorSheetV2
 */
export default class ActorSheet5eCharacter2 extends ActorSheetV2Mixin(ActorSheet5eCharacter) {

  /**
   * Proficiency class names.
   */
  static PROFICIENCY_CLASSES: Record<dnd5e.types.Proficiency.TypeKey, string>

  /**
   * Whether the user has manually opened the death save tray.
   * @protected
   */
  _deathTrayOpen: boolean;

  /* -------------------------------------------- */

  /**
   * Handle displaying the bastion tab when characters are eligible.
   * @protected
   */
  _toggleBastionTab()

  /* -------------------------------------------- */

  /**
   * Toggle the death save tray.
   * @param open  Force a particular open state.
   * @protected
   */
  _toggleDeathTray(open?: boolean)

  /* -------------------------------------------- */

  /**
   * Handle the user performing some sheet action.
   * @param event  The triggering event.
   * @protected
   */
  _onAction(event: PointerEvent)

  /* -------------------------------------------- */

  /**
   * Handle prompting the user to add a new facility.
   * @param event  The triggering event.
   * @protected
   */
  _onAddFacility(event: PointerEvent): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle deleting an occupant from a facility.
   * @param event  The triggering event.
   * @protected
   */
  _onDeleteOccupant(event: PointerEvent): Promise<Item.Implementation> | void 

  /* -------------------------------------------- */

  /**
   * Show available items of a given type.
   * @param {string} type                       The item type.
   * @param {object} [options={}]
   * @param {string} [options.classIdentifier]  Identifier of the class when finding a subclass.
   * @protected
   */
  _onFindItem(type: string, options?: { classIdentifier: string }): Promise<void> 

  /* -------------------------------------------- */

  /**
   * Handle toggling inspiration.
   * @protected
   */
  _onToggleInspiration()

  /* -------------------------------------------- */

  /**
   * Handle toggling the character's primary spellcasting ability.
   * @param event  The triggering event.
   * @protected
   */
  _onToggleSpellcasting(event: PointerEvent)

  /* -------------------------------------------- */

  /**
   * Handle viewing a facility occupant.
   * @param event  The triggering event.
   * @protected
   */
  _onViewOccupant(event: PointerEvent): Promise<void>

  /* -------------------------------------------- */
  /*  Favorites                                   */
  /* -------------------------------------------- */
  

  /**
   * Handle dropping an Activity onto the sheet.
   * @param event     The originating drag event.
   * @param data      The Activity drag data.
   * @protected
   */
  _onDropActivity(event: DragEvent, data: ReturnType<dnd5e.types.Activity.Implementation['toDragData']>): Promise<Actor.Implementation | void>


  /* -------------------------------------------- */

  /**
   * Handle an owned item or effect being dropped in the favorites area.
   * @param event            The triggering event.
   * @param favorite  The favorite that was dropped.
   * @returns 
   * @protected
   */
  _onDropFavorite(event: DragEvent, favorite: dnd5e.types.FavoriteData5e): Promise<Actor.Implementation> | void

  /* -------------------------------------------- */

  /**
   * Handle removing a favorite.
   * @param event  The triggering event.
   * @protected
   */
  _onRemoveFavorite(event: PointerEvent): Promise<Actor.Implementation> | void

  /* -------------------------------------------- */

  /**
   * Handle re-ordering the favorites list.
   * @param event  The drop event.
   * @param srcId     The identifier of the dropped favorite.
   * @protected
   */
  _onSortFavorites(event: DragEvent, srcId: string): Promise<Actor.Implementation> | void

  /* -------------------------------------------- */

  /**
   * Handle using a facility.
   * @param event  The triggering event.
   * @protected
   */
  _onUseFacility(event: PointerEvent): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle using a favorited item.
   * @param {PointerEvent} event  The triggering event.
   * @returns {Promise|void}
   * @protected
   */
  _onUseFavorite(event: PointerEvent): Promise<void>|void

  /* -------------------------------------------- */

  /**
   * Prepare bastion facility data for display.
   * @param context  Render context.
   * @protected
   */
  _prepareFacilities(context): Promise<void>

  /* -------------------------------------------- */

  /**
   * Prepare facility occupants for display.
   * @param {FacilityOccupants} occupants  The occupants.
   * @returns {Promise<object[]>}
   * @protected
   */
  _prepareFacilityOccupants(occupants: {
    value: string[]
    max: number
  }): Promise<({
    empty: boolean
  } | {
    actor: Actor.Implementation
  })[]>

  /* -------------------------------------------- */

  /**
   * Prepare favorites for display.
   * @protected
   */
   _prepareFavorites(): Promise<object>

  /* -------------------------------------------- */

  /**
   * Prepare data for a favorited entry.
   * @param type  The type of favorite.
   * @param id                    The favorite's identifier.
   * @protected
   */
  _getFavoriteData(type: "skill"|"tool"|"slots", id: string): Promise<dnd5e.types.FavoriteData5e|void>
}
