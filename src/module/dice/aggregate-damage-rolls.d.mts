/**
 * `aggregateDamageRolls` — combine an array of damage rolls, grouping by damage type
 * (`module/dice/aggregate-damage-rolls.mjs`).
 */

import type DamageRoll from "./damage-roll.mjs";

/**
 * Parse the provided rolls, splitting parts based on damage types & properties, taking flavor into account.
 * @param rolls    Damage rolls to aggregate.
 * @param options  `respectProperties`: also group by damage properties.
 */
declare function aggregateDamageRolls(rolls: DamageRoll[], options?: { respectProperties?: boolean }): DamageRoll[];

export default aggregateDamageRolls;
