/**
 * An Actor that represents a collection of adversaries.
 *
 * An actor representing a collection of adversaries. Extends GroupTemplate and REPLACES the
 * `members` array with UUID-referenced entries that each carry a `quantity` (value + formula).
 * Derived data:
 *  - BaseData   = prepareBaseData outputs (the `members` array gains a non-enumerable
 *    `uuids: Set<string>`)
 *  - DerivedData = prepareDerivedData outputs (currency only; no shape change)
 * Seam-C registers it under `encounter`; Seam-D `Override*` hooks fold in.
 */

import { GroupTemplate } from "./templates/group.mjs";

declare global {
  namespace dnd5e.types.Actor.Encounter {
    /* ---------------- source schema fragments ---------------- */

    type EncounterMemberField = foundry.data.fields.ArrayField<
      foundry.data.fields.SchemaField<{
        uuid: foundry.data.fields.DocumentUUIDField<{ type: "Actor" }>;
        quantity: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{ initial: 1; integer: true; min: 0 }>;
          formula: dnd5e.types.fields.FormulaField;
        }>;
      }>
    >;

    type DataSchema = dnd5e.types.MergeSchemas<
      GroupTemplate.Schema,
      {
        members: dnd5e.types.Actor.Encounter.EncounterMemberField;
      }
    >;

    /* ---------------- derived overlays ---------------- */

    /** prepareBaseData outputs (encounter.mjs prepareBaseData) — `members` gains `uuids`. */
    interface BaseData {
      members: dnd5e.types.InitializedOf<dnd5e.types.Actor.Encounter.DataSchema>["members"] & {
        uuids: Set<string>;
      };
    }

    /** prepareDerivedData outputs — currency only, no shape change. */
    interface DerivedData {}
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the encounter subtype on the interface the funnel reads. */
    interface Actor {
      encounter: typeof import("./encounter.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Actor.encounter {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class EncounterData extends GroupTemplate<
  EncounterData.Schema,
  EncounterData.Base,
  EncounterData.Derived
> {
  static override _systemType: "encounter";
  static override defineSchema(): EncounterData.Schema;

  /** Add new members to the group. */
  addMember(...actors: Actor.Implementation[]): Promise<Actor.Implementation>;
  /** Get the difficulty for this encounter for a given party. */
  getDifficulty(party?: Actor.Implementation): Promise<"low" | "moderate" | "high" | null>;
  override getMembers(): Promise<Array<{ actor: Actor.Implementation; [p: string]: any }>>;
  override getPlaceableMembers(): Promise<Array<{ actor: Actor.Implementation; [p: string]: any }>>;
  /**
   * Place all members in the encounter on the current scene and return the associated token documents.
   * @param config - Configuration options for the encounter placement.
   * @param config.combatBehavior - Combat tracker options for the placed tokens.
   * @returns The created token documents.
   */
  override placeMembers(config?: { combatBehavior?: dnd5e.types.data.settings.EncounterPlacementSettingData }): Promise<TokenDocument.Implementation[]>;
  /** Get the XP value of this encounter. */
  getXPValue(): Promise<number>;
  /**
   * Remove a member from the group.
   * @param actor - An actor or its UUID to remove from this group.
   * @returns The updated encounter Actor.
   */
  removeMember(actor: Actor.Implementation | string): Promise<Actor.Implementation>;
  /**
   * Roll the quantity formulas for each member and replace their quantity. Any entries without formulas
   * will not be modified.
   * @param options - Options object.
   * @param options.index - Index of a specific member to roll.
   * @returns The updated encounter Actor.
   */
  rollQuantities(options?: { index?: number }): Promise<Actor.Implementation>;
}

declare namespace EncounterData {
  /** Source schema with Seam-D `OverrideSchema` folded in. */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Actor.Encounter.DataSchema,
    dnd5e.types.DataModelConfig.Actor.encounter.OverrideSchema
  >;
  /** prepareBaseData overlay with Seam-D `OverrideBase` folded in. */
  type Base = dnd5e.types.MergeData<
    dnd5e.types.Actor.Encounter.BaseData,
    dnd5e.types.DataModelConfig.Actor.encounter.OverrideBase
  >;
  /** prepareDerivedData overlay with Seam-D `OverrideDerived` folded in. */
  type Derived = dnd5e.types.MergeData<
    dnd5e.types.Actor.Encounter.DerivedData,
    dnd5e.types.DataModelConfig.Actor.encounter.OverrideDerived
  >;
}

export default EncounterData;
