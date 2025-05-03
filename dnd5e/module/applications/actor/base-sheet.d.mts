import AdvancementManager from "../advancement/advancement-manager.mjs";

import ActorSheetMixin from "./sheet-mixin.mjs";

import type TraitSelector from "./deprecated/trait-selector.mjs";

interface FilterState5e {
  name: string;
  properties: Set<string>;
}

// TODO move to foundry.appv1?.sheets?.ActorSheet
/**
 * Extend the basic ActorSheet class to suppose system-specific logic and functionality.
 * @abstract
 */
export default class ActorSheet5e extends ActorSheetMixin(ActorSheet) {

 

  /**
   * Track the set of item filters which are applied
   * @protected
   */
  _filters: {
    inventory: FilterState5e;
    spellbook: FilterState5e;
    features: FilterState5e;
    effects: FilterState5e;
  };

  /* -------------------------------------------- */

  /**
   * IDs for items on the sheet that have been expanded.
   * @protected
   */
  _expanded: Set<string>;

  /* -------------------------------------------- */

  /** @override */
  static get defaultOptions(): ActorSheet.Options;

  /* -------------------------------------------- */

  /**
   * A set of item types that should be prevented from being dropped on this type of actor sheet.
   */
  static unsupportedItemTypes: Set<string>;

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /**
   * Prepare labels object for the context.
   * @returns {object}           Object containing various labels.
   * @protected
   */
  _getLabels(): object;

  /* -------------------------------------------- */

  /**
   * Prepare the display of movement speed data for the Actor.
   * @param systemData               System data for the Actor being prepared.
   * @param largestPrimary  Show the largest movement speed as "primary", otherwise show "walk".
   * @protected
   */
  _getMovementSpeed(systemData: object, largestPrimary?: boolean): { primary: string; special: string };

  /* -------------------------------------------- */

  /**
   * Prepare senses object for display.
   * @param systemData  System data for the Actor being prepared.
   * @returns           Senses grouped by key with localized and formatted string.
   * @protected
   */
  _getSenses(systemData: object): object;

  /* -------------------------------------------- */
  /**
   * Prepare the data structure for traits data like languages, resistances & vulnerabilities, and proficiencies.
   * @param systemData  System data for the Actor being prepared.
   * @returns           Prepared trait data.
   * @protected
   */
  _prepareTraits(systemData: object): object;

  /* -------------------------------------------- */

  /**
   * Prepare the data structure for items which appear on the actor sheet.
   * Each subclass overrides this method to implement type-specific logic.
   * @protected
   */
  _prepareItems(): void;

  /* -------------------------------------------- */

  /**
   * Insert a spell into the spellbook object when rendering the character sheet.
   * @param context   Sheet rendering context data being prepared for render.
   * @param spells    Spells to be included in the spellbook.
   * @returns         Spellbook sections in the proper order.
   * @protected
   */
  _prepareSpellbook(context: object, spells: object[]): object[];

  /* -------------------------------------------- */

  /**
   * Filter child embedded Documents based on the current set of filters.
   * @param collection    The embedded collection name.
   * @param filters  Filters to apply to the children.
   * @protected
   */
  _filterChildren(collection: string, filters: Set<string>): foundry.abstract.Document.Any[];

  /* -------------------------------------------- */

  /**
   * Filter Active Effects based on the current set of filters.
   * @param effects  The effects to filter.
   * @param filters       Filters to apply to the effects.
   * @returns {ActiveEffect.Implementation[]}
   * @protected
   */
  _filterEffects(effects: ActiveEffect.Implementation[], filters: Set<string>): ActiveEffect.Implementation[];

  /* -------------------------------------------- */

  /**
   * Filter items based on the current set of filters.
   * @param items       Copies of item data to be filtered.
   * @param filters  Filters applied to the item list.
   * @returns {Item.Implementation[]}           Subset of input items limited by the provided filters.
   * @protected
   */
  _filterItems(items: Item.Implementation[], filters: Set<string>): Item.Implementation[];

  /* -------------------------------------------- */

  /**
   * Determine whether an Item will be shown based on the current set of filters.
   * @param item          The item.
   * @param filters  Filters applied to the Item.
   * @returns {boolean|void}
   * @protected
   */
  _filterItem(item: Item.Implementation, filters: Set<string>): boolean | void;

  /* -------------------------------------------- */

  /**
   * Get the font-awesome icon used to display a certain level of skill proficiency.
   * @param level  A proficiency mode defined in `CONFIG.DND5E.proficiencyLevels`.
   * @returns      HTML string for the chosen icon.
   * @private
   */
  _getProficiencyIcon(level: number): string;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */


  /**
   * Disable any fields that are overridden by active effects and display an informative tooltip.
   * @param html  The sheet's rendered HTML.
   * @protected
   */
  _disableOverriddenFields(html: JQuery): void;

  /* -------------------------------------------- */

  /**
   * Respond to a new level being selected from the level selector.
   * @param event                           The originating change.
   * @returns   Manager if advancements needed, otherwise updated class item.
   * @private
   */
  _onLevelChange(event: Event): Promise<AdvancementManager | Item.Implementation | void>;

  /* -------------------------------------------- */

  /**
   * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options.
   * @param event   The click event which originated the selection.
   * @protected
   */
  _onConfigMenu(event: Event): void;

  /* -------------------------------------------- */

  /**
   * Handle cycling proficiency in a skill or tool.
   * @param event     A click or contextmenu event which triggered this action.
   * @returns         Updated data for this actor after changes are applied.
   * @protected
   */
  _onCycleProficiency(event: Event): Promise<unknown> | void;

  /* -------------------------------------------- */

  /**
   * Handles dropping of a single item onto this character sheet.
   * @param itemData            The item data to create. **Will be mutated.**
   * @param event            The concluding DragEvent which provided the drop data.
   * @returns {Promise<object|boolean>}  The item data to create after processing, or false if the item should not be
   *                                     created or creation has been otherwise handled.
   * @protected
   */
  _onDropSingleItem(itemData: object, event: DragEvent): Promise<object | boolean>;

  /* -------------------------------------------- */

  /**
   * Reset certain pieces of data stored on items when they are dropped onto the actor.
   * @param itemData    The item data requested for creation. **Will be mutated.**
   * @param event    The concluding DragEvent which provided the drop data.
   */
  _onDropResetData(itemData: object, event: DragEvent): void;

  /* -------------------------------------------- */

  /**
   * Adjust the preparation mode of a dropped spell depending on the drop location on the sheet.
   * @param itemData    The item data requested for creation. **Will be mutated.**
   * @param event    The concluding DragEvent which provided the drop data.
   */
  _onDropSpell(itemData: object, event: DragEvent): void;

  /* -------------------------------------------- */

  /**
   * Handle enabling editing for a spell slot override value.
   * @param event    The originating click event.
   * @protected
   */
  _onSpellSlotOverride(event: MouseEvent): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle enabling editing for attunement maximum.
   * @param event    The originating click event.
   * @private
   */
  _onAttunementOverride(event: MouseEvent): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Initialize attribution tooltips on an element.
   * @param element  The tooltipped element.
   * @protected
   */
  _applyAttributionTooltips(element: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Handle rolling an Ability test or saving throw.
   * @param event      The originating click event.
   * @private
   */
  _onRollAbilityTest(event: Event): void;

  /* -------------------------------------------- */

  /**
   * Handle rolling a Skill check.
   * @param event      The originating click event.
   * @returns {Promise<Roll>}  The resulting roll.
   * @private
   */
  _onRollSkillCheck(event: Event): Promise<Roll>;

  /* -------------------------------------------- */

  _onRollToolCheck(event: Event): Promise<Roll>;

  /* -------------------------------------------- */

  /**
   * Handle toggling Ability score proficiency level.
   * @param event              The originating click event.
   * @returns {Promise<Actor.Implementation|void>}  Updated actor instance.
   * @private
   */
  _onToggleAbilityProficiency(event: Event): Promise<Actor.Implementation | void>;

  /* -------------------------------------------- */

  /**
   * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options.
   * @param event      The click event which originated the selection.
   * @returns {TraitSelector}  Newly displayed application.
   * @private
   */
  _onTraitSelector(event: Event): TraitSelector;

  /* -------------------------------------------- */

  /**
   * Handle links within preparation warnings.
   * @param event  The click event on the warning.
   * @protected
   */
  _onWarningLink(event: Event): Promise<void>;

  /* -------------------------------------------- */

  /** @override */
  _getHeaderButtons(): Application.HeaderButton[];

  /* -------------------------------------------- */

  /** @inheritDoc */
  _updateObject(event: Event, formData: object): Promise<Actor.Implementation>;
}
