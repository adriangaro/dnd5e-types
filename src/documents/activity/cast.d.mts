/**
 * Activity for casting a spell from another item.
 * The document = `ActivityMixin(BaseCastActivityData)`, registered as the `"cast"` type.
 */

import type BaseCastActivityData from "../../module/data/activity/cast-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const CastActivity_base: ReturnType<typeof ActivityMixin<typeof BaseCastActivityData>>;

declare class CastActivity extends CastActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "cast" };

  /** Static ID used for the enchantment that modifies spell data. */
  static ENCHANTMENT_ID: string;

  /** Returns false for spells; cast activities may not be added to spell items. */
  static availableForItem(item: Item.Implementation): boolean;

  /** Cached copy of the associated spell stored on the actor. */
  get cachedSpell(): Item.Implementation | void;

  /** Should this spell be listed in the actor's spellbook? */
  get displayInSpellbook(): boolean;

  /**
   * Activate the cast activity, using the linked spell.
   *
   * Fires the following hook events:
   * - **dnd5e.preUseLinkedSpell** — fires before the linked spell is used.
   *   Return `false` explicitly to prevent the activity from being used.
   *   @hook dnd5e.preUseLinkedSpell
   *   @param {CastActivity} activity                                Cast activity being used.
   *   @param {Partial<ActivityUseConfiguration>} usageConfig        Configuration info for the activation.
   *   @param {Partial<ActivityDialogConfiguration>} dialogConfig    Configuration info for the usage dialog.
   *   @param {Partial<ActivityMessageConfiguration>} messageConfig  Configuration info for the created chat message.
   *   @returns {boolean}  Explicitly return `false` to prevent activity from being used.
   *
   * - **dnd5e.postUseLinkedSpell** — fires after the linked spell is used.
   *   @hook dnd5e.postUseLinkedSpell
   *   @param {CastActivity} activity                          Activity being activated.
   *   @param {Partial<ActivityUseConfiguration>} usageConfig  Configuration data for the activation.
   *   @param {ActivityUsageResults} results                   Final details on the activation.
   */
  use(
    config?: dnd5e.types.documents.activity.ActivityUseConfiguration,
    dialog?: dnd5e.types.documents.activity.ActivityDialogConfiguration,
    message?: dnd5e.types.documents.activity.ActivityMessageConfiguration
  ): Promise<dnd5e.types.documents.activity.ActivityUsageResults | void>;

  /** Prepare the data for the cached spell to store on the actor. */
  getCachedSpellData(): Promise<object | void>;

  /** Create spell changes based on the activity's configuration. */
  getSpellChanges(): object[];

  /** @inheritDoc */
  getRollData(options?: object): dnd5e.types.documents.ActivityRollData;
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      cast: typeof CastActivity;
    }
  }
}

export default CastActivity;
