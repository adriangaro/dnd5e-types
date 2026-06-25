/**
 * Extra status effects config domain (Seam A). `CONFIG.DND5E.statusEffects`.
 *
 * Extra status effects not specified in `conditionTypes`. If the ID matches a core-provided
 * effect, this data is merged into the core data. Shape is `StatusEffectConfig5e`, i.e.
 * `Omit<StatusEffectConfig, "img">` from core fvtt plus the dnd5e-specific fields below.
 *
 * NOTE: a parallel core augmentation of `CONFIG.statusEffects` may also be required for the
 * effects to surface in the token HUD; that core funnel is intentionally NOT done here.
 */

declare global {
  namespace dnd5e.types {
    namespace StatusEffect {
      /** Status effects defined by dnd5e beyond the core condition list. */
      interface DefaultTypes {
        burrowing: true;
        concentrating: true;
        coverHalf: true;
        coverThreeQuarters: true;
        coverTotal: true;
        dead: true;
        dodging: true;
        ethereal: true;
        flying: true;
        hiding: true;
        hovering: true;
        marked: true;
        sleeping: true;
        stable: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /**
       * Configuration data for system status effects.
       *
       * Shape of each `CONFIG.DND5E.statusEffects[key]` entry (`StatusEffectConfig5e`).
       */
      interface Config {
        /** Localized name of the status effect (from core `StatusEffectConfig`). */
        name: string;
        /** Image used to represent the condition on the token. */
        img: string;
        /** Order status to the start of the token HUD, rather than alphabetically. */
        order?: number;
        /** UUID of a journal entry with details on this condition. */
        reference?: string;
        /** Set this condition as a special status effect under this name. */
        special?: string;
        /** Additional conditions, by id, to apply as part of this condition. */
        riders?: dnd5e.types.Condition.TypeKey[];
        /**
         * Any status effects with the same group cannot be applied at the same time through the
         * token HUD (multiple statuses applied through other effects can still coexist).
         */
        exclusiveGroup?: string;
        /** A bonus this condition provides to AC and dexterity saving throws. */
        coverBonus?: number;
        /** If true, a token with this status will not block movement for other tokens. */
        neverBlockMovement?: boolean;
        /** Statuses applied alongside this one. */
        statuses?: dnd5e.types.Condition.TypeKey[];
      }
    }

    interface DND5EConfig {
      statusEffects: { [K in dnd5e.types.StatusEffect.TypeKey]: dnd5e.types.StatusEffect.Config };
    }
  }
}

export {};
