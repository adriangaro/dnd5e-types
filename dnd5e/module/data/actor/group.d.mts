import { ActorDataModel } from "../abstract.mjs";
import FormulaField from "../fields/formula-field.mjs";
import CurrencyTemplate from "../shared/currency.mjs";
import GroupSystemFlags from "./group-system-flags.mjs";

interface MemberSchemaField extends foundry.data.fields.SchemaField<
  {
    actor: foundry.data.fields.ForeignDocumentField<typeof foundry.documents.BaseActor>,
    quantity: foundry.data.fields.SchemaField<{
      value: foundry.data.fields.NumberField<{ initial: 1, integer: true, min: 0, label: "DND5E.Quantity" }>,
      formula: FormulaField<{ label: "DND5E.QuantityFormula" }>
    }>
  }
> { }

declare class _ActorDataModel extends ActorDataModel { }

/**
 * A data model and API layer which handles the schema and functionality of "group" type Actors in the dnd5e system.
 * @example Create a new Group
 * const g = new dnd5e.documents.Actor5e({
 *  type: "group",
 *  name: "Test Group",
 *  system: {
 *    members: [{ actor: "3f3hoYFWUgDqBP4U" }]
 *  }
 * });
 */
declare class GroupActor extends _ActorDataModel.mixin(CurrencyTemplate)<
  dnd5e.types.MergeSchemas<
    {
      type: foundry.data.fields.SchemaField<{
        value: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Group.TypeKey, { initial: "party", label: "DND5E.Group.Type" }>
      }>,
      description: foundry.data.fields.SchemaField<{
        full: foundry.data.fields.HTMLField<{ label: "DND5E.Description" }>,
        summary: foundry.data.fields.HTMLField<{ label: "DND5E.DescriptionSummary" }>
      }>,
      members: foundry.data.fields.ArrayField<
        MemberSchemaField,
        { label: "DND5E.GroupMembers" },
        foundry.data.fields.ArrayField.AssignmentElementType<MemberSchemaField>,
        foundry.data.fields.ArrayField.InitializedElementType<MemberSchemaField> & {
          ids: Set<string>
        }
      >,
      attributes: foundry.data.fields.SchemaField<
        {
          movement: foundry.data.fields.SchemaField<{
            land: foundry.data.fields.NumberField<{ nullable: false, min: 0, step: 0.1, initial: 0, label: "DND5E.MovementLand" }>,
            water: foundry.data.fields.NumberField<{ nullable: false, min: 0, step: 0.1, initial: 0, label: "DND5E.MovementWater" }>,
            air: foundry.data.fields.NumberField<{ nullable: false, min: 0, step: 0.1, initial: 0, label: "DND5E.MovementAir" }>
          }>
        },
        { label: "DND5E.Attributes" }
      >,
      details: foundry.data.fields.SchemaField<
        {
          xp: foundry.data.fields.SchemaField<
            {
              value: foundry.data.fields.NumberField<{ integer: true, min: 0, label: "DND5E.ExperiencePoints.Current" }>
            },
            { label: "DND5E.ExperiencePoints.Label" }
          >
        }, { label: "DND5E.Details" }>
    },
    {
      details: foundry.data.fields.SchemaField<
        {},
        {
          required: true,
          nullable: false
        },
        {},
        foundry.data.fields.SchemaField.InitializedData<{
          xp: foundry.data.fields.SchemaField<
            {},
            {
              required: true,
              nullable: false
            },
            {},
            {
              derived: number | null
            },
            {}
          >,
        }>
      >
    }
  >
> {
  /* -------------------------------------------- */


  metadata: fvttUtils.SimpleMerge<
    ActorDataModel['metadata'],
    {
      systemFlagsModel: typeof GroupSystemFlags
    }
  >;
  static get metadata(): fvttUtils.SimpleMerge<
    ActorDataModel['metadata'],
    {
      systemFlagsModel: typeof GroupSystemFlags
    }
  >;

  /* -------------------------------------------- */


  /**
   * Return only the group members that are characters.
   */
  get playerCharacters(): Actor.OfType<'character'>[]

  /* -------------------------------------------- */

  /**
   * Migrate group members from set of IDs into array of metadata objects.
   */
  static #migrateMembers(source: GroupActor['_source'])


  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /**
   * Add a new member to the group.
   */
  addMember(actor: Actor.Implementation): Promise<Actor.Implementation>

  /* -------------------------------------------- */

  /**
   * Place all members in the group on the current scene.
   */
  placeMembers(): Promise<void>

  /* -------------------------------------------- */

  /**
   * Remove a member from the group.
   */
  removeMember(actor: Actor.Implementation): Promise<Actor.Implementation>

  /* -------------------------------------------- */

  /**
   * Roll the quantity formulas for each member and replace their quantity. Any entries without formulas
   * will not be modified.
   */
  rollQuantities(): Promise<Actor.Implementation>

  /* -------------------------------------------- */
  /*  Resting                                     */
  /* -------------------------------------------- */

  /**
   * Initiate a rest for all members of this group.
   */
  rest(config: dnd5e.documents.Actor5e.RestConfiguration, result: dnd5e.documents.Actor5e.RestResult): Promise<boolean>
}

export default GroupActor;

declare global {
  namespace dnd5e.types {
    namespace Group {
      interface DefaultGroupTypes {
        party: true
        encounter: true
      }

      /**
       * Override interface for declaration merging.
       * Add custom spell levels (e.g., for epic levels) here.
       * @example
       * declare global {
       * namespace dnd5e.types.Spellcasting.School {
       * interface OverrideTypes {
       * 'psionics': true
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultGroupTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

    }
    
    namespace DataModelConfig {
      interface Actor {
        group: typeof GroupActor,
      }
    }

    interface DND5EConfig {
      /**
       * Different types of actor structures that groups can represent.
       */
      groupTypes: {
        [K in Group.TypeKey]: string
      }
    }
  }
}