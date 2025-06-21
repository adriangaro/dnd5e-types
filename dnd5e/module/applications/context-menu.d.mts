/**
 * A specialized subclass of ContextMenu that places the menu in a fixed position.
 */
export default class ContextMenu5e extends foundry.applications.ux.ContextMenu {
  /**
   * Trigger a context menu event in response to a normal click on a additional options button.
   * @param event
   */
  static triggerEvent(event: PointerEvent): void;
}
