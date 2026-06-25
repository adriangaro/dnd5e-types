/**
 * Custom control icon used to display Map Location journal pages when pinned to the map.
 */

declare class MapLocationControlIcon extends foundry.canvas.containers.ControlIcon {
  constructor(
    options?: { code?: string } & fvttUtils.InexactPartial<foundry.canvas.containers.ControlIcon.Options>,
  );

  /** Code text to be rendered. */
  code: string;

  /** Styling options for the marker. */
  style: Omit<dnd5e.types.core.MapLocationMarkerStyle, "icon">;

  /** Extruded 3D-effect graphics layer. */
  extrude: PIXI.Graphics;

  /** Drop-shadow graphics layer. */
  shadow: PIXI.Graphics;

  /** Text child used to render the location code. */
  text: foundry.canvas.containers.PreciseText;

  /** Cached radius value (set at the start of `_refresh()`). */
  radius: number;

  /** Circle parameters `[x, y, radius]` used for hit-area and drawing (set in `_refresh()`). */
  circle: [number, number, number];

  protected _clear(): void;
  protected _refresh(): void;
  /**
   * Determine the proper text size based on the character count and the size of the icon.
   * @param characterCount Number of characters in the code.
   * @param size Size of the icon in the Scene.
   */
  protected _getTextSize(characterCount: number, size: number): number;
  /**
   * Define PIXI TestStyle object for rendering the map location code.
   * @param characterCount Number of characters in the code.
   * @param size Size of the icon in the Scene.
   */
  protected _getTextStyle(characterCount: number, size: number): PIXI.TextStyle;
}

declare namespace MapLocationControlIcon {
  interface Any extends MapLocationControlIcon {}
  type AnyConstructor = typeof MapLocationControlIcon;
}

export default MapLocationControlIcon;
