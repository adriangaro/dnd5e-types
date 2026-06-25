/**
 * Encumbrance calculation configuration. `CONFIG.DND5E.encumbrance`.
 */

declare global {
  namespace dnd5e.types {
    namespace Encumbrance {
      /** An imperial/metric numeric pair. */
      interface ImperialMetricValue {
        imperial: number;
        metric: number;
      }

      /** Status-effect descriptor applied at an encumbrance tier. */
      interface EffectConfig {
        /** Localized effect name. */
        name: string;
        /** Effect icon path. */
        img: string;
      }

      /** Speed reduction (in distance units) at an encumbrance tier. */
      interface SpeedReduction {
        ft: number;
        m: number;
      }
    }

    interface DND5EConfig {
      encumbrance: {
        /** Pieces of currency that equal a base weight (lbs or kgs). */
        currencyPerWeight: dnd5e.types.Encumbrance.ImperialMetricValue;
        /** Multiplier applied to draft (mount/vehicle) carrying capacity. */
        draftMultiplier: number;
        /** Status effects applied at each encumbrance tier. */
        effects: {
          encumbered: dnd5e.types.Encumbrance.EffectConfig;
          heavilyEncumbered: dnd5e.types.Encumbrance.EffectConfig;
          exceedingCarryingCapacity: dnd5e.types.Encumbrance.EffectConfig;
        };
        /** Weight-per-ability-score multipliers defining each tier threshold. */
        threshold: {
          encumbered: dnd5e.types.Encumbrance.ImperialMetricValue;
          heavilyEncumbered: dnd5e.types.Encumbrance.ImperialMetricValue;
          maximum: dnd5e.types.Encumbrance.ImperialMetricValue;
        };
        /** Speed reduction applied at each encumbrance tier. */
        speedReduction: {
          encumbered: dnd5e.types.Encumbrance.SpeedReduction;
          heavilyEncumbered: dnd5e.types.Encumbrance.SpeedReduction;
          exceedingCarryingCapacity: dnd5e.types.Encumbrance.SpeedReduction;
        };
        /** Multiplier used to determine vehicle carrying capacity. */
        vehicleWeightMultiplier: Record<string, number>;
        /** Base weight units used for encumbrance, by actor type. */
        baseUnits: Record<string, dnd5e.types.DefaultUnit.Config<dnd5e.types.WeightUnit.TypeKey>>;
      };
    }
  }
}

export {};
