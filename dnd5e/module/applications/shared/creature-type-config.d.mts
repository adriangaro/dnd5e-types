import Actor5e from "../../documents/actor/actor.mjs";
import BaseConfigSheet from "../actor/api/base-config-sheet.mjs";

/**
 * Configuration application for an actor's creature type.
 */
export default class CreatureTypeConfig extends BaseConfigSheet<{
  data: any
  fields: foundry.data.fields.DataSchema,
  keyPath: string,
  swarmOptions: ({ value: string, label: string })[]
  typeOptions: ({ value: dnd5e.types.Creature.TypeKey, label: string, selected: boolean })[]
  custom?: {
    enabled: boolean,
    selected: boolean
  },
  rows: number,
  preview: string
}, {

}, {

}> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Return a reference to the Actor. Either the NPCs themselves if they are being edited, otherwise the parent Actor
   * if a race Item is being edited.
   */
  get actor(): Actor.Implementation
}
