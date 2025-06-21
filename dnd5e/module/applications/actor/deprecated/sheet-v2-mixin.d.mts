import type { SheetTabDescriptor5e } from "../../mixins/sheet-v2-mixin.d.mts";
import DocumentSheetV2Mixin from "../../mixins/sheet-v2-mixin.mjs";
import type ItemSheet5e from "../../item/item-sheet.mjs";

/**
 * The mixed ActorSheetV2 class created by ActorSheetV2Mixin.
 * @deprecated Use BaseActorSheet instead
 */
declare class ActorSheetV2MixinClass {
  /** @privateRemarks All mixin classes should accept anything for its constructor. */
  constructor(...args: any[]);

  /**
   * The cached concentration information for the character.
   * @internal
   */
  _concentration: { items: Set<Item.Implementation>, effects: Set<ActiveEffect.Implementation> };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  protected _renderOuter(): Promise<JQuery>;

  /** @inheritDoc */
  protected _render(force?: boolean, options?: object): Promise<void>;

  /** @inheritDoc */
  protected _getHeaderButtons(): Application.HeaderButton[];

  /** @inheritDoc */
  getData(options?: object): Promise<any>;

  /**
   * Prepare flags displayed in the special traits tab.
   */
  protected _prepareFlags(): any;

  /** @override */
  protected _prepareTraits(): any;

  /** @inheritDoc */
  protected _prepareItems(context: any): void;

  /** @override */
  protected _prepareItem(item: Item.Implementation, ctx: any): void;

  /**
   * Prepare activity data.
   * @param activity The activity.
   * @protected
   */
  protected _prepareActivity(activity: any): any;

  /** @inheritDoc */
  protected _getLabels(): any;

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /** @inheritDoc */
  activateListeners(html: JQuery): void;

  /** @inheritDoc */
  protected _onChangeTab(event: MouseEvent | null, tabs: any, active: string): void;

  /**
   * Handle closing the warnings dialog.
   * @param event The triggering event.
   * @protected
   */
  protected _onCloseWarnings(event: PointerEvent): void;

  /** @override */
  protected _onCreateChild(): Promise<any> | null;

  /**
   * Handling beginning a drag-drop operation on an Activity.
   * @param event The originating drag event.
   * @protected
   */
  protected _onDragActivity(event: DragEvent): void;

  /**
   * Handle beginning a drag-drop operation on an Item.
   * @param event The originating drag event.
   * @protected
   */
  protected _onDragItem(event: DragEvent): void;

  /** @inheritDoc */
  protected _onDragStart(event: DragEvent): void;

  /**
   * Handle performing some action on an owned Item.
   * @param event The triggering event.
   * @protected
   */
  protected _onItemAction(event: PointerEvent): void;

  /**
   * Handle opening the warnings dialog.
   * @param event The triggering event.
   * @protected
   */
  protected _onOpenWarnings(event: PointerEvent): void;

  /**
   * Toggle editing hit points.
   * @param event The triggering event.
   * @param edit Whether to toggle to the edit state.
   * @protected
   */
  protected _toggleEditHP(event: PointerEvent, edit: boolean): void;

  /** @inheritDoc */
  protected _onResize(event: UIEvent): void;

  /**
   * Handle showing the character's portrait or token art.
   * @protected
   */
  protected _onShowPortrait(): void;

  /**
   * Handle toggling a pip on the character sheet.
   * @param event The triggering event.
   * @returns Promise that resolves to the updated actor or void.
   * @protected
   */
  protected _onTogglePip(event: PointerEvent): Promise<Actor.Implementation> | void;

  /**
   * Handle the user toggling the sidebar collapsed state.
   * @protected
   */
  protected _onToggleSidebar(): void;

  /**
   * Toggle the sidebar collapsed state.
   * @param collapsed Force a particular collapsed state.
   * @returns The new collapsed state.
   * @protected
   */
  protected _toggleSidebar(collapsed?: boolean): boolean;

  /**
   * Handle rolling an ability check or saving throw.
   * @param event The triggering event.
   * @protected
   */
  protected _onRollAbility(event: PointerEvent): void;

  /**
   * Initialize a rule tooltip on an element.
   * @param element The tooltipped element.
   * @protected
   */
  protected _applyReferenceTooltips(element: HTMLElement): void;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Can an item be expanded on the sheet?
   * @param item Item on the sheet.
   */
  canExpand(item: Item.Implementation): boolean;
}

declare namespace ActorSheetV2MixinClass {}

/**
 * Adds common V2 Actor sheet functionality.
 * @param Base The base class being mixed.
 * @returns Mixed class with V2 actor sheet functionality.
 * @deprecated Use BaseActorSheet instead
 * @mixin
 */
declare function ActorSheetV2Mixin<T extends Application.AnyConstructor>(
  Base: T
  // @ts-expect-error
): ReturnType<typeof DocumentSheetV2Mixin<T>> & typeof ActorSheetV2MixinClass;

declare namespace ActorSheetV2Mixin {
  export import Mixin = ActorSheetV2MixinClass;
}

export default ActorSheetV2Mixin; 