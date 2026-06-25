/**
 * Field for holding one or more consumption targets.
 */

import type BasicRoll from "../../../dice/basic-roll.mjs";

declare global {
  namespace dnd5e.types.fields {
    class ConsumptionTargetData extends foundry.abstract.DataModel<ConsumptionTargetData.Schema> {
      static defineSchema(): ConsumptionTargetData.Schema;

      /* -------------------------------------------- */
      /*  Properties                                  */
      /* -------------------------------------------- */

      /**
       * Activity to which this consumption target belongs.
       */
      get activity(): dnd5e.types.Activity.Instance;

      /**
       * Actor containing this consumption target, if embedded.
       */
      get actor(): globalThis.Actor.Implementation;

      /**
       * Should this consumption only be performed during initiative? This will return `true` if consuming activity or item
       * uses and those uses only recover on "combat" periods.
       */
      get combatOnly(): boolean;

      /**
       * Item to which this consumption target's activity belongs.
       */
      get item(): globalThis.Item.Implementation;

      /**
       * List of valid targets within the current context.
       */
      get validTargets(): foundry.applications.fields.FormSelectOption[] | null;

      /* -------------------------------------------- */
      /*  Consumption                                 */
      /* -------------------------------------------- */

      /**
       * Perform consumption according to the target type.
       * @throws ConsumptionError
       */
      consume(
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        updates: dnd5e.types.documents.activity.ActivityUsageUpdates
      ): Promise<void>;

      /* -------------------------------------------- */

      /**
       * Prepare consumption updates for "Activity Uses" consumption type.
       * @throws ConsumptionError
       */
      static consumeActivityUses(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        updates: dnd5e.types.documents.activity.ActivityUsageUpdates
      ): Promise<void>;

      /**
       * Prepare consumption updates for "Attribute" consumption type.
       * @throws ConsumptionError
       */
      static consumeAttribute(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        updates: dnd5e.types.documents.activity.ActivityUsageUpdates
      ): Promise<void>;

      /**
       * Prepare consumption updates for "Hit Dice" consumption type.
       * @throws ConsumptionError
       */
      static consumeHitDice(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        updates: dnd5e.types.documents.activity.ActivityUsageUpdates
      ): Promise<void>;

      /**
       * Prepare consumption updates for "Item Uses" consumption type.
       * @throws ConsumptionError
       */
      static consumeItemUses(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        updates: dnd5e.types.documents.activity.ActivityUsageUpdates
      ): Promise<void>;

      /**
       * Prepare consumption updates for "Material" consumption type.
       * @throws ConsumptionError
       */
      static consumeMaterial(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        updates: dnd5e.types.documents.activity.ActivityUsageUpdates
      ): Promise<void>;

      /**
       * Prepare consumption updates for "Spell Slots" consumption type.
       * @throws ConsumptionError
       */
      static consumeSpellSlots(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        updates: dnd5e.types.documents.activity.ActivityUsageUpdates
      ): Promise<void>;

      /* -------------------------------------------- */

      /**
       * Calculate updates to activity or item uses.
       * @internal
       */
      _usesConsumption(
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        options: {
          uses: dnd5e.types.data.shared.UsesData;
          type: string;
          rolls: foundry.dice.Roll[];
          delta?: { item?: string; keyPath: string };
        }
      ): Promise<{ spent: number } | null>;

      /* -------------------------------------------- */
      /*  Consumption Hints                           */
      /* -------------------------------------------- */

      /**
       * Create label and hint text indicating how much of this resource will be consumed/recovered.
       */
      getConsumptionLabels(
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        options?: { consumed?: boolean }
      ): dnd5e.types.core.ConsumptionLabels;

      /* -------------------------------------------- */

      /**
       * Create hint text indicating how much of this resource will be consumed/recovered.
       */
      static consumptionLabelsActivityUses(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        options?: { consumed?: boolean }
      ): dnd5e.types.core.ConsumptionLabels;

      /**
       * Create hint text indicating how much of this resource will be consumed/recovered.
       */
      static consumptionLabelsAttribute(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        options?: { consumed?: boolean }
      ): dnd5e.types.core.ConsumptionLabels;

      /**
       * Create hint text indicating how much of this resource will be consumed/recovered.
       */
      static consumptionLabelsHitDice(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        options?: { consumed?: boolean }
      ): dnd5e.types.core.ConsumptionLabels;

      /**
       * Create hint text indicating how much of this resource will be consumed/recovered.
       */
      static consumptionLabelsItemUses(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        options?: { consumed?: boolean }
      ): dnd5e.types.core.ConsumptionLabels;

      /**
       * Create hint text indicating how much of this resource will be consumed/recovered.
       */
      static consumptionLabelsMaterial(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        options?: { consumed?: boolean }
      ): dnd5e.types.core.ConsumptionLabels;

      /**
       * Create hint text indicating how much of this resource will be consumed/recovered.
       */
      static consumptionLabelsSpellSlots(
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        options?: { consumed?: boolean }
      ): dnd5e.types.core.ConsumptionLabels;

      /* -------------------------------------------- */

      /**
       * Resolve the cost for the consumption hint.
       * @internal
       */
      _resolveHintCost(config: dnd5e.types.documents.activity.ActivityUseConfiguration): {
        cost: string;
        simplifiedCost: number;
        increaseKey: string;
        pluralRule: string;
      };

      /* -------------------------------------------- */
      /*  Valid Targets                               */
      /* -------------------------------------------- */

      /**
       * Generate a list of targets for the "Attribute" consumption type.
       */
      static validAttributeTargets(
        this: dnd5e.types.fields.ConsumptionTargetData
      ): foundry.applications.fields.FormSelectOption[];

      /**
       * Generate a list of targets for the "Hit Dice" consumption type.
       */
      static validHitDiceTargets(
        this: dnd5e.types.fields.ConsumptionTargetData
      ): foundry.applications.fields.FormSelectOption[];

      /**
       * Generate a list of targets for the "Item Uses" consumption type.
       */
      static validItemUsesTargets(
        this: dnd5e.types.fields.ConsumptionTargetData
      ): foundry.applications.fields.FormSelectOption[];

      /**
       * Generate a list of targets for the "Material" consumption type.
       */
      static validMaterialTargets(
        this: dnd5e.types.fields.ConsumptionTargetData
      ): foundry.applications.fields.FormSelectOption[];

      /**
       * Generate a list of targets for the "Spell Slots" consumption type.
       */
      static validSpellSlotsTargets(
        this: dnd5e.types.fields.ConsumptionTargetData
      ): foundry.applications.fields.FormSelectOption[];

      /* -------------------------------------------- */
      /*  Helpers                                     */
      /* -------------------------------------------- */

      /**
       * Does this target's cost resolve to a fixed zero, meaning nothing is consumed? Non-deterministic
       * costs (those containing dice) are never treated as zero.
       */
      hasZeroCost(config?: dnd5e.types.documents.activity.ActivityUseConfiguration): boolean;

      /**
       * Resolve the amount to consume, taking scaling into account.
       */
      resolveCost(options?: {
        config?: dnd5e.types.documents.activity.ActivityUseConfiguration;
        evaluate?: boolean;
        rolls?: foundry.dice.Roll[];
      }): Promise<BasicRoll> | BasicRoll;

      /**
       * Resolve the spell level to consume, taking scaling into account.
       */
      resolveLevel(options?: {
        config?: dnd5e.types.documents.activity.ActivityUseConfiguration;
        rolls?: foundry.dice.Roll[];
      }): number;

      /**
       * Resolve a scaling consumption value formula.
       * @internal
       */
      _resolveScaledRoll(
        formula: string,
        scaling: number,
        options?: {
          delta?: object;
          evaluate?: boolean;
          rolls?: foundry.dice.Roll[];
        }
      ): Promise<BasicRoll> | BasicRoll;
    }

    namespace ConsumptionTargetData {
      interface Schema extends foundry.data.fields.DataSchema {
        type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActivityConsumptionType.TypeKey, { required: true; blank: false; initial: "activityUses" }>;
        target: foundry.data.fields.StringField;
        value: dnd5e.types.fields.FormulaField<{ initial: "1" }>;
        scaling: foundry.data.fields.SchemaField<{
          mode: foundry.data.fields.StringField;
          formula: dnd5e.types.fields.FormulaField;
        }>;
      }

      interface Any extends ConsumptionTargetData {}
      interface AnyConstructor extends fvttUtils.Identity<typeof ConsumptionTargetData> {}
    }

    class ConsumptionTargetsField extends foundry.data.fields.ArrayField<
      foundry.data.fields.EmbeddedDataField<typeof dnd5e.types.fields.ConsumptionTargetData>
    > {
      constructor(options?: foundry.data.fields.ArrayField.AnyOptions);
    }

    /**
     * Error thrown when consumption cannot be achieved.
     */
    class ConsumptionError extends Error {
      name: "ConsumptionError";
      constructor(...args: ConstructorParameters<typeof Error>);
    }
  }
}

export {};
