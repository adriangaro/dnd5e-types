import type { PIXI } from "fvtt-types/configuration";
import type MapLocationJournalPageData from "../data/journal/map.d.mts";

/**
 * Custom control icon used to display Map Location journal pages when pinned to the map.
 */
export default class MapLocationControlIcon extends PIXI.Container {

  /**
   * Code text to be rendered.
   */
  code: string;

  size: number;

  style: MapLocationJournalPageData.MapLocationMarkerStyle

  radius: number;
  circle: [number, number, number]
  backgroundColor?: PIXI.Color
  borderColor?: PIXI.Color

  shadow: PIXI.Graphics
  extrude: PIXI.Graphics
  bg: PIXI.Graphics
  text: PreciseText
  border: PIXI.Graphics

  constructor(locationConfig: {
    code: string, 
    size?: number, 
  } & MapLocationJournalPageData.MapLocationMarkerStyle, ...args: ConstructorParameters<typeof PIXI.Container>)

  /* -------------------------------------------- */

  /**
   * Perform the actual rendering of the marker.
   */
  renderMarker()

  /* -------------------------------------------- */

  /**
   * Define PIXI TestStyle object for rendering the map location code.
   * @protected
   */
  _getTextStyle(characterCount: number, size: number): PIXI.TextStyle
}
