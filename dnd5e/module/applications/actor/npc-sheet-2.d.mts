import ActorSheet5eNPC from "./npc-sheet.mjs";
import ActorSheetV2Mixin from "./sheet-v2-mixin.mjs";
import type { Actor5e } from "#dnd5e/module/documents/_module.mjs";

/**
 * An Actor sheet for NPCs.
 * @mixes ActorSheetV2
 */
export default class ActorSheet5eNPC2 extends ActorSheetV2Mixin(ActorSheet5eNPC) {
  /**
   * The description currently being edited.
   */
  editingDescriptionTarget: string | null;


  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare spellcasting data for display.
   * @param context  The display context.
   * @protected
   */
  _prepareSpellcasting(context: object)

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */
  /**
   * Take a short rest, calling the relevant function on the Actor instance.
   * @param event             The triggering click event.
   * @returns  Result of the rest action.
   * @protected
   */
  _onShortRest(event: Event): Promise<Actor5e.RestResult> 

  /* -------------------------------------------- */

  /**
   * Take a long rest, calling the relevant function on the Actor instance.
   * @param  event             The triggering click event.
   * @returns  Result of the rest action.
   * @protected
   */
  _onLongRest(event: Event): Promise<Actor5e.RestResult> 

 
  /* -------------------------------------------- */

  /**
   * Handle editing a biography section.
   * @param event  The triggering event.
   * @protected
   */
  _onEditBiography(event: PointerEvent)
}
