/**
 * `TokenLayer5e` — dnd5e token layer (`module/canvas/layers/tokens.mjs`). Adds grid-occupancy
 * blocking/difficult-terrain queries used by movement.
 */

declare class TokenLayer5e extends foundry.canvas.layers.TokenLayer {
  /** Whether an occupied grid space blocks movement for the given token. */
  isOccupiedGridSpaceBlocking(
    gridSpace: foundry.grid.BaseGrid.Offset3D,
    token: import("../token.mjs").default,
    options?: { preview?: boolean },
  ): boolean;

  /** Whether an occupied grid space is difficult terrain for the given token. */
  isOccupiedGridSpaceDifficult(
    gridSpace: foundry.grid.BaseGrid.Offset3D,
    token: import("../token.mjs").default,
    options?: { preview?: boolean },
  ): boolean;
}

declare namespace TokenLayer5e {
  interface Any extends TokenLayer5e {}
  type AnyConstructor = typeof TokenLayer5e;
}

export default TokenLayer5e;
