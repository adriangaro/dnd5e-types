/**
 * `simplifyRollFormula` — collapse a roll formula to a simpler equivalent string
 * (`module/dice/simplify-roll-formula.mjs`).
 */

/**
 * A standardized helper function for simplifying the constant parts of a multipart roll formula.
 * @param formula                         The original roll formula.
 * @param options                         Formatting options.
 * @param options.preserveFlavor          Preserve flavor text in the simplified formula. (default: `false`)
 * @param options.deterministic           Strip any non-deterministic terms from the result.
 * @returns The resulting simplified formula.
 */
declare function simplifyRollFormula(
  formula: string,
  options?: { preserveFlavor?: boolean; deterministic?: boolean },
): string;

export default simplifyRollFormula;
