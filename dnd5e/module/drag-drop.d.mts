
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
declare class DragDrop5e extends foundry.applications.ux.DragDrop {
  /**
   * Drop effect used for current drag operation.
   * @type {DropEffectValue|null}
   */
  static dropEffect: DropEffectValue | null;

  /**
   * Stored drag event payload.
   * @type {{ data: any, event: DragEvent }|null}
   */
  private static payload: DragPayload | null;

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