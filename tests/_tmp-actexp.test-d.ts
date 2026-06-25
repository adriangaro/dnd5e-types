declare global { namespace dnd5e.types.Activity { interface OverrideTypes {
  myCustomActivity: typeof import("../src/module/data/activity/base-activity.mjs").default;
} } }
export {};
