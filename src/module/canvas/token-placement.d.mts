import type BasePlacement from "./api/base-placement.mjs";

/**
 * Class responsible for placing one or more tokens onto the scene.
 */
declare class TokenPlacement extends BasePlacement<
  dnd5e.types.canvas.TokenPlacementConfiguration,
  dnd5e.types.canvas.TokenPlacementData
> {
  /**
   * Adjust the appended number on an unlinked token to account for multiple placements.
   * @param tokenDocument  Document or data object to adjust.
   * @param placement      Placement data associated with this token document.
   */
  static adjustAppendedNumber(
    tokenDocument: globalThis.TokenDocument.Implementation | { name?: string | null },
    placement: dnd5e.types.canvas.TokenPlacementData,
  ): void;

  protected override _place(): Promise<dnd5e.types.canvas.TokenPlacementData[]>;
}

declare namespace TokenPlacement {
  interface Any extends TokenPlacement {}
  type AnyConstructor = typeof TokenPlacement;
}

export default TokenPlacement;
