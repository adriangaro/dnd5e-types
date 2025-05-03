import PhysicalItemTemplate from "../../data/item/templates/physical-item.mjs";
import { EquipmentEntryData } from "../../data/item/templates/starting-equipment.mjs";
import DocumentSheet5e from "../api/document-sheet.mjs";

/**
 * Configuration application for Starting Equipment.
 */
interface StartingEntry {
  id: string,
  entry: EquipmentEntryData,
  depth: number,
  groupType: boolean
  validTypes: typeof EquipmentEntryData['OPTION_TYPES'] | typeof EquipmentEntryData['TYPES']
  children?: StartingEntry[]
  linked?: Item.Implementation
  showRequireProficiency?: boolean
}

export default class StartingEquipmentConfig extends DocumentSheet5e<
  Item.OfType<'class'>,
  {
    entries: StartingEntry[]
  }, 
  {

  }, 
  {

  }
> {
  /* -------------------------------------------- */
  /*  Event Listeners                             */
  /* -------------------------------------------- */

  /**
   * Handle an action.
   * @param element       The element on which the action is being performed.
   * @param options
   * @param options.action   The specific action to perform.
   * @param options.depth    Depth of the element being acted upon.
   * @param options.entryId  ID of the entry to act upon.
   */
  _onAction(element: HTMLElement, options?: { action?: string; depth?: number; entryId?: string }): void;


  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */


  
  /* -------------------------------------------- */

  /**
   * Sort an entry on drop.
   * @param event  Triggering drop event.
   * @param  data      Drag event data.
   */
  _onSortEntry(event: DragEvent, data: { entryId: string; uuid: string }): void;
}
