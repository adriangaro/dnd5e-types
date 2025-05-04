import Application5e from "../api/application.mjs";

/**
 * Dialog for choosing an activity to use on an Item.
 */
declare class ActivityChoiceDialog extends Application5e<{
  controlHint?: string | null,
  activities: ActivityChoiceDialog.ActivityChoice[]
}, {

}, {

}> {
  constructor(item: Item.Implementation, options: ActivityChoiceDialog['__Configuration'])

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The chosen activity.
   */
  get activity(): dnd5e.types.Activity.Any | null

  #activity: dnd5e.types.Activity.Any | null;

  /* -------------------------------------------- */

  /**
   * The Item whose activities are being chosen.
   */
  get item(): Item.Implementation

  #item: Item.Implementation

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */


  /* -------------------------------------------- */

  /**
   * Prepare rendering context for a given activity.
   * @protected
   */
  _prepareActivityContext(activity: dnd5e.types.Activity.Any): ActivityChoiceDialog.ActivityChoice

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /**
   * Handle choosing an activity.
   */
  static #onChooseActivity(this: ActivityChoiceDialog, event: PointerEvent, target: HTMLElement): Promise<void>

  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /**
   * Display the activity choice dialog.
   */
  static create(item: Item.Implementation, options: ActivityChoiceDialog['__Configuration']): Promise<dnd5e.types.Activity.Any | null> 
}

declare namespace ActivityChoiceDialog {
  interface ActivityChoice {
    id: string, 
    name: string, 
    sort: number,
    icon: {
      src: string,
      svg: boolean
    }
  }
}

export default ActivityChoiceDialog