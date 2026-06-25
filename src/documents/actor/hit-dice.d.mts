/**
 * Object describing the hit dice for an actor (aggregated across the actor's class items). Assigned
 * to `system.attributes.hd` during `prepareBaseData`.
 *
 * Not a Foundry Document — a lightweight computed view constructed from `Actor5e#classes`.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface HitDice` — downstream packages
 * add members by augmenting that interface. Rest-related shapes (RestConfiguration / RestResult)
 * are intentionally loose until the Actor rest types land.
 */

declare class HitDice {
  /**
   * @param actor  The actor whose hit dice this object describes.
   */
  constructor(actor: Actor.Implementation);

  /** Store a reference to the actor. */
  actor: Actor.Implementation;

  /** Remaining hit dice. */
  get value(): number;

  /** The actor's total amount of hit dice. */
  get max(): number;

  /** All valid die sizes derived from all classes. */
  sizes: Set<number>;

  /** Store valid class items. */
  classes: Set<globalThis.Item.OfType<"class">>;

  /** The smallest denomination. */
  get smallest(): string;

  /** The smallest die size of those available. */
  get smallestAvailable(): `d${number}`;

  /** The smallest die size. */
  get smallestFace(): number;

  /** The largest denomination. */
  get largest(): string;

  /** The largest die size of those available. */
  get largestAvailable(): `d${number}`;

  /** The largest die size. */
  get largestFace(): number;

  /** The percentage of remaining hit dice. */
  get pct(): number;

  /** Return an object of remaining hit dice categorized by size (denomination -> remaining). */
  get bySize(): Partial<Record<dnd5e.types.HitDieType.TypeKey, number>>;

  /**
   * Override the default `toString` method for backwards compatibility.
   * @returns Remaining hit dice.
   */
  toString(): number;

  /**
   * Create item updates for recovering hit dice during a rest.
   * @param config                Rest configuration options.
   * @param config.maxHitDice     Maximum number of hit dice to recover.
   * @param config.fraction       Fraction of max hit dice to recover. Only used if `maxHitDice` isn't specified.
   * @param config.largest        Whether to restore the largest hit dice first.
   * @param result                Rest result being constructed.
   */
  createHitDiceUpdates(
    config?: HitDice.HitDiceUpdateConfiguration,
    result?: HitDice.RestResult
  ): void;
}

declare namespace HitDice {
  /** Rest configuration shape (aliased to the generated type; open for declaration-merging). */
  interface RestConfiguration extends dnd5e.types.documents.RestConfiguration {}

  /** Rest result shape (aliased to the generated type; open for declaration-merging). */
  interface RestResult extends dnd5e.types.documents.RestResult {}

  /** Options accepted by {@link HitDice.createHitDiceUpdates}. */
  type HitDiceUpdateConfiguration = RestConfiguration & {
    /** Maximum number of hit dice to recover. */
    maxHitDice?: number;
    /**
     * Fraction of max hit dice to recover. Only used if `maxHitDice` isn't specified.
     * @defaultValue `0.5`
     */
    fraction?: number;
    /**
     * Whether to restore the largest hit dice first.
     * @defaultValue `true`
     */
    largest?: boolean;
  };
}

export default HitDice;
