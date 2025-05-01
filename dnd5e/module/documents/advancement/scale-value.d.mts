import Advancement from "./advancement.mjs";
import { ScaleValueConfigurationData, TYPES } from "../../data/advancement/scale-value.mjs";

/**
 * Advancement that represents a value that scales with class level. **Can only be added to classes or subclasses.**
 */
declare class ScaleValueAdvancement extends Advancement<
  'ScaleValue',
  typeof ScaleValueConfigurationData,
  never
> {

  /* -------------------------------------------- */

  /**
   * The available types of scaling value.
   */
  static TYPES: typeof TYPES;


  /* -------------------------------------------- */

  /**
   * Identifier for this scale value, either manual value or the slugified title.
   */
  get identifier(): string

  /* -------------------------------------------- */
  /*  Display Methods                             */
  /* -------------------------------------------- */

  /**
   * Scale value for the given level.
   */
  valueForLevel(level: number): dnd5e.types.ScaleValue.Any

  /* -------------------------------------------- */

  /**
   * Compare two scaling values and determine if they are equal.
   */
  testEquality(a: any, b: any): boolean
}

export default ScaleValueAdvancement

declare global {
  namespace dnd5e.types {
    namespace Advancement {
      interface DefaultAdvancementTypes {
        ScaleValue: typeof ScaleValueAdvancement
      }
    }
  }
}
