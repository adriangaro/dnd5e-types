/* -------------------------------------------- */
/* D20 Roll                                     */
/* -------------------------------------------- */

/**
 * A standardized helper function for managing core 5e d20 rolls.
 * Holding SHIFT, ALT, or CTRL when the attack is rolled will "fast-forward".
 * This chooses the default options of a normal attack with no bonus, Advantage, or Disadvantage respectively
 *
 * @param configuration  Configuration data for the D20 roll.
 * @returns              The evaluated D20Roll, or null if the workflow was cancelled.
 */
export function d20Roll(configuration?: d20Roll.DeprecatedD20RollConfiguration): Promise<dnd5e.dice.D20Roll | null>
export declare namespace d20Roll {
  /**
   * Configuration data for a D20 roll.
   */
  interface DeprecatedD20RollConfiguration {
    parts?: string[];
    data?: object;
    event?: Event;
    advantage?: boolean;
    disadvantage?: boolean;
    critical?: number | null;
    fumble?: number | null;
    targetValue?: number;
    ammunition?: string | false;
    attackMode?: string;
    mastery?: string;
    elvenAccuracy?: boolean;
    halflingLucky?: boolean;
    reliableTalent?: boolean;
    fastForward?: boolean;
    ammunitionOptions?: dnd5e.types.FormSelectOption[];
    attackModes?: dnd5e.types.FormSelectOption[];
    chooseModifier?: boolean;
    masteryOptions?: dnd5e.types.FormSelectOption[];
    template?: string;
    title?: string;
    dialogOptions?: object;
    chatMessage?: boolean;
    messageData?: object;
    rollMode?: string;
    flavor?: object;
  }
}

/* -------------------------------------------- */
/* Damage Roll                                  */
/* -------------------------------------------- */


/**
 * A standardized helper function for managing core 5e damage rolls.
 * Holding SHIFT, ALT, or CTRL when the attack is rolled will "fast-forward".
 * This chooses the default options of a normal attack with no bonus, Critical, or no bonus respectively
 */
export function damageRoll(configuration?: damageRoll.DamageRollConfiguration & { returnMultiple: true }): Promise<dnd5e.dice.D20Roll[] | null>
export function damageRoll(configuration?: damageRoll.DamageRollConfiguration & { returnMultiple: false }): Promise<dnd5e.dice.D20Roll | null>
export function damageRoll(): Promise<dnd5e.dice.D20Roll | null>
export function damageRoll(configuration?: damageRoll.DamageRollConfiguration): Promise<dnd5e.dice.D20Roll[] | dnd5e.dice.D20Roll | null>

export declare namespace damageRoll {
  interface DamageRollConfiguration {
    rollConfigs?: SingleDamageRollConfiguration[];
    parts?: string[];
    data?: object;
    event?: Event;
    returnMultiple?: boolean;
    allowCritical?: boolean;
    critical?: boolean;
    criticalBonusDice?: number;
    criticalMultiplier?: number;
    multiplyNumeric?: boolean;
    powerfulCritical?: boolean;
    criticalBonusDamage?: string;
    fastForward?: boolean;
    template?: string;
    title?: string;
    dialogOptions?: object;
    chatMessage?: boolean;
    messageData?: object;
    rollMode?: string;
    flavor?: string;
  }
  
  /**
   * Configuration data for a single damage roll.
   */
  interface SingleDamageRollConfiguration {
    parts: string[];
    type?: string;
    types?: string[];
    properties?: string[];
  }
}