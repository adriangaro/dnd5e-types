/** A specialized subclass of ContextMenu that places the menu in a fixed position. */

declare class ContextMenu5e extends foundry.applications.ux.ContextMenu {
  protected override _setPosition(
    html: HTMLElement,
    target: HTMLElement,
    options?: foundry.applications.ux.ContextMenu.RenderOptions,
  ): void;

  /**
   * Trigger a context menu event in response to a normal click on a additional options button.
   */
  static triggerEvent(event: PointerEvent): void;
}

declare namespace ContextMenu5e {
  interface Any extends ContextMenu5e {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ContextMenu5e> {}
}

export default ContextMenu5e;
