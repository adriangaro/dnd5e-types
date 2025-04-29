/**
 * Data definition for Map Location journal entry pages.
 *
 * @property {string} code  Code for the location marker on the map.
 */
export default class MapLocationJournalPageData extends foundry.abstract.TypeDataModel<{
  code: foundry.data.fields.StringField
}, foundry.abstract.Document.Any> {
  /* -------------------------------------------- */

  /**
   * Adjust the number of this entry in the table of contents.
   * @param number  Current position number.
   */
  adjustTOCNumbering(number: number): { number: string, adjustment: number }|void

  /* -------------------------------------------- */

  /**
   * Create a control icon for rendering this page on a scene.
   * @param options  Options passed through to ControlIcon construction.
   */
  getControlIcon(options: object): PIXI.Container | void
}
