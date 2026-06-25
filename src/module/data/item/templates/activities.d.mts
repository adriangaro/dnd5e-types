/**
 * Data model template for items with activities.
 *
 * Pure `SystemDataModel` template (parent = Item) for items that carry activities. Folded into
 * concrete item models via `ItemDataModel.mixin(...)`. Exposes its schema as a global interface so
 * it composes through `dnd5e.types.GetSchema<typeof ActivitiesTemplate>` at the mixin site.
 */

import type BasicRoll from "../../../dice/basic-roll.mjs";
import SystemDataModel from "../../abstract/system-data-model.mjs";

declare global {
  namespace dnd5e.types.Item.Activities {
    interface Schema extends foundry.data.fields.DataSchema {
      activities: dnd5e.types.fields.ActivitiesField;
      damage: foundry.data.fields.SchemaField<{
        bonus: dnd5e.types.fields.FormulaField;
      }>;
      uses: dnd5e.types.fields.UsesField;
    }

    /** Instance methods this template MIXES onto a model (composed onto items via a companion interface). */
    interface Methods {
      /* ---- Properties ---- */

      /** Which ability score modifier is used by this item? */
      get abilityMod(): dnd5e.types.Ability.TypeKey | null;

      /** Default ability key defined for this type. @internal */
      get _typeAbilityMod(): dnd5e.types.Ability.TypeKey | null;

      /** Value on a d20 die needed to roll a critical hit with an attack from this item type. @internal */
      get _typeCriticalThreshold(): number | null;

      /** Enchantments that have been applied by this item. */
      get appliedEnchantments(): globalThis.ActiveEffect.Implementation[];

      /** Value on a d20 die needed to roll a critical hit with an attack from this item. */
      get criticalThreshold(): number | null;

      /** Does the Item implement an attack roll as part of its usage? */
      get hasAttack(): boolean;

      /** Is this Item limited in its ability to be used by charges or by recharge? */
      get hasLimitedUses(): boolean;

      /** Does the Item implement a saving throw as part of its usage? */
      get hasSave(): boolean;

      /** Does this Item implement summoning as part of its usage? */
      get hasSummoning(): boolean;

      /** Is this Item an activatable item? */
      get isActive(): boolean;

      /** Can this item enchant other items? */
      get isEnchantment(): boolean;

      /** Does the Item provide an amount of healing instead of conventional damage? */
      get isHealing(): boolean;

      /** Creatures summoned by this item. */
      get summonedCreatures(): globalThis.Actor.Implementation[];

      /* ---- Data Preparation ---- */

      /** Prepare final data for the activities & uses. */
      prepareFinalActivityData(rollData: dnd5e.types.documents.ItemRollData): void;

      /* ---- Helpers ---- */

      /** Retrieve information on available uses for display. */
      getUsesData(): { value: number; max: number; name: string };

      /**
       * Perform any item & activity uses recovery.
       * @param periods   Recovery periods to check, mapped to the number of times occurred.
       * @param rollData  Roll data to use when evaluating recovery formulas.
       */
      recoverUses(
        periods: Map<dnd5e.types.LimitedUsePeriod.TypeKey, number>,
        rollData?: dnd5e.types.documents.ItemRollData,
      ): Promise<{ updates: object; rolls: BasicRoll[]; destroy: boolean }>;

      /* ---- Socket Event Handlers ---- */

      /**
       * Perform any necessary actions when an item with activities is created.
       * @param data     The initial data object provided to the document creation request.
       * @param options  Additional options which modify the update request.
       * @param userId   The id of the User requesting the document update.
       */
      onCreateActivities(data: object, options: object, userId: string): Promise<void>;

      /**
       * Prepare any item or actor changes based on activity changes.
       * @param changed  The differential data that is changed relative to the document's prior values.
       * @param options  Additional options which modify the update request.
       * @param user     The User requesting the document update.
       */
      preUpdateActivities(
        changed: object,
        options: object,
        user: User.Implementation,
      ): Promise<void>;

      /**
       * Perform any additional updates when an item with activities is updated.
       * @param changed  The differential data that is changed relative to the document's prior values.
       * @param options  Additional options which modify the update request.
       * @param userId   The id of the User requesting the document update.
       */
      onUpdateActivities(changed: object, options: object, userId: string): Promise<void>;

      /**
       * Perform any necessary cleanup when an item with activities is deleted.
       * @param options  Additional options which modify the deletion request.
       * @param userId   The id of the User requesting the document update.
       */
      onDeleteActivities(options: object, userId: string): void;
    }
  }
}

export declare class ActivitiesTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.Activities.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends SystemDataModel<Schema, BaseData, DerivedData> {
  static override LOCALIZATION_PREFIXES: string[];

  static override defineSchema(): dnd5e.types.Item.Activities.Schema;

  /* ---- Data Migration ---- */

  /**
   * Migrate the uses data structure from before activities.
   * @param source  Candidate source data to migrate.
   */
  static migrateActivities(source: object): void;

  /**
   * Modify data before initialization to create initial activity if necessary.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static initializeActivities(source: object): void;
}
export declare interface ActivitiesTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.Activities.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends dnd5e.types.Item.Activities.Methods {}

export default ActivitiesTemplate;
