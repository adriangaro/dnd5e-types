import Advancement from "./advancement.mjs";
import { SizeConfigurationData, SizeValueData } from "../../data/advancement/size.mjs";

/**
 * Advancement that handles player size.
 */
declare class SizeAdvancement extends Advancement<
  'Size',
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

export default SizeAdvancement

declare global {
  namespace dnd5e.types {
    namespace Advancement {
      interface DefaultAdvancementTypes {
        Size: typeof SizeAdvancement
      }
    }
  }
}
