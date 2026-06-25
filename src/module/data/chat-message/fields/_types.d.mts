/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/chat-message/fields/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.chatMessage.fields {
      type ActivationsData = Set<string>;

      interface ActorDeltasData {
      actor: IndividualDeltaData[]; // Changes for the actor.
      created?: string[]; // IDs of newly created items.
      deleted?: object[]; // Saved data for deleted items (item.toObject() results, accessed via `.name`).
      item: Record<string, IndividualDeltaData[]>; // Changes for each item grouped by ID.
      }

      interface ActorUpdatesDescription {
      /** Updates applied to the actor. */
      actor: object;
      /** Full data for Items to create (with IDs maintained). */
      create?: object[];
      /** IDs of items to be deleted from the actor. */
      delete?: string[];
      /** Updates applied to items on the actor; each entry carries an `_id` plus keyed updates. */
      item: Array<Record<string, unknown> & { _id: string }>;
      }

      interface IndividualDeltaData {
      delta: number; // The change in the specified field.
      keyPath: string; // Path to the changed field on the document.
      }

      interface DeltaDisplayContext {
      delta?: string; // The formatted numeric change.
      document?: globalThis.Actor.Implementation|globalThis.Item.Implementation; // The document to which the delta applies.
      label: string; // The formatted label for the attribute.
      operation: "create"|"delete"|"update"; // Type of update performed on the document.
      /**
       * Any rolls associated with the delta. Although the JSDoc annotates this as `Roll[]`, the
       * producing code (`IndividualDeltaField.processDelta`) emits `{ roll, anchor }` pairs.
       */
      rolls?: Array<{ roll: foundry.dice.Roll; anchor: string }>;
      type: string; // Type of document to which the delta applies.
      }

  }
}

export {};
