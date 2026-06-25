/**
 * Runtime API fragment for `dnd5e.dataModels.journal`.
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.journal {
    const ClassJournalPageData: typeof import("../journal/class.mjs").default;
    type ClassJournalPageData = import("../journal/class.mjs").default;

    const MapLocationJournalPageData: typeof import("../journal/map.mjs").default;
    type MapLocationJournalPageData = import("../journal/map.mjs").default;

    const RuleJournalPageData: typeof import("../journal/rule.mjs").default;
    type RuleJournalPageData = import("../journal/rule.mjs").default;

    const SpellListJournalPageData: typeof import("../journal/spells.mjs").default;
    type SpellListJournalPageData = import("../journal/spells.mjs").default;

    const SubclassJournalPageData: typeof import("../journal/subclass.mjs").default;
    type SubclassJournalPageData = import("../journal/subclass.mjs").default;

    // Config map (journal page type key → constructor).
    const config: {
      class: typeof import("../journal/class.mjs").default;
      map: typeof import("../journal/map.mjs").default;
      rule: typeof import("../journal/rule.mjs").default;
      spells: typeof import("../journal/spells.mjs").default;
      subclass: typeof import("../journal/subclass.mjs").default;
    };
  }
}

export {};
