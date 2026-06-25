import type BaseSubclassAdvancementData from "../../data/advancement/subclass-data.mjs";
import { AdvancementMixin } from "./mixin.mjs";

declare const SubclassAdvancement_base: ReturnType<typeof AdvancementMixin<typeof BaseSubclassAdvancementData>>;

/**
 * Advancement that allows the player to select a subclass for their class. Only allowed on class items
 * and can only be taken once.
 */
declare class SubclassAdvancement extends SubclassAdvancement_base {
  static metadata: dnd5e.types.Advancement.Metadata & { name: "Subclass" };
  // Narrow the parent item to the (expandable) valid item types for this advancement. Declared as a
  // body OVERRIDE — not baked into the base/extends clause — so it doesn't self-reference through
  // `item.system → advancement collection → SubclassAdvancement`.
  override get item(): dnd5e.types.Advancement.ParentItemOf<"Subclass">;
}

declare global {
  namespace dnd5e.types.Advancement {
    interface DefaultTypes {
      Subclass: typeof SubclassAdvancement;
    }
    /** A subclass advancement lives on class/subclass items by default — EXPANDABLE: a module can
     *  merge more item types into `Advancement.ValidItemTypes.Subclass`. */
    interface ValidItemTypes {
      Subclass: dnd5e.types.Advancement.ValidItemTypes.Subclass;
    }
    namespace ValidItemTypes {
      interface Subclass {
        class: true;
        subclass: true;
      }
    }
  }
}

export default SubclassAdvancement;
