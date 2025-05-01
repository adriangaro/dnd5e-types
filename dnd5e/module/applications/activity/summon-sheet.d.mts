import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the summon activity.
 */
export default class SummonSheet extends ActivitySheet<
  dnd5e.types.Activity.OfType<'summon'>,
  {
    abilityOptions: dnd5e.types.FormSelectOption[]
    creatureSizeOptions: dnd5e.types.FormSelectOption[]
    creatureTypeOptions: dnd5e.types.FormSelectOption[]
    profileModes: dnd5e.types.FormSelectOption[]
    profiles: {
      data: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.OfType<'summon'>, 'profiles.0'>
      collapsed: string
      fields: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.OfType<'summon'>, 'schema.fields.profiles.element.fields'>
      prefix: string
      source: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.OfType<'summon'>, 'profiles.0'>
      document: Actor.Implementation | null
      mode: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.OfType<'summon'>, 'summon.mode'>
      typeOptions: dnd5e.types.FormSelectOption[] | null
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
   * Handle adding a new entry to the summoning profiles list.
   * @param event         Triggering click event.
   * @param target  Button that was clicked.
   */
  static #addProfile(this: SummonSheet, event: Event, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle removing an entry from the summoning profiles list.
   * @param event         Triggering click event.
   * @param target  Button that was clicked.
   */
  static #deleteProfile(this: SummonSheet, event: Event, target: HTMLElement)

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /**
   * Handle dropping actors onto the sheet.
   * @param event  Triggering drop event.
   */
  #onDrop(event: Event): Promise<void>
}
