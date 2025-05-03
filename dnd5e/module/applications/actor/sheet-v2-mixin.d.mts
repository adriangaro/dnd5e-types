import SheetV2Mixin from "../mixins/sheet-v2-mixin.mjs";
import type ActorSheet5e from "./base-sheet.mjs";

declare class _ActorSheetV2Mixin {
  /** @privateRemarks All mixin classses should accept anything for its constructor. */
  constructor(...args: any[]);

  /**
   * The cached concentration information for the character.
   * @type {{items: Set<Item.Implementation>, effects: Set<ActiveEffect.Implementation>}}
   * @internal
   */
  _concentration: { items: Set<Item.Implementation>, effects: Set<ActiveEffect.Implementation> };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  protected _renderOuter(): Promise<JQuery>;

  /* -------------------------------------------- */

  /** @inheritDoc */
  protected _render(force?: boolean, options?: object): Promise<void>;

  /* -------------------------------------------- */

  /** @inheritDoc */
  protected _getHeaderButtons(): Application.HeaderButton[];

  /* -------------------------------------------- */

  /** @inheritDoc */
  getData(options?: object): Promise<object>;

  /* -------------------------------------------- */

  /**
   * Prepare flags displayed in the special traits tab.
   * @returns {object}
   */
  protected _prepareFlags(): object;

  /* -------------------------------------------- */

  /** @override */
  protected _prepareTraits(): object;

  /* -------------------------------------------- */

  /** @override */
  protected _prepareItems(context: object): void;

  /* -------------------------------------------- */

  /** @override */
  protected _prepareItem(item: Item.Implementation, ctx: object): void;
}

declare namespace _ActorSheetV2Mixin {}

declare namespace ActorSheetV2Mixin {
  export import Mixin = _ActorSheetV2Mixin;
}

/**
 * Adds common V2 Actor sheet functionality.
 * @param {typeof ActorSheet5e} Base  The base class being mixed.
 * @returns {typeof ActorSheetV2}
 * @mixin
 */
declare function ActorSheetV2Mixin<T extends typeof ActorSheet5e>(Base: T): ReturnType<typeof SheetV2Mixin<T>> & typeof _ActorSheetV2Mixin;

declare namespace ActorSheetV2Mixin {}

export default ActorSheetV2Mixin;
