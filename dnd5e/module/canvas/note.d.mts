// TODO: replace with foundry.canvas.placeables.Note
/**
 * Add support for drawing custom control icons based on linked journal page type.
 */
export default class Note5e extends Note {}

declare module "fvtt-types/configuration" {
  interface PlaceableObjectClassConfig {
    Note: typeof Note5e
  }
}

