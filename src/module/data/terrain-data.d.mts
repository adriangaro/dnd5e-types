/**
 * Extension of terrain data with support for 5e concepts.
 *
 * `foundry.data.TerrainData` is a stub in fvtt-types, so the inherited terrain fields
 * (e.g. `difficulty`) are not modeled here — only the 5e addition `difficultTerrain` is.
 */

declare global {
  namespace dnd5e.types.data {
    namespace TerrainData5e {
      interface Schema extends foundry.data.TerrainData.Schema {
        difficultTerrain: foundry.data.fields.BooleanField;
      }
    }
  }
}

declare class TerrainData5e extends foundry.data.TerrainData<dnd5e.types.data.TerrainData5e.Schema> {
  static override defineSchema(): dnd5e.types.data.TerrainData5e.Schema;

  /**
   * Get a function that computes movement cost for the given token, factoring in difficult terrain.
   * @param token    The token being moved.
   * @param options  Additional options.
   * @returns        A function computing the movement cost across a segment.
   */
  static getMovementCostFunction(
    token: TokenDocument.Implementation,
    options?: object,
    // Cost-function/segment shapes come from unported foundry movement types -> typed loosely.
  ): (from: object, to: object, distance: number, segment?: object) => number;

  /**
   * Resolve a set of terrain effects into terrain data, accounting for the `difficultTerrain` effect.
   * @param effects  The terrain effects to resolve. (Effect type is unported -> `object[]`.)
   */
  static resolveTerrainEffects(effects: object[]): TerrainData5e | null;

  /**
   * Test whether this terrain data is equal to another.
   * @param other  The other terrain data.
   */
  equals(other: unknown): boolean;
}

export default TerrainData5e;
export {};
