import SystemDataModel from "../../abstract.mjs";
import { ActivitiesField } from "../../fields/activities-field.mjs";
import UsesField from "../../shared/uses-field.mjs";

/**
 * Data model template for items with activities.
 * @mixin
 */
declare class ActivitiesTemplate extends SystemDataModel<{
  activities: ActivitiesField,
  uses: UsesField
}> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Which ability score modifier is used by this item?
   */
  get abilityMod(): dnd5e.types.Ability.TypeKey | null

  /**
   * Default ability key defined for this type.
   * @internal
   */
  get _typeAbilityMod(): dnd5e.types.Ability.TypeKey | null

  /* -------------------------------------------- */

  /**
   * Enchantments that have been applied by this item.
   */
  get appliedEnchantments(): ActiveEffect.OfType<'enchantment'>[]

  /* -------------------------------------------- */

  /**
   * Value on a d20 die needed to roll a critical hit with an attack from this item.
   */
  get criticalThreshold(): number | null

  /* -------------------------------------------- */

  /**
   * Does the Item implement an attack roll as part of its usage?
   */
  get hasAttack(): boolean

  /* -------------------------------------------- */

  /**
   * Is this Item limited in its ability to be used by charges or by recharge?
   */
  get hasLimitedUses(): boolean

  /* -------------------------------------------- */

  /**
   * Does the Item implement a saving throw as part of its usage?
   */
  get hasSave(): boolean

  /* -------------------------------------------- */

  /**
   * Does this Item implement summoning as part of its usage?
   */
  get hasSummoning(): boolean

  /* -------------------------------------------- */

  /**
   * Is this Item an activatable item?
   */
  get isActive(): boolean

  /* -------------------------------------------- */

  /**
   * Can this item enchant other items?
   */
  get isEnchantment(): boolean

  /* -------------------------------------------- */

  /**
   * Does the Item provide an amount of healing instead of conventional damage?
   */
  get isHealing(): boolean

  /* -------------------------------------------- */

  /**
   * Creatures summoned by this item.
   */
  get summonedCreatures(): Actor.Implementation[]

  /* -------------------------------------------- */
  /*  Data Migrations                             */
  /* -------------------------------------------- */

  /**
   * Migrate the uses data structure from before activities.
   */
  static migrateActivities(source: ActivitiesTemplate['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate the uses to the new data structure.
   */
  static #migrateUses(source: ActivitiesTemplate['_source'])

  /* -------------------------------------------- */

  /**
   * Modify data before initialization to create initial activity if necessary.
   */
  static initializeActivities(source: ActivitiesTemplate['_source'])

  /* -------------------------------------------- */

  /**
   * Method to determine whether the activity creation migration should be performed. This migration should only be
   * performed on whole item data rather than partial updates, so check to ensure all of the necessary data is present.
   */
  static #shouldCreateInitialActivity(source: ActivitiesTemplate['_source']): boolean

  /* -------------------------------------------- */

  /**
   * Migrate data from ActionTemplate and ActivatedEffectTemplate into a newly created activity.
   */
  static #createInitialActivity(source: ActivitiesTemplate['_source'])

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare final data for the activities & uses.
   */
  prepareFinalActivityData(rollData: ReturnType<Item.Implementation['getRollData']>)


  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Retrieve information on available uses for display.
   */
  getUsesData(): {value: number, max: number, name: string}

  /* -------------------------------------------- */

  /**
   * Perform any item & activity uses recovery.
   */
  recoverUses(periods: dnd5e.types.ActivityActivation.TypeKey[], rollData: ReturnType<Item.Implementation['getRollData']>): Promise<{ updates: object, rolls: dnd5e.dice.BasicRoll[] }>
 
  /* -------------------------------------------- */
  /*  Socket Event Handlers                       */
  /* -------------------------------------------- */

  onCreateActivities(data: object, options: object, userId: string): Promise<void>

  /* -------------------------------------------- */

  /**
   * Prepare any item or actor changes based on activity changes.
   */
  preUpdateActivities(changed: object, options: object, user: User.Implementation): Promise<void>

  /* -------------------------------------------- */

  /**
   * Perform any additional updates when an item with activities is updated.
   */
  onUpdateActivities(changed: object, options: {
    dnd5e?: {
      removedCachedItems: boolean
    }
  }, userId: string): Promise<void>

  /* -------------------------------------------- */

  /**
   * Perform any necessary cleanup when an item with activities is deleted.
   */
  onDeleteActivities(options: object, userId: string)

  /* -------------------------------------------- */
  /*  Shims                                       */
  /* -------------------------------------------- */

  /**
   * Apply shims for data removed from ActionTemplate & ActivatedEffectTemplate.
   */
  static _applyActivityShims()
}

declare namespace ActivitiesTemplate {

}

export default ActivitiesTemplate