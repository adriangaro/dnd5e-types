/**
 * Flag seam — types the `flags.dnd5e.*` namespace on each document with the system's DEFAULT flags
 * AND keeps it expandable, the flag analogue of the config/data-model seams.
 *
 * - `dnd5e.types.FlagConfig.<Doc>` — a mergeable interface per document holding the default dnd5e
 *   system flags. Downstream packages add their own dnd5e-scoped flags by declaration-merging the
 *   matching interface (e.g. `declare global { namespace dnd5e.types.FlagConfig { interface Item {
 *   myFlag?: boolean } } }`), exactly like the keyed-config seam.
 * - The funnel below is the ONLY place that writes `fvtt-types/configuration`'s `FlagConfig`, binding
 *   each document's `dnd5e` scope to its interface so `item.getFlag("dnd5e", "scaling")` etc. type.
 *   Other modules' own flag scopes are added through their own `FlagConfig` augmentation (orthogonal).
 *
 * All entries are optional — flags are never guaranteed present. Shapes whose data models aren't
 * ported yet are loose (`object`) and tightened later.
 */

import type {} from "fvtt-types/configuration";
import type UserSystemFlags from "../module/data/user/user-system-flags.mjs";

declare global {
  namespace dnd5e.types.FlagConfig {
    /** Default `flags.dnd5e` on Items. */
    interface Item {
      /** Scaling increase applied to this item (consumed by activities). */
      scaling?: number;
      /** Spell level a spell-scroll/consumable was created at. */
      spellLevel?: number;
      /** Source-data migration was persisted on the next update. */
      persistSourceMigration?: boolean;
      /** Properties migrated from the legacy boolean map. */
      migratedProperties?: string[];
      /** UUID of the advancement that granted this item (advancement origin). */
      advancementOrigin?: string;
      /** "itemId.advancementId" reference to the root advancement that owns this item. */
      advancementRoot?: string;
      /** Relative UUID of the cast activity this spell is cached for. */
      cachedFor?: string;
      /**
       * Gear configuration controlling how a physical item is returned as NPC gear.
       * Keys: preserve, preserveName, preserveEffect, effectId.
       */
      gear?: {
        preserve?: boolean;
        preserveName?: string | boolean;
        preserveEffect?: boolean;
        effectId?: string;
      };
      /** UUID of the item's gear source when prepared as NPC gear. */
      gearSource?: string;
      /** Rider activity/effect id lists managed by enchant activities. */
      riders?: { activity?: string[]; effect?: string[] };
    }

    /** Default `flags.dnd5e` on Actors. */
    interface Actor {
      /** Is this actor currently polymorphed/transformed? */
      isPolymorphed?: boolean;
      /** ID of the original actor before a transform. */
      originalActor?: string;
      /** Snapshot of the actor data prior to a transform. */
      previousActorData?: object;
      /** Snapshot of the token data prior to a transform. */
      previousTokenData?: object;
      /** Options used for the active transform. */
      transformOptions?: object;
      /** Current exhaustion level (legacy/source flag). */
      exhaustionLevel?: number;
      /** Marker set when an actor was auto-imported. */
      isAutoImported?: boolean;
      /** Source-data migration was persisted on the next update. */
      persistSourceMigration?: boolean;
      /** Stack of actor IDs accumulated through successive polymorph transforms. */
      previousActorIds?: string[];
      /** Actor was created as a summon copy. */
      summonedCopy?: boolean;
      /** Diamond Soul feat: add proficiency to failed saving throw. */
      diamondSoul?: boolean;
      /** Halfling Lucky trait: reroll 1s on d20 tests. */
      halflingLucky?: boolean;
      /** Reliable Talent: treat any d20 roll below 10 as a 10. */
      reliableTalent?: boolean;
      /** Remarkable Athlete: add half proficiency to certain Str/Dex/Con checks. */
      remarkableAthlete?: boolean;
      /** Tavern Brawler feat: proficiency with improvised weapons. */
      tavernBrawlerFeat?: boolean;
      /** Elven Accuracy: re-roll one die on advantage attacks. */
      elvenAccuracy?: boolean;
      /** Enhanced Dual Wielding: light-weapon requirement relaxed for off-hand. */
      enhancedDualWielding?: boolean;
      /** Extra dice added to melee critical damage rolls. */
      meleeCriticalDamageDice?: number;
      /** Show token portrait instead of actor image on sheets. */
      showTokenPortrait?: boolean;
      /** Rest settings for party-group actors. */
      restSettings?: object;
      /** Show abilities table on vehicle sheets. */
      showVehicleAbilities?: boolean;
      /** Show initiative section on vehicle sheets. */
      showVehicleInitiative?: boolean;
      /** Show quality section on vehicle sheets. */
      showVehicleQuality?: boolean;
      /** Initiative advantage granted by an active effect change. */
      initiativeAdv?: boolean;
      /** Alert feat: +5 initiative bonus. */
      initiativeAlert?: boolean;
      /**
       * Summon tracking data written by the summon activity.
       * level/mod/origin/activity/profile are set when this actor is summoned.
       */
      summon?: {
        origin?: string;
        level?: number;
        mod?: number;
        activity?: string;
        profile?: string;
      };
    }

    /** Default `flags.dnd5e` on ActiveEffects. */
    interface ActiveEffect {
      /** Effect type discriminator (e.g. `"enchantment"`). */
      type?: string;
      /** Enchantment configuration — at minimum carries an `origin` UUID. */
      enchantment?: { origin?: string } & Record<string, unknown>;
      /** Rider effects/items applied alongside this effect. */
      riders?: { statuses?: string[] };
      /** Spell level the originating spell was cast at. */
      spellLevel?: number;
      /** Source-data migration was persisted on the next update. */
      persistSourceMigration?: boolean;
      /** UUIDs of dependent effects/items created by this enchantment. */
      dependents?: { uuid: string }[];
      /** Marks the effect as temporary even when its duration would not normally do so. */
      isTemporary?: boolean;
    }

    /** Default `flags.dnd5e` on ChatMessages. */
    interface ChatMessage {
      /** Discriminator for dnd5e-specific message rendering. */
      messageType?: string;
      /** Serialized activity usage payload. */
      use?: object;
      /** Serialized roll metadata. */
      roll?: {
        /** Roll type discriminator. */
        type?: "attack" | "damage" | "death" | "save" | "healing" | "hitDie" | "hitPoints";
        /** Attack mode used for this roll (e.g. `"oneHanded"`, `"thrown"`). */
        attackMode?: string;
        /** Item id of the ammunition used in the attack. */
        ammunition?: string;
        /** Damage-on-save setting copied from the save activity. */
        damageOnSave?: string;
        /** Set when the concentration check broke concentration. */
        concentrationBroken?: boolean;
        /** Set when the NPC resistance forced a success on a save roll. */
        forceSuccess?: boolean;
      };
      /** Originating item id. */
      item?: string;
      /** Embedded item data for messages without a persisted item. */
      itemData?: object;
      /** Source-data migration was persisted on the next update. */
      persistSourceMigration?: boolean;
      /** Attack-roll target descriptors (name, ac, uuid) stored on attack messages. */
      targets?: { name: string; uuid: string; ac: number | null }[];
      /** ID of the originating chat message that triggered this roll message. */
      originatingMessage?: string;
      /** Order activity data stored on the message (costs, craft, trade). */
      order?: object;
      /** Transform activity data — profile id and resolved actor UUID. */
      transform?: { profile?: string; uuid?: string };
    }

    /**
     * Default `flags.dnd5e` on Users. After `prepareData`, the system replaces `flags.dnd5e` with a
     * {@link UserSystemFlags} instance, so the model's `awardDestinations`/`creation`/`sheetPrefs`
     * are surfaced here alongside the GM-request scratch flag.
     */
    interface User extends UserSystemFlags {
      /** Stored result of a GM-relayed request (e.g. skill check). */
      requestResult?: object;
    }

    /**
     * Default `flags.dnd5e` on JournalEntries.
     * Drives navigation links between entries and Table-of-Contents placement.
     */
    interface JournalEntry {
      /** Navigation links to sibling journal entries (previous / up / next). */
      navigation?: { previous?: string; up?: string; next?: string };
      /** Table-of-contents entry type (e.g. `"chapter"`, `"appendix"`, `"special"`). */
      type?: string;
      /** Numeric sort position within the table of contents. */
      position?: number;
      /** Chapter/appendix to append this entry after in the TOC. */
      append?: number;
      /** Secondary sort order for "special" TOC entries. */
      order?: number;
      /** Override display title in the table of contents. */
      title?: string;
      /** Whether to list child pages in the table of contents. */
      showPages?: boolean;
    }

    /**
     * Default `flags.dnd5e` on JournalEntryPages.
     * Drives map-marker styling and TOC page-hiding.
     */
    interface JournalEntryPage {
      /** Map location marker style key (for map-type pages). */
      mapMarkerStyle?: string;
      /** Hide this page from the table of contents. */
      tocHidden?: boolean;
    }
  }
}

declare module "fvtt-types/configuration" {
  interface FlagConfig {
    Item: { dnd5e: dnd5e.types.FlagConfig.Item };
    Actor: { dnd5e: dnd5e.types.FlagConfig.Actor };
    ActiveEffect: { dnd5e: dnd5e.types.FlagConfig.ActiveEffect };
    ChatMessage: { dnd5e: dnd5e.types.FlagConfig.ChatMessage };
    User: { dnd5e: dnd5e.types.FlagConfig.User };
    JournalEntry: { dnd5e: dnd5e.types.FlagConfig.JournalEntry };
    JournalEntryPage: { dnd5e: dnd5e.types.FlagConfig.JournalEntryPage };
  }
}

export {};
