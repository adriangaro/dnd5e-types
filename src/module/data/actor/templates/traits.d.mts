/**
 * Shared `TraitsField` bundle for dnd5e actor traits schemas.
 *
 * Each runtime `static get common()/creature()` returns an object of DataField instances that the
 * models spread into their `SchemaField`s; the getter's TYPE is a named schema interface under
 * `dnd5e.types.Actor.Traits`, composed via `dnd5e.types.MergeSchemas`.
 */

import type ActorDataModel from "../../abstract/actor-data-model.mjs";

declare global {
  namespace dnd5e.types.Actor.Traits {
    /** traits.mjs — `static get common()`. */
    interface CommonSchema extends foundry.data.fields.DataSchema {
      size: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey, { required: true; blank: false; initial: "med" }>;
      di: dnd5e.types.fields.DamageTraitField<dnd5e.types.Damage.TypeKey>;
      dr: dnd5e.types.fields.DamageTraitField<dnd5e.types.Damage.TypeKey>;
      dv: dnd5e.types.fields.DamageTraitField<dnd5e.types.Damage.TypeKey>;
      dm: foundry.data.fields.SchemaField<{
        amount: dnd5e.types.fields.MappingField<
          dnd5e.types.fields.FormulaField<{ deterministic: true }>,
          dnd5e.types.Damage.TypeKey
        >;
        bypasses: foundry.data.fields.SetField<foundry.data.fields.StringField>;
      }>;
      ci: dnd5e.types.fields.SimpleTraitField<{}, dnd5e.types.Condition.TypeKey>;
    }

    /** traits.mjs — `static get creature()`. */
    interface CreatureSchema extends foundry.data.fields.DataSchema {
      languages: dnd5e.types.fields.SimpleTraitField<
        {
          communication: dnd5e.types.fields.MappingField<
            foundry.data.fields.SchemaField<{
              units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.MovementUnit.TypeKey | "", { required: true; blank: true }>;
              value: foundry.data.fields.NumberField<{ required: true; min: 0 }>;
            }>,
            dnd5e.types.Language.CommunicationTypeKey
          >;
        },
        dnd5e.types.Language.TypeKey
      >;
    }
  }
}

/** traits.mjs — bundle getters. */
declare class TraitsField {
  static get common(): dnd5e.types.Actor.Traits.CommonSchema;
  static get creature(): dnd5e.types.Actor.Traits.CreatureSchema;

  // prepare* statics (called via .call(this, …) from the subtype prepare methods).
  /**
   * Prepare the language labels.
   * @this {CharacterData|NPCData}
   */
  static prepareLanguages(this: ActorDataModel.Any): void;
  /**
   * Prepare condition immunities & petrified condition and handle "All Damage" value.
   * @this {CharacterData|NPCData|VehicleData}
   */
  static prepareResistImmune(this: ActorDataModel.Any): void;

  // Socket event handlers.
  /**
   * Update the prototype token size for newly created actors.
   * @this {CharacterData|NPCData|VehicleData}
   * @param data     The initial data object provided to the document creation request.
   * @param options  Additional options which modify the creation request.
   */
  static preCreateSize(this: ActorDataModel.Any, data: object, options: object): Promise<void>;
  /**
   * Update the prototype token size when the actor size is changed.
   * @this {CharacterData|NPCData|VehicleData}
   * @param changes  The candidate changes to the Document.
   * @param options  Additional options which modify the update request.
   */
  static preUpdateSize(this: ActorDataModel.Any, changes: object, options: object): Promise<void>;
}

export default TraitsField;
