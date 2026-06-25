import type { ActorDataModel } from "../../abstract/system-data-model.mjs";

/**
 * Field for storing travel data.
 */

declare global {
  namespace dnd5e.types.fields {
    type TravelField<Fields extends foundry.data.fields.DataSchema = {}> =
      foundry.data.fields.SchemaField<dnd5e.types.MergeSchemas<TravelField.BaseSchema, Fields>>;
    namespace TravelField {
      interface BaseSchema extends foundry.data.fields.DataSchema {
        pace: dnd5e.types.fields.RestrictedStringField<
          dnd5e.types.TravelPace.TypeKey, { required: true; blank: false; initial: "normal" }>;
        paces: dnd5e.types.fields.MappingField<
          dnd5e.types.fields.FormulaField<{ deterministic: true }>, dnd5e.types.TravelType.TypeKey>;
        speeds: dnd5e.types.fields.MappingField<
          dnd5e.types.fields.FormulaField<{ deterministic: true }>, dnd5e.types.TravelType.TypeKey>;
        time: foundry.data.fields.NumberField<{ positive: true; integer: true }>;
        units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.TravelUnit.TypeKey, { required: true; nullable: true; blank: false }>;
      }
    }
  }
}

declare class TravelField<Fields extends foundry.data.fields.DataSchema = {}>
  extends foundry.data.fields.SchemaField<dnd5e.types.MergeSchemas<dnd5e.types.fields.TravelField.BaseSchema, Fields>> {
  /**
   * Prepare travel data.
   * @param rollData  Actor's roll data.
   */
  static prepareData(this: ActorDataModel, rollData: dnd5e.types.documents.ActorRollData): void;

  /**
   * Apply the pace multiplier based on the current pace mode, taking the special casing for default
   * imperial movement into account.
   */
  static applyPaceMultiplier(
    value: number,
    pace: dnd5e.types.TravelPace.TypeKey,
    unitType?: "imperial" | "metric",
  ): number;

  /**
   * Convert combat movement speed in feet or meters to travel speed in mph or km/h.
   */
  static convertMovementToTravel(value: number, initialUnit: string, finalUnit: string): number;

  /**
   * Apply rules for travel pace to the given skill.
   * @param pace   The travel pace.
   * @param skill  The skill.
   */
  static getTravelPaceMode(
    pace: dnd5e.types.TravelPace.TypeKey,
    skill: string,
  ): { advantage: boolean; disadvantage: boolean };
}

export default TravelField;
export {};
