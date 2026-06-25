/**
 * Extended version of Combat to trigger events on combat start & turn changes.
 *
 * Extends the base global `Combat` directly (no SystemDocumentMixin / SubType threading — Combat
 * has no system subtypes here). It is registered into fvtt-types' `DocumentClassConfig` by the
 * document funnel, so `Combat.Implementation` everywhere resolves to this class.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface Combat5e` — downstream packages add
 * document-level methods/getters by augmenting that interface (the document analogue of the
 * data-model Seam-D override interfaces). Types whose dependencies aren't ported yet (recovery
 * period descriptors) are intentionally loose and tightened later.
 */

declare class Combat5e extends Combat {
  /* ---- Properties ---- */

  /** Expansion state for groups within this combat. */
  expandedGroups: Set<string>;

  /* ---- Methods ---- */

  override startCombat(): Promise<this>;
  override endCombat(): Promise<this>;
  override rollAll(options?: Combat.InitiativeOptions): Promise<this>;
  override rollNPC(options?: Combat.InitiativeOptions): Promise<this>;
  override rollInitiative(ids: string[], options?: Combat.InitiativeOptions): Promise<this>;
  protected override _sortCombatants(a: Combatant.Implementation, b: Combatant.Implementation): number;

  /* ---- Turn/round event handlers ---- */

  protected override _onEndTurn(combatant: Combatant.Stored, context: Combat.TurnEventContext): Promise<void>;
  protected override _onStartRound(context: Combat.RoundEventContext): Promise<void>;
  protected override _onStartTurn(combatant: Combatant.Stored, context: Combat.TurnEventContext): Promise<void>;

  /* ---- Socket event handlers ---- */

  protected override _onUpdate(changed: object, options: object, userId: string): void;
  protected override _onDelete(options: object, userId: string): void;

  /* ---- Helpers ---- */

  /** Determine which group each combatant should be added to, or if a new group should be created. */
  createGroups(): Map<string, Combat5e.Group>;

  /** Reset combat-specific uses across (defeated-excluded) combatants for the given recovery periods. */
  protected _recoverUses(types: Combat5e.RecoveryTypes): Promise<void>;
}

declare namespace Combat5e {
  /** A grouping of combatants produced by {@link Combat5e.createGroups}. */
  interface Group {
    combatants: Combatant.Implementation[];
    expanded: boolean;
  }

  /**
   * Which types of recovery to handle, and whether they should be performed on all combatants
   * (`true`) or only the specified combatant.
   */
  type RecoveryTypes = Partial<Record<dnd5e.types.LimitedUsePeriod.TypeKey, boolean | Combatant.Implementation>>;
}

export default Combat5e;
