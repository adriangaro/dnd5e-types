/**
 * Perform a system migration for the entire World, applying migrations for Actors, Items, and Compendium packs.
 * @param options
 * @param options.bypassVersionCheck  Bypass certain migration restrictions gated behind system
 *                                                      version stored in item stats.
 * @returns A Promise which resolves once the migration is completed
 */
export function migrateWorld(options?: { bypassVersionCheck?: boolean }): Promise<void>;

/* -------------------------------------------- */

/**
 * Determine whether a compendium pack should be migrated during `migrateWorld`.
 * @param pack
 * @returns
 */
declare function _shouldMigrateCompendium(pack: Compendium<any>): boolean;

/* -------------------------------------------- */

/**
 * Apply migration rules to all Documents within a single Compendium pack
 * @param pack       Pack to be migrated.
 * @param options
 * @param options.bypassVersionCheck  Bypass certain migration restrictions gated behind system
 *                                                      version stored in item stats.
 * @param options.strict  Migrate errors should stop the whole process.
 * @returns
 */
export function migrateCompendium(pack: CompendiumCollection<any>, options?: { 
  bypassVersionCheck?: boolean, 
  strict?: boolean 
  incrementProgress?: () => void;
}): Promise<void>;

/* -------------------------------------------- */

/**
 * Re-parents compendia from one top-level folder to another.
 * @param from  The name of the source folder.
 * @param to    The name of the destination folder.
 * @returns
 */
export function reparentCompendiums(from: string, to: string): Promise<Folder[]> | undefined;

/* -------------------------------------------- */

/**
 * Update all compendium packs using the new system data model.
 * @param options
 * @param options.bypassVersionCheck  Bypass certain migration restrictions gated behind system
 *                                                      version stored in item stats.
 * @param options.migrate  Also perform a system migration before refreshing.
 */
export function refreshAllCompendiums(options?: { bypassVersionCheck?: boolean, migrate?: boolean }): Promise<void>;

/* -------------------------------------------- */

/**
 * Update all Documents in a compendium using the new system data model.
 * @param pack  Pack to refresh.
 * @param options
 * @param options.bypassVersionCheck  Bypass certain migration restrictions gated behind system
 *                                                      version stored in item stats.
 * @param options.migrate  Also perform a system migration before refreshing.
 */
export function refreshCompendium(pack: CompendiumCollection<any>, options?: { bypassVersionCheck?: boolean, migrate?: boolean }): Promise<void>;

/* -------------------------------------------- */

/**
 * Apply 'smart' AC migration to a given Actor compendium. This will perform the normal AC migration but additionally
 * check to see if the actor has armor already equipped, and opt to use that instead.
 * @param pack  Pack or name of pack to migrate.
 * @returns
 */
export function migrateArmorClass(pack: CompendiumCollection<any> | string): Promise<void>;

/* -------------------------------------------- */

/**
 * Migrate system settings to new data types.
 */
export function migrateSettings(): Promise<void>;

/* -------------------------------------------- */
/*  Document Type Migration Helpers             */
/* -------------------------------------------- */

/**
 * Migrate a single Actor document to incorporate latest data model changes
 * Return an Object of updateData to be applied
 * @param actor               Full actor instance.
 * @param actorData            The actor data object to update.
 * @param migrationData      Additional data to perform the migration.
 * @param flags           Track the needs migration flag.
 * @param options
 * @param options.actorUuid  The UUID of the actor.
 * @returns The updateData to apply.
 */
export function migrateActorData(actor: Actor.Implementation, actorData: object, migrationData?: object, flags?: object, options?: { actorUuid?: string }): object;

/* -------------------------------------------- */

/**
 * Migrate a single Item document to incorporate latest data model changes
 *
 * @param item             Full item instance.
 * @param itemData         Item data to migrate.
 * @param migrationData  Additional data to perform the migration.
 * @param flags       Track the needs migration flag.
 * @returns The updateData to apply.
 */
export function migrateItemData(item: Item.Implementation, itemData: object, migrationData?: object, flags?: object): object;

/* -------------------------------------------- */

/**
 * Migrate any active effects attached to the provided parent.
 * @param parent            Data of the parent being migrated.
 * @param migrationData   Additional data to perform the migration.
 * @param itemUpdateData  Update data for the item to apply changes back to item.
 * @returns Updates to apply on the embedded effects.
 */
export function migrateEffects(parent: object, migrationData?: object, itemUpdateData?: object, flags?: object): object[];

/* -------------------------------------------- */

/**
 * Migrates transfer effects on items belonging to this actor to "real" effects on the actor.
 * @param actor                 The parent actor.
 * @param effects             An array of new effects to add.
 * @param options             Additional options.
 * @param options.actorUuid   UUID of the parent actor
 */
export const migrateCopyActorTransferEffects: (actor: object, effects: object[], options?: { actorUuid?: string }) => void;

/* -------------------------------------------- */

/**
 * Migrate the provided active effect data.
 * @param effect            Effect data to migrate.
 * @param migrationData   Additional data to perform the migration.
 * @param options         Additional options.
 * @param options.parent  Parent of this effect.
 * @returns The updateData to apply.
 */
export const migrateEffectData: (effect: object, migrationData?: object, options?: { parent?: object }) => object;

/* -------------------------------------------- */

/**
 * Migrate a single Macro document to incorporate latest data model changes.
 * @param macro            Macro data to migrate
 * @param migrationData  Additional data to perform the migration
 * @returns The updateData to apply
 */
export const migrateMacroData: (macro: object, migrationData?: object) => object;

/* -------------------------------------------- */

/**
 * Migrate a single RollTable document to incorporate the latest data model changes.
 * @param table            Roll table data to migrate.
 * @param migrationData  Additional data to perform the migration.
 * @returns The update delta to apply.
 */
export function migrateRollTableData(table: object, migrationData?: object): object;

/* -------------------------------------------- */

/**
 * Migrate a single Scene document to incorporate changes to the data model of its actor data overrides
 * Return an Object of updateData to be applied
 * @param scene            The Scene data to Update
 * @param migrationData  Additional data to perform the migration
 * @returns The updateData to apply
 */
export const migrateSceneData: (scene: object, migrationData?: object) => object;

/* -------------------------------------------- */

/**
 * Fetch bundled data for large-scale migrations.
 * @returns Object mapping original system icons to their core replacements.
 */
export const getMigrationData: () => Promise<object>;

/* -------------------------------------------- */
/*  Low level migration utilities
/* -------------------------------------------- */

/**
 * Identify effects that might have been duplicated when legacyTransferral was disabled.
 * @param parent   Data of the actor being migrated.
 * @returns IDs of effects to delete from the actor.
 * @private
 */
declare function _duplicatedEffects(parent: object): Set<string>;

/* -------------------------------------------- */

/**
 * Migrate the actor attributes.ac.value to the new ac.flat override field.
 * @param actorData   Actor data being migrated.
 * @param updateData  Existing updates being applied to actor. *Will be mutated.*
 * @returns Modified version of update data.
 * @private
 */
declare function _migrateActorAC(actorData: object, updateData: object): object;

/* -------------------------------------------- */

/**
 * Migrate the actor movement & senses to replace `0` with `null`.
 * @param actorData   Actor data being migrated.
 * @param updateData  Existing updates being applied to actor. *Will be mutated.*
 * @returns Modified version of update data.
 * @private
 */
declare function _migrateActorMovementSenses(actorData: object, updateData: object): object;

/* -------------------------------------------- */

/**
 * Migrate any system token images from PNG to WEBP.
 * @param actorData    Actor or token data to migrate.
 * @param updateData   Existing update to expand upon.
 * @returns The updateData to apply
 * @private
 */
declare function _migrateTokenImage(actorData: object, updateData: object): object;

/* -------------------------------------------- */

/**
 * Convert system icons to use bundled core webp icons.
 * @param document                                 Document data to migrate
 * @param updateData                               Existing update to expand upon
 * @param migrationData                       Additional data to perform the migration
 * @param migrationData.iconMap  A mapping of system icons to core foundry icons
 * @param migrationData.field                    The document field to migrate
 * @returns The updateData to apply
 * @private
 */
declare function _migrateDocumentIcon(document: object, updateData: object, migrationData?: { iconMap?: { [key: string]: string }, field?: string }): object;

/* -------------------------------------------- */

/**
 * Change active effects that target AC.
 * @param effect      Effect data to migrate.
 * @param updateData  Existing update to expand upon.
 * @returns The updateData to apply.
 */
declare function _migrateEffectArmorClass(effect: object, updateData: object): object;

/* -------------------------------------------- */

/**
 * Move `uses.value` to `uses.spent` for items.
 * @param item        Full item instance.
 * @param itemData    Item data to migrate.
 * @param updateData  Existing update to expand upon.
 * @param flags       Track the needs migration flag.
 */
declare function _migrateItemUses(item: Item.Implementation, itemData: object, updateData: object, flags: object): void;

/* -------------------------------------------- */

/**
 * Disable transfer on effects on spell items
 * @param effect      Effect data to migrate.
 * @param parent      The parent of this effect.
 * @param updateData  Existing update to expand upon.
 * @returns The updateData to apply.
 */
declare function _migrateTransferEffect(effect: object, parent: object, updateData: object): object;

/* -------------------------------------------- */

/**
 * Migrate macros from the old 'dnd5e.rollItemMacro' and 'dnd5e.macros' commands to the new location.
 * @param macro       Macro data to migrate.
 * @param updateData  Existing update to expand upon.
 * @returns The updateData to apply.
 */
declare function _migrateMacroCommands(macro: object, updateData: object): object;

/* -------------------------------------------- */

/**
 * A general tool to purge flags from all documents in a Compendium pack.
 * @param pack   The compendium pack to clean.
 * @private
 */
export function purgeFlags(pack: CompendiumCollection<any>): Promise<void>;

/* -------------------------------------------- */

/**
 * Returns whether given item data represents either a spell item or a spell scroll consumable
 * @param item  The item data.
 * @returns
 */
declare function isSpellOrScroll(item: object): boolean;
