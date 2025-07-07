
// Import the mixin type and DropEffectValue
import type DragDropApplicationMixin from "./drag-drop-mixin.mjs"; // Adjust path as needed
import type { DropEffectValue } from "#dnd5e/module/drag-drop.mjs"; // Adjust path as needed

/**
 * Describes a single tab within the sheet.
 */
export interface SheetTabDescriptor5e {
  /** The tab key. */
  tab: string;
  /** The tab label's localization key. */
  label: string;
  /** A font-awesome icon class (e.g., "fas fa-book"). */
  icon?: string;
  /** An SVG icon source path or inline SVG string. */
  svg?: string;
  /** A predicate function to check if the tab should be rendered. */
  condition?: SheetTabCondition5e;
}

/**
 * A predicate function to determine if a sheet tab should be rendered.
 * @param doc The Document instance associated with the sheet.
 * @returns Whether to render the tab.
 */
export type SheetTabCondition5e = (doc: Document) => boolean;

/**
 * Represents the instance members added by the DocumentSheetV2Mixin.
 */
declare class DocumentSheetV2 {
  /** @privateRemarks All mixin classes should accept anything for its constructor. */
  constructor(...args: any[]);

  /**
   * Sheet tabs configuration.
   * Defines the available tabs for this sheet type.
   */
  static TABS: SheetTabDescriptor5e[];

  /**
   * Available sheet modes.
   */
  static MODES: {
    readonly PLAY: 1;
    readonly EDIT: 2;
  };

  /**
   * The mode the sheet is currently in (PLAY or EDIT).
   * @protected
   */
  protected _mode: typeof DocumentSheetV2.MODES[keyof typeof DocumentSheetV2.MODES] | null;

  /**
   * Set of expanded item IDs for description toggling.
   * @protected
   */
  protected _expanded: Set<string>; // Assuming _expanded exists based on _onToggleDescription

  /** @inheritDoc */
  static _customElements: string[];

  /* -------------------------------------------- */
  /* Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  protected _render(force?: boolean, options?: { mode?: typeof DocumentSheetV2.MODES[keyof typeof DocumentSheetV2.MODES]; [key: string]: any }): Promise<void>;

  /** @inheritDoc */
  protected _renderOuter(): Promise<JQuery>;

  /**
   * Render source information in the Document's title bar.
   * @param html The outer frame HTML (jQuery object).
   * @protected
   */
  protected _renderSourceOuter(html: JQuery): void;

  /**
   * Update the source information when re-rendering the sheet.
   * @protected
   */
  protected _renderSource(): void;

  /* -------------------------------------------- */
  /* Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  getData(options?: any): Promise<any>; // Consider defining a specific context interface

  /* -------------------------------------------- */
  /* Event Listeners & Handlers                */
  /* -------------------------------------------- */

  /** @inheritDoc */
  activateListeners(html: JQuery): void;

  /**
   * Initialize item tooltips on an element.
   * @param element The tooltipped element.
   * @protected
   */
  protected _applyItemTooltips(element: HTMLElement): void;

  /** @inheritDoc */
  protected _disableFields(form: HTMLFormElement): void;

  /**
   * Handle the user toggling the sheet mode (Play/Edit).
   * @param event The triggering change event.
   * @protected
   */
  protected _onChangeSheetMode(event: Event): Promise<void>;

  /** @inheritDoc */
  protected _onChangeTab(event: MouseEvent | null, tabs: any, active: string): void; // Replace 'any' with actual tabs type

  /**
   * Handle clicking the "Create Child" button (specific implementation needed in subclasses).
   * @returns Potentially a Promise resolving to the created document or void.
   * @protected
   * @abstract
   */
  protected _onCreateChild(event: MouseEvent): any; // Return type depends on implementation

  /**
   * Handle clicking the source configuration button.
   * @param event The triggering click event.
   * @protected
   * @abstract // Assuming this triggers a config dialog, specific implementation needed
   */
   protected _onConfigMenu(event: MouseEvent): void; // Or Promise<void> if async

  /**
   * Handle toggling an Item's description visibility.
   * @param event The triggering click event.
   * @protected
   */
  protected _onToggleDescription(event: MouseEvent): Promise<void>;

  /* -------------------------------------------- */
  /* Drag & Drop                                 */
  /* -------------------------------------------- */

  /** @override */
  protected _allowedDropBehaviors(event: DragEvent, data: any): Set<DropEffectValue>; // Refine 'data' type if possible

  /** @override */
  protected _defaultDropBehavior(event: DragEvent, data: any): DropEffectValue; // Refine 'data' type if possible

  /** @inheritDoc */
  protected _onDragStart(event: DragEvent): Promise<void>;
}

declare namespace DocumentSheetV2 {

}

/**
 * Adds common V2 sheet functionality, including drag/drop behavior via DragDropApplicationMixin.
 * @param Base The base DocumentSheet class constructor being mixed into.
 * @typeParam TBase - The type of the base DocumentSheet constructor.
 * @returns A new class constructor that extends the Base class and includes V2 sheet features.
 */
declare function DocumentSheetV2Mixin<TBase extends DocumentSheet.AnyConstructor>(
  Base: TBase
): ReturnType<typeof DragDropApplicationMixin<TBase>> & typeof DocumentSheetV2 & TBase; // Intersects static sides

/**
 * Namespace for the DocumentSheetV2Mixin containing the mixin class definition.
 */
declare namespace DocumentSheetV2Mixin {
  export import MixinClass = DocumentSheetV2;
}

export default DocumentSheetV2Mixin;