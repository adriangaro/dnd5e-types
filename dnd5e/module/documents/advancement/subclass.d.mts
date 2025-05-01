import { SubclassValueData } from "../../data/advancement/subclass.mjs";
import Advancement from "./advancement.mjs";

/**
 * Advancement that allows the player to select a subclass for their class. Only allowed on class items
 * and can only be taken once.
 */
declare class SubclassAdvancement extends Advancement<
  'Subclass',
  never,
  typeof SubclassValueData
> {
  static metadata: SubclassAdvancement.Metadata
  get metadata(): SubclassAdvancement.Metadata
}

declare namespace SubclassAdvancement {
  interface Metadata extends Advancement.Metadata {
    dataModels: {
      value: typeof SubclassValueData
    }
    apps: {
      config: typeof dnd5e.applications.advancement.AdvancementConfigV2
      flow: typeof dnd5e.applications.advancement.SubclassFlow
    }
  }
}

export default SubclassAdvancement

declare global {
  namespace dnd5e.types {
    namespace Advancement {
      interface DefaultAdvancementTypes {
        Subclass: typeof SubclassAdvancement
      }
    }
  }
}
