/** dnd5e v6 system migration routines for Worlds, Compendiums, and individual Documents. */

/** Perform a system migration for the entire World, applying migrations for Actors, Items, and Compendium packs. */
export declare function migrateWorld(options?: {
  bypassVersionCheck?: boolean;
}): Promise<void>;

/** Apply migration rules to all Documents within a single Compendium pack. */
export declare function migrateCompendium(
  pack: foundry.documents.collections.CompendiumCollection.Any,
  options?: {
    bypassVersionCheck?: boolean;
    incrementProgress?: () => void;
    strict?: boolean;
  }
): Promise<void>;

/** Re-parents compendia from one top-level folder to another. */
export declare function reparentCompendiums(
  from: string,
  to: string
): Promise<globalThis.Folder.Implementation | undefined> | undefined;

/** Update all compendium packs using the new system data model. */
export declare function refreshAllCompendiums(options?: {
  bypassVersionCheck?: boolean;
  migrate?: boolean;
  package?: string;
}): Promise<void>;

/** Update all Documents in a compendium using the new system data model. */
export declare function refreshCompendium(
  pack: foundry.documents.collections.CompendiumCollection.Any,
  options?: {
    bypassVersionCheck?: boolean;
    migrate?: boolean;
  }
): Promise<void>;

/** Apply 'smart' AC migration to a given Actor compendium. */
export declare function migrateArmorClass(
  pack: foundry.documents.collections.CompendiumCollection.Any | string
): Promise<void>;

/** Migrate system settings to new data types. */
export declare function migrateSettings(): Promise<void>;

/**
 * Migrate a single Actor document to incorporate latest data model changes.
 * Return an Object of updateData to be applied.
 */
export declare function migrateActorData(
  actor: globalThis.Actor.Implementation,
  actorData: object,
  migrationData?: object,
  flags?: object,
  options?: { actorUuid?: string }
): object;

/** Migrate a single Item document to incorporate latest data model changes. */
export declare function migrateItemData(
  item: globalThis.Item.Implementation,
  itemData: object,
  migrationData?: object,
  flags?: object
): object;

/** Migrate any active effects attached to the provided parent. */
export declare function migrateEffects(
  parent: object,
  migrationData?: object,
  itemUpdateData?: object,
  flags?: object
): object[];

/** Migrates transfer effects on items belonging to this actor to "real" effects on the actor. */
export declare function migrateCopyActorTransferEffects(
  actor: object,
  effects: object[],
  options?: { actorUuid?: string }
): void;

/** Migrate the provided active effect data. */
export declare function migrateEffectData(
  effect: object,
  migrationData?: object,
  options?: { parent?: object }
): object;

/** Migrate a single Macro document to incorporate latest data model changes. */
export declare function migrateMacroData(macro: object, migrationData?: object): object;

/** Migrate a single chat message document. */
export declare function migrateMessageData(messageData: object): object;

/** Migrate a single RollTable document to incorporate the latest data model changes. */
export declare function migrateRollTableData(table: object, migrationData?: object): object;

/**
 * Migrate a single Scene document to incorporate changes to the data model of its actor data overrides.
 * Return an Object of updateData to be applied.
 */
export declare function migrateSceneData(scene: object, migrationData?: object): object;

/**
 * Fetch bundled data for large-scale migrations.
 * @returns Object mapping original system icons to their core replacements.
 */
export declare function getMigrationData(): Promise<object>;

/** A general tool to purge flags from all documents in a Compendium pack. */
export declare function purgeFlags(
  pack: foundry.documents.collections.CompendiumCollection.Any
): Promise<void>;
