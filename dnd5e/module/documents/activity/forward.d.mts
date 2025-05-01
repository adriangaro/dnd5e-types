import ForwardActivityData from "../../data/activity/forward-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for triggering another activity with modified consumption.
 */
declare class ForwardActivity extends ActivityMixin(ForwardActivityData) {
  static metadata: ForwardActivity.Metadata;
  get metadata(): ForwardActivity.Metadata;
}

declare namespace ForwardActivity {
  interface Metadata extends ActivityMixin.Metadata {
    sheetClass: typeof dnd5e.applications.activity.ForwardSheet
  }
}

export default ForwardActivity

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultActivityTypes {
      forward: typeof ForwardActivity;
    }
  }
}