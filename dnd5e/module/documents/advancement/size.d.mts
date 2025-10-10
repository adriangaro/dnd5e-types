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
  static metadata: SizeAdvancement.Metadata
  get metadata(): SizeAdvancement.Metadata
  /* -------------------------------------------- */
  /*  Instance Properties                         */
  /* -------------------------------------------- */

  /**
   * Hint that will be displayed to players if none is entered.
   */
  get automaticHint(): string
}
declare namespace SizeAdvancement {
  interface Metadata extends Advancement.Metadata {
    dataModels: {
      configuration: typeof SizeConfigurationData,
      value: typeof SizeValueData
    }
    apps: {
      config: typeof dnd5e.applications.advancement.SizeConfig
      flow: typeof dnd5e.applications.advancement.SizeFlow
    }
  }
}
export default SizeAdvancement

declare global {
  namespace dnd5e.types {
    namespace Advancement {
      interface DefaultAdvancementTypes {
        Size: typeof SizeAdvancement
      }

      interface DefaultValidItemTypes {
        'Size.race': true
      }
    }
  }
}

