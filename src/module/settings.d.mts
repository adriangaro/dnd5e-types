// dnd5e settings module: registers the system's keybindings, world/client settings, and theme handling.

/**
 * Register all of the system's keybindings.
 */
export declare function registerSystemKeybindings(): void;

/**
 * Register all of the system's settings.
 */
export declare function registerSystemSettings(): void;

/**
 * Register additional settings after modules have had a chance to initialize to give them a chance to modify choices.
 */
export declare function registerDeferredSettings(): void;

/**
 * Update configuration data when legacy rules are set.
 */
export declare function applyLegacyRules(): void;

/**
 * Set the theme on an element, removing the previous theme class in the process.
 * @param element  Body or sheet element on which to set the theme data.
 * @param theme    Theme key to set.
 * @param flags    Additional theming flags to set.
 */
export declare function setTheme(element: HTMLElement, theme?: string, flags?: Set<string>): void;

declare global {
  /**
   * Strict value types for every `game.settings.get("dnd5e", …)` key (mirrors
   * `registerSystemSettings`). Model-backed settings resolve to their DataModel instance; choice
   * settings to their literal union; domain-keyed sets to the strict domain. Open interface —
   * modules can merge their own `"dnd5e.<key>"` entries.
   */
  interface SettingConfig {
    // Bookkeeping / misc
    "dnd5e.systemMigrationVersion": string;
    "dnd5e.rulesVersion": "modern" | "legacy";
    "dnd5e.strictValidation": boolean;
    "dnd5e.packSourceConfiguration": fvttUtils.AnyObject;
    "dnd5e.defaultDocumentSubtypes": fvttUtils.AnyObject;
    "dnd5e.theme": dnd5e.types.Theme.TypeKey | "";
    "dnd5e.controlHints": boolean;

    // Model-backed world settings — the value is the model CONSTRUCTOR (fvtt resolves it to an instance)
    "dnd5e.transformationSettings": typeof import("./data/settings/transformation-setting.mjs").default;
    "dnd5e.bastionConfiguration": typeof import("./data/settings/bastion-setting.mjs").default;
    "dnd5e.primaryParty": typeof import("./data/settings/primary-party-setting.mjs").default;
    "dnd5e.calendarConfig": typeof import("./data/settings/calendar-setting.mjs").CalendarConfigSetting;
    "dnd5e.calendarPreferences": typeof import("./data/settings/calendar-setting.mjs").CalendarPreferencesSetting;
    "dnd5e.calendar": string;

    // Automation
    "dnd5e.movementAutomation": "full" | "noBlocking" | "none";
    "dnd5e.senseVisionSync": boolean;
    "dnd5e.gridAlignedSquareTemplates": boolean;

    // Homebrew toggles
    "dnd5e.loyaltyScore": boolean;
    "dnd5e.disableAdvancements": boolean;
    "dnd5e.disableConcentration": boolean;
    "dnd5e.autoCollapseItemCards": boolean;
    "dnd5e.autoCollapseChatTrays": "manual" | "never" | "older" | "always";
    "dnd5e.allowRests": boolean;
    "dnd5e.allowPolymorphing": boolean;
    "dnd5e.allowSummoning": boolean;
    "dnd5e.metricLengthUnits": boolean;
    "dnd5e.metricVolumeUnits": boolean;
    "dnd5e.metricWeightUnits": boolean;

    // NPCs
    "dnd5e.autoRecharge": "no" | "silent" | "yes";
    "dnd5e.autoRollNPCHP": "no" | "silent" | "yes";

    // Combat
    "dnd5e.criticalDamageModifiers": boolean;
    "dnd5e.criticalDamageMaxDice": boolean;
    "dnd5e.encounterPlacementBehavior": "none" | "createCombatants" | "rollInitiative";
    "dnd5e.initiativeDexTiebreaker": boolean;
    "dnd5e.initiativeGroupCombatants": boolean;
    "dnd5e.initiativeGroupRoll": boolean;
    "dnd5e.initiativeScore": "none" | "npcs" | "all";

    // Variant rules
    "dnd5e.allowFeats": boolean;
    "dnd5e.currencyWeight": boolean;
    "dnd5e.encumbrance": "none" | "normal" | "variant";
    "dnd5e.honorScore": boolean;
    "dnd5e.levelingMode": "noxp" | "xp" | "xpBoons";
    "dnd5e.proficiencyModifier": "bonus" | "dice";
    "dnd5e.restVariant": "normal" | "gritty" | "epic";
    "dnd5e.sanityScore": boolean;

    // Visibility
    "dnd5e.attackRollVisibility": "all" | "hideAC" | "none";
    "dnd5e.bloodied": "all" | "player" | "none";
    "dnd5e.challengeVisibility": "all" | "player" | "none";
    "dnd5e.concealItemDescriptions": boolean;

    // Skills — value is the SetField descriptor (fvtt resolves it to a Set of skill keys)
    "dnd5e.defaultSkills": foundry.data.fields.SetField<
      dnd5e.types.fields.RestrictedStringField<dnd5e.types.Skill.TypeKey, { required: true; blank: false }>
    >;
  }
}
