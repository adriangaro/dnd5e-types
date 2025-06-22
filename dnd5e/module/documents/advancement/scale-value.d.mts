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
  static metadata: ScaleValueAdvancement.Metadata
  get metadata(): ScaleValueAdvancement.Metadata
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

declare namespace ScaleValueAdvancement {
  interface Metadata extends Advancement.Metadata {
      dataModels: {
        configuration: typeof ScaleValueConfigurationData
      }
      apps: {
        config: typeof dnd5e.applications.advancement.ScaleValueConfig
        flow: typeof dnd5e.applications.advancement.ScaleValueFlow
      }
    }
}

export default ScaleValueAdvancement

declare global {
  namespace dnd5e.types {
    namespace Advancement {
      interface DefaultAdvancementTypes {
        ScaleValue: typeof ScaleValueAdvancement
      }

      interface DefaultValidItemTypes {
        'ScaleValue.background': true
        'ScaleValue.class': true
        'ScaleValue.race': true
        'ScaleValue.subclass': true
      }
    }
  }
}
