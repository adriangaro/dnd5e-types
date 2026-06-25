/**
 * System data definition for Vehicles.
 *
 * Extends CommonTemplate (NOT CreatureTemplate) and layers vehicle-specific attributes
 * (ac with `calc:"flat"` + derived `motionless`; hp with `mt`; `actions`; `capacity`; `price`;
 * `quality`; `travel`), `crew`/`draft`/`passengers` (UUID rosters), `source` (SourceField),
 * vehicle `details.type`, vehicle `traits` (size/weight/keel/beam/dimensions), and the legacy
 * `cargo` (crew/passengers passenger-data arrays).
 *
 * Source schema mirrors `defineSchema()` by merging the shared field bundles (Attributes.common,
 * Details.common, Traits.common) with the vehicle additions. SourceField and TravelField are
 * inlined as their composed SchemaField shapes (no dedicated mirror exists yet).
 *
 * Derived overlays follow the character template:
 *  - BaseData   = prepareBaseData outputs (attributes.prof, baseAC, baseEncumbrance).
 *  - DerivedData = prepareDerivedData outputs (abilities, currency, ac/movement → numbers,
 *    encumbrance, hp, init, travel, actions.value, …). Formula-string fields (ac/movement)
 *    are authored standalone (Omit from source first); narrowed fields use NonNullableProps.
 */

import { CommonTemplate } from "./templates/common.mjs";
import type Proficiency from "../../documents/actor/proficiency.mjs";

declare global {
  namespace dnd5e.types.Actor.Vehicle {
    /* ---------------- source schema fragments ---------------- */

    /** SourceField composed shape (shared/source-field.mjs) — the inner field record. */
    interface SourceSchema extends foundry.data.fields.DataSchema {
      book: foundry.data.fields.StringField;
      page: foundry.data.fields.StringField;
      custom: foundry.data.fields.StringField;
      license: foundry.data.fields.StringField;
      revision: foundry.data.fields.NumberField<{ initial: 1 }>;
      rules: foundry.data.fields.StringField;
    }

    /** TravelField composed shape with `pace:false` removed (fields/travel-field.mjs). */
    interface TravelSchema extends foundry.data.fields.DataSchema {
      paces: dnd5e.types.fields.MappingField<
        dnd5e.types.fields.FormulaField<{ deterministic: true }>,
        dnd5e.types.Actor.Vehicle.TravelTypeKey
      >;
      speeds: dnd5e.types.fields.MappingField<
        dnd5e.types.fields.FormulaField<{ deterministic: true }>,
        dnd5e.types.Actor.Vehicle.TravelTypeKey
      >;
      time: foundry.data.fields.NumberField<{ positive: true; integer: true; initial: number }>;
      units: foundry.data.fields.StringField<{ required: true; nullable: true; blank: false }>;
    }

    /** Passenger-data array element (vehicle.mjs `makePassengerData`). */
    type PassengerSchema = foundry.data.fields.SchemaField<{
      name: foundry.data.fields.StringField<{ required: true }>;
      quantity: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; initial: 0; min: 0 }>;
    }>;

    type AttributesSchema = dnd5e.types.MergeSchemas<
      dnd5e.types.Actor.Attributes.CommonSchema,
      {
        ac: foundry.data.fields.SchemaField<
          dnd5e.types.MergeSchemas<
            dnd5e.types.Actor.Attributes.ArmorClassSchema,
            { calc: foundry.data.fields.StringField<{ initial: "flat" }> }
          >
        >;
        hp: foundry.data.fields.SchemaField<
          dnd5e.types.MergeSchemas<
            dnd5e.types.Actor.Attributes.HitPointsSchema,
            { mt: foundry.data.fields.NumberField<{ required: true; integer: true; min: 0 }> }
          >
        >;
        actions: foundry.data.fields.SchemaField<{
          max: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; initial: 3; min: 0; max: 3 }>;
          spent: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; initial: 0; min: 0; max: 3 }>;
          stations: foundry.data.fields.BooleanField<{ required: true; initial: true }>;
          thresholds: foundry.data.fields.SchemaField<{
            2: foundry.data.fields.NumberField<{ required: true; integer: true; min: 0 }>;
            1: foundry.data.fields.NumberField<{ required: true; integer: true; min: 0 }>;
            0: foundry.data.fields.NumberField<{ required: true; integer: true; min: 0 }>;
          }>;
        }>;
        capacity: foundry.data.fields.SchemaField<{
          cargo: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.NumberField<{ min: 0 }>;
            units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.WeightUnit.TypeKey, { required: true; blank: false }>;
          }>;
          creature: foundry.data.fields.StringField<{ required: true }>;
        }>;
        price: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{ initial: null; min: 0 }>;
          denomination: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Currency.TypeKey, { required: true; blank: false }>;
        }>;
        quality: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: -10; max: 10; initial: 4 }>;
        }>;
        travel: foundry.data.fields.SchemaField<dnd5e.types.Actor.Vehicle.TravelSchema>;
      }
    >;

    type DetailsSchema = dnd5e.types.MergeSchemas<
      dnd5e.types.Actor.Details.CommonSchema,
      {
        type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.VehicleType.TypeKey, { required: true; blank: false; initial: "water" }>;
      }
    >;

    type TraitsSchema = dnd5e.types.MergeSchemas<
      dnd5e.types.Actor.Traits.CommonSchema,
      {
        size: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey, { required: true; blank: false; initial: "lg" }>;
        weight: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{ min: 0 }>;
          units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.WeightUnit.TypeKey, { required: true; blank: false }>;
        }>;
        keel: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{ min: 0 }>;
          units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.MovementUnit.TypeKey, { required: true; blank: false }>;
        }>;
        beam: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{ min: 0 }>;
          units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.MovementUnit.TypeKey, { required: true; blank: false }>;
        }>;
        dimensions: foundry.data.fields.StringField<{ required: true }>;
      }
    >;

    type BaseSchema = dnd5e.types.MergeSchemas<
      CommonTemplate.Schema,
      {
        attributes: foundry.data.fields.SchemaField<dnd5e.types.Actor.Vehicle.AttributesSchema>;
        crew: foundry.data.fields.SchemaField<{
          max: foundry.data.fields.NumberField<{ min: 0; integer: true }>;
          value: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField>;
        }>;
        details: foundry.data.fields.SchemaField<dnd5e.types.Actor.Vehicle.DetailsSchema>;
        draft: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField>;
        }>;
        passengers: foundry.data.fields.SchemaField<{
          max: foundry.data.fields.NumberField<{ min: 0; integer: true }>;
          value: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField>;
        }>;
        source: foundry.data.fields.SchemaField<dnd5e.types.Actor.Vehicle.SourceSchema>;
        traits: foundry.data.fields.SchemaField<dnd5e.types.Actor.Vehicle.TraitsSchema>;
        cargo: foundry.data.fields.SchemaField<{
          crew: foundry.data.fields.ArrayField<dnd5e.types.Actor.Vehicle.PassengerSchema>;
          passengers: foundry.data.fields.ArrayField<dnd5e.types.Actor.Vehicle.PassengerSchema>;
        }>;
      }
    >;

    /* ---------------- derived overlays ---------------- */

    /** prepareBaseData outputs (vehicle.mjs prepareBaseData: prof, baseAC, baseEncumbrance). */
    interface BaseData {
      attributes: { prof: number };
    }

    /**
     * prepareDerivedData outputs — each top-level key is a COMPLETE overlay over the
     * source-initialized shape:
     *  - `abilities` from prepareAbilities (CommonTemplate);
     *  - `attributes` re-states ac/movement (formula-string → number, authored standalone),
     *    narrows hp, adds encumbrance/init derived data and `actions.value`;
     *  - `source` gains the SourceField.prepareData labels.
     */
    interface DerivedData {
      abilities: Record<dnd5e.types.Ability.TypeKey, dnd5e.types.Actor.Common.AbilityData>;
      attributes: dnd5e.types.PrettifyType<
        Omit<
          dnd5e.types.InitializedOf<dnd5e.types.Actor.Vehicle.AttributesSchema>,
          "ac" | "movement" | "hp" | "init" | "encumbrance" | "actions" | "travel"
        > & {
          // NARROW: hp.max/value nullable in source, present after prepareHitPoints.
          hp: dnd5e.types.NonNullableProps<
            dnd5e.types.InitializedOf<dnd5e.types.Actor.Vehicle.AttributesSchema>["hp"],
            "max" | "value"
          > & { effectiveMax: number; damage: number; pct: number };

          // REPLACE: every formula-string field becomes a number; vehicle adds `motionless`.
          ac: {
            armor: number;
            base: number;
            bonus: number;
            calc: string;
            cover: number;
            flat: number;
            formula: string;
            formulas: Array<{ formula: string; label?: string; id?: string; type?: string; armored?: boolean; shielded?: boolean }>;
            min: number;
            override?: number;
            selectedFormulas: Set<string>;
            shield: number;
            value: number;
            label: string;
            dex: number;
            equippedArmor: globalThis.Item.Implementation | null;
            equippedShield: globalThis.Item.Implementation | null;
            clamped: Record<dnd5e.types.Ability.TypeKey, number>;
            activeFormula?: { formula: string; label?: string; id?: string; type?: string };
            motionless: number;
          };
          movement: Record<dnd5e.types.Movement.TypeKey, number> & {
            bonus: number;
            special: string;
            units: string;
            hover: boolean;
            ignoredDifficultTerrain: Set<string>;
            speed: number;
            max: number;
            slowed: boolean;
            jump: number;
            fromSpecies: Partial<Record<dnd5e.types.Movement.TypeKey, number>>;
          };

          // NARROW/new on top of the preserved source subtree.
          init: dnd5e.types.InitializedOf<dnd5e.types.Actor.Vehicle.AttributesSchema>["init"] & {
            mod: number;
            prof: Proficiency;
            total: number;
            score: number;
          };
          encumbrance: dnd5e.types.InitializedOf<dnd5e.types.Actor.Vehicle.AttributesSchema>["encumbrance"] & {
            value: number;
            max: number;
            mod: number;
            pct: number;
            encumbered: boolean;
            thresholds: { encumbered: number; heavilyEncumbered: number; maximum: number };
            stops: { encumbered: number; heavilyEncumbered: number };
          };

          // `actions.value` is computed in `_prepareActions`; `actions.max` may be mutated.
          actions: dnd5e.types.InitializedOf<dnd5e.types.Actor.Vehicle.AttributesSchema>["actions"] & {
            value: number;
          };

          // travel.paces/speeds gain a `max` and `travel.prePace` map (TravelField.prepareData).
          travel: dnd5e.types.InitializedOf<dnd5e.types.Actor.Vehicle.TravelSchema> & {
            paces: dnd5e.types.InitializedOf<dnd5e.types.Actor.Vehicle.TravelSchema>["paces"] & { max: number };
            speeds: dnd5e.types.InitializedOf<dnd5e.types.Actor.Vehicle.TravelSchema>["speeds"] & { max: number };
            prePace: Partial<Record<dnd5e.types.Actor.Vehicle.TravelTypeKey, number>>;
          };
        }
      >;
      source: dnd5e.types.InitializedOf<dnd5e.types.Actor.Vehicle.SourceSchema> & {
        bookPlaceholder: string;
        label: string;
        value: string;
        slug: string;
        directlyEditable: boolean;
      };
    }

    /** Travel-type key union (CONFIG.DND5E.travelTypes — land/water/air). */
    type TravelTypeKey = dnd5e.types.TravelType.TypeKey;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the vehicle subtype on the interface the funnel reads. */
    interface Actor {
      vehicle: typeof import("./vehicle.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Actor.vehicle {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class VehicleData extends CommonTemplate<
  VehicleData.Schema,
  VehicleData.Base,
  VehicleData.Derived
> {
  static override _systemType: "vehicle";
  static override LOCALIZATION_PREFIXES: string[];
  static override defineSchema(): VehicleData.Schema;

  /**
   * Whether this Actor type represents a vehicle.
   * @returns {boolean}
   */
  get isVehicle(): true;

  /**
   * Perform preparation steps for action stations.
   */
  _prepareActions(): void;

  /**
   * Adjust the crew quantity to some target value.
   * @param area   The crew area.
   * @param uuid   The crew member's UUID.
   * @param target The target value, which may be a delta.
   * @returns The actor with updates applied.
   */
  adjustCrew(area: "crew" | "passengers", uuid: string, target: string | number): Promise<Actor.Implementation>;

  /**
   * Compute the update required in order to adjust the crew to some target quantity.
   * @param area   The crew area.
   * @param uuid   The crew member's UUID.
   * @param target The target value, which may be a delta.
   * @returns {object}
   */
  getCrewUpdates(area: "crew" | "passengers", uuid: string, target: string | number): object;

  /**
   * Get vehicle encumbrance including draft animals.
   * @returns {Promise<{ pct: number, max: number, value: number }>}
   */
  getEncumbrance(): Promise<{ pct: number; max: number; value: number }>;
  recoverCombatUses(periods: dnd5e.types.LimitedUsePeriod.TypeKey[], results: object): Promise<void>;

  /**
   * Whether the given activity should prompt for auto-consumption of a crew action.
   * @param activity The activity.
   * @returns {boolean|void}
   */
  static canConsumeCrewAction(activity: dnd5e.types.Activity.Instance): boolean | void;
}

declare namespace VehicleData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Actor.Vehicle.BaseSchema,
    dnd5e.types.DataModelConfig.Actor.vehicle.OverrideSchema
  >;
  /** prepareBaseData overlay with Seam-D `OverrideBase` folded in. */
  type Base = dnd5e.types.MergeData<
    dnd5e.types.Actor.Vehicle.BaseData,
    dnd5e.types.DataModelConfig.Actor.vehicle.OverrideBase
  >;
  /** prepareDerivedData overlay with Seam-D `OverrideDerived` folded in. */
  type Derived = dnd5e.types.MergeData<
    dnd5e.types.Actor.Vehicle.DerivedData,
    dnd5e.types.DataModelConfig.Actor.vehicle.OverrideDerived
  >;
}

export default VehicleData;
