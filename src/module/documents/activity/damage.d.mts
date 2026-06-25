/**
 * Activity for rolling damage.
 * The document = `ActivityMixin(BaseDamageActivityData)`, registered as the `"damage"` type.
 */

import type BaseDamageActivityData from "../../data/activity/damage-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const DamageActivity_base: ReturnType<typeof ActivityMixin<typeof BaseDamageActivityData>>;

/** Activity for rolling damage. */
declare class DamageActivity extends DamageActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "damage" };
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      damage: typeof DamageActivity;
    }
  }
}

export default DamageActivity;
