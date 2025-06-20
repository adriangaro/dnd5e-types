import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the transform activity.
 */
export default class TransformSheet extends ActivitySheet<
  dnd5e.types.Activity.OfType<'transform'>,
  {
    categories: Record<string, any>
    presetOptions: dnd5e.types.FormSelectOption[]
    creatureSizeOptions: dnd5e.types.FormSelectOption[]
    creatureTypeOptions: dnd5e.types.FormSelectOption[]
    movementTypeOptions: dnd5e.types.FormSelectOption[]
    profiles: {
      data: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.OfType<'transform'>, 'profiles.0'>
      index: number
      collapsed: string
      fields: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.OfType<'transform'>, 'schema.fields.profiles.element.fields'>
      prefix: string
      source: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.OfType<'transform'>, 'profiles.0'>
    }[]
  },
  {

  },
  {

  }
> {
  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle adding a new entry to the transform profiles list.
   * @param event         Triggering click event.
   * @param target  Button that was clicked.
   */
  static #addProfile(this: TransformSheet, event: Event, target: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Handle removing an entry from the transform profiles list.
   * @param event         Triggering click event.
   * @param target  Button that was clicked.
   */
  static #deleteProfile(this: TransformSheet, event: Event, target: HTMLElement): void;
}
