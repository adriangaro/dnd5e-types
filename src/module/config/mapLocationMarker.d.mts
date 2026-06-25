/**
 * Map location marker style config domain (Seam A). `CONFIG.DND5E.mapLocationMarker`.
 *
 * Options not included in a style fall back to the value set in the `default` style. Any
 * additional styling options added are passed into the custom marker class for rendering.
 */

declare global {
  namespace dnd5e.types {
    namespace MapLocationMarker {
      /** Built-in marker styles. */
      interface DefaultTypes {
        default: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.mapLocationMarker[key]` entry. */
      interface Config {
        /** Map marker class used to render the icon. */
        icon?: typeof PIXI.Container;
        /** Color of the background inside the circle. */
        backgroundColor?: number;
        /** Color of the border in normal state. */
        borderColor?: number;
        /** Color of the border when hovering over the marker. */
        borderHoverColor?: number;
        /** Font used for rendering the code on the marker. */
        fontFamily?: string;
        /** Color of the shadow under the marker. */
        shadowColor?: number;
        /** Color of the text on the marker. */
        textColor?: number;
        // Additional custom styling keys may be present and forwarded to the marker class.
        [key: string]: unknown;
      }
    }

    interface DND5EConfig {
      mapLocationMarker: { [K in dnd5e.types.MapLocationMarker.TypeKey]: dnd5e.types.MapLocationMarker.Config };
    }
  }
}

export {};
