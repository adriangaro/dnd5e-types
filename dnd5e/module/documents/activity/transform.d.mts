import TransformActivityData from "../../data/activity/transform-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for transforming an actor into something else.
 */
declare class TransformActivity extends ActivityMixin(TransformActivityData) {
  static metadata: TransformActivity.Metadata;
  get metadata(): TransformActivity.Metadata;

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Does the user have permissions to transform?
   */
  get canTransform(): boolean;

  /* -------------------------------------------- */
  /*  Activation                                  */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _prepareUsageConfig(config: TransformActivity.UseConfiguration): TransformActivity.UseConfiguration;

  /* -------------------------------------------- */

  /** @inheritDoc */
  _requiresConfigurationDialog(config: TransformActivity.UseConfiguration): boolean;

  /* -------------------------------------------- */

  /** @inheritDoc */
  _finalizeMessageConfig(
    usageConfig: TransformActivity.UseConfiguration, 
    messageConfig: dnd5e.types.Activity.MessageConfiguration, 
    results: dnd5e.types.Activity.UsageResults
  ): Promise<void>;


  /* -------------------------------------------- */

  /** @inheritDoc */
  _finalizeUsage(config: TransformActivity.UseConfiguration, results: dnd5e.types.Activity.UsageResults): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Request a specific actor to transform into from the player.
   */
  queryActor(profile: TransformActivity.TransformProfile): Promise<string | null>;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle transforming selected actors from the chat card.
   */
  static #transformActor(this: TransformActivity, event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation): Promise<void>;
}

declare namespace TransformActivity {
  interface Metadata extends ActivityMixin.Metadata {
    sheetClass: typeof dnd5e.applications.activity.TransformSheet
  }

  type UseConfiguration = dnd5e.types.Activity.UseConfiguration & {
    /** Options for configuring transformation behavior. */
    transform?: Partial<TransformationConfiguration>;
  };

  /**
   * Configuration for transformation behavior.
   */
  interface TransformationConfiguration {
    /** ID of the transformation profile to use. */
    profile: string;
    /** UUID of the creature to transform into. */
    uuid?: string;
  }


  type TransformProfile = TransformActivityData.TransformProfile;
}

export default TransformActivity;

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultActivityTypes {
      transform: typeof TransformActivity;
    }
  }
}
