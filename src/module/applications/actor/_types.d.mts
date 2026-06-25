/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/applications/actor/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.applications.actor {
      type CrewArea5e = "crew"|"draft"|"passengers";

      /**
       * Callback used to determine if an actor should be included in a party request.
       * @param actor  An actor that might be able to receive the request.
       * @returns      Should the actor be shown in the dialog?
       */
      type PartyRequestCondition = (actor: globalThis.Actor.Implementation) => boolean;

      interface PartyRequestDialogOptions {
        request: {
          /** Callback used to determine if an actor should be included. */
          condition: PartyRequestCondition | null;
          /** Group actor to fetch the actor list from, otherwise uses the primary party if one is set or falls back to the assigned characters. */
          group: globalThis.Actor.Implementation | null;
        };
      }

  }
}

export {};
