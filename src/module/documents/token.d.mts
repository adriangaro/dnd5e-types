/**
 * Extend the base TokenDocument class to implement system-specific HP bar logic.
 *
 * Extends the base `TokenDocument` through {@link SystemFlagsMixin} (so `flags.dnd5e` is typed by the
 * system-provided flags `DataModel`) and is registered into fvtt-types' `DocumentClassConfig` by the
 * document funnel, so `TokenDocument.Implementation` everywhere resolves to this class. Implements
 * system-specific HP bar logic, sense-derived vision, movement action customization, and ring animations.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface TokenDocument5e` — downstream packages
 * add document-level methods/getters by augmenting that interface (the document analogue of the
 * data-model Seam-D override interfaces). Types whose dependencies aren't ported yet (sense/sight
 * override shapes, movement cost functions) are intentionally loose (`object`/`unknown`) and tightened
 * as those domains land.
 */

import type SystemFlagsMixin from "./mixins/flags.mjs";

declare const TokenDocument5e_base: ReturnType<typeof SystemFlagsMixin<typeof TokenDocument>>;

declare class TokenDocument5e extends TokenDocument5e_base {
  /* ---- Properties ---- */

  /** Is the dynamic token ring enabled? */
  get hasDynamicRing(): boolean;

  /* ---- Data preparation ---- */

  override _prepareDetectionModes(): void;
  /** Derive token sight range and detection modes from the actor's senses. */
  _applySenseVision(): void;
  override prepareData(): void;
  override getBarAttribute(barName: string, options?: TokenDocument.GetBarAttributeOptions): TokenDocument.GetBarAttributeReturn;

  /* ---- Movement ---- */

  /* ---- Ring animations ---- */

  /** Determine if any rings colors should be forced based on current status. */
  getRingColors(): { ring?: number; background?: number };
  /** Determine what ring effects should be applied on top of any set by flags. */
  getRingEffects(): string[];
  /**
   * Flash the token ring based on damage, healing, or temp HP.
   * @param type  The key to determine the type of flashing.
   */
  flashRing(type: dnd5e.types.TokenRingColor.TypeKey): void;

  /* ---- Event handlers ---- */

  override _preCreate(
    data: object,
    options: object,
    user: User.Implementation,
  ): Promise<boolean | void>;
  override _onRelatedUpdate(update?: object, operation?: object): void;
  override _onDelete(options: object, userId: string): void;

  /* ---- Statics ---- */

  /**
   * Compute sense-derived sight and detection mode data from actor senses.
   * @param senses         Object containing sense ranges.
   * @param senses.ranges  Mapping of sense keys to their range values.
   */
  static computeSenseOverrides(senses: object): { sight: object; detectionModes: Record<string, number> };
  /**
   * Apply sense-derived overrides to a token-like target's prepared data.
   * @param senses         Object containing sense ranges.
   * @param senses.ranges  Mapping of sense keys to their range values.
   * @param target         Target with `sight` and `detectionModes` properties.
   */
  static applySenseOverrides(senses: object, target: object): void;
  /** Get an Array of attribute choices which are suitable for being consumed by an item usage. */
  static getConsumedAttributes(data: object): string[];
  /** Return tracked attribute choices with dnd5e i18n group labels. */
  static override getTrackedAttributeChoices(attributes?: object | null): Array<{ value: string; group: string; label: string; [key: string]: unknown }>;
  /** Set up the system's movement action customization. */
  static registerMovementActions(): void;
  /** Return the movement action cost function for a specific movement type. */
  static getMovementActionCostFunction(type: dnd5e.types.Movement.TypeKey, token: TokenDocument5e, options: object): unknown;
}

/** Open merge target: downstream packages augment this interface to add document-level methods/getters. */
declare interface TokenDocument5e {}

declare namespace TokenDocument5e {
  /** Resolved bar attribute descriptor returned by {@link TokenDocument5e.getBarAttribute}. */
  interface BarAttribute {
    attribute: string;
    value: number;
    max: number;
    type: string;
    editable: boolean;
    [key: string]: unknown;
  }
}

export default TokenDocument5e;
