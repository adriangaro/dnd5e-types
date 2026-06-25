/** Custom element that handles displaying active effects lists. */

declare class EffectsElement extends HTMLElement {
  /**
   * The HTML tag named used by this element.
   */
  static tagName: string;

  connectedCallback(): void;

  /**
   * Reference to the application that contains this component.
   */
  protected get app(): foundry.applications.api.ApplicationV2.Any;

  /**
   * Document whose effects are represented.
   */
  get document(): Actor.Implementation | Item.Implementation;

  /**
   * Prepare the data structure for Active Effects which are currently applied to an Actor or Item.
   * @param effects           The array of Active Effect instances for which to prepare sheet data.
   * @param options
   * @param options.parent    Document that owns these active effects.
   * @returns                 Data for rendering.
   */
  static prepareCategories(
    effects: ActiveEffect.Implementation[],
    options?: { parent?: Actor.Implementation | Item.Implementation },
  ): Record<"enchantment" | "temporary" | "enchantmentActive" | "passive" | "enchantmentInactive" | "inactive" | "suppressed", {
    type: "enchantment" | "temporary" | "activeEnchantment" | "passive" | "inactiveEnchantment" | "inactive" | "suppressed";
    label: string;
    effects: ActiveEffect.Implementation[];
    isEnchantment?: boolean;
    hidden?: boolean;
    disabled?: boolean;
    info?: string[];
    localizationPrefix?: string;
  }>;

  /**
   * Prepare an array of context menu options which are available for owned ActiveEffect documents.
   * @param effect  The ActiveEffect for which the context menu is activated.
   * @returns       An array of context menu options offered for the ActiveEffect.
   */
  protected _getContextOptions(effect: ActiveEffect.Implementation): {
    label: string;
    icon?: string;
    group?: string;
    visible?: () => boolean;
    onClick: (event: Event, target: HTMLElement) => unknown;
  }[];

  /**
   * Handle effects actions.
   * @param target  Button or context menu entry that triggered this action.
   * @param action  Action being triggered.
   */
  protected _onAction(target: Element, action: "toggleCondition" | "create" | "delete" | "duplicate" | "edit" | "favorite" | "toggle" | "unfavorite"): Promise<unknown>;

  /**
   * Handle toggling a condition.
   * @param conditionId  The condition identifier.
   */
  protected _onToggleCondition(conditionId: string): Promise<ActiveEffect.Implementation | void>;

  /**
   * Create a new effect.
   * @param target  Button that triggered this action.
   * @returns       Promise resolving to the created ActiveEffect.
   */
  _onCreate(target: HTMLElement): Promise<ActiveEffect.Implementation>;

  /**
   * Handle clicking an effect's source.
   * @param event  The triggering event.
   */
  protected _onClickEffectSource(event: PointerEvent): Promise<void>;

  /**
   * Fetch an effect from this document, or any embedded items if this document is an actor.
   * @param data
   * @param data.effectId   ID of the effect to fetch.
   * @param data.parentId   ID of the parent item containing the effect.
   */
  getEffect(data?: { effectId?: string; parentId?: string }): ActiveEffect.Implementation | undefined;
}

declare namespace EffectsElement {
  interface Any extends EffectsElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof EffectsElement> {}
}

export default EffectsElement;
