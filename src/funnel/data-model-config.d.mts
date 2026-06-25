/**
 * THE single bridge from our mergeable `dnd5e.types.DataModelConfig.*` interfaces into
 * fvtt-types' `DataModelConfig` (Seam C). Per-subtype files merge our local interfaces;
 * this funnel is the only place that writes `fvtt-types/configuration` for data models,
 * so engine-level `actor.system` narrowing works and downstream conflicts are localized.
 */

import type {} from "fvtt-types/configuration";

declare module "fvtt-types/configuration" {
  interface DataModelConfig {
    Actor: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.Actor>;
    Item: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.Item>;
    ActiveEffect: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.ActiveEffect>;
    ChatMessage: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.ChatMessage>;
    JournalEntryPage: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.JournalEntryPage>;
    RegionBehavior: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.RegionBehavior>;
  }
}

// Ensure our mergeable namespaces exist even before any subtype registers.
declare global {
  namespace dnd5e.types.DataModelConfig {
    interface Actor {}
    interface Item {}
    interface ActiveEffect {}
    interface ChatMessage {}
    interface JournalEntryPage {}
    interface RegionBehavior {}
  }
}

export {};
