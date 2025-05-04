import EquipmentData from "../data/item/equipment.mjs";
import { _applyDeprecatedD20Configs } from "../dice/d20-roll.mjs";
import Scaling from "./scaling.mjs";
import Proficiency from "./actor/proficiency.mjs";
import SelectChoices from "./actor/select-choices.mjs";
import SystemDocumentMixin from "./mixins/document.mjs";
import type ActivitySheet from "../applications/activity/activity-sheet.d.mts";
import type AdvancementConfig from "../applications/advancement/advancement-config-v2.d.mts";

/**
 * Override and extend the basic Item implementation.
 */
declare class Item5e<
  SubType extends Item.SubType = Item.SubType
> extends SystemDocumentMixin(Item)<
  SubType
> {
  type: SubType
  system: Item.SystemOfType<SubType> & {
    prof: Proficiency
  }

  /**
   * Caches an item linked to this one, such as a subclass associated with a class.
   * @private
   */
  _classLink: Item.Implementation;

  /* -------------------------------------------- */

  /**
   * An object that tracks which tracks the changes to the data model which were applied by active effects
   */
  overrides: object

  /* -------------------------------------------- */

  /**
   * Types that can be selected within the compendium browser.
   * @param {object} [options={}]
   * @param {Set<string>} [options.chosen]  Types that have been selected.
   * @returns {SelectChoices}
   */
  static compendiumBrowserTypes(options?: {
    chosen?: Set<string>
  }): SelectChoices

  /* -------------------------------------------- */
  /*  Item Properties                             */
  /* -------------------------------------------- */

  /**
   * Which ability score modifier is used by this item?
   * @see {@link ActionTemplate#abilityMod}
   */
  get abilityMod(): dnd5e.types.Ability.TypeKey | null

  /* -------------------------------------------- */

  /**
   * Should deletion of this item be allowed? Doesn't prevent programatic deletion, but affects UI controls.
   */
  get canDelete(): boolean

  /* -------------------------------------------- */

  /**
   * Should duplication of this item be allowed? Doesn't prevent programatic duplication, but affects UI controls.
   */
  get canDuplicate(): boolean

  /* --------------------------------------------- */

  /**
   * The item that contains this item, if it is in a container. Returns a promise if the item is located
   * in a compendium pack.
   */
  get container(): Item.OfType<'container'> | Promise<Item.OfType<'container'>> | undefined

  /* -------------------------------------------- */

  /**
   * What is the critical hit threshold for this item, if applicable?
   * @see {@link ActionTemplate#criticalThreshold}
   */
  get criticalThreshold(): number | null;

  /* --------------------------------------------- */

  /**
   * Does the Item implement an ability check as part of its usage?
   * @see {@link ActionTemplate#hasAbilityCheck}
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  get hasAbilityCheck(): boolean

  /* -------------------------------------------- */

  /**
   * Does this item support advancement and have advancements defined?
   */
  get hasAdvancement(): boolean

  /* -------------------------------------------- */

  /**
   * Does the Item have an area of effect target?
   * @see {@link ActivatedEffectTemplate#hasAreaTarget}
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  get hasAreaTarget(): boolean
  /* -------------------------------------------- */

  /**
   * Does the Item implement an attack roll as part of its usage?
   * @see {@link ActionTemplate#hasAttack}
   */
  get hasAttack(): boolean

  /* -------------------------------------------- */

  /**
   * Does the Item implement a damage roll as part of its usage?
   * @see {@link ActionTemplate#hasDamage}
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  get hasDamage(): boolean

  /* -------------------------------------------- */

  /**
   * Does the Item target one or more distinct targets?
   * @see {@link ActivatedEffectTemplate#hasIndividualTarget}
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  get hasIndividualTarget(): boolean

  /* -------------------------------------------- */

  /**
   * Is this Item limited in its ability to be used by charges or by recharge?
   * @see {@link ActivatedEffectTemplate#hasLimitedUses}
   * @see {@link FeatData#hasLimitedUses}
   */
  get hasLimitedUses(): boolean

  /* -------------------------------------------- */

  /**
   * Does this Item draw from a resource?
   * @see {@link ActivatedEffectTemplate#hasResource}
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  get hasResource(): boolean

  /* -------------------------------------------- */

  /**
   * Does this Item draw from ammunition?
   * @see {@link ActivatedEffectTemplate#hasAmmo}
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  get hasAmmo(): boolean

  /* -------------------------------------------- */

  /**
   * Does the Item implement a saving throw as part of its usage?
   * @see {@link ActionTemplate#hasSave}
   */
  get hasSave(): boolean

  /* -------------------------------------------- */

  /**
   * Does the Item have a target?
   * @see {@link ActivatedEffectTemplate#hasTarget}
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  get hasTarget(): boolean

  /* -------------------------------------------- */

  /**
   * Return an item's identifier.
   */
  get identifier(): string

  /* --------------------------------------------- */

  /**
   * Is this Item an activatable item?
   */
  get isActive(): boolean

  /* -------------------------------------------- */

  /**
   * Is this item any of the armor subtypes?
   * @see {@link EquipmentTemplate#isArmor}
   */
  get isArmor(): boolean

  /* -------------------------------------------- */

  /**
   * Does the item provide an amount of healing instead of conventional damage?
   * @see {@link ActionTemplate#isHealing}
   */
  get isHealing(): boolean

  /* -------------------------------------------- */

  /**
   * Is this item a separate large object like a siege engine or vehicle component that is
   * usually mounted on fixtures rather than equipped, and has its own AC and HP?
   * @see {@link EquipmentData#isMountable}
   * @see {@link WeaponData#isMountable}
   */
  get isMountable(): boolean

  /* -------------------------------------------- */

  /**
   * Is this class item the original class for the containing actor? If the item is not a class or it is not
   * embedded in an actor then this will return `null`.
   */
  get isOriginalClass(): boolean | null

  /* -------------------------------------------- */

  /**
   * Does the Item implement a versatile damage roll as part of its usage?
   * @see {@link ActionTemplate#isVersatile}
   */
  get isVersatile(): boolean

  /* -------------------------------------------- */

  /**
   * Is the item rechargeable?
   */
  get hasRecharge(): boolean

  /* --------------------------------------------- */

  /**
   * Is the item on recharge cooldown?
   */
  get isOnCooldown(): boolean

  /* --------------------------------------------- */

  /**
   * Does this item require concentration?
   */
  get requiresConcentration(): boolean

  /* -------------------------------------------- */

  /**
   * Class associated with this subclass. Always returns null on non-subclass or non-embedded items.
   */
  get class(): Item.OfType<'class'> | null

  /* -------------------------------------------- */

  /**
   * Subclass associated with this class. Always returns null on non-class or non-embedded items.
   */
  get subclass(): Item.OfType<'subclass'> | null

  /* -------------------------------------------- */

  /**
   * Retrieve scale values for current level from advancement data.
   */
  get scaleValues(): Record<string, any>

  /* -------------------------------------------- */

  /**
   * Scaling increase for this item based on flag or item-type specific details.
   */
  get scalingIncrease(): number

  /* -------------------------------------------- */

  /**
   * Does this item scale with any kind of consumption?
   */
  get usageScaling(): string | null

  /* -------------------------------------------- */

  /**
   * Spellcasting details for a class or subclass.
 */


  /**
   * Retrieve the spellcasting for a class or subclass. For classes, this will return the spellcasting
   * of the subclass if it overrides the class. For subclasses, this will return the class's spellcasting
   * if no spellcasting is defined on the subclass.
   */
  get spellcasting(): Item5e.SpellcastingDescription

  /* -------------------------------------------- */
  /*  Active Effects                              */
  /* -------------------------------------------- */

  /**
   * Get all ActiveEffects that may apply to this Item.
   */
  allApplicableEffects(): Generator<ActiveEffect.OfType<'enchantment'>, void, void>

  /* -------------------------------------------- */

  /**
   * Apply any transformation to the Item data which are caused by enchantment Effects.
   */
  applyActiveEffects()

  /* -------------------------------------------- */

  /**
   * Should this item's active effects be suppressed.
   */
  get areEffectsSuppressed(): boolean

  /* -------------------------------------------- */
  /*  Data Initialization                         */
  /* -------------------------------------------- */

  // /** @inheritDoc */
  // clone(data={}, options={}) {
  //   if ( options.save ) return super.clone(data, options);
  //   if ( this.parent ) this.parent._embeddedPreparation = true;
  //   const item = super.clone(data, options);
  //   if ( item.parent ) {
  //     delete item.parent._embeddedPreparation;
  //     item.prepareFinalAttributes();
  //   }
  //   return item;
  // }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  labels: Record<string, string[]>

  advancement: {
    byId: Record<string, dnd5e.types.Advancement.Any>,
    byLevel: Record<number, dnd5e.types.Advancement.Any>,
    byType: {
      [K in dnd5e.types.Advancement.TypeKey]?: dnd5e.types.Advancement.Types[K][]
    },
    needingConfiguration: dnd5e.types.Advancement.Any[]
  }

  /* -------------------------------------------- */

  // TODO: move prof: Proficiency to typed data model
  // /**
  //  * Determine an item's proficiency level based on its parent actor's proficiencies.
  //  * @protected
  //  */
  // _prepareProficiency() {
  //   if ( !["spell", "weapon", "equipment", "tool", "feat", "consumable"].includes(this.type) ) return;
  //   if ( !this.actor?.system.attributes?.prof ) {
  //     this.system.prof = new Proficiency(0, 0);
  //     return;
  //   }

  //   this.system.prof = new Proficiency(this.actor.system.attributes.prof, this.system.proficiencyMultiplier ?? 0);
  // }

  /* -------------------------------------------- */

  /**
   * Compute item attributes which might depend on prepared actor data. If this item is embedded this method will
   * be called after the actor's data is prepared.
   * Otherwise, it will be called at the end of `Item5e#prepareDerivedData`.
   */
  prepareFinalAttributes()

  /* -------------------------------------------- */

  /**
   * Prepare top-level summary labels based on configured activities.
   * @protected
   */
  _prepareLabels()

  /* -------------------------------------------- */

  /**
   * Update a label to the Item detailing its total to hit bonus from the following sources:
   * - item's actor's proficiency bonus if applicable
   * - item's actor's global bonuses to the given item type
   * - item document's innate & magical attack bonuses
   * - item's ammunition if applicable
   * @returns Data used in the item's Attack roll.
   */
  getAttackToHit(): { rollData: object, parts: string[] } | null

  /* -------------------------------------------- */

  /**
   * Render a rich tooltip for this item.
   * @param enrichmentOptions  Options for text enrichment.
   */
  richTooltip(enrichmentOptions?: TextEditor.EnrichmentOptions): Promise<{ content: string, classes: string[] }> | null

  /* -------------------------------------------- */


  /**
   * Trigger an Item usage, optionally creating a chat message with followup actions.
   * @param {ActivityUseConfiguration} config       Configuration info for the activation.
   * @param {boolean} [config.legacy=true]          Whether this is a legacy invocation, using the old signature.
   * @param {boolean} [config.chooseActivity=false] Force the activity selection prompt unless the fast-forward modifier
   *                                                is held.
   * @param {ActivityDialogConfiguration} dialog    Configuration info for the usage dialog.
   * @param {ActivityMessageConfiguration} message  Configuration info for the created chat message.
   * @returns {Promise<ActivityUsageResults|ChatMessage|object|void>}  Returns the usage results for the triggered
   *                                                                   activity, or the chat message if the Item had no
   *                                                                   activities and was posted directly to chat.
   */
  use(
    config?: dnd5e.types.Activity.UseConfiguration,
    dialog?: dnd5e.types.Activity.DialogConfiguration,
    message?: dnd5e.types.Activity.MessageConfiguration
  ): Promise<dnd5e.types.Activity.UsageResults | ChatMessage.Implementation | undefined>

  /* -------------------------------------------- */

  /**
   * Handle item's consumption.
   * @param item  Item or clone to use when calculating updates.
   * @param config  Configuration data for the item usage being prepared.
   * @param options       Additional options used for configuring item usage.
   * @returns                 Returns `false` if any further usage should be canceled.
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  consume(
    item: Item.Implementation,
    config: Item5e.UseConfiguration,
    options: Item5e.UseOptions
  ): false | void

  /* -------------------------------------------- */

  /**
   * Display the chat card for an Item as a Chat Message
   * @param {Partial<ActivityMessageConfiguration>} [message]  Configuration info for the created chat message.
   * @returns {Promise<ChatMessage5e|object|void>}
   */
  displayCard(message?: Partial<dnd5e.types.Activity.MessageConfiguration>): Promise<ChatMessage.Implementation | undefined>

  /* -------------------------------------------- */
  /*  Chat Cards                                  */
  /* -------------------------------------------- */

  /**
   * Prepare an object of chat data used to display a card for the Item in the chat log.
   * @param htmlOptions    Options used by the TextEditor.enrichHTML function.
   * @returns               An object of chat data to render.
   */
  getChatData(htmlOptions: Partial<TextEditor.EnrichmentOptions>): {
    description: string,
    properties: any[]
  }

  /* -------------------------------------------- */
  /*  Item Rolls - Attack, Damage, Saves, Checks  */
  /* -------------------------------------------- */

  /**
   * Place an attack roll using an item (weapon, feat, spell, or equipment)
   * Rely upon the d20Roll logic for the core implementation
   *
   * @param options  Roll options which are configured and provided to the d20Roll function
   * @returns      A Promise which resolves to the created Roll instance
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  rollAttack(options?: dnd5e.dice.D20Roll.Configuration & {
    spellLevel?: number,
  }): Promise<dnd5e.dice.D20Roll | null>

  /* -------------------------------------------- */

  /**
   * Place a damage roll using an item (weapon, feat, spell, or equipment)
   * Rely upon the damageRoll logic for the core implementation.
   * @param {object} [config]
   * @param {MouseEvent} [config.event]    An event which triggered this roll, if any
   * @param {boolean} [config.critical]    Should damage be rolled as a critical hit?
   * @param {number} [config.spellLevel]   If the item is a spell, override the level for damage scaling
   * @param {boolean} [config.versatile]   If the item is a weapon, roll damage using the versatile formula
   * @param {DamageRollConfiguration} [config.options]  Additional options passed to the damageRoll function
   * @returns {Promise<DamageRoll[]>}      A Promise which resolves to the created Roll instances, or null if the action
   *                                       cannot be performed.
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  rollDamage(config?: dnd5e.dice.D20Roll.Configuration & {
    spellLevel?: number,
    critical?: boolean,
    versatile?: boolean,
    event?: MouseEvent
  })

  /* -------------------------------------------- */

  /**
   * Prepare data needed to roll an attack using an item (weapon, feat, spell, or equipment)
   * and then pass it off to `d20Roll`.
   * @param options
   * @param options.spellLevel  Level at which a spell is cast.
   * @returns    A Promise which resolves to the created Roll instance.
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  rollFormula(options?: { spellLevel?: number }): Promise<Roll>

  /* -------------------------------------------- */

  /**
   * Perform an ability recharge test for an item which uses the d6 recharge mechanic.
   * @returns  A Promise which resolves to the created Roll instance
   * @deprecated since DnD5e 4.0, targeted for removal in DnD5e 4.4
   */
  rollRecharge(): Promise<Roll | void>

  /* -------------------------------------------- */

  /**
   * Prepare data needed to roll a tool check and then pass it off to `d20Roll`.
   * @param {D20RollConfiguration} [options]  Roll configuration options provided to the d20Roll function.
   * @returns {Promise<Roll>}                 A Promise which resolves to the created Roll instance.
   */
  rollToolCheck(options?: dnd5e.dice.D20Roll.Configuration): Promise<Roll>

  /* -------------------------------------------- */

  /**
   * @inheritdoc
   * @param {object} [options]
   * @param {boolean} [options.deterministic] Whether to force deterministic values for data properties that could be
   *                                          either a die term or a flat term.
   */
  getRollData(options?: { deterministic?: boolean }): Item5e.RollData<this>

  /* -------------------------------------------- */
  /*  Chat Message Helpers                        */
  /* -------------------------------------------- */

  /**
   * Apply listeners to chat messages.
   * @param html  Rendered chat message.
   */
  static chatListeners(html: JQuery | HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle toggling the visibility of chat card content when the name is clicked
   * @param event   The originating click event
   * @private
   */
  static _onChatCardToggleContent(event: Event)

  /* -------------------------------------------- */
  /*  Activities & Advancements                   */
  /* -------------------------------------------- */

  /**
   * Create a new activity of the specified type.
   * @param {string} type                          Type of activity to create.
   * @param {object} [data]                        Data to use when creating the activity.
   * @param {object} [options={}]
   * @param {boolean} [options.renderSheet=true]  Should the sheet be rendered after creation?
   * @returns {Promise<ActivitySheet|null>}
   */
  createActivity<
    Type extends dnd5e.types.Activity.TypeKey = dnd5e.types.Activity.TypeKey
  >(
    type?: Type,
    data?: foundry.abstract.DataModel.CreateData<
      dnd5e.types.Activity.SchemaMap[Type]
    >,
    options?: { renderSheet?: boolean }
  ): Promise<ActivitySheet<dnd5e.types.Activity.OfType<Type>> | null>

  /* -------------------------------------------- */

  /**
   * Update an activity belonging to this item.
   * @param {string} id          ID of the activity to update.
   * @param {object} updates     Updates to apply to this activity.
   * @returns {Promise<Item5e>}  This item with the changes applied.
   */
  updateActivity(id: string, updates: object): Promise<this>

  /* -------------------------------------------- */

  /**
   * Remove an activity from this item.
   * @param {string} id          ID of the activity to remove.
   * @returns {Promise<Item5e>}  This item with the changes applied.
   */
  deleteActivity(id: string): Promise<this>

  /* -------------------------------------------- */

  /**
   * Create a new advancement of the specified type.
   * @param {string} type                          Type of advancement to create.
   * @param {object} [data]                        Data to use when creating the advancement.
   * @param {object} [options]
   * @param {boolean} [options.showConfig=true]    Should the new advancement's configuration application be shown?
   * @param {boolean} [options.source=false]       Should a source-only update be performed?
   * @returns {Promise<AdvancementConfig>|Item5e}  Promise for advancement config for new advancement if local
   *                                               is `false`, or item with newly added advancement.
   */
  createAdvancement<
    Type extends dnd5e.types.Advancement.TypeKey = dnd5e.types.Advancement.TypeKey
  >(
    type?: Type,
    data?: foundry.abstract.DataModel.CreateData<
      dnd5e.types.Advancement.SchemaMap[Type]
    >,
    options?: {
      showConfig?: boolean,
      source?: boolean
    }
  ): (
      dnd5e.types.GetKey<this['system'], 'advancement'> extends never
      ? this
      : Promise<dnd5e.types.Advancement.ConfigSheetMap[Type]>
    )

  /* -------------------------------------------- */

  /**
   * Update an advancement belonging to this item.
   * @param {string} id                       ID of the advancement to update.
   * @param {object} updates                  Updates to apply to this advancement.
   * @param {object} [options={}]
   * @param {boolean} [options.source=false]  Should a source-only update be performed?
   * @returns {Promise<Item5e>|Item5e}        This item with the changes applied, promised if source is `false`.
   */
  updateAdvancement(
    id: string,
    updates: object,
    options?: { source?: boolean }
  ): (
      dnd5e.types.GetKey<this['system'], 'advancement'> extends never
      ? this
      : Promise<this>
    )

  /* -------------------------------------------- */

  /**
   * Remove an advancement from this item.
   * @param {string} id                       ID of the advancement to remove.
   * @param {object} [options={}]
   * @param {boolean} [options.source=false]  Should a source-only update be performed?
   * @returns {Promise<Item5e>|Item5e}        This item with the changes applied.
   */
  deleteAdvancement(
    id: string,
    options?: { source?: boolean }
  )

  /* -------------------------------------------- */

  /**
   * Duplicate an advancement, resetting its value to default and giving it a new ID.
   * @param {string} id                             ID of the advancement to duplicate.
   * @param {object} [options]
   * @param {boolean} [options.showConfig=true]     Should the new advancement's configuration application be shown?
   * @param {boolean} [options.source=false]        Should a source-only update be performed?
   * @returns {Promise<AdvancementConfig>|Item5e}   Promise for advancement config for duplicate advancement if source
   *                                                is `false`, or item with newly duplicated advancement.
   */
  duplicateAdvancement(
    id: string,
    options?: {
      showConfig?: boolean,
      source?: boolean
    }): (
      dnd5e.types.GetKey<this['system'], 'advancement'> extends never
      ? this
      : Promise<AdvancementConfig<dnd5e.types.Advancement.Any>>
    )

  /* -------------------------------------------- */

  /** @inheritDoc */
  getEmbeddedDocument<EmbeddedName extends Item.Embedded.CollectionName | 'Activity' | 'Advancement'>(
    embeddedName: EmbeddedName,
    id: string,
    options?: foundry.abstract.Document.GetEmbeddedDocumentOptions,
  ): EmbeddedName extends Item.Embedded.CollectionName ? 
    (Item.Embedded.DocumentFor<EmbeddedName> | undefined) : 
    EmbeddedName extends 'Activity' ? 
      (dnd5e.types.Activity.Any | undefined) :
      (EmbeddedName extends 'Advancement' ? (dnd5e.types.Advancement.Any | undefined) : undefined)

  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /**
   * Add additional system-specific compendium context menu options for Item documents.
   * TODO: Remove when v12 support is dropped (handled in ItemCompendium5eV13).
   * @param html            The compendium HTML.
   * @param entryOptions  The default array of context menu options.
   */
  static addCompendiumContextOptions(
    html: JQuery,
    entryOptions: foundry.applications.ux.ContextMenu.Entry<HTMLElement | JQuery>[]
  ): foundry.applications.ux.ContextMenu.Entry<HTMLElement | JQuery>[]

  /* -------------------------------------------- */

  /**
   * Add additional system-specific sidebar directory context menu options for Item documents.
   * @param app      The sidebar application.
   * @param entryOptions  The default array of context menu options.
   */
  static addDirectoryContextOptions(
    app: ItemDirectory,
    entryOptions: foundry.applications.ux.ContextMenu.Entry<HTMLElement | JQuery>[]
  ): foundry.applications.ux.ContextMenu.Entry<HTMLElement | JQuery>[]

  /* -------------------------------------------- */


  /**
   * Prepare creation data for the provided items and any items contained within them. The data created by this method
   * can be passed to `createDocuments` with `keepId` always set to true to maintain links to container contents.
   * @param {Item5e[]} items                     Items to create.
   * @param {object} [context={}]                Context for the item's creation.
   * @param {Item5e} [context.container]         Container in which to create the item.
   * @param {boolean} [context.keepId=false]     Should IDs be maintained?
   * @param {ItemContentsTransformer} [context.transformAll]    Method called on provided items and their contents.
   * @param {ItemContentsTransformer} [context.transformFirst]  Method called only on provided items.
   * @returns {Promise<object[]>}                Data for items to be created.
   */
  static createWithContents(
    items: Item.Implementation[],
    context?: {
      container?: string,
      keepId?: boolean,
      transformAll?: Item5e.ContentsTransformer,
      transformFirst?: Item5e.ContentsTransformer
    }
  ): Promise<Item.CreateData[] | undefined>

  /* -------------------------------------------- */


  /**
   * Create a consumable spell scroll Item from a spell Item.
   * @param spell                   The spell or item data to be made into a scroll.
   * @param options                      Additional options that modify the created scroll.
   * @param config  Configuration options for scroll creation.
   * @returns                The created scroll consumable item.
   */
  static createScrollFromSpell(
    // TODO when fvtt-types supports, use Item.Source<'spell'>
    spell: Item.OfType<'spell'> | Item.Source, 
    options?: object,
    config?: Item5e.SpellScrollConfiguration
  ): Promise<Item.OfType<'consumable'> | undefined>

  /* -------------------------------------------- */

  /**
   * Create a consumable spell scroll Item from a spell Item.
   * @param uuid                           UUID of the spell to add to the scroll.
   * @param config  Configuration options for scroll creation.
   * @returns                 The created scroll consumable item.
   */
  static createScrollFromCompendiumSpell(
    uuid: string, 
    config?: Item5e.SpellScrollConfiguration
  ): Promise<Item.OfType<'consumable'> | undefined>

  /* -------------------------------------------- */

  /**
   * Create the description for a spell scroll.
   * @param scroll                         Base spell scroll.
   * @param spell                   Spell being added to the scroll.
   * @param spellDescription             Description from the spell being added.
   * @param config  Configuration options for scroll creation.
   * @protected
   */
  static _createScrollDescription(
    scroll: Item.OfType<'consumable'>, 
    // TODO when fvtt-types supports, use Item.Source<'spell'>
    spell: Item.OfType<'spell'> | Item.Source, 
    spellDescription: string,
    config?: Item5e.SpellScrollConfiguration
  ): string

  /* -------------------------------------------- */

  /**
   * Spawn a dialog for creating a new Item.
   * @param {object} [data]  Data to pre-populate the Item with.
   * @param {object} [context]
   * @param {Actor5e} [context.parent]       A parent for the Item.
   * @param {string|null} [context.pack]     A compendium pack the Item should be placed in.
   * @param {string[]|null} [context.types]  A list of types to restrict the choices to, or null for no restriction.
   * @returns {Promise<Item5e|null>}
   */
  static createDialog(
    data?: fvttUtils.DeepPartial<Item.CreateData>, 
    context?: { 
      parent?: Actor.Implementation, 
      pack?: string | null, 
      types?: Item.SubType[] | null, 
    }
  ): Promise<Item.Implementation | null>
}

declare namespace Item5e {
  interface SpellcastingDescription {
    type: string;
    progression: string | null;
    ability: string;
    levels: number | null;
  }

  /**
 * Configuration data for an item usage being prepared.
*/
  interface UseConfiguration {
    createMeasuredTemplate: boolean;
    createSummons: boolean;
    consumeResource: boolean;
    consumeSpellSlot: boolean;
    consumeUsage: boolean;
    enchantmentProfile: string;
    promptEnchantment: boolean;
    slotLevel: string | number | null;
    summonsProfile: string | null;
    resourceAmount: number | null;
    beginConcentrating: boolean;
    endConcentration: string | null;
  }

  /**
   * Additional options used for configuring item usage.
  */
  interface UseOptions {
    configureDialog: boolean;
    rollMode: string;
    createMessage: boolean;
    flags: object;
    event: Event;
  }

  type RollData<This extends Item5e> = fvttUtils.InterfaceToObject<(
    dnd5e.types.GetKeyReturn<This['system'], 'getRollData'> extends never ?
    (
      ReturnType<Actor.Implementation['getRollData']> & {
        item: This['system']
      }
    ) :
    dnd5e.types.GetKeyReturn<This['system'], 'getRollData'>
  ) & {
    scaling: Scaling
  }>

  type ContentsTransformer = (item: Item.Implementation, options: {
    container: string,
    depth: number
  }) => Item.Implementation | void

  /**
   * Configuration options for spell scroll creation.
  */
  interface SpellScrollConfiguration {
    dialog?: boolean;
    explanation?: "full" | "reference" | "none";
    level?: number;
    values?: Partial<SpellScrollValues>;
  }

  interface SpellScrollValues {
    bonus: number,
    dc: number
  }
}

export default Item5e

declare module "fvtt-types/configuration" {
  interface DocumentClassConfig {
    Item: typeof Item5e<Item.SubType>
  }

  interface ConfiguredItem<SubType extends Item.SubType> {
    document: Item5e<SubType>;
  }
}

declare global {
  namespace Item.Metadata {
    interface Embedded {
      // Activity: 'Activity',
      // Advancement: 'Advancement'
    }
  }

  namespace dnd5e.types {
    interface DND5EConfig {
      /**
       * Default artwork configuration for each Document type and sub-type.
       */
      defaultArtwork: {
        Item: {
          [K in Item.ConfiguredSubTypes]: string
        }
      }
      /**
       * Spell scroll save DCs and attack bonus values based on spell level. If matching level isn't found,
       * then the nearest level lower than it will be selected.
       */
      spellScrollValues: Record<number, Item5e.SpellScrollValues>
    }
  }
}

type d = TextEditor.EnrichmentOptions