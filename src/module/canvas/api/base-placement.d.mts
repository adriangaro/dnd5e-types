/**
 * `BasePlacement` — base interactive-placement helper (`module/canvas/api/base-placement.mjs`).
 * Generic over its configuration + result-data shapes (see `dnd5e.types.canvas.*`).
 */

declare abstract class BasePlacement<
  Configuration extends object = dnd5e.types.canvas.BasePlacementConfiguration,
  PlacementData extends object = object,
> {
  /**
   * Initialize the placement system using configuration information.
   * @param config - Configuration information for placement.
   */
  constructor(config: Configuration);

  /** Configuration information for the placements. */
  config: Configuration;

  /** Perform the placement, asking player guidance when necessary. */
  static place<This extends typeof BasePlacement>(
    this: This,
    config: ConstructorParameters<This>[0],
  ): Promise<InstanceType<This> extends BasePlacement<any, infer D> ? D[] : never>;

  /** Perform the placement, asking player guidance when necessary. */
  place(): Promise<PlacementData[]>;

  /** Internal method that handles specific placement details. */
  protected abstract _place(): Promise<PlacementData[]>;
}

declare namespace BasePlacement {
  interface Any extends BasePlacement<any, any> {}
  type AnyConstructor = typeof BasePlacement;
}

export default BasePlacement;
