/** Extension of core's DragDrop class to provide additional information used by the system. Will replace core's version in the global namespace. */
declare class DragDrop5e extends foundry.applications.ux.DragDrop {
  /** Drop effect used for current drag operation. */
  static dropEffect: dnd5e.types.DropEffectValue | null;

  /** @override */
  protected override _handleDragStart(event: DragEvent): Promise<void>;

  /** @override */
  protected override _handleDragEnd(event: DragEvent): Promise<void>;

  /** Get the data payload for the current drag event. */
  static getPayload(event: DragEvent): any;
}

export default DragDrop5e;
