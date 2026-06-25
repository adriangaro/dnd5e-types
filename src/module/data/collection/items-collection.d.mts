/**
 * Custom items collection to hide items in containers automatically.
 *
 * Custom world `Items` collection that hides items living inside containers from the directory tree
 * and recreates container contents when importing from a compendium. dnd5e installs it via
 * `CONFIG.Item.collection = Items5e` at init. Both runtime members (`_getVisibleTreeContents`,
 * `importFromCompendium`) only override base behaviour with identical signatures, so they add no new
 * public surface — `game.items` already types from the base `Items` collection.
 */

/** Custom items collection to hide items in containers automatically. */
declare class Items5e extends foundry.documents.collections.Items {}

export default Items5e;
