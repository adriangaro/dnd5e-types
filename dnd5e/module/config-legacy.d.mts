/**
 * Replacement reference UUIDs for the legacy rules.
 */
export const REFERENCES: {
  abilities: Record<string, string>
  conditionTypes: Record<string, string>
  spellSchools: Record<string, string>
  skills: Record<string, string>
};

/* -------------------------------------------- */

/**
 * Replacement rule references.
 */
export const RULES: Record<string, string>;

/* -------------------------------------------- */

/**
 * Replacement reference base item IDs for the legacy rules.
 */
export const IDS: {
  ammoIds: Record<string, string>
  armorIds: Record<string, string>
  focusTypes: Record<string, Record<string, string>>
  shieldIds: Record<string, string>
  tools: Record<string, string>
  weaponIds: Record<string, string>
}

/* -------------------------------------------- */

/**
 * Spell lists that will be registered when using the legacy rules.
 */
export const SPELL_LISTS: readonly string[]