/**
 * Activity for transforming an actor into something else.
 * The document = `ActivityMixin(BaseTransformActivityData)`, registered as the `"transform"` type.
 */

import type BaseTransformActivityData from "../../module/data/activity/transform-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const TransformActivity_base: ReturnType<typeof ActivityMixin<typeof BaseTransformActivityData>>;

declare class TransformActivity extends TransformActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "transform" };

  /** Does the user have permissions to transform? */
  get canTransform(): boolean;

  /**
   * Request a specific actor to transform into from the player.
   * @param profile  Profile used for transformation.
   * @returns UUID of the actor to transform into or `null` if canceled.
   */
  queryActor(profile: dnd5e.types.data.activity.TransformProfile): Promise<string | null>;
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      transform: typeof TransformActivity;
    }
  }
}

export default TransformActivity;
