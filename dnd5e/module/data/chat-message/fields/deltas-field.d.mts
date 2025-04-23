import MappingField from "../../fields/mapping-field.mjs";


/**
 * A field for storing deltas made to an actor or embedded items.
 */
export declare class ActorDeltasField extends foundry.data.fields.SchemaField<ActorDeltasField.Schema> {
  constructor()

  /* -------------------------------------------- */

  /**
   * Calculate delta information for an actor document from the given updates.

   */
  static getDeltas(actor: Actor.Implementation, updates: { actor: object, item: object[] }): ActorDeltasField.Data

  /* -------------------------------------------- */

  /**
   * Prepare deltas for display in a chat message.
   */
  static processDeltas(actor: Actor.Implementation, rolls?: foundry.dice.Roll[]): ActorDeltasField.DeltaDisplayContext
}

/**
 * @typedef IndividualDeltaData
 * @property {number} delta    The change in the specified field.
 * @property {string} keyPath  Path to the changed field on the document.
 */

export declare namespace ActorDeltasField {
  type Schema = {
    actor: foundry.data.fields.ArrayField<IndividualDeltaField>,
    item: MappingField<foundry.data.fields.ArrayField<IndividualDeltaField>>
  }

  type Data = foundry.data.fields.SchemaField.InitializedData<Schema>

  interface DeltaDisplayContext {
    type: string;
    delta: string;
    document: Actor.Implementation | Item.Implementation;
    label: string;
    rolls?: Roll[];
  }
  
  
}

/**
 * A field that stores a delta for an individual property on an actor or item.
 */
export class IndividualDeltaField extends foundry.data.fields.SchemaField<IndividualDeltaField.Schema> {
  constructor()

  /* -------------------------------------------- */

  /**
   * Calculate delta information for a document from the given updates.
   * @param {DataModel} dataModel      Document for which to calculate the deltas.
   * @param {object} updates           Updates that are to be applied.
   * @returns {IndividualDeltaData[]}
   */
  static getDeltas(dataModel: foundry.abstract.DataModel.Any, updates: object): IndividualDeltaField.Data[]

  /* -------------------------------------------- */

  /**
   * Prepare a delta for display in a chat message.
   */
  static processDelta(
    this: IndividualDeltaField.Data, 
    doc: Actor.Implementation | Item.Implementation, 
    rolls?: foundry.dice.Roll[]
  ): ActorDeltasField.DeltaDisplayContext
}

export declare namespace IndividualDeltaField {
  type Schema = { 
    delta: foundry.data.fields.NumberField, 
    keyPath: foundry.data.fields.StringField
  }
  type Data = foundry.data.fields.SchemaField.InitializedData<Schema>
}