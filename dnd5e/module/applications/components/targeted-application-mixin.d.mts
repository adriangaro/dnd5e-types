/**
 * Helper type for class constructors.
 */

declare class _TargetedApplicationMixin {
  /** @privateRemarks All mixin classes should accept anything for its constructor. */
  constructor(...args: any[]);

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Currently registered hook for monitoring for changes to selected tokens.
   */
  selectedTokensHook: number | null;

  /* -------------------------------------------- */

  /**
   * Currently target selection mode.
   */
  get targetingMode(): "targeted" | "selected";
  set targetingMode(mode: "targeted" | "selected");

  /* -------------------------------------------- */

  /**
   * The list of application targets.
   */
  targetList: HTMLUListElement;

  /* -------------------------------------------- */

  /**
   * The controls for selecting target source mode.
   */
  targetSourceControl: HTMLElement;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Return the HTML elements needed to build the target source control and target list.
   */
  buildTargetContainer(): HTMLElement[];

  /* -------------------------------------------- */

  /**
   * Build a list of targeted tokens based on current mode & replace any existing targets.
   */
  buildTargetsList(): void;

  /* -------------------------------------------- */

  /**
   * Create a list entry for a single target.
   * @param data
   * @param data.uuid  UUID of the targeted actor.
   * @param data.name  Name of the targeted token.
   * @abstract
   */
  buildTargetListEntry({ uuid, name }: { uuid: string; name: string }): HTMLLIElement | void;

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Handle clicking on the target mode buttons.
   * @param event  Triggering click event.
   */
  protected _onChangeTargetMode(event: PointerEvent): Promise<void>;
}

declare namespace _TargetedApplicationMixin {}

declare namespace TargetedApplicationMixin {
  export import Mixin = _TargetedApplicationMixin;
}

/**
 * Adds functionality to a custom HTML element for displaying a target selector and displaying targets.
 * @param Base  The base class being mixed.
 * @mixin
 */
declare function TargetedApplicationMixin<T extends fvttUtils.AnyConstructor>(Base: T): T & typeof _TargetedApplicationMixin;

export default TargetedApplicationMixin;
