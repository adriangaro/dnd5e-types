/**
 * Activity for triggering another activity with modified consumption.
 * The document = `ActivityMixin(BaseForwardActivityData)`, registered as the `"forward"` type.
 */

import type BaseForwardActivityData from "../../module/data/activity/forward-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const ForwardActivity_base: ReturnType<typeof ActivityMixin<typeof BaseForwardActivityData>>;

/** Activity for triggering another activity with modified consumption. */
declare class ForwardActivity extends ForwardActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "forward" };

  /** Forward activation to the linked activity. */
  use(
    config?: dnd5e.types.documents.activity.ActivityUseConfiguration,
    dialog?: dnd5e.types.documents.activity.ActivityDialogConfiguration,
    message?: dnd5e.types.documents.activity.ActivityMessageConfiguration
  ): Promise<dnd5e.types.documents.activity.ActivityUsageResults | void>;
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      forward: typeof ForwardActivity;
    }
  }
}

export default ForwardActivity;
