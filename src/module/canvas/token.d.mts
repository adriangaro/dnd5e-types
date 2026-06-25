/**
 * Extend the base Token class to implement additional system-specific logic.
 *
 * Adds the target-hook static + a few dnd5e-specific helpers; the movement/ring/bar overrides keep the
 * base `foundry.canvas.placeables.Token` signatures (behavioral overrides, so they are inherited rather
 * than re-declared).
 */

declare class Token5e extends foundry.canvas.placeables.Token {
  /**
   * Update the token ring when this token is targeted.
   * @param user      The user whose targeting has changed.
   * @param token     The token that was targeted.
   * @param targeted  Is the token targeted or not?
   */
  static onTargetToken(
    user: globalThis.User.Implementation,
    token: Token5e,
    targeted: boolean,
  ): void;

  /** Drag-constraint options for dnd5e movement. */
  protected _getDragConstrainOptions(): object;

  /**
   * Specialized drawing function for HP bars.
   * @param number  The Bar number
   * @param bar     The Bar container
   * @param data    Resource data for this bar
   */
  protected _drawHPBar(number: number, bar: PIXI.Graphics, data: NonNullable<TokenDocument.GetBarAttributeReturn>): void;

  /** React to a status effect being applied/removed. */
  protected _onApplyStatusEffect(statusId: string, active: boolean): void;
  /** Configure a token filter effect for a status. */
  protected _configureFilterEffect(statusId: string, active: boolean): void;
}

declare namespace Token5e {
  interface Any extends Token5e {}
  type AnyConstructor = typeof Token5e;
}

export default Token5e;
