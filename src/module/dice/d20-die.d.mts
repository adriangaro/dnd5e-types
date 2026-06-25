/**
 * `D20Die` — the d20 die term (`module/dice/d20-die.mjs`), extends {@link BasicDie}. Adds critical
 * detection and dnd5e flag/range modifiers (min/max/reliable talent).
 */

import type BasicDie from "./basic-die.mjs";

/** Primary die used when performing a D20 roll. */
declare class D20Die extends BasicDie {
  /** Critical success target if no critical failure is set in options. @default 20 */
  static CRITICAL_SUCCESS_TOTAL: number;
  /** Critical failure target if no critical failure is set in options. @default 1 */
  static CRITICAL_FAILURE_TOTAL: number;

  /** Whether the die's active result is a critical success. Returns `undefined` if roll isn't evaluated. */
  get isCriticalSuccess(): boolean | undefined;
  /** Whether the die's active result is a critical failure. Returns `undefined` if roll isn't evaluated. */
  get isCriticalFailure(): boolean | undefined;
  /** Is this a valid challenge die? */
  get isValid(): boolean;

  /** Apply an advantage mode (keep highest/lowest, elven accuracy). */
  applyAdvantage(advantageMode: dnd5e.types.AdvantageMode): void;

  /**
   * Set or unset the specified flag on this die.
   * @param flag     Flag to apply.
   * @param enabled  Is the flag enabled?
   */
  applyFlag(flag: string, enabled: boolean): void;

  /** Clamp the die's results to a min/max range. */
  applyRange(values: { minimum?: number; maximum?: number }): void;
}

declare namespace D20Die {
  interface Any extends D20Die {}
  type AnyConstructor = typeof D20Die;
}

export default D20Die;
