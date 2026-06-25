/**
 * `ActorDeltasField`: A field for storing deltas made to an actor or embedded items.
 * `IndividualDeltaField`: A field that stores a delta for an individual property on an actor or item.
 *
 * `SchemaField` subclasses that record numeric deltas applied to an actor and its embedded items by a
 * chat message (rest / item-usage / calendar time-passage). `IndividualDeltaField` is one
 * `{ delta, keyPath }` change; `ActorDeltasField` groups them into `{ actor, created, deleted, item }`.
 * Modeled both as a value class (so `new ActorDeltasField()` types) and via the `BaseSchema` interface
 * (so consuming chat-message schemas resolve the initialized data). The data typedefs live under
 * `dnd5e.types.fields.ActorDeltasField`.
 */

declare class IndividualDeltaField extends foundry.data.fields.SchemaField<{
  delta: foundry.data.fields.NumberField;
  keyPath: foundry.data.fields.StringField;
}> {
  /** Calculate delta information for a document from the given updates. */
  static getDeltas(
    dataModel: foundry.abstract.DataModel.Any,
    updates: object,
  ): dnd5e.types.fields.ActorDeltasField.IndividualDeltaData[];

  /**
   * Prepare a delta for display in a chat message.
   * @param doc - Actor or item to which this delta applies.
   * @param rolls - Rolls that may be associated with a delta. Should be pre-filtered to only the rolls that apply to this delta.
   */
  static processDelta(
    this: dnd5e.types.fields.ActorDeltasField.IndividualDeltaData,
    doc: globalThis.Actor.Implementation | globalThis.Item.Implementation,
    rolls?: foundry.dice.Roll[],
  ): dnd5e.types.fields.ActorDeltasField.DeltaDisplayContext;
}

declare class ActorDeltasField<
  const Options extends foundry.data.fields.SchemaField.Options<
    dnd5e.types.fields.ActorDeltasField.BaseSchema
  > = foundry.data.fields.SchemaField.DefaultOptions,
> extends foundry.data.fields.SchemaField<dnd5e.types.fields.ActorDeltasField.BaseSchema, Options> {
  /** Calculate delta information for an actor document from the given updates. */
  static getDeltas(
    actor: globalThis.Actor.Implementation,
    updates: dnd5e.types.data.chatMessage.fields.ActorUpdatesDescription,
  ): Partial<dnd5e.types.fields.ActorDeltasField.ActorDeltasData>;

  /** Prepare deltas for display in a chat message. */
  static processDeltas(
    this: dnd5e.types.fields.ActorDeltasField.ActorDeltasData,
    actor: globalThis.Actor.Implementation,
    rolls?: foundry.dice.Roll[],
  ): dnd5e.types.fields.ActorDeltasField.DeltaDisplayContext[];
}

declare global {
  namespace dnd5e.types.fields {
    namespace ActorDeltasField {
      /** The fields injected by `ActorDeltasField`'s constructor. */
      interface BaseSchema extends foundry.data.fields.DataSchema {
        actor: foundry.data.fields.ArrayField<IndividualDeltaField>;
        created: foundry.data.fields.ArrayField<foundry.data.fields.StringField, { required: false }>;
        deleted: foundry.data.fields.ArrayField<foundry.data.fields.ObjectField, { required: false }>;
        item: dnd5e.types.fields.MappingField<foundry.data.fields.ArrayField<IndividualDeltaField>>;
      }

      /** A single `{ delta, keyPath }` change. */
      interface IndividualDeltaData {
        delta: number;
        keyPath: string;
      }

      /** Grouped actor + item deltas. */
      interface ActorDeltasData {
        actor: IndividualDeltaData[];
        created?: string[];
        deleted?: object[];
        item: Record<string, IndividualDeltaData[]>;
      }

      /** A prepared delta ready for chat display. */
      interface DeltaDisplayContext {
        delta?: string;
        document?: globalThis.Actor.Implementation | globalThis.Item.Implementation;
        label: string;
        operation: "create" | "delete" | "update";
        rolls?: Array<{ roll: foundry.dice.Roll; anchor: string }>;
        type: string;
      }
    }
  }
}

export { ActorDeltasField, IndividualDeltaField };
