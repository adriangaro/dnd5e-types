import HitDice from "../../documents/actor/hit-dice.mjs";
import FormulaField from "../fields/formula-field.mjs";
import LocalDocumentField from "../fields/local-document-field.mjs";
import CreatureTypeField from "../shared/creature-type-field.mjs";
import RollConfigField from "../shared/roll-config-field.mjs";
import SimpleTraitField from "./fields/simple-trait-field.mjs";
import AttributesFields from "./templates/attributes.mjs";
import CreatureTemplate from "./templates/creature.mjs";
import DetailsFields from "./templates/details.mjs";
import TraitsFields from "./templates/traits.mjs";


type DetailsData = fvttUtils.PrettifyType<fvttUtils.SimpleMerge<
  typeof DetailsFields['common'],
  fvttUtils.SimpleMerge<
    typeof DetailsFields['creature'],
    {
      background: LocalDocumentField<typeof foundry.documents.BaseItem<'background'>, {
        required: true, fallback: true, label: "DND5E.Background"
      }>,
      originalClass: foundry.data.fields.StringField<{ required: true, label: "DND5E.ClassOriginal" }>,
      xp: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.NumberField<{
          required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5E.ExperiencePoints.Current"
        }>
      }, { label: "DND5E.ExperiencePoints.Label" }>,
      appearance: foundry.data.fields.StringField<{ required: true, label: "DND5E.Appearance" }>,
      trait: foundry.data.fields.StringField<{ required: true, label: "DND5E.PersonalityTraits" }>,
      gender: foundry.data.fields.StringField<{ label: "DND5E.Gender" }>,
      eyes: foundry.data.fields.StringField<{ label: "DND5E.Eyes" }>,
      height: foundry.data.fields.StringField<{ label: "DND5E.Height" }>,
      faith: foundry.data.fields.StringField<{ label: "DND5E.Faith" }>,
      hair: foundry.data.fields.StringField<{ label: "DND5E.Hair" }>,
      skin: foundry.data.fields.StringField<{ label: "DND5E.Skin" }>,
      age: foundry.data.fields.StringField<{ label: "DND5E.Age" }>,
      weight: foundry.data.fields.StringField<{ label: "DND5E.Weight" }>
    }
  >
>>

type AttributesData = fvttUtils.SimpleMerge<
  typeof AttributesFields['common'],
  fvttUtils.SimpleMerge<
    typeof AttributesFields['creature'],
    {
      hp: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.NumberField<{
          nullable: false, integer: true, min: 0, initial: 0, label: "DND5E.HitPointsCurrent"
        }>,
        max: foundry.data.fields.NumberField<{
          nullable: true, integer: true, min: 0, initial: null, label: "DND5E.HitPointsOverride",
          hint: "DND5E.HitPointsOverrideHint"
        }>,
        temp: foundry.data.fields.NumberField<{ integer: true, initial: 0, min: 0, label: "DND5E.HitPointsTemp" }>,
        tempmax: foundry.data.fields.NumberField<{
          integer: true, initial: 0, label: "DND5E.HitPointsTempMax", hint: "DND5E.HitPointsTempMaxHint"
        }>,
        bonuses: foundry.data.fields.SchemaField<{
          level: FormulaField<{ deterministic: true, label: "DND5E.HitPointsBonusLevel" }>,
          overall: FormulaField<{ deterministic: true, label: "DND5E.HitPointsBonusOverall" }>
        }>
      }, { label: "DND5E.HitPoints" }>,
      death: RollConfigField<{
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
      }, { label: "DND5E.DeathSave" }>,
      inspiration: foundry.data.fields.BooleanField<{ required: true, label: "DND5E.Inspiration" }>
    }
  >
>
declare class CharacterData extends CreatureTemplate<
  dnd5e.types.MergeSchemas<
    dnd5e.types.MergeSchemas<
      {
        attributes: foundry.data.fields.SchemaField<
          AttributesData,
          { label: "DND5E.Attributes" },
          foundry.data.fields.SchemaField.Internal.AssignmentType<AttributesData, {}>,
          fvttUtils.SimpleMerge<
            foundry.data.fields.SchemaField.Internal.InitializedType<AttributesData, {}>,
            {
              prof: number
            }
          >
        >,
        bastion: foundry.data.fields.SchemaField<{
          name: foundry.data.fields.StringField<{ required: true }>,
          description: foundry.data.fields.HTMLField
        }>,
        details: foundry.data.fields.SchemaField<
          DetailsData,
          { label: "DND5E.Details" }
        >,
        traits: foundry.data.fields.SchemaField<
          fvttUtils.SimpleMerge<
            typeof TraitsFields['common'],
            fvttUtils.SimpleMerge<
              typeof TraitsFields['creature'],
              {
                weaponProf: SimpleTraitField<dnd5e.types.WeaponProficiency.CompleteTypeKey, {
                  mastery: foundry.data.fields.SchemaField<{
                    value: foundry.data.fields.SetField<foundry.data.fields.StringField<{}, dnd5e.types.WeaponProficiency.TypeKey, dnd5e.types.WeaponProficiency.TypeKey, dnd5e.types.WeaponProficiency.TypeKey>>,
                    bonus: foundry.data.fields.SetField<foundry.data.fields.StringField>
                  }>
                }, { label: "DND5E.TraitWeaponProf" }
                >,
                armorProf: SimpleTraitField<dnd5e.types.ArmorProficiency.CompleteTypeKey, {}, { label: "DND5E.TraitArmorProf" }>
              }
            >
          >, { label: "DND5E.Traits" }
        >,
        resources: foundry.data.fields.SchemaField<{
          primary: ResourceDataField<{ label: "DND5E.ResourcePrimary" }>,
          secondary: ResourceDataField<{ label: "DND5E.ResourceSecondary" }>,
          tertiary: ResourceDataField<{ label: "DND5E.ResourceTertiary" }>
        }, { label: "DND5E.Resources" }>,
        favorites: foundry.data.fields.ArrayField<
          foundry.data.fields.SchemaField<{
            type: foundry.data.fields.StringField<{ required: true, blank: false }, CharacterData.FavoriteType, CharacterData.FavoriteType, CharacterData.FavoriteType>,
            id: foundry.data.fields.StringField<{ required: true, blank: false }>,
            sort: foundry.data.fields.IntegerSortField
          }>,
          { label: "DND5E.Favorites" }
        >,
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
          foundry.data.fields.SchemaField.InitializedData<{
            type: CreatureTypeField,
            xp: foundry.data.fields.SchemaField<
              {},
              {
                required: true,
                nullable: false
              },
              {},
              {
                min: number,
                max: number,
                pct: number,
                boonsEarned?: number
              },
              {}
            >,
          }> & {
            level: number
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
          foundry.data.fields.SchemaField.InitializedData<{
            hp: foundry.data.fields.SchemaField<
              {},
              {
                required: true,
                nullable: false
              },
              {},
              {
                max: number,
                effectiveMax: number,
                value: number,
                damage: number,
                pct: number
              },
              {}
            >
          }> & {
            hd: HitDice
          }
        >
      }
    >,
    fvttUtils.RemoveIndexSignatures<
      dnd5e.types.DataModelConfig.Actor.character.OverrideSchema
    >
  >
> {
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

  static override _systemType: "character";

  /* -------------------------------------------- */

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Level used to determine cantrip scaling.
   */
  cantripLevel(spell: Item.Implementation): number

  /* -------------------------------------------- */

  /**
   * Checks whether the item with the given relative UUID has been favorited
   */
  hasFavorite(favoriteId: string): boolean

  /* -------------------------------------------- */

  /**
   * Add a favorite item to this actor.
   * If the given item is already favorite, this method has no effect.
   * @throws If the item intended to be favorited does not belong to this actor.
   */
  addFavorite(favorite: CharacterData.ActorFavorite5e): Promise<Actor.Implementation>

  /* -------------------------------------------- */

  /**
   * Removes the favorite with the given relative UUID or resource ID
   */
  removeFavorite(favoriteId: string): Promise<Actor.Implementation>
}


declare namespace CharacterData {
  type Schema = dnd5e.types.GetSchema<typeof CharacterData>

  type FavoriteType = "activity" | "effect" | "item" | "skill" | "slots" | "tool";
  type ActorFavorite5e = CharacterData['favorites'][number]
}

export default CharacterData

/* -------------------------------------------- */

export type ResourceDataSchema = {
  value: foundry.data.fields.NumberField<{ required: true, integer: true, initial: 0, labels: "DND5E.ResourceValue" }>,
  max: foundry.data.fields.NumberField<{ required: true, integer: true, initial: 0, labels: "DND5E.ResourceMax" }>,
  sr: foundry.data.fields.BooleanField<{ required: true, labels: "DND5E.REST.Short.Recovery" }>,
  lr: foundry.data.fields.BooleanField<{ required: true, labels: "DND5E.REST.Long.Recovery" }>,
  label: foundry.data.fields.StringField<{ required: true, labels: "DND5E.ResourceLabel" }>
}

export type ResourceDataField<
  Options extends foundry.data.fields.SchemaField.Options<ResourceDataSchema> = foundry.data.fields.SchemaField.DefaultOptions
> = foundry.data.fields.SchemaField<ResourceDataSchema, Options>

/**
 * Produce the schema field for a simple trait.
 */
declare function makeResourceField<
  Options extends foundry.data.fields.SchemaField.Options<ResourceDataSchema> = foundry.data.fields.SchemaField.DefaultOptions
>(schemaOptions?: Options): ResourceDataField<Options>
declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface Actor {
        character: typeof CharacterData
      }
      namespace Actor.character {
        interface OverrideSchema extends foundry.data.fields.DataSchema {

        }
      }
    }
  }
}
