/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/shared/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.shared {
      interface ActivationData {
      type: dnd5e.types.ActivityActivationType.TypeKey; // Activation type (e.g. action, legendary action, minutes).
      value: number; // Scalar value associated with the activation.
      condition: string; // Condition required to activate this activity.
      }

      interface CreatureTypeData {
      value: dnd5e.types.Creature.TypeKey | "custom"; // Actor's type as defined in the system configuration.
      subtype: string; // Actor's subtype usually displayed in parenthesis after main type.
      swarm: dnd5e.types.ActorSize.TypeKey | ""; // Size of the individual creatures in a swarm, if a swarm.
      custom: string; // Custom type beyond what is available in the configuration.
      }

      interface CurrencyTemplateData {
      currency: Record<dnd5e.types.Currency.TypeKey, number>; // Currencies stored in the actor or container.
      }

      interface DamageData {
      number: number; // Number of dice to roll.
      denomination: number; // Die denomination to roll.
      bonus: string; // Bonus added to the damage.
      types: Set<dnd5e.types.Damage.TypeKey>; // One or more damage types. If multiple are selected, then the user will be able to select from those types.
      custom: {
        enabled: boolean; // Should the custom formula be used?
        formula: string; // Custom damage formula.
      };
      modifiers: Set<string>; // Modifiers to apply to damage roll.
      scaling: {
        mode: dnd5e.types.DamageScalingMode.TypeKey; // How the damage scales in relation with levels.
        number: number; // Number of dice to add per scaling level.
        formula: string; // Arbitrary scaling formula which will be multiplied by scaling increase.
      };
      }

      interface DamageFormulaOptions {
      modifiers: Set<string>|false; // Additional modifiers to apply to the formula, if possible. A `false` value will remove modifiers provided by damage data.
      }

      interface DurationData {
      value: string; // Scalar value for the activity's duration.
      units: dnd5e.types.TimePeriod.TypeKey; // Units that are used for the duration.
      special: string; // Description of any special duration details.
      }

      interface MovementData {
      walk: number; // Actor walking speed.
      burrow: number; // Actor burrowing speed.
      climb: number; // Actor climbing speed.
      fly: number; // Actor flying speed.
      swim: number; // Actor swimming speed.
      bonus: string; // Bonus applied to all movement types that already have a speed.
      special: string; // Semi-colon separated list of special movement information.
      units: dnd5e.types.MovementUnit.TypeKey; // Movement used to measure the various speeds.
      hover: boolean; // This flying creature able to hover in place.
      ignoredDifficultTerrain: Set<dnd5e.types.DifficultTerrain.TypeKey>; // Types of difficult terrain ignored.
      }

      interface RangeData {
      value: string; // Scalar value for the activity's range.
      units: dnd5e.types.DistanceUnit.TypeKey; // Units that are used for the range.
      special: string; // Description of any special range details.
      }

      interface RollConfigData {
      ability?: dnd5e.types.Ability.TypeKey | "spellcasting" | ""; // Default ability associated with this roll.
      roll: {
        min: number; // Minimum number on the die rolled.
        max: number; // Maximum number on the die rolled.
        mode: dnd5e.types.AdvantageMode; // Should the roll be with disadvantage or advantage by default?
      };
      }

      interface SensesData {
      ranges: Record<dnd5e.types.Senses.TypeKey, number>; // Ranges of various senses.
      units: string; // Distance units used to measure senses.
      special: string; // Description of any special senses or restrictions.
      }

      interface SourceData {
      book: string; // Book/publication where the item originated.
      page: string; // Page or section where the item can be found.
      custom: string; // Fully custom source label.
      license: string; // Type of license that covers this item.
      revision: number; // Revision count for this item.
      rules: string; // Version of the rules for this document (e.g. 2014 vs. 2024).
      }

      interface TargetData {
      template: {
        count: string; // Number of templates created.
        contiguous: boolean; // Must all created areas be connected to one another?
        type: dnd5e.types.AreaTargetType.TypeKey; // Type of area of effect caused by this activity.
        size: string; // Size of the activity's area of effect on its primary axis.
        width: string; // Width of line area of effect.
        height: string; // Height of cylinder area of effect.
        units: string; // Units used to measure the area of effect sizes.
      };
      affects: {
        count: string; // Number of individual targets that can be affected.
        type: dnd5e.types.IndividualTargetType.TypeKey; // Type of targets that can be affected (e.g. creatures, objects, spaces).
        choice: boolean; // When targeting an area, can the user choose who it affects?
        special: string; // Description of special targeting.
      };
      }

      interface UsesData {
      spent: number; // Number of uses that have been spent.
      max: string; // Formula for the maximum number of uses.
      recovery: UsesRecoveryData[]; // Recovery profiles for this activity's uses.
      }

      interface UsesRecoveryData {
      period: dnd5e.types.LimitedUsePeriod.TypeKey | "recharge"; // Period at which this profile is activated.
      type: "recoverAll" | "loseAll" | "formula"; // Whether uses are reset to full, reset to zero, or recover a certain number of uses.
      formula: string; // Formula used to determine recovery if type is not reset.
      }

  }
}

export {};
