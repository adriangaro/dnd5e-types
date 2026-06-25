/** Custom text enrichers for inline rolls, references, lookups, and item links. */

type EnrichmentOptions = foundry.applications.ux.TextEditor.EnrichmentOptions;

/** Set up custom text enrichers. */
export declare function registerCustomEnrichers(): void;

/** Use the `chatMessage` hook to determine if an enricher command was typed. */
export declare function chatMessage(message: string): false | void;

/** Parse the enriched string and provide the appropriate content. */
export declare function enrichString(
  match: RegExpMatchArray,
  options: EnrichmentOptions
): Promise<HTMLElement | null>;

/** Parse a roll string into a configuration object. */
export declare function parseConfig(match?: string, options?: { multiple?: false }): object;
export declare function parseConfig(match: string, options: { multiple: true }): object[];
export declare function parseConfig(
  match?: string,
  options?: { multiple?: boolean }
): object | object[];

/** Determine the appropriate rules version based on the config override, provided item's parent's rule version, provided document's rule version, or the system setting (in that order). */
export declare function getRulesVersion(
  config?: object,
  options?: EnrichmentOptions
): "2014" | "2024";

/**
 * Enrich an attack link using a pre-set to hit value.
 *
 * @example Create an attack link using a fixed to hit:
 * ```[[/attack +5]]``` or ```[[/attack formula=5]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="attack" data-formula="+5">
 *   <i class="fa-solid fa-dice-d20" inert></i> +5
 * </a>
 * ```
 *
 * @example Create an attack link using a specific attack mode:
 * ```[[/attack +5]]``` or ```[[/attack formula=5 attackMode=thrown]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="attack" data-formula="+5" data-attack-mode="thrown">
 *   <i class="fa-solid fa-dice-d20" inert></i> +5
 * </a>
 * ```
 *
 * @example Link an enricher to an attack activity, either explicitly or automatically:
 * ```[[/attack activity=RLQlsLo5InKHZadn]]``` or ```[[/attack]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="attack" data-formula="+8" data-activity-uuid="...uuid...">
 *   <i class="fa-solid fa-dice-d20" inert"></i> +8
 * </a>
 * ```
 *
 * @example Display the full attack section:
 * ```[[/attack format=extended]]``` or ```[[/attack extended]]```
 * becomes
 * ```html
 * <span class="attack-extended">
 *   <em>Melee Attack Roll</em>:
 *   <span class="roll-link-group" data-type="attack" data-formula="+16" data-activity-uuid="...uuid...">
 *     <a class="roll-link"><i class="fa-solid fa-dice-d20" inert"></i> +16</a>
 *   </span>, reach 15 ft
 * </span>
 * ```
 */
export declare function enrichAttack(
  config: object,
  label: string | undefined,
  options: EnrichmentOptions
): Promise<HTMLElement | null>;

/** Parse the raw configuration data for an attack enricher. */
export declare function parseAttackConfig(config: object, options?: EnrichmentOptions): object;

/** Enrich an award block displaying amounts for each part granted with a GM-control for awarding to the party. */
export declare function enrichAward(
  config: object,
  label: string | undefined,
  options: EnrichmentOptions
): Promise<HTMLElement | null>;

/**
 * Enrich an ability check link to perform a specific ability or skill check. If an ability is provided
 * along with a skill, then the skill check will always use the provided ability. Otherwise it will use
 * the character's default ability for that skill.
 *
 * @example Create a dexterity check:
 * ```[[/check ability=dex]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="check" data-ability="dex">
 *   <i class="fa-solid fa-dice-d20" inert></i> Dexterity
 * </a>
 * ```
 *
 * @example Create an acrobatics check with a DC and default ability:
 * ```[[/check skill=acr dc=20]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="check" data-skill="acr" data-dc="20">
 *   <i class="fa-solid fa-dice-d20" inert></i> DC 20 Dexterity (Acrobatics)
 * </a>
 * ```
 *
 * @example Create an acrobatics check using strength:
 * ```[[/check ability=str skill=acr]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="check" data-ability="str" data-skill="acr">
 *   <i class="fa-solid fa-dice-d20" inert></i> Strength (Acrobatics)
 * </a>
 * ```
 *
 * @example Create a tool check:
 * ```[[/check tool=thief ability=int]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="check" data-ability="int" data-tool="thief">
 *   <i class="fa-solid fa-dice-d20" inert></i> Intelligence (Thieves' Tools)
 * </a>
 * ```
 *
 * @example Create a skill check with a tool (when using the Modern rules):
 * ```[[/check slt thief]]```
 * ```[[/check skill=slt tool=thief]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="check" data-skill="slt" data-using-tool="thief">
 *   <i class="fa-solid fa-dice-d20" inert></i> Dexterity (Sleight of Hand)
 * </a> check using Thieves' Tools
 * ```
 *
 * @example Formulas used for DCs will be resolved using data provided to the description (not the roller):
 * ```[[/check ability=cha dc=@abilities.int.dc]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="check" data-ability="cha" data-dc="15">
 *   <i class="fa-solid fa-dice-d20" inert></i> DC 15 Charisma
 * </a>
 * ```
 *
 * @example Use multiple skills in a check using default abilities:
 * ```[[/check skill=acr/ath dc=15]]```
 * ```[[/check acrobatics athletics 15]]```
 * becomes
 * ```html
 * <span class="roll-link-group" data-type="check" data-skill="acr|ath" data-dc="15">
 *   DC 15
 *   <a class="roll-action" data-ability="dex" data-skill="acr">
 *     <i class="fa-solid fa-dice-d20" inert></i> Dexterity (Acrobatics)
 *   </a> or
 *   <a class="roll-action" data-ability="dex">
 *     <i class="fa-solid fa-dice-d20" inert></i> Strength (Athletics)
 *   </a>
 *   <a class="enricher-action" data-action="postRequest" ...><!-- request link --></a>
 * </span>
 * ```
 *
 * @example Use multiple skills with a fixed ability:
 * ```[[/check ability=str skill=dec/per dc=15]]```
 * ```[[/check strength deception persuasion 15]]```
 * becomes
 * ```html
 * <span class="roll-link-group" data-type="check" data-ability="str" data-skill="dec|per" data-dc="15">
 *   DC 15 Strength
 *   (<a class="roll-action" data-skill="dec"><i class="fa-solid fa-dice-d20" inert></i> Deception</a> or
 *   <a class="roll-action" data-ability="per"><i class="fa-solid fa-dice-d20" inert></i> Persuasion</a>)
 *   <a class="enricher-action" data-action="postRequest" ...><!-- request link --></a>
 * </span>
 * ```
 *
 * @example Link an enricher to an check activity, either explicitly or automatically
 * ```[[/check activity=RLQlsLo5InKHZadn]]``` or ```[[/check]]```
 * becomes
 * ```html
 * <span class="roll-link-group" data-type="check" data-ability="dex" data-dc="20" data-activity-uuid="...">
 *   <a class="roll-action"><i class="fa-solid fa-dice-d20" inert></i> DC 20 Dexterity</a>
 *   <a class="enricher-action" data-action="postRequest" ...><!-- request link --></a>
 * </span>
 * ```
 */
export declare function enrichCheck(
  config: object,
  label: string | undefined,
  options: EnrichmentOptions
): Promise<HTMLElement | null>;

/** Parse the raw configuration data for a check enricher. */
export declare function parseCheckConfig(config: object, options?: EnrichmentOptions): object;

/**
 * Enrich a saving throw link.
 *
 * @example Create a dexterity saving throw:
 * ```[[/save ability=dex]]```
 * becomes
 * ```html
 * <span class="roll-link-group" data-type="save" data-ability="dex">
 *   <a class="roll-action"><i class="fa-solid fa-dice-d20" inert></i> Dexterity</a>
 *   <a class="enricher-action" data-action="postRequest" ...><!-- request link --></a>
 * </span>
 * ```
 *
 * @example Add a DC to the save:
 * ```[[/save ability=dex dc=20]]```
 * becomes
 * ```html
 * <span class="roll-link-group" data-type="save" data-ability="dex" data-dc="20">
 *   <a class="roll-action"><i class="fa-solid fa-dice-d20" inert></i> DC 20 Dexterity</a>
 *   <a class="enricher-action" data-action="postRequest" ...><!-- request link --></a>
 * </span>
 * ```
 *
 * @example Specify multiple abilities:
 * ```[[/save ability=str/dex dc=20]]```
 * ```[[/save strength dexterity 20]]```
 * becomes
 * ```html
 * <span class="roll-link-group" data-type="save" data-ability="str|dex" data-dc="20">
 *   DC 20
 *   <a class="roll-action" data-ability="str"><i class="fa-solid fa-dice-d20" inert></i> Strength</a> or
 *   <a class="roll-action" data-ability="dex"><i class="fa-solid fa-dice-d20" inert></i> Dexterity</a>
 *   <a class="enricher-action" data-action="postRequest" ...><!-- request link --></a>
 * </span>
 * ```
 *
 * @example Create a concentration saving throw:
 * ```[[/concentration 10]]```
 * becomes
 * ```html
 * <span class="roll-link-group" data-type="concentration" data-dc=10>
 *   <a class="roll-action"><i class="fa-solid fa-dice-d20" inert></i> DC 10 concentration</a>
 *   <a class="enricher-action" data-action="postRequest" ...><!-- request link --></a>
 * </span>
 * ```
 *
 * @example Link an enricher to an save activity, either explicitly or automatically
 * ```[[/save activity=RLQlsLo5InKHZadn]]``` or ```[[/save]]```
 * becomes
 * ```html
 * <span class="roll-link-group" data-type="save" data-ability="dex" data-dc="20" data-activity-uuid="...">
 *   <a class="roll-action"><i class="fa-solid fa-dice-d20" inert></i> DC 20 Dexterity</a>
 *   <a class="enricher-action" data-action="postRequest" ...><!-- request link --></a>
 * </span>
 * ```
 */
export declare function enrichSave(
  config: object,
  label: string | undefined,
  options: EnrichmentOptions
): Promise<HTMLElement | null>;

/** Parse the raw configuration data for a save enricher. */
export declare function parseSaveConfig(config: object, options?: EnrichmentOptions): object;

/**
 * Enrich a damage link.
 *
 * @example Create a damage link:
 * ```[[/damage 2d6 type=bludgeoning]]```
 * becomes
 * ```html
 * <a class="roll-link-group" data-type="damage" data-formulas="2d6" data-damage-types="bludgeoning">
 *   <span class="roll-link"><i class="fa-solid fa-dice-d20"></i> 2d6</span> bludgeoning
 * </a>
 * ```
 *
 * @example Display the average:
 * ```[[/damage 2d6 type=bludgeoning average=true]]```
 * becomes
 * ```html
 * 7 (<a class="roll-link-group" data-type="damage" data-formulas="2d6" data-damage-types="bludgeoning">
 *   <span class="roll-link"><i class="fa-solid fa-dice-d20"></i> 2d6</span>
 * </a>) bludgeoning
 * ```
 *
 * @example Manually set the average & don't prefix the type:
 * ```[[/damage 8d4dl force average=666]]```
 * becomes
 * ```html
 * 666 (<a class="roll-link-group" data-type="damage" data-formulas="8d4dl" data-damage-types="force">
 *   <span class="roll-link"><i class="fa-solid fa-dice-d20"></i> 8d4dl</span>
 * </a> force
 * ```
 *
 * @example Create a healing link:
 * ```[[/heal 2d6]]``` or ```[[/damage 2d6 healing]]```
 * becomes
 * ```html
 * <a class="roll-link-group" data-type="damage" data-formulas="2d6" data-damage-types="healing">
 *   <span class="roll-link"><i class="fa-solid fa-dice-d20"></i> 2d6</span>
 * </a> healing
 * ```
 *
 * @example Specify variable damage types:
 * ```[[/damage 2d6 type=fire|cold]]``` or ```[[/damage 2d6 type=fire/cold]]```
 * becomes
 * ```html
 * <a class="roll-link-group" data-type="damage" data-formulas="2d6" data-damage-types="fire|cold">
 *   <span class="roll-link"><i class="fa-solid fa-dice-d20"></i> 2d6</span>
 * </a> fire or cold
 * ```
 *
 * @example Add multiple damage parts
 * ```[[/damage 1d6 fire & 1d6 cold]]```
 * becomes
 * ```html
 * <a class="roll-link-group" data-type="damage" data-formulas="1d6&1d6" data-damage-types="fire&cold">
 *   <span class="roll-link"><i class="fa-solid fa-dice-d20"></i> 1d6</span> fire and
 *   <span class="roll-link"><i class="fa-solid fa-dice-d20"></i> 1d6</span> cold
 * </a>
 * ```
 *
 * @example Link an enricher to an damage activity, either explicitly or automatically
 * ```[[/damage activity=RLQlsLo5InKHZadn]]``` or ```[[/damage]]```
 * becomes
 * ```html
 * <a class="roll-link-group" data-type="damage" data-formulas="1d6&1d6" data-damage-types="fire&cold"
 *    data-activity-uuid="...">
 *   <span class="roll-link"><i class="fa-solid fa-dice-d20"></i> 1d6</span> fire and
 *   <span class="roll-link"><i class="fa-solid fa-dice-d20"></i> 1d6</span> cold
 * </a>
 * ```
 *
 * @example Displaying the full hit section:
 * ```[[/damage extended]]```
 * becomes
 * ```html
 * <span class="damage-extended">
 *   <em>Hit:</em>
 *   <a class="roll-link-group" data-type="damage" data-formulas="2d6" data-damage-types="bludgeoning"
 *      data-activity-uuid="...">
 *     7 (<span class="roll-link"><i class="fa-solid fa-dice-d20"></i> 2d6</span></a>) Bludgeoning damage
 *   </a>
 * </span>
 * ```
 */
export declare function enrichDamage(
  configs: object[] & { _isHealing?: boolean; _rules?: string; _input?: string },
  label: string | undefined,
  options: EnrichmentOptions
): Promise<HTMLElement | null>;

/** Parse the raw configuration data for a damage enricher. */
export declare function parseDamageConfig(
  configs: object[] & { _isHealing?: boolean; _rules?: string; _input?: string },
  options?: EnrichmentOptions
): object;

/** Enrich a language reference. */
export declare function enrichLanguage(
  config: object,
  label: string | undefined,
  options: EnrichmentOptions
): HTMLElement | null;

/**
 * Enrich a property lookup.
 *
 * @example Include a creature's name in its description:
 * ```[[lookup @name]]```
 * becomes
 * ```html
 * <span class="lookup-value">Adult Black Dragon</span>
 * ```
 *
 * @example Lookup a property within an activity:
 * ```[[lookup @target.template.size activity=dnd5eactivity000]]```
 * becomes
 * ```html
 * <span class="lookup-value">120</span>
 * ```
 */
export declare function enrichLookup(
  config: object,
  fallback: string | undefined,
  options: EnrichmentOptions
): HTMLElement | null;

/**
 * Enrich a reference link.
 *
 * @example Create a content link to the relevant reference:
 * ```&Reference[condition=unconscious]{Label}```
 * becomes
 * ```html
 * <span class="reference-link">
 *   <a class="content-link" draggable="true"
 *      data-uuid="Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.UWw13ISmMxDzmwbd"
 *      data-type="JournalEntryPage" data-tooltip="Text Page">
 *     <i class="fas fa-book-open"></i> Label
 *   </a>
 *   <a class="enricher-action" data-action="applyStatus" data-status="unconscious"
 *      data-tooltip aria-label="Apply Status to Selected Tokens">
 *     <i class="fas fa-fw fa-reply-all fa-flip-horizontal"></i>
 *   </a>
 * </span>
 * ```
 */
export declare function enrichReference(
  config: object,
  label: string | undefined,
  options: EnrichmentOptions
): Promise<HTMLElement | null>;

/**
 * Enrich an item use link to roll an item on the selected token.
 *
 * @example Use an Item from a name:
 * ```[[/item Heavy Crossbow]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="item" data-roll-item-name="Heavy Crossbow">
 *   <i class="fa-solid fa-dice-d20"></i> Heavy Crossbow
 * </a>
 * ```
 *
 * @example Use an Item from a UUID:
 * ```[[/item Actor.M4eX4Mu5IHCr3TMf.Item.amUUCouL69OK1GZU]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="item" data-roll-item-uuid="Actor.M4eX4Mu5IHCr3TMf.Item.amUUCouL69OK1GZU">
 *   <i class="fa-solid fa-dice-d20"></i> Bite
 * </a>
 * ```
 *
 * @example Use an Item from an ID:
 * ```[[/item amUUCouL69OK1GZU]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="item" data-roll-item-uuid="Actor.M4eX4Mu5IHCr3TMf.Item.amUUCouL69OK1GZU">
 *   <i class="fa-solid fa-dice-d20"></i> Bite
 * </a>
 * ```
 *
 * @example Use an Activity on an Item from a name:
 * ```[[/item Heavy Crossbow activity=Poison]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="item" data-roll-item-name="Heavy Crossbow" data-roll-activity-name="Poison">
 *   <i class="fa-solid fa-dice-d20"></i> Heavy Crossbow: Poison
 * </a>
 * ```
 *
 * @example Use an Activity on an Item:
 * ```[[/item amUUCouL69OK1GZU activity=G8ng63Tjqy5W52OP]]```
 * becomes
 * ```html
 * <a class="roll-action" data-type="item"
 *    data-roll-activity-uuid="Actor.M4eX4Mu5IHCr3TMf.Item.amUUCouL69OK1GZU.Activity.G8ng63Tjqy5W52OP">
 *   <i class="fa-solid fa-dice-d20"></i> Bite: Save
 * </a>
 * ```
 */
export declare function enrichItem(
  config: { values: string[]; [key: string]: unknown },
  label: string | undefined,
  options: EnrichmentOptions
): Promise<HTMLElement | null>;

/** Create a label for a roll message. */
export declare function createRollLabel(config: object): string;

/** Attach actions to chat message for requested rolls. */
export declare function activateChatListeners(
  message: import("../documents/chat-message.mjs").default,
  element: HTMLElement
): void;
