/**
 * AdvancementMixin — mirrors ActivityMixin (see documents/activity/mixin.d.mts), for advancements.
 * A concrete advancement *document* is `AdvancementMixin(BaseXAdvancementData)`: the data model
 * supplies schema + derived, this mixin layers the pseudo-document behavior. Patch cross-advancement
 * methods by declaration-merging into {@link AdvancementBehavior}.
 */

import type { AdvancementError } from "./advancement.mjs";

type AnyAdvancementDataConstructor = abstract new (...args: any[]) => foundry.abstract.DataModel.Any;

/**
 * `get item()` is the lazy, full `Item.Implementation` here — it MUST stay the open union at the
 * registered-document level, because a concrete `Item.OfType<…>` baked into the document type would
 * self-reference (`SubclassAdvancement` → `Item.OfType<class>` → class.system → advancement
 * collection → `SubclassAdvancement`). The PER-ADVANCEMENT narrowing to the valid parent item types
 * is applied as a consumer-facing overlay in {@link dnd5e.types.Advancement.OfType} (resolved on
 * access, after item.system is built), driven by the expandable `Advancement.ValidItemTypes` set.
 */
export declare class AdvancementBehavior {
  constructor(...args: any[]);

  get id(): string;
  get uuid(): string;
  get item(): globalThis.Item.Implementation;
  get actor(): globalThis.Actor.Implementation | null;

  /**
   * Should this advancement be applied to a class based on its class restriction setting? This will always return
   * true for advancements that are not within an embedded class item.
   * @type {boolean}
   */
  get appliesToClass(): boolean;

  /**
   * List of levels in which this advancement object should be displayed. Will be a list of class levels if this
   * advancement is being applied to classes or subclasses, otherwise a list of character levels.
   * @returns {number[]}
   */
  get levels(): number[];

  /**
   * Does this Advancement type support HTML hints in the config dialog, flow, and summary?
   * Any Advancement type that has upgraded its Flow application to ApplicationV2 is assumed to support this.
   * @type {boolean}
   */
  get supportsHTMLHint(): boolean;

  /**
   * The default icon that will be used if one isn't specified.
   * @type {string}
   */
  get _defaultIcon(): string;

  /**
   * The default title that will be used if one isn't specified.
   * @type {string}
   */
  get _defaultTitle(): string;

  /**
   * Prepare data for the Advancement.
   */
  prepareData(): void;

  /**
   * Has the player made choices for this advancement at the specified level?
   * @param level  Level for which to check configuration.
   * @returns Have any available choices been made?
   */
  configuredForLevel(level: number): boolean;

  /**
   * Value used for sorting this advancement at a certain level.
   * @param level  Level for which this entry is being sorted.
   * @returns String that can be used for sorting.
   */
  sortingValueForLevel(level: number): string;

  /**
   * Title displayed in advancement list for a specific level.
   * @param level    Level for which to generate a title.
   * @param options
   * @param options.legacyDisplay  Use legacy formatting?
   * @param options.configMode     Is the advancement's item sheet in configuration mode? When in
   *                               config mode, the choices already made on this actor should not be displayed.
   * @returns HTML title with any level-specific information.
   */
  titleForLevel(
    level: number,
    options?: { legacyDisplay?: boolean; configMode?: boolean },
  ): string;

  /**
   * Summary content displayed beneath the title in the advancement list.
   * @param level    Level for which to generate the summary.
   * @param options
   * @param options.legacyDisplay  Use legacy formatting?
   * @param options.configMode     Is the advancement's item sheet in configuration mode? When in
   *                               config mode, the choices already made on this actor should not be displayed.
   * @returns HTML content of the summary.
   */
  summaryForLevel(
    level: number,
    options?: { legacyDisplay?: boolean; configMode?: boolean },
  ): string;

  /**
   * Locally apply this advancement to the actor.
   * @param level    Level being advanced.
   * @param data     Data from the advancement form.
   * @param options  Additional options to guide the application process.
   * @abstract
   */
  apply(
    level: number,
    data: object,
    options?: { automatic?: boolean; initial?: boolean },
  ): Promise<void>;

  /**
   * Retrieves the data to pass to the apply method in order to apply this advancement automatically, if possible.
   * @param level  Level being advanced.
   * @returns Data to pass to the apply method, or `false` if user intervention required.
   */
  automaticApplicationValue(level: number): Promise<object | false>;

  /**
   * Locally apply this advancement from stored data, if possible. If stored data can not be restored for any reason,
   * throw an AdvancementError to display the advancement flow UI.
   * @param level    Level being advanced.
   * @param data     Data from `Advancement#reverse` needed to restore this state.
   * @param options  Additional options to guide the restoration process.
   * @throws {AdvancementError}
   * @abstract
   */
  restore(level: number, data: object, options?: object): Promise<void>;

  /**
   * Locally remove this advancement's changes from the actor.
   * @param level    Level being removed.
   * @param options  Additional options to guide the reverse process.
   * @returns Data that can be passed to the `Advancement#restore` method to restore this reversal.
   * @abstract
   */
  reverse(level: number, options?: object): Promise<object>;

  /**
   * Fetch an item and create a clone with the proper flags.
   * @param uuid  UUID of the item to fetch.
   * @param id    Optional ID to use instead of a random one.
   * @returns The cloned item data, or null if the source could not be found.
   */
  createItemData(uuid: string, id?: string): Promise<object | null>;

  /**
   * Construct context menu options for this Advancement.
   * @returns Context menu entries for this advancement.
   */
  getContextMenuOptions(): foundry.applications.ux.ContextMenu.Entry<HTMLElement>[];

  static metadata: dnd5e.types.Advancement.Metadata;
  static ERROR: typeof AdvancementError;

  /**
   * Perform the pre-localization of this data model.
   */
  static localize(): void;

  /**
   * Can an advancement of this type be added to the provided item?
   * @param item  Item to check against.
   * @returns Should this be enabled as an option when creating an advancement.
   */
  static availableForItem(item: globalThis.Item.Implementation): boolean;

  /**
   * Handle context menu events on advancement.
   * @param item    The Item the Advancement belongs to.
   * @param target  The element the menu was triggered on.
   */
  static onContextMenu(item: globalThis.Item.Implementation, target: HTMLElement): void;

  /**
   * Prepare the data needed for the creation dialog.
   * @param type    Specific type of the PseudoDocument to prepare.
   * @param parent  Parent document within which this PseudoDocument will be created.
   */
  static _createDialogData(type: string, parent: globalThis.Item.Implementation): object;

  /**
   * Prepare default list of types if none are specified.
   * @param parent  Parent document within which this PseudoDocument will be created.
   */
  static _createDialogTypes(parent: globalThis.Item.Implementation): string[];
}

export type AdvancementMix<T extends AnyAdvancementDataConstructor> = (new (
  ...args: any[]
) => fvttUtils.FixedInstanceType<T> & AdvancementBehavior) &
  Pick<T, keyof T> &
  Pick<typeof AdvancementBehavior, keyof typeof AdvancementBehavior>;

export declare function AdvancementMixin<T extends AnyAdvancementDataConstructor>(Base: T): AdvancementMix<T>;
