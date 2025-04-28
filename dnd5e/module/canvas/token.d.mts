// TODO: replace with foundry.canvas.placeables.Token

/**
 * Extend the base Token class to implement additional system-specific logic.
 */
export default class Token5e extends Token {

  /**
   * Update the token ring when this token is targeted.
   * @param user         The user whose targeting has changed.
   * @param token       The token that was targeted.
   * @param targeted    Is the token targeted or not?
   */
  static onTargetToken(
    user: User.Implementation, 
    token: Token.Object, 
    targeted: boolean
  )

  /* -------------------------------------------- */

  /**
   * Specialized drawing function for HP bars.
   * @param number      The Bar number
   * @param bar  The Bar container
   * @param data        Resource data for this bar
   * @private
   */
  _drawHPBar(
    number: number, 
    bar: PIXI.Graphics, 
    data: object
  )
}


declare module "fvtt-types/configuration" {
  interface PlaceableObjectClassConfig {
    Token: typeof Token5e
  }
}

