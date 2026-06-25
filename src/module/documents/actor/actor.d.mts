/**
 * Extend the base Actor class to implement additional system-specific logic.
 *
 * Extends the base `Actor` through {@link SystemDocumentMixin} (so the `SubType` generic threads to
 * `system` narrowing) and is registered into fvtt-types' `DocumentClassConfig` by the document funnel,
 * so `Actor.Implementation`/`actor.system` everywhere resolve to this class. `SubType` covers the
 * configured actor types (character / npc / vehicle / group / encounter, plus any downstream additions).
 *
 * EXPANDABILITY: the class is merged with a same-name `interface Actor5e` — downstream packages add
 * document-level methods/getters by augmenting that interface (the document analogue of the data-model
 * Seam-D override interfaces). Dependencies that aren't ported yet (roll/dice configs, rest config +
 * result shapes, damage-application option shapes, dialogs, sheets, transformation settings, helper
 * classes like Proficiency/Trait/SelectChoices, attribution descriptions) are intentionally loose
 * (`object`/`unknown`/`Record<string, unknown>`) and tightened as those modules land.
 */

import type SystemDocumentMixin from "../mixins/document.mjs";

declare const Actor5e_base: ReturnType<typeof SystemDocumentMixin<typeof Actor>>;

declare class Actor5e<out SubType extends Actor.SubType = Actor.SubType> extends Actor5e_base<SubType> {
  /** Lazily computed store of classes, subclasses, background, and species. */
  _lazy: Record<string, Record<string, Actor5e.LazyValue>>;

  /** Cached copy of the preferred artwork. */
  _preferredArtwork: Actor5e.PreferredArtwork | null;

  /** List of IDs of items that should be hidden on the sheet. */
  hiddenItems: Set<string>;

  /** Mapping of item identifiers to the items. */
  identifiedItems: Map<string, Set<globalThis.Item.Implementation>>;

  /** Mapping of item compendium source UUIDs to the items. */
  sourcedItems: Map<string, Set<globalThis.Item.Implementation>>;

  /** Warnings accumulated during data preparation. */
  _preparationWarnings: unknown[];

  /** Summary labels prepared during data preparation. */
  labels: Record<string, unknown>;

  /** Exists only during {@link Actor5e#prepareEmbeddedDocuments}. */
  _embeddedPreparation?: boolean;

  /** A temporarily cached initiative roll. */
  _cachedInitiativeRoll?: object | null;

  /* ---- Properties (getters) ---- */

  /** A mapping of classes belonging to this Actor. */
  get classes(): Record<string, globalThis.Item.OfType<"class">>;
  /** The cover bonus to AC and dexterity saving throws. */
  get coverBonus(): number;
  /** Highest ability associated with a spellcasting class. */
  get spellcastingAbility(): dnd5e.types.Ability.TypeKey;
  /** Get all classes which have spellcasting ability. */
  get spellcastingClasses(): Record<string, globalThis.Item.OfType<"class">>;
  /** A mapping of subclasses belonging to this Actor. */
  get subclasses(): Record<string, globalThis.Item.OfType<"subclass">>;
  /** Is this Actor currently polymorphed into some other creature? */
  get isPolymorphed(): boolean;
  /** The Actor's currently equipped armor, if any. */
  get armor(): globalThis.Item.OfType<"equipment"> | null;
  /** The Actor's currently equipped shield, if any. */
  get shield(): globalThis.Item.OfType<"equipment"> | null;
  /** The items this actor is concentrating on, and the relevant effects. */
  get concentration(): {
    items: Set<globalThis.Item.Implementation>;
    effects: Set<ActiveEffect.Implementation>;
  };
  /** Creatures summoned by this actor. */
  get summonedCreatures(): Actor.Implementation[];

  /* ---- Data preparation ---- */

  override prepareData(): void;
  /** Clear cached class collections. */
  _clearCachedValues(): void;
  override prepareEmbeddedDocuments(): void;
  override prepareDerivedData(): void;
  /** Prepares data for a specific skill. */
  _prepareSkill(skillId: dnd5e.types.Skill.TypeKey, options?: object): object;
  override applyActiveEffects(phase?: string): void;

  /* ---- Spellcasting preparation ---- */

  /**
   * Prepare data related to the spell-casting capabilities of the Actor.
   * Mutates the value of the system.spells object. Must be called after final item preparation.
   */
  _prepareSpellcasting(): void;

  /* ---- Methods ---- */

  /** Select appropriate artwork to display on sheet & chat cards based on `showTokenPortrait` flag. */
  getPreferredArtwork(): Promise<Actor5e.PreferredArtwork>;
  /** Calculate the DC of a concentration save required for a given amount of damage. */
  getConcentrationDC(damage: number): number;
  /** Return the amount of experience required to gain a certain character level. */
  getLevelExp(level: number): number;
  /** Return the amount of experience granted by killing a creature of a certain CR. */
  getCRExp(cr: number | null): number | null;
  /** Roll data for dice commands against this Actor. */
  getRollData(options?: { deterministic?: boolean }): Actor5e.RollData<this>;
  /** Is this actor under the effect of this property from some status or due to its level of exhaustion? */
  hasConditionEffect(key: dnd5e.types.ConditionEffect.TypeKey): boolean;

  /* ---- Gameplay mechanics ---- */

  override modifyTokenAttribute(attribute: string, value: number, isDelta: boolean, isBar: boolean): Promise<this>;
  /** Apply a certain amount of damage or healing to the health pool for the Actor. */
  applyDamage(damages: Actor5e.DamageDescription[] | number, options?: object): Promise<this>;
  /** Calculate the damage that will be applied to this actor. */
  calculateDamage(damages: Actor5e.DamageDescription[], options?: object): Actor5e.DamageDescription[] | false;
  /** Apply temporary hit points, but only if it's more than the actor currently has. */
  applyTempHP(amount?: number): Promise<this>;
  /** Initiate concentration on an item. */
  beginConcentrating(activity: dnd5e.types.Activity.Instance, effectData?: object): Promise<ActiveEffect.Implementation | void>;
  /** End concentration on an item. */
  endConcentration(target?: globalThis.Item.Implementation | ActiveEffect.Implementation | string): Promise<ActiveEffect.Implementation[]>;
  /** Create a chat message prompting to challenge concentration. */
  challengeConcentration(options?: { dc?: number; ability?: dnd5e.types.Ability.TypeKey | null }): Promise<ChatMessage.Implementation | null>;
  /** Create a chat message prompting to end concentration. */
  promptConcentrationEnd(): Promise<ChatMessage.Implementation | null>;
  /** Whether the provided ability is usable for remarkable athlete. */
  _isRemarkableAthlete(ability: dnd5e.types.Ability.TypeKey): boolean;

  /* ---- Rolling ---- */

  /** Add the reduction to this roll from exhaustion if using the modern rules. */
  addRollExhaustion(parts: string[], data: Record<string, number>): void;
  /** Roll an ability check with a skill. */
  rollSkill(
    config?: dnd5e.types.Dice.SkillToolRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.SkillToolRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<import("../../dice/d20-roll.mjs").default[] | null>;
  /** Roll an ability check with a tool. */
  rollToolCheck(
    config?: dnd5e.types.Dice.SkillToolRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.SkillToolRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<import("../../dice/d20-roll.mjs").default[] | null>;
  /** Configure a roll config for each roll performed as part of the skill or tool check process. */
  _buildSkillToolConfig(
    type: "skill" | "tool",
    hostActor: Actor.Implementation | null,
    process: object,
    config: object,
    formData?: object | null,
    index?: number,
  ): void;
  /** Roll a generic ability test or saving throw (prompts the user). */
  rollAbility(
    config?: dnd5e.types.Dice.AbilityRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): void;
  /** Roll an Ability Check. */
  rollAbilityCheck(
    config?: dnd5e.types.Dice.AbilityRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<import("../../dice/d20-roll.mjs").default[] | null>;
  /** Roll a Saving Throw. */
  rollSavingThrow(
    config?: dnd5e.types.Dice.AbilityRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<import("../../dice/d20-roll.mjs").default[] | null>;
  /** Perform a death saving throw. */
  rollDeathSave(
    config?: dnd5e.types.Dice.D20RollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<import("../../dice/d20-roll.mjs").default[] | null>;
  /** Perform a saving throw to maintain concentration. */
  rollConcentration(
    config?: dnd5e.types.Dice.AbilityRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<import("../../dice/d20-roll.mjs").default[] | null>;
  /** Get an un-evaluated D20Roll instance used to roll initiative for this Actor. */
  getInitiativeRoll(options?: Partial<dnd5e.types.Dice.InitiativeRollOptions>): import("../../dice/d20-roll.mjs").default | null;
  /** Get the roll configuration used to roll initiative for this Actor. */
  getInitiativeRollConfig(options?: Partial<dnd5e.types.Dice.InitiativeRollOptions>): object | null;
  /** Roll initiative with a dialog providing an opportunity to elect advantage or other bonuses. */
  rollInitiativeDialog(
    rollOptions?: Partial<dnd5e.types.Dice.InitiativeRollOptions>,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
  ): Promise<void>;
  /** Roll initiative for this Actor, caching the roll and firing pre/post hooks. */
  override rollInitiative(options?: object, rollOptions?: Partial<dnd5e.types.Dice.InitiativeRollOptions>): Promise<Combat.Stored | null>;
  /** Roll a hit die, gaining hit points equal to the die roll plus your CON modifier. */
  rollHitDie(
    config?: dnd5e.types.Dice.HitDieRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<import("../../dice/basic-roll.mjs").default[] | null>;
  /** Roll hit points for a specific class as part of a level-up workflow. */
  rollClassHitPoints(item: globalThis.Item.OfType<"class">, options?: { chatMessage?: boolean }): Promise<Roll>;
  /** Roll hit points for an NPC based on the HP formula. */
  rollNPCHitPoints(options?: { chatMessage?: boolean }): Promise<Roll>;

  /* ---- Resting ---- */

  /** Initiate a rest, spending or recovering hit dice, resources, item uses and spell slots. */
  initiateRest(config?: object): Promise<Actor5e.RestResult | void>;
  /** Take a short rest, possibly spending hit dice and recovering resources, item uses, and relevant spell slots. */
  shortRest(config?: object): Promise<Actor5e.RestResult | void>;
  /** Take a long rest, recovering hit points, hit dice, resources, item uses, and spell slots. */
  longRest(config?: object): Promise<Actor5e.RestResult | void>;
  /** Perform all of the changes needed for a short or long rest. */
  _rest(config: object, result?: object): Promise<Actor5e.RestResult | void>;
  /** Display a chat message with the result of a rest. */
  _displayRestResultMessage(config: object, result: object): Promise<ChatMessage.Implementation>;
  /** Generate rest flavor text based on the provided configuration. */
  createRestFlavor(config: object, result?: object): string;
  /** Automatically spend hit dice to recover hit points up to a certain threshold. */
  autoSpendHitDice(options?: { threshold?: number }): Promise<number | undefined>;
  /** Recovers class hit dice during a long rest. */
  _getRestHitDiceRecovery(config?: object, result?: object): void;
  /** Recovers actor hit points and eliminates any temp HP. */
  _getRestHitPointRecovery(config?: object, result?: object): void;
  /** Recovers actor resources. */
  _getRestResourceRecovery(config?: object, result?: object): void;
  /** Recovers expended spell slots. */
  _getRestSpellRecovery(config?: object, result?: object): void;
  /** Recovers item uses during short or long rests. */
  _getRestItemUsesRecovery(config?: object, result?: object): Promise<void>;

  /* ---- Property attribution ---- */

  /** Format an HTML breakdown for a given property. */
  getAttributionData(attribution: string, options?: { title?: string }): Promise<string>;
  /** Prepare a movement breakdown. */
  _prepareMovementAttribution(): string;
  /** Prepare an AC breakdown. */
  _prepareArmorClassAttribution(options?: { title?: string }): Promise<string>;
  /** Break down all of the Active Effects affecting a given target property. */
  _prepareActiveEffectAttributions(target: string): object[];

  /* ---- Conversion & transformation ---- */

  /** Fetch stats from the original actor for data preparation. */
  getOriginalStats(): { originalSaves: object | null; originalSkills: object | null };
  /** Transform this Actor into another one. */
  transformInto(source: Actor.Implementation, settings?: object, options?: { renderSheet?: boolean }): Promise<TokenDocument.Implementation[] | null>;
  /**
   * If this actor was transformed with transformTokens enabled, then its active tokens need to be returned to their
   * original state. If not, then we can safely just delete this actor.
   */
  revertOriginalForm(options?: { renderSheet?: boolean }): Promise<Actor.Implementation> | null | undefined;

  /* ---- Event handlers ---- */

  override _preUpdate(changed: object, options: object, user: User.Implementation): Promise<boolean | void>;
  override _onUpdate(data: object, options: object, userId: string): void;
  override _onDelete(options: object, userId: string): void;
  override _onCreateDescendantDocuments(parent: foundry.abstract.Document.Any, collection: string, documents: foundry.abstract.Document.Any[], data: object[], options: object, userId: string): void;
  override _onUpdateDescendantDocuments(parent: foundry.abstract.Document.Any, collection: string, documents: foundry.abstract.Document.Any[], changes: object[], options: object, userId: string): void;
  override _onDeleteDescendantDocuments(parent: foundry.abstract.Document.Any, collection: string, documents: foundry.abstract.Document.Any[], ids: string[], options: object, userId: string): void;
  /** Assign a class item as the original class based on which class has the most levels. */
  _assignPrimaryClass(): Promise<this>;
  /** Handle clearing favorited entries that were deleted. */
  _clearFavorites(documents: foundry.abstract.Document.Any[]): Promise<Actor.Implementation> | void;
  /** Flash ring & display changes to health as scrolling combat text. */
  _displayTokenEffect(changes: { hp: number; temp: number; total: number }): void;
  /**
   * TODO: Perform this as part of Actor._preUpdateOperation instead when it becomes available in v12.
   * Handle syncing the Actor's exhaustion level with the ActiveEffect.
   */
  _onUpdateExhaustion(data: object, options: object): Promise<ActiveEffect.Implementation | void>;
  /** Handle applying/removing the bloodied status. */
  updateBloodied(options: object): Promise<ActiveEffect.Implementation> | void;
  /** Handle applying/removing encumbrance statuses. */
  updateEncumbrance(options: object): Promise<ActiveEffect.Implementation> | void;
  /** Toggle a status effect on this Actor, enforcing exclusiveGroup constraints. */
  override toggleStatusEffect(statusId: string, options?: object): Promise<ActiveEffect.Stored | boolean | undefined>;

  /* ---- Statics ---- */

  /** Default icon used for newly-created actors. */
  static DEFAULT_ICON: string;
  /** Types selectable within the compendium browser. */
  static compendiumBrowserTypes(options?: { chosen?: Set<string> }): unknown;
  /** Apply package-provided art to a compendium Document. */
  static applyCompendiumArt(source: object, pack: object, art: object): void;
  /** Format a type object into a string. */
  static formatCreatureType(typeData: string | object): string;
  /**
   * Fetch an Actor by UUID and obtain a version of it in the World. If the Actor is inside a compendium, check if a
   * version has already been imported before importing it again.
   */
  static fetchExisting(uuid: string, options?: object): Promise<Actor.Implementation>;
  /** Get a color used to represent the current hit points of an Actor. */
  static getHPColor(current: number, max: number): Color;
  /** Contribute to the actor's spellcasting progression. */
  static computeClassProgression(progression: object, cls: globalThis.Item.OfType<"class">, config?: object): void;
  /** Prepare actor's spell slots using progression data. */
  static prepareSpellcastingSlots(spells: object, type: dnd5e.types.Spellcasting.Method.TypeKey, progression: object, config?: object): void;
  /** Handle rolling a skill as part of a requested group check. */
  static handleSkillCheckRequest(actor: Actor.Implementation, request: ChatMessage.Implementation, config: object, requestOptions?: object): Promise<ChatMessage.Implementation | null>;
  /** Handle resting an actor from a request. */
  static handleRestRequest(actor: Actor.Implementation, request: ChatMessage.Implementation, config: object): Promise<ChatMessage.Implementation | null>;
  /** Add additional system-specific sidebar directory context menu options. */
  static addDirectoryContextOptions(app: object, entryOptions: object[]): void;
  /** Add class to actor entry representing the primary group. */
  static onRenderActorDirectory(html: HTMLElement): void;
  static getDefaultArtwork(actorData?: object): foundry.documents.BaseActor.GetDefaultArtworkReturn;
  /** Prompt the user to create a new Actor using a dialog. */
  static createDialog(data?: object, createOptions?: object, dialogOptions?: object): Promise<Actor.Implementation | null>;
}

declare namespace Actor5e {
  /** A value stored in {@link Actor5e#_lazy} caches. */
  type LazyValue = globalThis.Item.Implementation | globalThis.Item.Implementation[] | string | unknown;

  /** Cached preferred artwork descriptor. */
  interface PreferredArtwork {
    src: string;
    isToken: boolean;
    isRandom: boolean;
    isVideo: boolean;
  }

  /** Roll data exposed to dice commands. */
  type RollData<This> = fvttUtils.InterfaceToObject<{
    flags: This extends { flags: infer F } ? F : Record<string, unknown>;
    name: string;
    statuses: Record<string, number>;
    [key: string]: unknown;
  }>;

  /**
   * Description of a source of damage (loose pending the damage-application port). `type` is a damage
   * or healing type key; `properties` is a set of bypass keys.
   */
  interface DamageDescription {
    value: number;
    type: dnd5e.types.Damage.TypeKey | dnd5e.types.HealingType.TypeKey;
    properties?: Set<string>;
    active?: Record<string, unknown>;
    [key: string]: unknown;
  }

  /** Results from a rest operation (loose pending the rest workflow port). */
  interface RestResult {
    type: string;
    clone: Actor.Implementation;
    deltas: { hitPoints: number; hitDice: number };
    newDay: boolean;
    rolls: Roll[];
    updateData: object;
    updateItems: object[];
    deleteItems?: string[];
    message?: ChatMessage.Implementation;
    [key: string]: unknown;
  }
}

export default Actor5e;
