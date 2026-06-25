/**
 * Activity for rolling healing.
 * The document = `ActivityMixin(BaseHealActivityData)`, registered as the `"heal"` type.
 */

import type BaseHealActivityData from "../../module/data/activity/heal-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const HealActivity_base: ReturnType<typeof ActivityMixin<typeof BaseHealActivityData>>;

declare class HealActivity extends HealActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "heal" };

  /** Perform a damage roll. */
  rollDamage(
    config?: dnd5e.types.Dice.DamageRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration
  ): Promise<import("../../module/dice/damage-roll.mjs").default[] | void>;
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      heal: typeof HealActivity;
    }
  }
}

export default HealActivity;
