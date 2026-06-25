import type BaseModifyItemAdvancementData from "../../data/advancement/modify-item-data.mjs";
import { AdvancementMixin } from "./mixin.mjs";

declare const ModifyItemAdvancement_base: ReturnType<typeof AdvancementMixin<typeof BaseModifyItemAdvancementData>>;

/** Advancement that modifies an existing item using the provided enchantment. */
declare class ModifyItemAdvancement extends ModifyItemAdvancement_base {
  static metadata: dnd5e.types.Advancement.Metadata & { name: "ModifyItem" };
}

declare global {
  namespace dnd5e.types.Advancement {
    interface DefaultTypes {
      ModifyItem: typeof ModifyItemAdvancement;
    }
  }
}

export default ModifyItemAdvancement;
