import Advancement from "./advancement.mjs";
import { SizeConfigurationData, SizeValueData } from "../../data/advancement/size.mjs";

/**
 * Advancement that handles player size.
 */
export default class SizeAdvancement extends Advancement<
  typeof SizeConfigurationData,
  typeof SizeValueData
> {
  /* -------------------------------------------- */
  /*  Instance Properties                         */
  /* -------------------------------------------- */

  /**
   * Hint that will be displayed to players if none is entered.
   */
  get automaticHint(): string
}
