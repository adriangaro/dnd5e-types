/**
 * Extend the base Adventure class to implement system-specific logic.
 *
 * Extends the base `Adventure` to implement system-specific logic (currently a `migrateData`
 * override that promotes legacy encounter groups to the dedicated `encounter` Actor type). It is
 * registered into fvtt-types' `DocumentClassConfig` by the document funnel, so
 * `Adventure.Implementation` everywhere resolves to this class.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface Adventure5e` — downstream packages
 * add document-level methods/getters by augmenting that interface (the document analogue of the
 * data-model Seam-D override interfaces).
 */

declare class Adventure5e extends foundry.documents.Adventure {
  // dnd5e overrides `migrateData` (promoting legacy encounter groups to the `encounter` Actor type)
  // but its signature is inherited unchanged from the base — no member additions at the type level.
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Adventure5e {}

export default Adventure5e;
