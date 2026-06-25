/** An extension of the base CombatTracker class to provide some 5e-specific functionality. */

declare class CombatTracker5e extends foundry.applications.sidebar.tabs.CombatTracker {
  /**
   * Adjust initiative tracker to group combatants.
   * @param html  The combat tracker being rendered.
   */
  renderGroups(html: HTMLElement): void;

  /**
   * Retrieve an appropriate group name for a list of combatants.
   * @param combatants  The combatants.
   */
  static getGroupName(combatants: Combatant.Implementation[]): string;

  protected override _prepareTrackerContext(
    context: foundry.applications.sidebar.tabs.CombatTracker.RenderContext,
    options: foundry.applications.sidebar.tabs.CombatTracker.RenderOptions,
  ): Promise<foundry.applications.sidebar.tabs.CombatTracker.TrackerContext | void>;

  protected override _onCombatantControl(
    event: PointerEvent,
    target: foundry.applications.api.ApplicationV2.ActionTarget,
  ): Promise<unknown>;

  protected override _getEntryContextOptions(): foundry.applications.ux.ContextMenu.Entry<HTMLElement>[];
}

declare namespace CombatTracker5e {
  interface Any extends CombatTracker5e {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CombatTracker5e> {}
}

export default CombatTracker5e;
