/**
 * Runtime API fragment for `dnd5e.dataModels.journal`.
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.journal {
    const ClassJournalPageData: typeof import("./class.mjs").default;
    type ClassJournalPageData = import("./class.mjs").default;

    const MapLocationJournalPageData: typeof import("./map.mjs").default;
    type MapLocationJournalPageData = import("./map.mjs").default;

    const RuleJournalPageData: typeof import("./rule.mjs").default;
    type RuleJournalPageData = import("./rule.mjs").default;

    const SpellListJournalPageData: typeof import("./spells.mjs").default;
    type SpellListJournalPageData = import("./spells.mjs").default;

    const SubclassJournalPageData: typeof import("./subclass.mjs").default;
    type SubclassJournalPageData = import("./subclass.mjs").default;

    // Config map (journal page type key → constructor).
    const config: {
      class: typeof import("./class.mjs").default;
      map: typeof import("./map.mjs").default;
      rule: typeof import("./rule.mjs").default;
      spells: typeof import("./spells.mjs").default;
      subclass: typeof import("./subclass.mjs").default;
    };
  }
}

export {};
