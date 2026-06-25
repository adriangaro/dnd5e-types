/**
 * Hotbar macro helpers. The internal `getMacroTarget` helper is not exported, so it is
 * intentionally omitted here.
 */

/**
 * Attempt to create a macro from the dropped data. Will use an existing macro if one exists.
 * @param dropData  The dropped data.
 * @param slot      The hotbar slot to use.
 */
export function create5eMacro(dropData: object, slot: number): Promise<void | null>;

/**
 * Trigger an item to be used when a macro is clicked.
 * @param itemName               Name of the item on the selected actor to trigger.
 * @param options
 * @param options.activityName   Name of a specific activity on the item to trigger.
 * @param options.event          The triggering event.
 * @returns                      Usage result.
 */
export function rollItem(
  itemName: string,
  options?: { activityName?: string; event?: Event },
): Promise<ChatMessage.Implementation | object> | undefined;

/**
 * Toggle an effect on and off when a macro is clicked.
 * @param effectName  Name of the effect to be toggled.
 * @returns           The effect after it has been toggled.
 */
export function toggleEffect(effectName: string): Promise<ActiveEffect.Implementation | undefined> | undefined;
