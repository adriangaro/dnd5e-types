/**
 * An abstract class containing common functionality between actor sheet configuration apps.
 * @extends {DocumentSheet}
 * @abstract
 */
export default class BaseConfigSheet extends DocumentSheet<
  Actor.Implementation
> {


  /* -------------------------------------------- */

  /**
   * Retrieve the list of fields that are currently modified by Active Effects on the Actor.
   * @protected
   */
  _getActorOverrides(): string[]

  /* -------------------------------------------- */

  /**
   * Helper method to add choices that have been overridden.
   * @param prefix       The initial form prefix under which the choices are grouped.
   * @param path         Path in actor data.
   * @param overrides  The list of fields that are currently modified by Active Effects. *Will be mutated.*
   * @internal
   */
  _addOverriddenChoices(prefix: string, path: string, overrides: string[])
}
