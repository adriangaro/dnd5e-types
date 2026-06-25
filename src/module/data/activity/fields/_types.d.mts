/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/activity/fields/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.activity.fields {
      interface EffectApplicationData {
      _id: string; // ID of the effect to apply.
      level: {
        min: number; // Minimum level at which this effect can be applied.
        max: number; // Maximum level at which this effect can be applied.
      };
      }

      interface ConsumptionTargetData {
      type: dnd5e.types.ActivityConsumptionType.TypeKey; // Type of consumption (e.g. activity uses, item uses, hit die, spell slot).
      target: string; // Target of the consumption depending on the selected type (e.g. item's ID, hit die denomination, spell slot level).
      value: string; // Formula that determines amount consumed or recovered.
      scaling: {
        mode: string; // Scaling mode (e.g. no scaling, scale target amount, scale spell level).
        formula: string; // Specific scaling formula if not automatically calculated from target's value.
      };
      }

  }
}

export {};
