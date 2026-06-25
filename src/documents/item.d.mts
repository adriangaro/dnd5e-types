/**
 * Override and extend the basic Item implementation.
 *
 * CANONICAL document example. Extends the base `Item` through {@link SystemDocumentMixin} (so the
 * `SubType` generic threads to `system` narrowing) and is registered into fvtt-types'
 * `DocumentClassConfig` by the document funnel, so `Item.Implementation`/`item.system` everywhere
 * resolve to this class.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface Item5e` — downstream packages add
 * document-level methods/getters by augmenting that interface (the document analogue of the
 * data-model Seam-D override interfaces). Types whose dependencies aren't ported yet (activity/effect
 * config + result shapes) are intentionally loose (`object`/`unknown`) and tightened as F lands.
 */

import type SystemDocumentMixin from "./mixins/document.mjs";
import type Scaling from "./scaling.mjs";
import type SelectChoices from "./actor/select-choices.mjs";

declare const Item5e_base: ReturnType<typeof SystemDocumentMixin<typeof Item>>;

declare class Item5e<out SubType extends Item.SubType = Item.SubType> extends Item5e_base<SubType> {
  /** Caches an item linked to this one, such as a subclass associated with a class. */
  _classLink: globalThis.Item.Implementation;

  /** Tracks the changes to the data model which were applied by active effects. */
  overrides: object;

  /** Summary labels prepared from configured activities. */
  labels: Record<string, string[]>;

  /** Prepared advancement index (populated during data preparation). */
  advancement: {
    byId: Record<string, dnd5e.types.Advancement.Instance>;
    byLevel: Record<number, dnd5e.types.Advancement.Instance[]>;
    byType: { [K in dnd5e.types.Advancement.TypeKey]?: dnd5e.types.Advancement.OfType<K>[] };
    needingConfiguration: dnd5e.types.Advancement.Instance[];
  };

  /* ---- Item properties (getters) ---- */

  /** Which ability score modifier is used by this item? */
  get abilityMod(): dnd5e.types.Ability.TypeKey | null;
  /** Should deletion of this item be allowed? (UI-only guard) */
  get canDelete(): boolean;
  /** Should duplication of this item be allowed? (UI-only guard) */
  get canDuplicate(): boolean;
  /** Can this item be used (has an active, usable activity)? */
  get canUse(): boolean;
  /** The container holding this item, if any. A promise when in a compendium. */
  get container(): globalThis.Item.OfType<"container"> | Promise<globalThis.Item.OfType<"container">> | undefined;
  /** Critical-hit threshold for this item, if applicable. */
  get criticalThreshold(): number | null;
  /** Active effect that granted this item as a rider. */
  get dependentOrigin(): ActiveEffect.Implementation | null;
  /** Does this item support advancement and have advancements defined? */
  get hasAdvancement(): boolean;
  /** Does the Item implement an attack roll as part of its usage? */
  get hasAttack(): boolean;
  /** Is this Item limited in its usage by charges or recharge? */
  get hasLimitedUses(): boolean;
  /** Does the Item implement a saving throw as part of its usage? */
  get hasSave(): boolean;
  /** Item's identifier (slugified name or configured identifier). */
  get identifier(): string;
  /** Is this Item an activatable item? */
  get isActive(): boolean;
  /** Is this item any of the armor subtypes? */
  get isArmor(): boolean;
  /** Does the item provide healing instead of conventional damage? */
  get isHealing(): boolean;
  /** Is this item hidden, preventing it from being used or recovering uses? */
  get isHidden(): boolean;
  /** Is this item a separate large object like a siege engine or vehicle component that is usually mounted on fixtures rather than equipped, and has its own AC and HP? */
  get isMountable(): boolean;
  /** Is this class the actor's original class? `null` if not a class / not embedded. */
  get isOriginalClass(): boolean | null;
  /** Does the Item implement a versatile damage roll? */
  get isVersatile(): boolean;
  /** Is the item rechargeable? */
  get hasRecharge(): boolean;
  /** Is the item on recharge cooldown? */
  get isOnCooldown(): boolean;
  /** Does this item require concentration? */
  get requiresConcentration(): boolean;
  /** Class associated with this subclass (else `null`). */
  get class(): globalThis.Item.OfType<"class"> | null;
  /** Subclass associated with this class (else `null`). */
  get subclass(): globalThis.Item.OfType<"subclass"> | null;
  /** Scale values for the current level from advancement data. */
  get scaleValues(): Record<string, dnd5e.types.AdvancementScaleValue>;
  /** Scaling increase based on flag or item-type specifics. */
  get scalingIncrease(): number;
  /** Does this item scale with any kind of consumption? */
  get usageScaling(): string | null;
  /**
   * Retrieve the spellcasting for a class or subclass. For classes, this will return the spellcasting
   * of the subclass if it overrides the class. For subclasses, this will return the class's spellcasting
   * if no spellcasting is defined on the subclass.
   */
  get spellcasting(): Item5e.SpellcastingDescription | null;
  /** Should this item's active effects be suppressed? */
  get areEffectsSuppressed(): boolean;

  /* ---- Active effects ---- */

  /** All ActiveEffects (enchantments) that may apply to this Item. */
  allApplicableEffects(): Generator<ActiveEffect.Implementation, void, void>;
  /** Apply transformations to the Item data caused by enchantment effects. */
  applyActiveEffects(): void;

  /* ---- Data preparation ---- */

  override prepareBaseData(): void;
  override prepareEmbeddedDocuments(): void;
  override prepareDerivedData(): void;
  /** Item attributes that may depend on prepared actor data. */
  prepareFinalAttributes(): void;
  /** Prepare top-level summary labels from configured activities. */
  _prepareLabels(): void;
  /** Create a clone with scaling applied. */
  scaledClone(
    scaling: number,
    options?: object,
  ): globalThis.Item.Implementation;

  /* ---- Usage & chat ---- */

  /** Render a rich tooltip for this item. */
  richTooltip(
    enrichmentOptions?: foundry.applications.ux.TextEditor.EnrichmentOptions,
  ): Promise<{ content: string; classes: string[] }> | null;
  /** Trigger an Item usage (optionally creating a chat message). */
  use(
    config?: dnd5e.types.documents.activity.ActivityUseConfiguration & { chooseActivity?: boolean },
    dialog?: dnd5e.types.documents.activity.ActivityDialogConfiguration,
    message?: dnd5e.types.documents.activity.ActivityMessageConfiguration,
  ): Promise<dnd5e.types.documents.activity.ActivityUsageResults | ChatMessage.Implementation | object | void>;
  /** Display the chat card for an Item as a Chat Message. */
  displayCard(message?: object): Promise<ChatMessage.Implementation | undefined>;
  /** Chat data used to render a card for the Item in the chat log. */
  getChatData(htmlOptions?: Partial<foundry.applications.ux.TextEditor.EnrichmentOptions>): {
    description: string;
    properties: string[];
  };
  /** Roll a tool check for this (tool) item. */
  rollToolCheck(
    config?: dnd5e.types.Dice.SkillToolRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.SkillToolRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<import("../module/dice/d20-roll.mjs").default[] | null | undefined>;
  /** Roll data for dice commands against this Item. */
  getRollData(options?: { deterministic?: boolean }): Item5e.RollData<this>;

  /* ---- Activities & advancements ---- */

  /** Create a new activity of the given type on this item. */
  createActivity(
    type: dnd5e.types.Activity.TypeKey,
    data?: object,
    options?: { renderSheet?: boolean },
  ): Promise<import("../module/applications/activity/activity-sheet.mjs").default | null | undefined>;
  /** Update an activity belonging to this item. */
  updateActivity(id: string, updates: object): Promise<this>;
  /** Remove an activity from this item. */
  deleteActivity(id: string): Promise<this>;
  /** Create a new advancement of the given type on this item. */
  createAdvancement(
    type: dnd5e.types.Advancement.TypeKey,
    data?: object,
    options?: { showConfig?: boolean; source?: boolean },
  ): Promise<unknown> | this;
  /** Update an advancement belonging to this item. */
  updateAdvancement(id: string, updates: object, options?: { source?: boolean }): Promise<this> | this;
  /** Remove an advancement from this item. */
  deleteAdvancement(id: string, options?: { source?: boolean }): Promise<this> | this;
  /** Duplicate an advancement on this item. */
  duplicateAdvancement(id: string, options?: object): Promise<this> | this;

  /** Override deletion dialog to handle containers with contents and advancement removal. */
  override deleteDialog(
    options?: { sheet?: object } & object,
    operation?: object,
  ): Promise<this | false | null>;

  /* ---- Statics ---- */

  /** Default icon used for newly-created items. */
  static DEFAULT_ICON: string;
  /** Types selectable within the compendium browser. */
  static compendiumBrowserTypes(options?: { chosen?: Set<string> }): SelectChoices;
  /** Apply chat-card listeners to a rendered message. */
  static chatListeners(html: HTMLElement): void;
  /** Create one or more items along with their contained items. */
  static createWithContents(items: (globalThis.Item.Implementation | object)[], options?: object): Promise<object[] | undefined>;
  /** Create a spell-scroll consumable from a spell. */
  static createScrollFromSpell(spell: globalThis.Item.Implementation | object, options?: object, config?: object): Promise<globalThis.Item.Implementation | void>;
  /** Create a spell-scroll consumable from a compendium spell by UUID. */
  static createScrollFromCompendiumSpell(uuid: string, config?: object): Promise<globalThis.Item.Implementation | void>;
  /** Resolve default artwork for the given item data. */
  static getDefaultArtwork(itemData?: object): { img: string };
  /** Add system-specific context-menu options to the sidebar item directory. */
  static addDirectoryContextOptions(app: object, entryOptions: object[]): void;
  /** Open a dnd5e-specific dialog to create a new item document. */
  static override createDialog(data?: object, createOptions?: object, dialogOptions?: object): Promise<globalThis.Item.Implementation | null>;
}

declare namespace Item5e {
  /** Resolved spellcasting description for a class/subclass (loose pending the spellcasting port). */
  interface SpellcastingDescription {
    type: dnd5e.types.Spellcasting.Method.TypeKey;
    progression: dnd5e.types.Spellcasting.Progression.TypeKey | null;
    ability: dnd5e.types.Ability.TypeKey | "";
    levels: number | null;
    [key: string]: unknown;
  }

  /** Roll data exposed to dice commands. Merges actor roll data when embedded. */
  type RollData<This> = fvttUtils.InterfaceToObject<{
    item: This;
    labels: Record<string, unknown>;
    scaling: Scaling;
    [key: string]: unknown;
  }>;
}

export default Item5e;
