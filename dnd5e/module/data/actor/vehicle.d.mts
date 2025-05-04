import SourceField from "../shared/source-field.mjs";
import DamageTraitField from "./fields/damage-trait-field.mjs";
import SimpleTraitField from "./fields/simple-trait-field.mjs";
import AttributesFields from "./templates/attributes.mjs";
import CommonTemplate from "./templates/common.mjs";
import DetailsFields from "./templates/details.mjs";
import TraitsFields from "./templates/traits.mjs";

/**
 * System data definition for Vehicles.
 */
declare class VehicleData extends CommonTemplate<
  dnd5e.types.MergeSchemas<
    dnd5e.types.MergeSchemas<
      {
        vehicleType: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Vehicle.TypeKey, { required: true, initial: "water", label: "DND5E.VehicleType" }>,
        attributes: foundry.data.fields.SchemaField<
          fvttUtils.SimpleMerge<
            typeof AttributesFields['common'],
            {
              ac: foundry.data.fields.SchemaField<
                fvttUtils.SimpleMerge<
                  typeof DetailsFields['common'],
                  fvttUtils.SimpleMerge<
                    typeof AttributesFields['armorClass'],
                    {
                      motionless: foundry.data.fields.StringField<{ required: true, label: "DND5E.ArmorClassMotionless" }>
                    }
                  >
                >,
                { label: "DND5E.ArmorClass" }
              >,
              hp: foundry.data.fields.SchemaField<
                {
                  value: foundry.data.fields.NumberField<{
                    nullable: true, integer: true, min: 0, initial: null, label: "DND5E.HitPointsCurrent"
                  }>,
                  max: foundry.data.fields.NumberField<{
                    nullable: true, integer: true, min: 0, initial: null, label: "DND5E.HitPointsMax"
                  }>,
                  temp: foundry.data.fields.NumberField<{ integer: true, initial: 0, min: 0, label: "DND5E.HitPointsTemp" }>,
                  tempmax: foundry.data.fields.NumberField<{
                    integer: true, initial: 0, label: "DND5E.HitPointsTempMax", hint: "DND5E.HitPointsTempMaxHint"
                  }>,
                  dt: foundry.data.fields.NumberField<{
                    required: true, integer: true, min: 0, label: "DND5E.DamageThreshold"
                  }>,
                  mt: foundry.data.fields.NumberField<{
                    required: true, integer: true, min: 0, label: "DND5E.VehicleMishapThreshold"
                  }>
                },
                { label: "DND5E.HitPoints" }
              >,
              actions: foundry.data.fields.SchemaField<
                {
                  stations: foundry.data.fields.BooleanField<{ required: true, label: "DND5E.VehicleActionStations" }>,
                  value: foundry.data.fields.NumberField<{
                    required: true, nullable: false, integer: true, initial: 0, min: 0, label: "DND5E.VehicleActionMax"
                  }>,
                  thresholds: foundry.data.fields.SchemaField<
                    {
                      2: foundry.data.fields.NumberField<{
                        required: true, integer: true, min: 0, label: "DND5E.VehicleActionThresholdsFull"
                      }>,
                      1: foundry.data.fields.NumberField<{
                        required: true, integer: true, min: 0, label: "DND5E.VehicleActionThresholdsMid"
                      }>,
                      0: foundry.data.fields.NumberField<{
                        required: true, integer: true, min: 0, label: "DND5E.VehicleActionThresholdsMin"
                      }>
                    },
                    { label: "DND5E.VehicleActionThresholds" }
                  >
                },
                { label: "DND5E.VehicleActions" }
              >,
              capacity: foundry.data.fields.SchemaField<
                {
                  creature: foundry.data.fields.StringField<{ required: true, label: "DND5E.VehicleCreatureCapacity" }>,
                  cargo: foundry.data.fields.NumberField<{
                    required: true, nullable: false, integer: true, initial: 0, min: 0, label: "DND5E.VehicleCargoCapacity"
                  }>
                },
                { label: "DND5E.VehicleCargoCrew" }
              >
            }
          >,
          { label: "DND5E.Attributes" }
        >,
        details: foundry.data.fields.SchemaField<
          typeof DetailsFields['common'],
          { label: "DND5E.Details" }
        >,
        source: SourceField,
        traits: foundry.data.fields.SchemaField<
          fvttUtils.SimpleMerge<
            typeof TraitsFields['common'],
            {
              size: foundry.data.fields.StringField<{ required: true, initial: "lg", label: "DND5E.Size" }>,
              di: DamageTraitField<dnd5e.types.Damage.TypeKey, dnd5e.types.Damage.Bypass, {}, { label: "DND5E.DamImm", initialValue: ["poison", "psychic"] }>,
              ci: SimpleTraitField<dnd5e.types.Condition.TypeKey, {}, {
                label: "DND5E.ConImm", initialValue: [
                  "blinded", "charmed", "deafened", "frightened", "paralyzed",
                  "petrified", "poisoned", "stunned", "unconscious"
                ]
              }>,
              dimensions: foundry.data.fields.StringField<{ required: true, label: "DND5E.Dimensions" }>
            }
          >,
          { label: "DND5E.Traits" }
        >,
        cargo: foundry.data.fields.SchemaField<
          {
            crew: foundry.data.fields.ArrayField<PassengerDataField, { label: "DND5E.VehicleCrew" }>,
            passengers: foundry.data.fields.ArrayField<PassengerDataField, { label: "DND5E.VehiclePassengers" }>
          },
          { label: "DND5E.VehicleCrewPassengers" }
        >
      },
      {
        attributes: foundry.data.fields.SchemaField<
          {

          },
          {
            required: true,
            nullable: false
          },
          {},
          {
            prof: number
          }
        >,
        details: foundry.data.fields.SchemaField<
          {

          },
          {
            required: true,
            nullable: false
          },
          {},
          {
            source: SourceField.InitializedType<{}>
          }
        >,
      }
    >,
    fvttUtils.RemoveIndexSignatures<
      VehicleData.OverrideSchema
    >
  >
> {

  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */

  static _systemType: "vehicle"

  /* -------------------------------------------- */

  /**
   * Convert source string into custom object & move to top-level.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateSource(source: VehicleData['source']): void
}

declare namespace VehicleData {
  type Schema = dnd5e.types.GetSchema<typeof VehicleData>
  interface OverrideSchema extends foundry.data.fields.DataSchema {

  }
}

export default VehicleData;

/* -------------------------------------------- */

export type PassengerSchema = {
  name: foundry.data.fields.StringField<{ required: true, label: "DND5E.VehiclePassengerName" }>,
  quantity: foundry.data.fields.NumberField<{
    required: true, nullable: false, integer: true, initial: 0, min: 0, label: "DND5E.VehiclePassengerQuantity"
  }>
}

export type PassengerDataField<
  Options extends foundry.data.fields.SchemaField.Options<PassengerSchema> = foundry.data.fields.SchemaField.DefaultOptions
> = foundry.data.fields.SchemaField<
  PassengerSchema,
  Options
>

/**
 * Produce the schema field for a simple trait.
 */
declare function makePassengerData<
  Options extends foundry.data.fields.SchemaField.Options<PassengerSchema> = foundry.data.fields.SchemaField.DefaultOptions
>(schemaOptions?: Options): PassengerDataField<Options>


declare global {
  namespace dnd5e.types {
    namespace Vehicle {
      interface DefaultVehicleTypes extends Record<string, true> {
        air: true,
        land: true,
        space: true,
        water: true
      }

      /**
       * Override interface for declaration merging.
       * Add custom tool types here. Map them to a ToolGroup.TypeKey if applicable,
       * otherwise use `true`.
       * @example
       * declare global {
       * namespace dnd5e.types.Tool {
       * interface OverrideTypes {
       * 'chemSet': 'sci'; // Chemistry Set -> Scientific Instrument Group
       * 'lockpick': true; // Advanced Lockpicks -> Standalone Proficiency
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, true | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultVehicleTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }
    namespace DataModelConfig {
      interface Actor {
        vehicle: typeof VehicleData,
      }
    }

    interface DND5EConfig {
      /**
       * The various types of vehicles in which characters can be proficient.
       */
      vehicleTypes: {
        [K in dnd5e.types.Vehicle.TypeKey]: string
      }
    }
  }
}