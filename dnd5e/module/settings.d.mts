import type BastionSettingsConfig from "./applications/settings/bastion-settings.mjs";
import type { BastionSetting } from "./applications/settings/bastion-settings.mjs";
import type CombatSettingsConfig from "./applications/settings/combat-settings.mjs";
import type CompendiumBrowserSettingsConfig from "./applications/settings/compendium-browser-settings.mjs";
import type ModuleArtSettingsConfig from "./applications/settings/module-art-settings.mjs";
import type VariantRulesSettingsConfig from "./applications/settings/variant-rules-settings.mjs";
import type VisibilitySettingsConfig from "./applications/settings/visibility-settings.mjs";

/**
 * Register all of the system's keybindings.
 */
export function registerSystemKeybindings(): void;

/* -------------------------------------------- */

/**
 * Register all of the system's settings.
 */
export function registerSystemSettings(): void;

/**
 * Data model for tracking information on the primary party.
 */
declare class PrimaryPartyData extends foundry.abstract.DataModel<{ actor: foundry.data.fields.ForeignDocumentField<typeof foundry.documents.BaseActor> }> {
  static defineSchema(): { actor: foundry.data.fields.ForeignDocumentField<typeof foundry.documents.BaseActor> };
}

/* -------------------------------------------- */

/**
 * Register additional settings after modules have had a chance to initialize to give them a chance to modify choices.
 */
export function registerDeferredSettings(): void;

/* -------------------------------------------- */

/**
 * Set the theme on an element, removing the previous theme class in the process.
 * @param element     Body or sheet element on which to set the theme data.
 * @param [theme=""]  Theme key to set.
 * @param [flags=[]]  Additional theming flags to set.
 */
export function setTheme(element: HTMLElement, theme?: string, flags?: Set<string>): void;
