import type { PIXI } from "fvtt-types/configuration"

/**
 * Data definition for Map Location journal entry pages.
 *
 * @property {string} code  Code for the location marker on the map.
 */
declare class MapLocationJournalPageData extends foundry.abstract.TypeDataModel<{
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
declare namespace MapLocationJournalPageData {
  interface MapLocationMarkerStyle {
    /**
     * Map marker class used to render the icon.
     */
    icon: typeof PIXI.Container,
    /**
     * Color of the background inside the circle.
     */
    backgroundColor?: number
    /**
     * Color of the border in normal state.
     */
    borderColor?: number
    /**
     * Color of the border when hovering over the marker.
     */
    borderHoverColor?: number
    /**
     * Font used for rendering the code on the marker.
     */
    fontFamily?: string
    /**
     * Color of the shadow under the marker.
     */
    shadowColor?: number
    /**
     * Color of the text on the marker.
     */
    textColor?: number
  }
}

export default MapLocationJournalPageData

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      /**
       * Settings used to render map location markers on the canvas.
       */
      mapLocationMarker: Record<string, MapLocationJournalPageData.MapLocationMarkerStyle> & {
        default: MapLocationJournalPageData.MapLocationMarkerStyle
      }
    }
  }
}