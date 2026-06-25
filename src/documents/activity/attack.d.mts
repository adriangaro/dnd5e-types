/**
 * Activity for making attacks and rolling damage.
 * The document = `ActivityMixin(BaseAttackActivityData)`, registered as the `"attack"` type.
 */

import type BaseAttackActivityData from "../../module/data/activity/attack-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const AttackActivity_base: ReturnType<typeof ActivityMixin<typeof BaseAttackActivityData>>;

declare class AttackActivity extends AttackActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "attack" };

  /**
   * Configure a roll config for each roll performed as part of the attack process. Will be called once per roll
   * in the process each time an option is changed in the roll configuration interface.
   * @param process - Configuration for the entire rolling process.
   * @param config  - Configuration for a specific roll.
   * @param formData - Any data entered into the rolling prompt.
   * @param index   - Index of the roll within all rolls being prepared.
   */
  _buildAttackConfig(
    process: dnd5e.types.Dice.AttackRollProcessConfiguration,
    config: dnd5e.types.Dice.D20RollConfiguration,
    formData?: foundry.applications.ux.FormDataExtended,
    index?: number
  ): void;

  /** Perform an attack roll. */
  rollAttack(
    config?: dnd5e.types.Dice.AttackRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.AttackRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration
  ): Promise<import("../../module/dice/d20-roll.mjs").default[] | null>;
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      attack: typeof AttackActivity;
    }
  }
}

export default AttackActivity;
