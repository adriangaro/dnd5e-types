/**
 * Shared `DetailsField` bundle for dnd5e actor details schemas.
 *
 * Each runtime `static get common()/creature()` returns an object of DataField instances that the
 * models spread into their `SchemaField`s; the getter's TYPE is a named schema interface under
 * `dnd5e.types.Actor.Details`, composed via `dnd5e.types.MergeSchemas`.
 */

declare global {
  namespace dnd5e.types.Actor.Details {
    /** details.mjs — `static get common()`. */
    interface CommonSchema extends foundry.data.fields.DataSchema {
      biography: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.HTMLField;
        public: foundry.data.fields.HTMLField;
      }>;
    }

    /** details.mjs — `static get creature()`. */
    interface CreatureSchema extends foundry.data.fields.DataSchema {
      alignment: foundry.data.fields.StringField<{ required: true }>;
      ideal: foundry.data.fields.StringField<{ required: true }>;
      // runtime: `persisted: false` (computed in prepareBaseData, always a number after prep).
      level: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
      bond: foundry.data.fields.StringField<{ required: true }>;
      flaw: foundry.data.fields.StringField<{ required: true }>;
      race: dnd5e.types.fields.LocalDocumentField<globalThis.Item.Implementation>;
    }
  }
}

/** details.mjs — bundle getters. */
declare class DetailsField {
  static get common(): dnd5e.types.Actor.Details.CommonSchema;
  static get creature(): dnd5e.types.Actor.Details.CreatureSchema;
}

export default DetailsField;
