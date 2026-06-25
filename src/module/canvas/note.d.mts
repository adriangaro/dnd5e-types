/**
 * Add support for drawing custom control icons based on linked journal page type.
 */

declare class Note5e extends foundry.canvas.placeables.Note {
  /** @inheritDoc */
  protected override _drawControlIcon(): foundry.canvas.containers.ControlIcon;
}

declare namespace Note5e {
  interface Any extends Note5e {}
  type AnyConstructor = typeof Note5e;
}

export default Note5e;
