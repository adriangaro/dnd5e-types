/** Adds functionality to a custom HTML element for displaying a target selector and displaying targets. */

declare class TargetedApplicationElement {
  /** @privateRemarks All mixin classes accept anything for their constructor. */
  constructor(...args: any[]);

  /** Currently registered hook for monitoring for changes to selected tokens. */
  selectedTokensHook: number | null;

  /** Whether to rebuild the target list. */
  get shouldBuildTargetList(): boolean | void;

  /** Currently target selection mode. */
  get targetingMode(): "targeted" | "selected";
  set targetingMode(mode: "targeted" | "selected");

  /** The list of application targets. */
  targetList: HTMLUListElement;

  /** The controls for selecting target source mode. */
  targetSourceControl: HTMLElement;

  disconnectedCallback(): void;

  /** Return the HTML elements needed to build the target source control and target list. */
  buildTargetContainer(): HTMLElement[];

  /** Build a list of targeted tokens based on current mode & replace any existing targets. */
  buildTargetsList(): void;

  /**
   * Create a list entry for a single target.
   * @param data
   * @param data.uuid  UUID of the targeted actor.
   * @param data.name  Name of the targeted token.
   * @abstract
   */
  buildTargetListEntry(data: { uuid: string; name: string }): HTMLLIElement | void;

  /**
   * Handle clicking on the target mode buttons.
   * @param event  Triggering click event.
   */
  protected _onChangeTargetMode(event: PointerEvent): Promise<void>;
}

/** Adds functionality to a custom HTML element for displaying a target selector and displaying targets. */
declare function TargetedApplicationMixin<TBase extends typeof HTMLElement>(
  Base: TBase,
): typeof TargetedApplicationElement & TBase;

declare namespace TargetedApplicationMixin {
  type MixinClass = TargetedApplicationElement;
}

export default TargetedApplicationMixin;
