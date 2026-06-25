/**
 * THE single bridge from our dnd5e document classes into fvtt-types' document configuration —
 * the document-class analogue of {@link file://./data-model-config.d.mts} (Seam C for data models).
 *
 * Registering here makes fvtt-types resolve `Actor.Implementation` / `Item.Implementation` /
 * `ActiveEffect.Implementation` (and `game.actors.get(...)`, embedded collections, etc.) to OUR
 * subclasses, so the dnd5e document-level methods/getters surface everywhere the engine hands you a
 * document. `DocumentClassConfig` sets the constructor; the `Configured<Doc>` interfaces set the
 * per-subtype instance so subtype-narrowed `system` keeps working for the subtype-bearing documents.
 *
 * This is the ONLY place that writes `fvtt-types/configuration` for documents — downstream conflicts
 * stay localized, exactly like the data-model funnel.
 */

import type {} from "fvtt-types/configuration";
import type Item5e from "../documents/item.mjs";
import type Actor5e from "../documents/actor.mjs";
import type ActiveEffect5e from "../documents/active-effect.mjs";
import type JournalEntryPage5e from "../documents/journal-entry-page.mjs";
import type ChatMessage5e from "../documents/chat-message.mjs";
import type Combat5e from "../documents/combat.mjs";
import type Combatant5e from "../documents/combatant.mjs";
import type CombatantGroup5e from "../documents/combatant-group.mjs";
import type TokenDocument5e from "../documents/token.mjs";
import type User5e from "../documents/user.mjs";
import type Adventure5e from "../documents/adventure.mjs";

declare module "fvtt-types/configuration" {
  interface DocumentClassConfig {
    // Subtype-bearing documents (system data models registered via the data-model funnel).
    Item: typeof Item5e<Item.SubType>;
    Actor: typeof Actor5e<Actor.SubType>;
    ActiveEffect: typeof ActiveEffect5e<ActiveEffect.SubType>;
    JournalEntryPage: typeof JournalEntryPage5e<JournalEntryPage.SubType>;
    ChatMessage: typeof ChatMessage5e<ChatMessage.SubType>;
    // Plain documents (no dnd5e system subtypes — flags/behaviour only).
    Combat: typeof Combat5e;
    Combatant: typeof Combatant5e;
    CombatantGroup: typeof CombatantGroup5e;
    TokenDocument: typeof TokenDocument5e;
    User: typeof User5e;
    Adventure: typeof Adventure5e;
  }

  interface ConfiguredItem<SubType extends Item.SubType> {
    document: SubType extends unknown ? Item5e<SubType> : never;
  }

  interface ConfiguredActor<SubType extends Actor.SubType> {
    document: SubType extends unknown ? Actor5e<SubType> : never;
  }

  interface ConfiguredActiveEffect<SubType extends ActiveEffect.SubType> {
    document: SubType extends unknown ? ActiveEffect5e<SubType> : never;
  }

  interface ConfiguredJournalEntryPage<SubType extends JournalEntryPage.SubType> {
    document: SubType extends unknown ? JournalEntryPage5e<SubType> : never;
  }

  interface ConfiguredChatMessage<SubType extends ChatMessage.SubType> {
    document: SubType extends unknown ? ChatMessage5e<SubType> : never;
  }
}

export {};
