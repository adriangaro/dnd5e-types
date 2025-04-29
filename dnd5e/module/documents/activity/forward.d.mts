import ForwardActivityData from "../../data/activity/forward-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for triggering another activity with modified consumption.
 */
export default class ForwardActivity extends ActivityMixin(ForwardActivityData) {}
