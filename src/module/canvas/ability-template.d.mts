/**
 * A helper class for building MeasuredTemplates for 5e spells and abilities.
 * NOTE: most of its API is deprecated in favor of {@link TemplatePlacement}.
 */

declare class AbilityTemplate extends foundry.canvas.placeables.MeasuredTemplate {
  /** The Activity for which this template was created. */
  activity: dnd5e.types.Activity.Instance;

  /** The Item associated with this template. */
  item: Item.Implementation;

  /** The actor sheet that was active when template placement began, or null. */
  actorSheet: globalThis.Actor.Implementation['sheet'] | null;

  /**
   * A factory method to create an AbilityTemplate instance using provided data from an Activity instance.
   * @param activity  The Activity for which to construct the template.
   * @param options   Options to modify the created template.
   * @returns The template objects, or null if the item does not produce a template.
   * @deprecated Use `TemplatePlacement.fromActivity`.
   */
  static fromActivity(activity: dnd5e.types.Activity.Instance, options?: object): AbilityTemplate[] | null;

  /**
   * Creates a preview of the spell template.
   * @returns A promise that resolves with the final measured template if created.
   */
  drawPreview(): Promise<globalThis.MeasuredTemplateDocument.Stored[]>;

  /**
   * Activate listeners for the template preview.
   * @param initialLayer  The initially active CanvasLayer to re-activate after the workflow is complete.
   * @returns A promise that resolves with the final measured template if created.
   */
  activatePreviewListeners(initialLayer: foundry.canvas.layers.CanvasLayer): Promise<globalThis.MeasuredTemplateDocument.Stored[]>;

  /**
   * Shared code for when template placement ends by being confirmed or canceled.
   * @param event  Triggering event that ended the placement.
   */
  protected _finishPlacement(event: Event): Promise<void>;

  /**
   * Move the template preview when the mouse moves.
   * @param event  Triggering mouse event.
   */
  protected _onMovePlacement(event: Event): void;

  /**
   * Rotate the template preview by 3˚ increments when the mouse wheel is rotated.
   * @param event  Triggering mouse event.
   */
  protected _onRotatePlacement(event: Event): void;

  /**
   * Confirm placement when the left mouse button is clicked.
   * @param event  Triggering mouse event.
   */
  protected _onConfirmPlacement(event: Event): Promise<void>;

  /**
   * Cancel placement when the right mouse button is clicked.
   * @param event  Triggering mouse event.
   */
  protected _onCancelPlacement(event: Event): Promise<void>;
}

declare namespace AbilityTemplate {
  interface Any extends AbilityTemplate {}
  type AnyConstructor = typeof AbilityTemplate;
}

export default AbilityTemplate;
