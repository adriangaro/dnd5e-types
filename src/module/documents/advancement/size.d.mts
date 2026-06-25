/**
 * Advancement that handles player size.
 */

import type BaseSizeAdvancementData from "../../data/advancement/size-data.mjs";
import { AdvancementMixin } from "./mixin.mjs";

declare const SizeAdvancement_base: ReturnType<typeof AdvancementMixin<typeof BaseSizeAdvancementData>>;

declare class SizeAdvancement extends SizeAdvancement_base {
  static metadata: dnd5e.types.Advancement.Metadata & { name: "Size" };

  /** Hint that will be displayed to players if none is entered. */
  get automaticHint(): string;
}

declare global {
  namespace dnd5e.types.Advancement {
    interface DefaultTypes {
      Size: typeof SizeAdvancement;
    }
  }
}

export default SizeAdvancement;
