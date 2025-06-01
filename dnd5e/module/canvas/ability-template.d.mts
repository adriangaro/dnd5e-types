// TODO: replace with foundry.canvas.placeables.MeasuredTemplate
/**
 * A helper class for building MeasuredTemplates for 5e spells and abilities
 */
export default class AbilityTemplate extends MeasuredTemplate {

  /**
   * Track the timestamp when the last mouse move event was captured.
   */
  #moveTime: number

  /* -------------------------------------------- */

  /**
   * Current token that is highlighted when using adjusted size template.
   */
  #hoveredToken: Token.Implementation;

  /* -------------------------------------------- */

  /**
   * The initially active CanvasLayer to re-activate after the workflow is complete.
   */
  #initialLayer: CanvasLayer;

  /* -------------------------------------------- */

  /**
   * Track the bound event handlers so they can be properly canceled later.
   */
  #events: Record<string, Function>;

  /* -------------------------------------------- */

  /**
   * A factory method to create an AbilityTemplate instance using provided data from an Activity instance.
   */
  static fromActivity<This extends typeof AbilityTemplate>(
    this: This,
    activity: dnd5e.types.Activity.Implementation, options?: object
  ): InstanceType<This>[] | null
  /* -------------------------------------------- */

  /**
   * A factory method to create an AbilityTemplate instance using provided data from an Item5e instance
   */
  static fromItem<This extends typeof AbilityTemplate>(
    this: This, 
    item: Item.Implementation, options?: object
  ): InstanceType<This> | null
  /* -------------------------------------------- */

  /**
   * Creates a preview of the spell template.
   * @returns A promise that resolves with the final measured template if created.
   */
  drawPreview(): ReturnType<AbilityTemplate['activatePreviewListeners']>

  /* -------------------------------------------- */

  /**
   * Activate listeners for the template preview
   * @param initialLayer  The initially active CanvasLayer to re-activate after the workflow is complete
   * @returns                  A promise that resolves with the final measured template if created.
   */
  activatePreviewListeners(initialLayer: CanvasLayer): Promise<MeasuredTemplateDocument.Implementation[]>

  /* -------------------------------------------- */

  /**
   * Shared code for when template placement ends by being confirmed or canceled.
   */
  _finishPlacement(event: Event): Promise<void>

  /* -------------------------------------------- */

  /**
   * Move the template preview when the mouse moves.
   */
  _onMovePlacement(event: Event)

  /* -------------------------------------------- */

  /**
   * Rotate the template preview by 3˚ increments when the mouse wheel is rotated.
   */
  _onRotatePlacement(event: Event)

  /* -------------------------------------------- */

  /**
   * Confirm placement when the left mouse button is clicked.
   */
  _onConfirmPlacement(event: Event): Promise<void>

  /* -------------------------------------------- */

  /**
   * Cancel placement when the right mouse button is clicked.
   */
  _onCancelPlacement(event: Event): Promise<void>

}
