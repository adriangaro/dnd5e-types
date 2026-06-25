/**
 * Activity for making ability checks.
 * The document = `ActivityMixin(BaseCheckActivityData)`, registered as the `"check"` type.
 */

import type BaseCheckActivityData from "../../data/activity/check-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const CheckActivity_base: ReturnType<typeof ActivityMixin<typeof BaseCheckActivityData>>;

/** Activity for making ability checks. */
declare class CheckActivity extends CheckActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "check" };
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      check: typeof CheckActivity;
    }
  }
}

export default CheckActivity;
