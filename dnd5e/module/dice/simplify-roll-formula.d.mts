/**
 * A standardized helper function for simplifying the constant parts of a multipart roll formula.
 *
 * @param {string} formula                          The original roll formula.
 * @param {object} [options]                        Formatting options.
 * @param {boolean} [options.preserveFlavor=false]  Preserve flavor text in the simplified formula.
 * @param {boolean} [options.deterministic]         Strip any non-deterministic terms from the result.
 *
 * @returns {string}  The resulting simplified formula.
 */
export default function simplifyRollFormula(
  formula: string, 
  options?: { 
    preserveFlavor?: boolean, 
    deterministic?: boolean
  }
): string;

/* -------------------------------------------- */

/**
 * A helper function to perform arithmetic simplification and remove redundant operator terms.
 * @param {RollTerm[]} terms  An array of roll terms.
 * @returns {RollTerm[]}      A new array of roll terms with redundant operators removed.
 */
declare function _simplifyOperatorTerms(terms: foundry.dice.terms.RollTerm[]): foundry.dice.terms.RollTerm[]

/* -------------------------------------------- */

/**
 * A helper function for combining unannotated numeric terms in an array into a single numeric term.
 * @param {object[]} terms  An array of roll terms.
 * @returns {object[]}      A new array of terms with unannotated numeric terms combined into one.
 */
declare function _simplifyNumericTerms(terms: object[]): object[]

/* -------------------------------------------- */

/**
 * A helper function to group dice of the same size and sign into single dice terms.
 * @param {object[]} terms  An array of DiceTerms and associated OperatorTerms.
 * @returns {object[]}      A new array of simplified dice terms.
 */
declare function _simplifyDiceTerms(terms: object[]): object[]

/* -------------------------------------------- */

/**
 * A helper function to extract the contents of parenthetical terms into their own terms.
 * @param {object[]} terms  An array of roll terms.
 * @returns {object[]}      A new array of terms with no parenthetical terms.
 */
declare function _expandParentheticalTerms(terms: object[]): object[]

/* -------------------------------------------- */

/**
 * A helper function to group terms into PoolTerms, DiceTerms, FunctionTerms, and NumericTerms.
 * FunctionTerms are included as NumericTerms if they are deterministic.
 * @param {RollTerm[]} terms  An array of roll terms.
 * @returns {object}          An object mapping term types to arrays containing roll terms of that type.
 */
declare function _groupTermsByType(terms: foundry.dice.terms.RollTerm[]): object

/* -------------------------------------------- */

/**
 * A helper function to separate annotated terms from unannotated terms.
 * @param {object[]} terms     An array of DiceTerms and associated OperatorTerms.
 * @returns {Array | Array[]}  A pair of term arrays, one containing annotated terms.
 */
declare function _separateAnnotatedTerms(terms: object[]): {
  annotated: object[], 
  unannotated: object[]
}
