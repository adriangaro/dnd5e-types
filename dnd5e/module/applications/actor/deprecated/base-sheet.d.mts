/**
 * Extend the basic ActorSheet class to suppose system-specific logic and functionality.
 * @deprecated Use BaseActorSheet from api/base-actor-sheet.mjs instead
 * @abstract
 */
declare class ActorSheet5e extends ActorSheet {
  /** @privateRemarks All deprecated classes should accept anything for its constructor. */
  constructor(...args: any[]);

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Track the set of item filters which are applied.
   * @protected
   */
  protected _filters: Record<string, { name: string; properties: Set<string> }>;

  /**
   * IDs for items on the sheet that have been expanded.
   * @protected
   */
  protected _expanded: Set<string>;

  /**
   * A set of item types that should be prevented from being dropped on this type of actor sheet.
   */
  static readonly unsupportedItemTypes: Set<string>;

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /** @inheritDoc */
  getData(options?: any): Promise<any>;

  /* -------------------------------------------- */

  /**
   * Prepare labels object for the context.
   * @returns Object containing various labels.
   * @protected
   */
  protected _getLabels(): object;

  /* -------------------------------------------- */

  /**
   * Prepare the display of movement speed data for the Actor.
   * @param systemData         System data for the Actor being prepared.
   * @param largestPrimary     Show the largest movement speed as "primary", otherwise show "walk".
   * @returns                  Movement speed data.
   * @protected
   */
  protected _getMovementSpeed(systemData: any, largestPrimary?: boolean): { primary: string; special: string };

  /* -------------------------------------------- */

  /**
   * Prepare senses object for display.
   * @param systemData  System data for the Actor being prepared.
   * @returns           Senses grouped by key with localized and formatted string.
   * @protected
   */
  protected _getSenses(systemData: any): Record<string, string>;

  /* -------------------------------------------- */

  /**
   * Prepare the data structure for traits data like languages, resistances & vulnerabilities, and proficiencies.
   * @param systemData  System data for the Actor being prepared.
   * @returns           Prepared trait data.
   * @protected
   */
  protected _prepareTraits(systemData: any): Record<string, any>;

  /* -------------------------------------------- */

  /**
   * Prepare the data structure for items which appear on the actor sheet.
   * Each subclass overrides this method to implement type-specific logic.
   * @protected
   */
  protected _prepareItems(context: any): void;

  /* -------------------------------------------- */

  /**
   * Insert a spell into the spellbook object when rendering the character sheet.
   * @param context    Sheet rendering context data being prepared for render.
   * @param spells     Spells to be included in the spellbook.
   * @returns          Spellbook data.
   * @protected
   */
  protected _prepareSpellbook(context: any, spells: Item.Implementation[]): Record<string, any>;

  /* -------------------------------------------- */
  /*  Filtering                                   */
  /* -------------------------------------------- */

  /**
   * Filter child embedded Documents based on the current set of filters.
   * @param collection  The embedded collection name.
   * @param filters     Filters to apply to the children.
   * @returns           Filtered documents.
   * @protected
   */
  protected _filterChildren(collection: string, filters: Set<string>): foundry.abstract.Document.Any[];

  /* -------------------------------------------- */

  /**
   * Determine whether an Item will be shown based on the current set of filters.
   * @param item     The item.
   * @param filters  Filters applied to the Item.
   * @returns        Whether to show the item.
   * @protected
   */
  protected _filterItem(item: Item.Implementation, filters: Set<string>): boolean | void;

  /* -------------------------------------------- */

  /**
   * Get the font-awesome icon used to display a certain level of skill proficiency.
   * @param level  A proficiency mode defined in `CONFIG.DND5E.proficiencyLevels`.
   * @returns      HTML string for the chosen icon.
   * @private
   */
  private _getProficiencyIcon(level: number): string;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @inheritDoc */
  activateListeners(html: JQuery): void;

  /* -------------------------------------------- */

  /**
   * Disable any fields that are overridden by active effects and display an informative tooltip.
   * @param html  The sheet's rendered HTML.
   * @protected
   */
  protected _disableOverriddenFields(html: JQuery): void;

  /* -------------------------------------------- */

  /**
   * Respond to a new level being selected from the level selector.
   * @param event  The originating change.
   * @returns      Manager if advancements needed, otherwise updated class item.
   * @private
   */
  private _onLevelChange(event: Event): Promise<any>;

  /* -------------------------------------------- */

  /**
   * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options.
   * @param event  The click event which originated the selection.
   * @protected
   */
  protected _onConfigMenu(event: Event): void;

  /* -------------------------------------------- */

  /**
   * Handle cycling proficiency levels.
   * @param event  The originating click or context menu event.
   * @param type   Type of proficiency being cycled.
   * @private
   */
  private _onCycleProficiency(event: MouseEvent, type: "skill" | "tool"): Promise<Actor.Implementation | void>;

  /* -------------------------------------------- */

  /**
   * Handle rolling an Ability test or saving throw.
   * @param event  The originating click event.
   * @private
   */
  private _onRollAbilityTest(event: Event): void;

  /* -------------------------------------------- */

  /**
   * Handle rolling a Skill check.
   * @param event  The originating click event.
   * @returns      The resulting roll.
   * @private
   */
  private _onRollSkillCheck(event: Event): Promise<any>;

  /* -------------------------------------------- */

  /**
   * Handle rolling a Tool check.
   * @param event  The originating click event.
   * @returns      The resulting roll.
   * @private
   */
  private _onRollToolCheck(event: Event): Promise<any>;

  /* -------------------------------------------- */

  /**
   * Handle toggling Ability score proficiency level.
   * @param event  The originating click event.
   * @returns      Updated actor instance.
   * @private
   */
  private _onToggleAbilityProficiency(event: Event): Promise<Actor.Implementation> | void;

  /* -------------------------------------------- */

  /**
   * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options.
   * @param event  The click event which originated the selection.
   * @returns      Newly displayed application.
   * @private
   */
  private _onTraitSelector(event: Event): any;

  /* -------------------------------------------- */

  /**
   * Handle links within preparation warnings.
   * @param event  The click event on the warning.
   * @protected
   */
  protected _onWarningLink(event: Event): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle enabling editing for a spell slot override value.
   * @param event  The originating click event.
   * @protected
   */
  protected _onSpellSlotOverride(event: MouseEvent): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle enabling editing for attunement maximum.
   * @param event  The originating click event.
   * @private
   */
  private _onAttunementOverride(event: MouseEvent): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Initialize attribution tooltips on an element.
   * @param element  The tooltipped element.
   * @protected
   */
  protected _applyAttributionTooltips(element: HTMLElement): void;

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /**
   * Reset certain pieces of data stored on items when they are dropped onto the actor.
   * @param event     The concluding DragEvent which provided the drop data.
   * @param itemData  The item data requested for creation. **Will be mutated.**
   * @protected
   */
  protected _onDropResetData(event: DragEvent, itemData: any): void;

  /* -------------------------------------------- */

  /**
   * Stack identical consumables when a new one is dropped rather than creating a duplicate item.
   * @param event     The concluding DragEvent which provided the drop data.
   * @param itemData  The item data requested for creation.
   * @param options   Additional options.
   * @returns         If a duplicate was found, returns the adjusted item stack.
   * @protected
   */
  protected _onDropStackConsumables(event: DragEvent, itemData: any, options?: { container?: string | null }): Promise<Item.Implementation> | null;

  /* -------------------------------------------- */

  /**
   * Handle the final creation of dropped Item data on the Actor.
   * @param event  The concluding DragEvent which provided the drop data.
   * @param items  The items requested for creation.
   * @returns      Created items.
   * @protected
   */
  protected _onDropCreateItems(event: DragEvent, items: any[]): Promise<Item.Implementation[]>;

  /* -------------------------------------------- */

  /**
   * Handles dropping of a single item onto this character sheet.
   * @param event     The concluding DragEvent which provided the drop data.
   * @param itemData  The item data to create.
   * @returns         The item data to create after processing, or false if the item should not be created.
   * @protected
   */
  protected _onDropSingleItem(event: DragEvent, itemData: any): Promise<any | false>;

  /* -------------------------------------------- */

  /**
   * Handle a drop event for an existing embedded Item to sort that Item relative to its siblings.
   * @param event    The originating DragEvent.
   * @param itemData The item data being dropped.
   * @returns        Updated items.
   * @protected
   */
  protected _onSortItem(event: DragEvent, itemData: any): Promise<Item.Implementation[]>;

  /* -------------------------------------------- */

  /**
   * Handle dropping of a spell onto the sheet.
   * @param event          The concluding DragEvent which provided the drop data.
   * @param item           The spell item data to be dropped.
   * @param preparationMode The spell preparation mode to use for dropped spell.
   * @protected
   */
  protected _onDropSpell(event: DragEvent, item: any, preparationMode: string): void;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _getHeaderButtons(): any[];

  /* -------------------------------------------- */

  /** @inheritDoc */
  _updateObject(event: Event, formData: Record<string, any>): Promise<any>;
}

export default ActorSheet5e;
