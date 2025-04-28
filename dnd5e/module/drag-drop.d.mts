
/**
 * Valid `dropEffect` value (see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect).
 */
export type DropEffectValue = "copy" | "move" | "link" | "none";

/**
 * Internal structure for the stored drag payload.
 */
interface DragPayload {
  data: any;
  event: DragEvent;
}

/**
 * Extension of core's DragDrop class to provide additional information used by the system. Will replace core's
 * version in the global namespace.
 *
 * @todo Replace `extends DragDrop` with `extends foundry.applications.ux.DragDrop` when v12 support is dropped.
 */
declare class DragDrop5e extends DragDrop {
  /**
   * Drop effect used for current drag operation.
   * @type {DropEffectValue|null}
   */
  static dropEffect: DropEffectValue | null;

  /**
   * Stored drag event payload.
   * @type {{ data: any, event: DragEvent }|null}
   */
  private static payload: DragPayload | null; // Corresponds to #payload in JS

  /**
   * @override
   * @todo No longer need this override when v12 support is dropped.
   * Identify and activate draggable and droppable targets.
   * @param {HTMLElement} html - The HTML element to bind events to.
   * @returns {this} The instance of the DragDrop5e class.
   */
  bind(html: HTMLElement): this;

  /**
   * Handle the start of a drag workflow.
   * Stores the payload if data is present in the DataTransfer object.
   * @param {DragEvent} event The drag event.
   * @protected
   */
  protected _handleDragStart(event: DragEvent): Promise<void>;

  /**
   * Handle the end of a drag workflow.
   * Clears the stored payload and drop effect.
   * @param {DragEvent} event The drag event being handled.
   * @protected
   */
  protected _handleDragEnd(event: DragEvent): Promise<void>;

  /**
   * Handle a dragged element moving over a droppable target.
   * Prevents default handling and calls the 'dragover' callback.
   * @param {DragEvent} event The drag event.
   * @returns {false} To indicate the event is handled.
   * @protected
   */
  protected _handleDragOver(event: DragEvent): false;

  /**
   * Handle a dragged element being dropped on a droppable target.
   * Prevents default handling and calls the 'drop' callback.
   * @param {DragEvent} event The drag event.
   * @returns {any} The result from the 'drop' callback.
   * @protected
   */
  protected _handleDrop(event: DragEvent): any;

  /**
   * Get the data payload for the current drag event.
   * @param {DragEvent} [event] - The drag event (Note: currently unused in the JS implementation but included for potential future use).
   * @returns {any} The data part of the stored payload, or null if no payload is stored.
   */
  static getPayload(event?: DragEvent): any;
}

declare namespace DragDrop5e {

}

export default DragDrop5e;

/**
 * Extend native DragDrop with functionality for storing payloads.
 * Assigns DragDrop5e to either CONFIG.ux.DragDrop or the global DragDrop
 * depending on the Foundry VTT version/structure.
 */
export declare function extendDragDrop(): void;