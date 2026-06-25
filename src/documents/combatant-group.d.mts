/**
 * Custom CombatantGroup implementation.
 *
 * Extends the global client `CombatantGroup` class (runtime: `foundry.documents.CombatantGroup ?? class {}`).
 * No SystemDocumentMixin, no SubType generic.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface CombatantGroup5e` — downstream
 * packages add document-level methods/getters by augmenting that interface (the document analogue of
 * the data-model Seam-D override interfaces).
 */

declare class CombatantGroup5e extends CombatantGroup {
  /** Nominate a Combatant that will perform operations on behalf of the group. */
  get activeCombatant(): Combatant.Implementation | null;
}

declare namespace CombatantGroup5e {}

interface CombatantGroup5e {}

export default CombatantGroup5e;
