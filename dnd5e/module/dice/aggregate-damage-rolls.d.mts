
/**
 * Parse the provided rolls, splitting parts based on damage types & properties, taking flavor into account.
 */
export default function aggregateDamageRolls(
  rolls: dnd5e.dice.DamageRoll[], options?: { 
    respectProperties?: boolean
  }
): dnd5e.dice.DamageRoll[]

/* -------------------------------------------- */

/**
 * Split terms into groups based on operators. Addition & subtraction will split groups while multiplication and
 * division will keep groups together. These groups also contain information on contained types written in flavor
 * and whether they are negative.
 */
declare function chunkTerms(
  terms: foundry.dice.terms.RollTerm, 
  type: string
): { terms: foundry.dice.terms.RollTerm[], negative: boolean, type: string }[]
