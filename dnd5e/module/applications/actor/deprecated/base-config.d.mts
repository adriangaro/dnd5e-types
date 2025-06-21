import ActiveEffect5e from "../../../documents/active-effect.mjs";

/**
 * An abstract class containing common functionality between actor sheet configuration apps.
 * @deprecated Use BaseConfigSheet from api/base-config-sheet.mjs instead
 * @abstract
 */
declare class BaseConfigSheet extends DocumentSheet {
  /** @privateRemarks All deprecated classes should accept anything for its constructor. */
  constructor(...args: any[]);

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The document this config sheet operates on.
   */
  get document(): foundry.abstract.Document.Any;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  activateListeners(html: JQuery): void;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Retrieve the list of fields that are currently modified by Active Effects on the Actor.
   * @returns List of overridden field paths.
   * @protected
   */
  protected _getActorOverrides(): string[];

  /* -------------------------------------------- */

  /**
   * Helper method to add choices that have been overridden.
   * @param prefix     The initial form prefix under which the choices are grouped.
   * @param path       Path in actor data.
   * @param overrides  The list of fields that are currently modified by Active Effects. **Will be mutated.**
   * @internal
   */
  _addOverriddenChoices(prefix: string, path: string, overrides: string[]): void;
}

export default BaseConfigSheet;
