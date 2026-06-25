/**
 * A data model and API layer which handles the schema and functionality of "group" type Actors in the dnd5e system.
 *
 * The concrete "party" actor model. Extends GroupTemplate (mixed currency + description) with
 * group-specific `attributes.travel` (a `TravelField`), `details.xp`, the `members` array of
 * `{ actor }` foreign references, and a `primaryVehicle` foreign reference. Derived data is
 * layered via the native `BaseData`/`DerivedData` generics:
 *  - BaseData   = prepareBaseData outputs (the filtered `members` array gains a non-enumerable
 *    `ids: Set<string>`; `primaryVehicle` is forced to `null` when invalid)
 *  - DerivedData = prepareDerivedData outputs (`TravelField.prepareData` turns the formula-string
 *    `paces`/`speeds` maps into number maps with a `max`, and adds `prePace`)
 * Seam-C registers it under `group`; Seam-D `Override*` hooks fold in.
 */

import { GroupTemplate } from "./templates/group.mjs";

declare global {
  namespace dnd5e.types.Actor.Group {
    /* ---------------- source schema fragments ---------------- */

    /** `TravelField` source schema (fields/travel-field.mjs). */
    interface TravelSchema extends foundry.data.fields.DataSchema {
      pace: dnd5e.types.fields.RestrictedStringField<
        dnd5e.types.Actor.Group.TravelPaceKey,
        { required: true; blank: false; initial: "normal" }
      >;
      paces: dnd5e.types.fields.MappingField<
        dnd5e.types.fields.FormulaField<{ deterministic: true }>,
        dnd5e.types.Actor.Vehicle.TravelTypeKey
      >;
      speeds: dnd5e.types.fields.MappingField<
        dnd5e.types.fields.FormulaField<{ deterministic: true }>,
        dnd5e.types.Actor.Vehicle.TravelTypeKey
      >;
      time: foundry.data.fields.NumberField<{ positive: true; integer: true }>;
      units: foundry.data.fields.StringField<{ required: true; nullable: true; blank: false }>;
    }

    /**
     * `ForeignDocumentField(BaseActor)` — stored as an id, initialized to the resolved Actor (or
     * null). Modeled as a 4-generic `StringField` (like `LocalDocumentField`) rather than
     * `ForeignDocumentField` to avoid the circular mapped-type resolution that the latter triggers
     * when the schema's initialized Actor references this same group model via `actor.system`.
     */
    type ActorRefField = foundry.data.fields.StringField<
      { required: true; nullable: true; blank: false; initial: null },
      string | null,
      globalThis.Actor.Implementation | null,
      string | null
    >;

    type GroupMemberField = foundry.data.fields.ArrayField<
      foundry.data.fields.SchemaField<{
        actor: dnd5e.types.Actor.Group.ActorRefField;
      }>
    >;

    type DataSchema = dnd5e.types.MergeSchemas<
      GroupTemplate.Schema,
      {
        attributes: foundry.data.fields.SchemaField<{
          travel: foundry.data.fields.SchemaField<dnd5e.types.Actor.Group.TravelSchema>;
        }>;
        details: foundry.data.fields.SchemaField<{
          xp: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
          }>;
        }>;
        members: dnd5e.types.Actor.Group.GroupMemberField;
        primaryVehicle: dnd5e.types.Actor.Group.ActorRefField;
      }
    >;

    /* ---------------- derived overlays ---------------- */

    /** prepareBaseData outputs (group.mjs prepareBaseData). */
    interface BaseData {
      // The filtered members array carries a non-enumerable `ids` Set (Object.defineProperty).
      members: dnd5e.types.InitializedOf<dnd5e.types.Actor.Group.DataSchema>["members"] & {
        ids: Set<string>;
      };
    }

    /**
     * prepareDerivedData outputs — `attributes.travel` is rebuilt by `TravelField.prepareData`:
     * `paces`/`speeds` formula-string maps become NUMBER maps (each also carries a non-enumerable
     * `max: number`), and a `prePace` number map is added. Authored standalone for the converted
     * subtrees (formula-string → number would yield `never` under intersection).
     */
    interface DerivedData {
      attributes: dnd5e.types.PrettifyType<
        Omit<dnd5e.types.InitializedOf<dnd5e.types.Actor.Group.DataSchema>["attributes"], "travel"> & {
          travel: Omit<
            dnd5e.types.InitializedOf<dnd5e.types.Actor.Group.TravelSchema>,
            "paces" | "speeds"
          > & {
            paces: Partial<Record<dnd5e.types.Actor.Vehicle.TravelTypeKey, number>> & { max: number };
            speeds: Partial<Record<dnd5e.types.Actor.Vehicle.TravelTypeKey, number>> & { max: number };
            prePace: Partial<Record<dnd5e.types.Actor.Vehicle.TravelTypeKey, number>>;
          };
        }
      >;
    }
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the group subtype on the interface the funnel reads. */
    interface Actor {
      group: typeof import("./group.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Actor.group {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class GroupData extends GroupTemplate<GroupData.Schema, GroupData.Base, GroupData.Derived> {
  static override _systemType: "group";
  static override defineSchema(): GroupData.Schema;

  /** Return only group members that are creatures. */
  get creatures(): Actor.Implementation[];
  get transferDestinations(): Actor.Implementation[];
  /** Return only the group members that are characters. */
  get playerCharacters(): Actor.Implementation[];
  /** The party's average level for the purpose of determining encounter XP budget. */
  get level(): number;

  /**
   * Add a new member to the group.
   * @param actor - A non-group Actor to add to the group
   * @returns The updated group Actor
   */
  addMember(actor: Actor.Implementation): Promise<Actor.Implementation>;
  override getMembers(): Promise<Array<{ actor: Actor.Implementation; [p: string]: any }>>;
  override getPlaceableMembers(): Promise<Array<{ actor: Actor.Implementation; [p: string]: any }>>;
  /**
   * Get information on travel pace for this group.
   * @returns Travel pace descriptor for the group
   */
  getTravelPace(): dnd5e.types.Actor.Group.TravelPaceDescriptor;
  /**
   * Remove a member from the group.
   * @param actor - An Actor or ID to remove from this group
   * @returns The updated group Actor
   */
  removeMember(actor: Actor.Implementation | string): Promise<Actor.Implementation>;
  /**
   * Request a group ability check with a given skill.
   * @param config - Roll configuration.
   */
  rollSkill(config: Partial<dnd5e.types.Dice.SkillToolRollProcessConfiguration>): Promise<false | void>;
  /**
   * Send a request to the members of this group.
   * @param handler - Specific rest handler as defined in `CONFIG.DND5E.requests`.
   * @param messageData - Additional data used to create the chat message.
   * @param options - Additional options passed to the dialog.
   * @returns Promise that resolves to the created request chat message.
   * @throws if dialog is closed
   */
  sendRequest(handler: string, messageData?: object, options?: object): Promise<ChatMessage.Implementation>;
  /**
   * Initiate a rest for all members of this group.
   * @param config - Configuration data for the rest.
   * @param result - Results of the rest operation being built.
   * @returns Returns `false` to prevent regular rest process from completing.
   */
  rest(config: dnd5e.types.data.actor.GroupRestConfiguration, result: dnd5e.types.documents.RestResult): Promise<boolean>;
}

declare namespace GroupData {
  /** Source schema with Seam-D `OverrideSchema` folded in. */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Actor.Group.DataSchema,
    dnd5e.types.DataModelConfig.Actor.group.OverrideSchema
  >;
  /** prepareBaseData overlay with Seam-D `OverrideBase` folded in. */
  type Base = dnd5e.types.MergeData<
    dnd5e.types.Actor.Group.BaseData,
    dnd5e.types.DataModelConfig.Actor.group.OverrideBase
  >;
  /** prepareDerivedData overlay with Seam-D `OverrideDerived` folded in. */
  type Derived = dnd5e.types.MergeData<
    dnd5e.types.Actor.Group.DerivedData,
    dnd5e.types.DataModelConfig.Actor.group.OverrideDerived
  >;
}

export default GroupData;

declare global {
  namespace dnd5e.types.Actor.Group {
    /** group.mjs `getTravelPace()` return shape. */
    interface TravelPaceDescriptor {
      pace: {
        slowed: boolean;
        available: boolean;
        label: string | undefined;
        value: dnd5e.types.Actor.Group.TravelPaceKey;
      };
      paces: Partial<Record<dnd5e.types.Actor.Vehicle.TravelTypeKey, number>>;
    }

    /** Travel-pace key union (CONFIG.DND5E.travelPace). */
    type TravelPaceKey = dnd5e.types.TravelPace.TypeKey;
  }
}
