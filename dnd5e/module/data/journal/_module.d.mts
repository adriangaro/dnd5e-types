import ClassJournalPageData from "./class.mjs";
import MapLocationJournalPageData from "./map.mjs";
import RuleJournalPageData from "./rule.mjs";
import SpellListJournalPageData from "./spells.mjs";
import SubclassJournalPageData from "./subclass.mjs";

export {
  ClassJournalPageData,
  MapLocationJournalPageData,
  RuleJournalPageData,
  SpellListJournalPageData,
  SubclassJournalPageData
};

export const config: {
  class: typeof ClassJournalPageData,
  map: typeof MapLocationJournalPageData,
  rule: typeof RuleJournalPageData,
  spells: typeof SpellListJournalPageData,
  subclass: typeof SubclassJournalPageData
};

declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface Journal {
        class: typeof ClassJournalPageData,
        map: typeof MapLocationJournalPageData,
        rule: typeof RuleJournalPageData,
        spells: typeof SpellListJournalPageData,
        subclass: typeof SubclassJournalPageData
      }
    }
  }
}

declare module "fvtt-types/configuration" {
  interface DataModelConfig {
    Journal: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.Journal>,
  }
}