/**
 * Generic activity for applying effects and rolling an arbitrary die.
 * The document = `ActivityMixin(BaseUtilityActivityData)`, registered as the `"utility"` type.
 */

import type BaseUtilityActivityData from "../../module/data/activity/utility-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const UtilityActivity_base: ReturnType<typeof ActivityMixin<typeof BaseUtilityActivityData>>;

/** Generic activity for applying effects and rolling an arbitrary die. */
declare class UtilityActivity extends UtilityActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "utility" };

  /** Roll the formula attached to this utility. */
  rollFormula(
    config?: dnd5e.types.Dice.BasicRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration
  ): Promise<import("../../module/dice/basic-roll.mjs").default[] | void>;
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      utility: typeof UtilityActivity;
    }
  }
}

export default UtilityActivity;
