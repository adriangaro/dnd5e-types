/**
 * Custom actors collection.
 *
 * Custom world `Actors` collection adding the `party` accessor (resolves the `primaryParty` setting's
 * group actor). dnd5e installs it via `CONFIG.Actor.collection = Actors5e` at init.
 *
 * WIRING: fvtt-types resolves `game.actors` from `CONFIG.Actor.collection`, whose type is an inline
 * (non-mergeable) property. Rather than repoint it, we declaration-merge `party` onto the base
 * `foundry.documents.collections.Actors` interface so `game.actors.party` types regardless.
 */

declare global {
  namespace foundry.documents.collections {
    interface Actors {
      /** The primary party (the group actor referenced by the `primaryParty` setting), or null. */
      get party(): globalThis.Actor.Implementation | null;
    }
  }
}

declare class Actors5e extends foundry.documents.collections.Actors {}

export default Actors5e;
