import AdvancementConfig from "./advancement-config-v2.mjs";
import { TYPES } from "../../data/advancement/scale-value.mjs";
import type ScaleValueAdvancement from "#dnd5e/module/documents/advancement/scale-value.mjs";

/**
 * Configuration application for scale values.
 */
export default class ScaleValueConfig extends AdvancementConfig<
ScaleValueAdvancement,
{
  distanceOptions: {
    value: string,
    label: string
  }[],
  identifier: ScaleValueAdvancement['configuration']['identifier'] & {
    hint: string
  },
  levels: Record<string, {
    fields: any,
    value: any,
    className?: string
  }>,
  type: any
}

> {
 
  /* -------------------------------------------- */

  /**
   * Prepare the data to display at each of the scale levels.
   * @protected
   */
  _prepareLevelData(): Record<string, {
    fields: any,
    value: any,
    className?: string
  }>

  /* -------------------------------------------- */

  /**
   * For scale values with multiple properties, have missing properties inherit from earlier filled-in values.
   */
  _mergeScaleValues(value: any, lastValue: any)

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * If no identifier is manually entered, slugify the custom title and display as placeholder.
   */
  _onChangeTitle(event: Event)
}
