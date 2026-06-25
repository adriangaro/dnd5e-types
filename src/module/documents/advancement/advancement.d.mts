/**
 * Abstract base class which various advancement types can subclass.
 * All shared instance/static behavior lives in {@link AdvancementBehavior} (in mixin.d.mts).
 */

import type BaseAdvancementData from "../../data/advancement/base-advancement.mjs";
import { AdvancementMixin } from "./mixin.mjs";

declare const Advancement_base: ReturnType<typeof AdvancementMixin<typeof BaseAdvancementData>>;

declare abstract class Advancement extends Advancement_base {
  /**
   * Configuration information for this advancement type.
   */
  static metadata: dnd5e.types.Advancement.Metadata;

  /**
   * Error class thrown during the advancement update preparation process.
   */
  static ERROR: typeof AdvancementError;
}

/**
 * Error that can be thrown during the advancement update preparation process.
 */
declare class AdvancementError extends Error {
  constructor(message: string, options?: { selector?: string });

  /**
   * CSS selector for the element to highlight when this error is displayed in an advancement flow.
   */
  selector: string | null;
}

export { AdvancementError };
export default Advancement;
