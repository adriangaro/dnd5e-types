/**
 * Attempt to create a macro from the dropped data. Will use an existing macro if one exists.
 * @param dropData     The dropped data
 * @param slot         The hotbar slot to use
 * @returns
 */
export function create5eMacro(
  dropData: |
    foundry.abstract.Document.DropData<Item.Implementation> |
    foundry.abstract.Document.DropData<ActiveEffect.Implementation> |
  {
    type: 'Activity',
    uuid: string
  },
  slot: number
): Promise<void>

/* -------------------------------------------- */

/**
 * Find a document of the specified name and type on an assigned or selected actor.
 * @param name          Document name to locate.
 * @param documentType  Type of embedded document (e.g. "Item" or "ActiveEffect").
 * @returns            Document if found, otherwise nothing.
 */
declare function getMacroTarget<T extends foundry.abstract.Document.Type>(name: string, documentType: T): foundry.abstract.Document.ImplementationFor<T>

/* -------------------------------------------- */

/**
 * Trigger an item to be used when a macro is clicked.
 * @param itemName                Name of the item on the selected actor to trigger.
 * @param options
 * @param options.activityName  Name of a specific activity on the item to trigger.
 * @param options.event          The triggering event.
 * @returns  Usage result.
 */
export function rollItem(
  itemName: string, 
  options?: { 
    activityName?: string, 
    event?: Event 
  }
): Promise<ChatMessage.Implementation | object>

/* -------------------------------------------- */

/**
 * Toggle an effect on and off when a macro is clicked.
 * @param effectName        Name of the effect to be toggled.
 * @returns The effect after it has been toggled.
 */
export function toggleEffect(effectName: string): Promise<ActiveEffect.Implementation>
