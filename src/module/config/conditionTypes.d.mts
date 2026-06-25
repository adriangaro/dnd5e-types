/**
 * Condition types config domain (Seam A). `CONFIG.DND5E.conditionTypes`.
 *
 * The `Condition` namespace (DefaultTypes / OverrideTypes / Types / TypeKey) is
 * declared in `_stubs.d.mts`; this file only layers in the `Config` shape and the
 * `CONFIG.DND5E.conditionTypes` funnel entry.
 *
 * Note: the runtime also defines several pseudo-conditions (e.g. `bleeding`,
 * `burning`, `cursed`, `diseased`, `surprised`) not present in the lean stub —
 * downstream may widen `Condition.OverrideTypes` to include them.
 */

declare global {
  namespace dnd5e.types {
    namespace Condition {
      /**
       * Shape of each `CONFIG.DND5E.conditionTypes[key]` entry.
       * `ConditionConfiguration` = `Omit<StatusEffectConfig5e, "name"> & _ConditionConfiguration`.
       * Extends `Omit<CONFIG.StatusEffect, "name" | "img">` to admit foundry-base members
       * (`id`, `changes`, `duration`, `statuses`, `transfer`, etc.).
       */
      interface Config extends Omit<CONFIG.StatusEffect, "name" | "img"> {
        /** Localized name for the condition. */
        name: string;
        /** Image used to represent the condition on the token. */
        img: string;
        /** UUID of a journal entry with details on this condition. */
        reference?: string;
        /** Set this condition as a special status effect under this name. */
        special?: string;
        /** Additional conditions, by id, to apply as part of this condition. */
        riders?: dnd5e.types.Condition.TypeKey[];
        /** Other status effect ids applied alongside this condition. */
        statuses?: dnd5e.types.Condition.TypeKey[];
        /** Any status effects with the same group will not be able to be applied at the same time through the token HUD (multiple statuses applied through other effects can still coexist). */
        exclusiveGroup?: string;
        /** Order this status to the start of the token HUD, rather than alphabetically. */
        order?: number;
        /** A bonus this condition provides to AC and dexterity saving throws. */
        coverBonus?: number;
        /** If true, a token with this status will not block movement for other tokens. */
        neverBlockMovement?: boolean;
        /** Is this a pseudo-condition that acts as a status effect but is not in the appendix? */
        pseudo?: boolean;
        /** The number of levels of exhaustion an actor can obtain. */
        levels?: number;
        /** Amount D20 Tests & Speed are reduced per exhaustion level when using the modern rules. Speed reduction is measured in the default imperial units and converted to metric if necessary. */
        reduction?: { rolls: number; speed: number };
      }
    }

    interface DND5EConfig {
      conditionTypes: { [K in dnd5e.types.Condition.TypeKey]: dnd5e.types.Condition.Config };
    }
  }
}

export {};
