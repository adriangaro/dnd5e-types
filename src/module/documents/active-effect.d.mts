/**
 * Extend the base ActiveEffect class to implement system-specific logic.
 *
 * Extends the base `ActiveEffect` through {@link DependentDocumentMixin} (which only overrides
 * lifecycle hooks, so it adds no new public surface but threads the `SubType` generic into
 * `system` narrowing). Registered into fvtt-types' `DocumentClassConfig` by the document funnel, so
 * `ActiveEffect.Implementation`/`effect.system` everywhere resolve to this class.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface ActiveEffect5e` — downstream
 * packages add document-level methods/getters by augmenting that interface (the document analogue of
 * the data-model Seam-D override interfaces). Types whose dependencies aren't ported yet (effect
 * config app, favorite data, change data shapes) are intentionally loose (`object`/`unknown`) and
 * tightened as those land.
 */

import type DependentDocumentMixin from "./mixins/dependent.mjs";

declare const ActiveEffect5e_base: ReturnType<typeof DependentDocumentMixin<typeof ActiveEffect>>;

declare class ActiveEffect5e<
  out SubType extends ActiveEffect.SubType = ActiveEffect.SubType,
> extends ActiveEffect5e_base<SubType> {
  /* ---- Properties (getters) ---- */

  /** Document type to which this active effect should apply its changes. */
  get applicableType(): string;
  /** Another effect that granted this effect as a rider. */
  get dependentOrigin(): ActiveEffect.Implementation | null;
  /** Is this effect an enchantment on an item that accepts enchantment? */
  get isAppliedEnchantment(): boolean;
  /** Should this status effect be hidden from the current user? */
  get isConcealed(): boolean;
  /** Determine whether this Active Effect is suppressed or not. */
  get isSuppressed(): boolean;
  /** Is this effect temporary (and not concealed)? */
  get isTemporary(): boolean;

  /** Retrieve the source Actor or Item, or null if it could not be determined. */
  getSource(): Promise<Actor.Implementation | Item.Implementation | null>;

  /* ---- Effect application ---- */

  /** Apply a change to activities on this item. */
  applyActivity(item: Item.Implementation, change: ActiveEffect.ChangeData): Record<string, unknown>;
  /** Modify the provided change according to a shim and emit a warning if required. */
  _applyChangeShim(change: ActiveEffect.ChangeData): ActiveEffect.ChangeData;
  /** Transform the data type of the change to match the type expected for flags. */
  _prepareFlagChange(actor: Actor.Implementation, change: ActiveEffect.ChangeData): ActiveEffect.ChangeData;

  /* ---- Data migration & initialization ---- */

  override prepareBaseData(): void;
  override prepareDerivedData(): void;
  /** Modify the ActiveEffect's attributes based on the exhaustion level. */
  _prepareExhaustionLevel(): void;

  /* ---- Favorites & riders ---- */

  /** Prepare effect favorite data. */
  getFavoriteData(): Promise<dnd5e.types.data.abstract.FavoriteData5e>;
  /** Create conditions that are applied separately from an effect. */
  createRiderConditions(): Promise<ActiveEffect.Implementation[]>;
  /** Create additional activities, effects, and items applied separately from an enchantment. */
  createRiderEnchantments(options?: object): Promise<void>;

  /** Convert this document to drag data, including the enchantment activity id when applicable. */
  override toDragData(): foundry.abstract.Document.DropData<this> & { activityId?: string };

  /* ---- Exhaustion & concentration handling ---- */

  /** Determine whether this effect applies a status that should prompt concentration to end. */
  _shouldPromptConcentrationEnd(): boolean;

  /* ---- Dependents ---- */

  /** Retrieve a list of dependent effects. */
  getDependents(): (ActiveEffect.Implementation | Item.Implementation)[];

  /* ---- Importing & exporting / dialogs ---- */

  override deleteDialog(
    options?: { sheet?: object } & object,
    operation?: object,
  ): Promise<this | false | null>;

  /** Render a rich tooltip for this effect. */
  richTooltip(
    enrichmentOptions?: foundry.applications.ux.TextEditor.EnrichmentOptions,
  ): Promise<{ content: string; classes: string[] }>;

  /* ---- Statics ---- */

  /** The default icon used for newly created Active Effect documents. */
  static DEFAULT_ICON: string;
  /** Static ActiveEffect ID for various conditions. */
  static ID: Record<string, string>;
  /**
   * Additional key paths to properties added during base data preparation that should be treated as
   * formula fields.
   * @deprecated since DnD5e 6.0, will be removed in DnD5e 6.2, in favor of non-persisted fields.
   */
  static FORMULA_FIELDS: Set<string>;
  /**
   * Active effect fields that should be redirected to another field, optionally with a compatibility warning.
   * Optional warning object contains options passed to `foundry.utils.logCompatibilityWarning`.
   */
  static SHIM_FIELDS: Record<string, { key: string; type?: string; value?: Function; warning?: object }>;

  static override migrateData(source: fvttUtils.AnyMutableObject): fvttUtils.AnyMutableObject;

  static override _fromStatusEffect(
    statusId: string,
    effectData: object,
    options?: object,
  ): Promise<ActiveEffect.Implementation>;

  static override _onCreateOperation(
    documents: ActiveEffect.Implementation[],
    operation: object,
    user: User.Implementation,
  ): Promise<void>;

  static override createDialog(
    data?: object,
    createOptions?: object,
    dialogOptions?: object,
  ): Promise<ActiveEffect.Implementation | null>;

  static _createDialogTypes(parent?: Item.Implementation | null): ActiveEffect.SubType[];

  /** Apply a change to a model, dispatching to the appropriate handler. */
  static applyChange(model: foundry.abstract.Document.Any, change: ActiveEffect.ChangeData, options?: object): unknown;
  /** Apply a single change to a model field. */
  static applyChangeField(model: foundry.abstract.Document.Any, change: ActiveEffect.ChangeData, options?: object): unknown;
  static _applyChangeAdd(actor: Actor.Implementation, change: ActiveEffect.ChangeData, current: unknown, delta: unknown, changes: object): void;
  static _applyChangeUnguided(actor: Actor.Implementation, change: ActiveEffect.ChangeData, changes: object, options?: { replacementData?: object }): unknown;
  static _applyChangeUpgrade(actor: Actor.Implementation, change: ActiveEffect.ChangeData, current: unknown, delta: unknown, changes: object): unknown;

  /** Create effect data for concentration on an actor. */
  static createConcentrationEffectData(activity: object, data?: object): object;

  /** Register listeners for custom handling in the TokenHUD. */
  static registerHUDListeners(): void;
  /** Add modifications to the core ActiveEffect config. */
  static onRenderActiveEffectConfig(app: object, html: HTMLElement, context: object): void;
  /** Adjust exhaustion icon display to match current level. */
  static onTokenHUDRender(app: object, html: HTMLElement): void;
  /** Get the image used to represent exhaustion at this level. */
  static _getExhaustionImage(level: number): string;
  /** Implement custom behavior for select conditions on the token HUD. */
  static onClickTokenHUD(event: PointerEvent): void;
  /** Manage custom exhaustion cycling when interacting with the token HUD. */
  static _manageExhaustion(event: PointerEvent, actor: Actor.Implementation): void;
  /** Manage custom concentration handling when interacting with the token HUD. */
  static _manageConcentration(event: PointerEvent, actor: Actor.Implementation): void;

  /**
   * Helper method to add choices that have been overridden by an active effect. Used to determine
   * what fields might need to be disabled because they are overridden by an active effect in a way
   * not easily determined by looking at the `Document#overrides` data structure.
   */
  static addOverriddenChoices(
    doc: Actor.Implementation | Item.Implementation,
    prefix: string,
    path: string,
    overrides: string[],
  ): void;

  /** Determine default artwork based on the provided effect data. */
  static getDefaultArtwork(effectData?: object): { img: string };
}

declare namespace ActiveEffect5e {}

export default ActiveEffect5e;
