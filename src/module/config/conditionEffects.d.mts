/**
 * Condition effects config domain (Seam A). `CONFIG.DND5E.conditionEffects`.
 *
 * Maps a named gameplay effect to the set of condition keys (optionally with an
 * exhaustion-level suffix, e.g. `"exhaustion-5"`) that apply it.
 *
 * Downstream modules add an effect in one line:
 *   declare global { namespace dnd5e.types.ConditionEffect { interface OverrideTypes { myEffect: true } } }
 */

declare global {
  namespace dnd5e.types {
    namespace ConditionEffect {
      /** Core condition effects. */
      interface DefaultTypes {
        noMovement: true;
        halfMovement: true;
        crawl: true;
        petrification: true;
        halfHealth: true;
        dehydrated: true;
        malnourished: true;
        abilityCheckDisadvantage: true;
        physicalCheckDisadvantage: true;
        abilitySaveDisadvantage: true;
        physicalSaveDisadvantage: true;
        physicalAttackDisadvantage: true;
        attackDisadvantage: true;
        dexteritySaveDisadvantage: true;
        dexteritySaveAdvantage: true;
        initiativeAdvantage: true;
        initiativeDisadvantage: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /** Each entry is a set of condition keys (possibly suffixed, e.g. `"exhaustion-5"`). */
      conditionEffects: { [K in dnd5e.types.ConditionEffect.TypeKey]: Set<dnd5e.types.Condition.TypeKey | `exhaustion-${number}` | (string & {})> };
    }
  }
}

export {};
