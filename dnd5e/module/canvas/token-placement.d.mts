

/**
 * Class responsible for placing one or more tokens onto the scene.
 */
declare class TokenPlacement {
  constructor(config: TokenPlacement.TokenPlacementConfiguration)

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Configuration information for the placements.
   */
  config: TokenPlacement.TokenPlacementConfiguration;

  /* -------------------------------------------- */

  /**
   * Index of the token configuration currently being placed in the scene.
   */
  #currentPlacement: number;

  /* -------------------------------------------- */

  /**
   * Track the bound event handlers so they can be properly canceled later.
   */
  #events: Record<string, Function>;

  /* -------------------------------------------- */

  /**
   * Track the timestamp when the last mouse move event was captured.
   */
  #moveTime: number;

  /* -------------------------------------------- */

  /**
   * Placements that have been generated.
   */
  #placements: TokenPlacement.PlacementData[];

  /* -------------------------------------------- */

  /**
   * Preview tokens. Should match 1-to-1 with placements.
   */
  #previews: Token.Implementation[];

  /* -------------------------------------------- */

  /**
   * Is the system currently being throttled to the next animation frame?
   */
  #throttle: boolean;

  /* -------------------------------------------- */
  /*  Placement                                   */
  /* -------------------------------------------- */

  /**
   * Perform the placement, asking player guidance when necessary.
   */
  static place(config: TokenPlacement.TokenPlacementConfiguration): Promise<TokenPlacement.PlacementData[]>

  /**
   * Perform the placement, asking player guidance when necessary.
   */
  place(): Promise<TokenPlacement.PlacementData[]>

  /* -------------------------------------------- */

  /**
   * Create token previews based on the prototype tokens in config.
   */
  #createPreviews()

  /* -------------------------------------------- */

  /**
   * Clear any previews from the scene.
   */
  #destroyPreviews()

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Activate listeners for the placement preview.
   * @returns {Promise<PlacementData|false>}  A promise that resolves with the final placement if created,
   *                                          or false if the placement was skipped.
   */
  #requestPlacement(): Promise<TokenPlacement.PlacementData | false>

  /* -------------------------------------------- */

  /**
   * Shared code for when token placement ends by being confirmed or canceled.
   */
  #finishPlacement(event: Event): Promise<void>

  /* -------------------------------------------- */

  /**
   * Move the token preview when the mouse moves.
   */
  #onMovePlacement(event: Event)

  /* -------------------------------------------- */

  /**
   * Rotate the token preview by 3˚ increments when the mouse wheel is rotated.
   */
  #onRotatePlacement(event: Event)

  /* -------------------------------------------- */

  /**
   * Confirm placement when the left mouse button is clicked.
   */
  #onConfirmPlacement(event: Event): Promise<void>

  /* -------------------------------------------- */

  /**
   * Skip placement when the right mouse button is clicked.
   */
  #onSkipPlacement(event: Event): Promise<void>

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Adjust the appended number on an unlinked token to account for multiple placements.
   * @param tokenDocument  Document or data object to adjust.
   * @param placement             Placement data associated with this token document.
   */
  static adjustAppendedNumber(
    tokenDocument: TokenDocument.Implementation | TokenDocument.Source, 
    placement: TokenPlacement.PlacementData
  )
}

declare namespace TokenPlacement {
  /**
   * Configuration information for a token placement operation.
   */
  interface TokenPlacementConfiguration {
    tokens: foundry.data.PrototypeToken[];
  }

  /**
   * Data for token placement on the scene.
   */
  interface PlacementData {
    prototypeToken: foundry.data.PrototypeToken;
    index: {
      total: number;
      unique: number;
    };
    x: number;
    y: number;
    rotation: number;
  }
}

export default TokenPlacement;