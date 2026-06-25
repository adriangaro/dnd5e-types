/**
 * Core fvtt-types `CONFIG.*` augmentations dnd5e performs at init/setup — the funnels that feed
 * Foundry core (NOT `CONFIG.DND5E`, which is bound separately in index.d.mts):
 *
 *  1. `CONFIG.statusEffects` entries — dnd5e merges its own fields onto every status-effect config
 *     (`dnd5e.mjs` builds `CONFIG.statusEffects` from `CONFIG.DND5E.statusEffects` + `conditionTypes`
 *     + `encumbrance.effects`). We widen the core `CONFIG.StatusEffect` interface so those fields type.
 *  2. `CONFIG.specialStatusEffects` — dnd5e registers special effects via `CONFIG.specialStatusEffects[special] = id`.
 *     Core `DefaultSpecialStatusEffects` already declares DEFEATED/INVISIBLE/BLIND/BURROW/HOVER/FLY; dnd5e
 *     adds CONCENTRATING. We merge into `DefaultSpecialStatusEffects` (NOT `SpecialStatusEffects`, which
 *     REPLACES the defaults — see config.d.mts: `HandleEmptyObject<SpecialStatusEffects, DefaultSpecialStatusEffects>`).
 *  3. `CONFIG.Dice` — dnd5e registers its roll/die classes as named members (`CONFIG.Dice.D20Roll`, etc.).
 */

declare global {
  namespace CONFIG {
    /** dnd5e's additions to each `CONFIG.statusEffects[i]` entry (`StatusEffectConfig5e`). */
    interface StatusEffect {
      /** Order this status to the start of the token HUD, rather than alphabetically. */
      order?: number;
      /** UUID of a journal entry with details on this condition. */
      reference?: string;
      /** Register this condition as a special status effect under this name (key into `specialStatusEffects`). */
      special?: string;
      /** Additional conditions, by id, applied as part of this condition. */
      riders?: string[];
      /** Statuses with the same group cannot be applied together through the token HUD. */
      exclusiveGroup?: string;
      /** Bonus this condition provides to AC and dexterity saving throws. */
      coverBonus?: number;
      /** If true, a token with this status will not block movement for other tokens. */
      neverBlockMovement?: boolean;
      /** (condition-derived entries) Pseudo-condition: acts as a status effect but not in the appendix. */
      pseudo?: boolean;
      /** (condition-derived entries) Number of exhaustion levels an actor can obtain. */
      levels?: number;
      /** (condition-derived entries) D20 Test & speed reduction per exhaustion level (modern rules). */
      reduction?: { rolls: number; speed: number };
    }

    /** dnd5e-specific special status effects (core already provides the rest). */
    interface DefaultSpecialStatusEffects {
      /** Set on the actor while concentrating on a spell/effect. */
      CONCENTRATING: string;
    }

    /** dnd5e registers its roll and die classes onto `CONFIG.Dice`. */
    interface Dice {
      /** dnd5e base roll. */
      BasicRoll: typeof import("../dice/basic-roll.mjs").default;
      /** d20 roll (attacks, checks, saves). */
      D20Roll: typeof import("../dice/d20-roll.mjs").default;
      /** Damage/healing roll. */
      DamageRoll: typeof import("../dice/damage-roll.mjs").default;
      /** dnd5e base die term. */
      BasicDie: typeof import("../dice/basic-die.mjs").default;
      /** d20 die term (advantage/critical handling). */
      D20Die: typeof import("../dice/d20-die.mjs").default;
    }
  }
}

export {};
