import type BaseScaleValueAdvancementData from "../../module/data/advancement/scale-value-data.mjs";
import type { ScaleValueType } from "../../module/data/advancement/scale-value-data.mjs";
import { AdvancementMixin } from "./mixin.mjs";

declare const ScaleValueAdvancement_base: ReturnType<typeof AdvancementMixin<typeof BaseScaleValueAdvancementData>>;

/**
 * Advancement that represents a value that scales with class level. **Can only be added to classes or subclasses.**
 */
declare class ScaleValueAdvancement extends ScaleValueAdvancement_base {
  static metadata: dnd5e.types.Advancement.Metadata & { name: "ScaleValue" };

  /** The available types of scaling value. */
  static TYPES: Record<dnd5e.types.Advancement.ScaleValue.TypeKey, typeof ScaleValueType>;

  /** Identifier for this scale value, either manual value or the slugified title. */
  get identifier(): string;

  /**
   * Scale value for the given level.
   * @param level Level for which to get the scale value.
   * @returns Scale value at the given level or null if none exists.
   */
  valueForLevel(level: number): ScaleValueType | null;

  /**
   * Compare two scaling values and determine if they are equal.
   * @param a
   * @param b
   * @returns
   * @deprecated since DnD5e 6.0, until DnD5e 6.2
   */
  testEquality(a: unknown, b: unknown): boolean;
}

declare global {
  namespace dnd5e.types.Advancement {
    interface DefaultTypes {
      ScaleValue: typeof ScaleValueAdvancement;
    }
  }
}

export default ScaleValueAdvancement;
