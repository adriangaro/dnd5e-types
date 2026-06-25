/**
 * Class responsible for placing templates onto the scene.
 */

import type BasePlacement from "./api/base-placement.mjs";

declare class TemplatePlacement extends BasePlacement<
  dnd5e.types.canvas.TemplatePlacementConfiguration,
  dnd5e.types.canvas.TemplatePlacementData
> {
  /**
   * A factory method to create and place templates using provided data from an Activity instance.
   * @param activity         The Activity for which to construct the templates.
   * @param options
   * @param options.createData       Data to modify the template creation data.
   * @param options.placementConfig  Modification to the placement configuration.
   * @returns The template region documents, or null if activity doesn't have any defined.
   */
  static fromActivity(
    activity: dnd5e.types.Activity.Instance,
    options?: {
      createData?: Partial<globalThis.RegionDocument.CreateData>;
      placementConfig?: Partial<dnd5e.types.canvas.TemplatePlacementConfiguration>;
    },
  ): Promise<globalThis.RegionDocument.Implementation[] | null>;

  protected override _place(): Promise<dnd5e.types.canvas.TemplatePlacementData[]>;
}

declare namespace TemplatePlacement {
  interface Any extends TemplatePlacement {}
  type AnyConstructor = typeof TemplatePlacement;
}

export default TemplatePlacement;
