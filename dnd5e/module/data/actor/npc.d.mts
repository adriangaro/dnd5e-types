import FormulaField from "../fields/formula-field.mjs";
import CreatureTypeField from "../shared/creature-type-field.mjs";
import RollConfigField from "../shared/roll-config-field.mjs";
import SourceField from "../shared/source-field.mjs";
import AttributesFields from "./templates/attributes.mjs";
import CreatureTemplate from "./templates/creature.mjs";
import DetailsFields from "./templates/details.mjs";
import TraitsFields from "./templates/traits.mjs";

type AttributesData = fvttUtils.SimpleMerge<
  typeof AttributesFields['common'],
  fvttUtils.SimpleMerge<
    typeof AttributesFields['creature'],
    {
      hd: foundry.data.fields.SchemaField<
        {
          spent: foundry.data.fields.NumberField<{ integer: true, min: 0, initial: 0 }>
        },
        { label: "DND5E.HitDice" }
      >,
      hp: foundry.data.fields.SchemaField<
        {
          value: foundry.data.fields.NumberField<{
            nullable: false, integer: true, min: 0, initial: 10, label: "DND5E.HitPointsCurrent"
          }>,
          max: foundry.data.fields.NumberField<{
            nullable: false, integer: true, min: 0, initial: 10, label: "DND5E.HitPointsMax"
          }>,
          temp: foundry.data.fields.NumberField<{ integer: true, initial: 0, min: 0, label: "DND5E.HitPointsTemp" }>,
          tempmax: foundry.data.fields.NumberField<{
            integer: true, initial: 0, label: "DND5E.HitPointsTempMax", hint: "DND5E.HitPointsTempMaxHint"
          }>,
          formula: FormulaField<{ required: true, label: "DND5E.HPFormula" }>
        },
        { label: "DND5E.HitPoints" }
      >,
      death: RollConfigField<
        {
          ability: false,
          success: foundry.data.fields.NumberField<{
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5E.DeathSaveSuccesses"
          }>,
          failure: foundry.data.fields.NumberField<{
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5E.DeathSaveFailures"
          }>,
          bonuses: foundry.data.fields.SchemaField<{
            save: FormulaField<{ required: true, label: "DND5E.DeathSaveBonus" }>
          }>
        },
        { label: "DND5E.DeathSave" }
      >,
      spell: foundry.data.fields.SchemaField<{
        level: foundry.data.fields.NumberField<{
          required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5E.SpellcasterLevel"
        }>
      }>
    }
  >
>

/**
 */
declare class NPCData extends CreatureTemplate.mixin()<
  dnd5e.types.MergeSchemas<
    {
      attributes: foundry.data.fields.SchemaField<
        AttributesData,
        { label: "DND5E.Attributes" }
      >,
      details: foundry.data.fields.SchemaField<
        fvttUtils.SimpleMerge<
          typeof DetailsFields['common'],
          fvttUtils.SimpleMerge<
            typeof DetailsFields['creature'],
            {
              type: CreatureTypeField,
              habitat: foundry.data.fields.SchemaField<{
                value: foundry.data.fields.ArrayField<
                  foundry.data.fields.SchemaField<{
                    type: foundry.data.fields.StringField<{ required: true }>,
                    subtype: foundry.data.fields.StringField
                  }>
                >,
                custom: foundry.data.fields.StringField<{ required: true }>
              }>,
              cr: foundry.data.fields.NumberField<{
                required: true, nullable: true, min: 0, initial: 1, label: "DND5E.ChallengeRating"
              }>,
              treasure: foundry.data.fields.SchemaField<{
                value: foundry.data.fields.SetField<foundry.data.fields.StringField>
              }>
            }
          >
        >, { label: "DND5E.Details" }
      >,
      resources: foundry.data.fields.SchemaField<{
        legact: foundry.data.fields.SchemaField<
          {
            value: foundry.data.fields.NumberField<{
              required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5E.LegendaryAction.Remaining"
            }>,
            max: foundry.data.fields.NumberField<{
              required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5E.LegendaryAction.Max"
            }>
          },
          { label: "DND5E.LegendaryAction.Label" }
        >,
        legres: foundry.data.fields.SchemaField<
          {
            value: foundry.data.fields.NumberField<{
              required: true, nullable: false, integer: true, min: 0, initial: 0,
              label: "DND5E.LegendaryResistance.Remaining"
            }>,
            max: foundry.data.fields.NumberField<{
              required: true, nullable: false, integer: true, min: 0, initial: 0,
              label: "DND5E.LegendaryResistance.Max"
            }>
          },
          { label: "DND5E.LegendaryResistance.Label" }
        >,
        lair: foundry.data.fields.SchemaField<
          {
            value: foundry.data.fields.BooleanField<{ required: true, label: "DND5E.LAIR.Action.Uses" }>,
            initiative: foundry.data.fields.NumberField<{
              required: true, integer: true, label: "DND5E.LAIR.Action.Initiative"
            }>,
            inside: foundry.data.fields.BooleanField<{ label: "DND5E.LAIR.Inside" }>
          },
          { label: "DND5E.LAIR.Action.Label" }
        >
      },
        { label: "DND5E.Resources" }
      >,
      source: SourceField,
      traits: foundry.data.fields.SchemaField<
        fvttUtils.SimpleMerge<
          typeof TraitsFields['common'],
          fvttUtils.SimpleMerge<
            typeof TraitsFields['creature'],
            {
              important: foundry.data.fields.BooleanField
            }
          >
        >, { label: "DND5E.Traits" }
      >
    },
    {
      details: foundry.data.fields.SchemaField<
        {

        },
        {
          required: true,
          nullable: false
        },
        {},
        {
          level: number
          xp: {
            value: number
          },
          type: CreatureTypeField.InitializedType<{}>
          // deprecated
          spellLevel: number,
          source: SourceField.InitializedType<{}>
        }
      >,
      attributes: foundry.data.fields.SchemaField<
        {

        },
        {
          required: true,
          nullable: false
        },
        {},
        {
          hd: {
            denomination: number,
            max: number,
            effectiveMax: number,
            value: number,
            damage: number,
            pct: number
          }
          prof: number
          spell: {
            level: number
          }
        }
      >,
      resources: foundry.data.fields.SchemaField<
        {

        },
        {
          required: true,
          nullable: false
        },
        {},
        {
          legact: {
            label: string
          }
        }
      >
    }
  >
> {

  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */

  metadata: fvttUtils.SimpleMerge<
    CreatureTemplate['metadata'],
    {
      supportsAdvancement: true
    }
  >
  static get metadata(): fvttUtils.SimpleMerge<
    CreatureTemplate['metadata'],
    {
      supportsAdvancement: true
    }
  >

  /* -------------------------------------------- */

  /** @inheritDoc */
  static override _systemType: "npc";

  /* -------------------------------------------- */

  /** @override */
  static get compendiumBrowserFilters(): Map<
    string,
    {
      label: string,
      type: 'set' | 'range',
      config: {
        choices?: Record<string, object>,
        keyPath?: string,
        min?: number,
        max?: number
      },
      createFilter(filters: {
        k: string,
        o?: string,
        v?: {
          k: string,
          o: string,
          v: string[]
        } | number
      }[], value: Record<string, number>, def: any): void
    }
  >

  /* -------------------------------------------- */
  /*  Data Migration                              */
  /* -------------------------------------------- */

  /**
   * Convert the plain string environment to a custom habitat.
   */
  static #migrateEnvironment(source: NPCData['_source']): void

  /* -------------------------------------------- */

  /**
   * Convert source string into custom object & move to top-level.
   */
  static #migrateSource(source: NPCData['_source']): void

  /* -------------------------------------------- */

  /**
   * Move spell level from `details.spellLevel` to `attributes.spell.level`.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateSpellLevel(source: NPCData['_source']): void

  /* -------------------------------------------- */

  /**
   * Migrate the actor type string to type object.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateTypeData(source: NPCData['_source']): void

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Level used to determine cantrip scaling.
   */
  cantripLevel(spell: Item.OfType<'spell'>): number

  /* -------------------------------------------- */

  /**
   * Auto-generate a description for the legendary actions block on the NPC stat block.
   */
  getLegendaryActionsDescription(name: string): string

  /* -------------------------------------------- */

  /**
   * Create a list of gear that can be collected from this NPC.
   */
  getGear(): Item.Implementation[]


  /* -------------------------------------------- */

  /**
   * Spend a legendary resistance to change a failed saving throw into a success.
   * @param {ChatMessage5e} message  The chat message containing the failed save.
   */
  resistSave(message: ChatMessage.Implementation): Promise<void>

  /* -------------------------------------------- */

  /**
   * Prepare the context information for the embed template rendering.
   */
  _prepareEmbedContext(): Promise<object>
}

declare namespace NPCData {

}

export default NPCData;


declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface Actor {
        npc: typeof NPCData,
      }
    }
  }
}