/**
 * Activity for making saving throws and rolling damage.
 * The document = `ActivityMixin(BaseSaveActivityData)`, registered as the `"save"` type.
 */

import type BaseSaveActivityData from "../../module/data/activity/save-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const SaveActivity_base: ReturnType<typeof ActivityMixin<typeof BaseSaveActivityData>>;

declare class SaveActivity extends SaveActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "save" };

  /** @inheritDoc */
  static override LOCALIZATION_PREFIXES: string[];

  /** @inheritDoc */
  rollDamage(
    config?: dnd5e.types.Dice.DamageRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration
  ): Promise<import("../../module/dice/damage-roll.mjs").default[] | void>;

  /** @override */
  protected _usageChatButtons(
    message: dnd5e.types.documents.activity.ActivityMessageConfiguration
  ): dnd5e.types.documents.activity.ActivityUsageChatButton[];

  /** @inheritDoc */
  getFavoriteData(): Promise<dnd5e.types.data.abstract.FavoriteData5e>;
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      save: typeof SaveActivity;
    }
  }
}

export default SaveActivity;
