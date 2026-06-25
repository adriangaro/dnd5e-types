/**
 * Adds speed-based waypoint/segment styling as behavioral overrides of
 * `foundry.canvas.placeables.tokens.TokenRuler` (signatures inherited; the subclass exists for
 * registration/identity).
 */

declare class TokenRuler5e extends foundry.canvas.placeables.tokens.TokenRuler {}

declare namespace TokenRuler5e {
  interface Any extends TokenRuler5e {}
  type AnyConstructor = typeof TokenRuler5e;
}

/**
 * Wire `TokenRuler5e` into fvtt-types' Implementation seam so that
 * `foundry.canvas.placeables.tokens.TokenRuler.Implementation` resolves to
 * `TokenRuler5e` throughout the package.
 *
 * The runtime sets `CONFIG.Token.rulerClass = canvas.TokenRuler5e`, and
 * fvtt-types derives `Implementation` via `FixedInstanceType<ImplementationClass>`.
 * Augmenting `ImplementationClass` directly avoids shadowing the rest of the
 * `CONFIG.Token` shape.
 */
declare global {
  namespace foundry.canvas.placeables.tokens.TokenRuler {
    interface ImplementationClass extends fvttUtils.Identity<typeof TokenRuler5e> {}
  }
}

export default TokenRuler5e;
