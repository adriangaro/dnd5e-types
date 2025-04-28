import { ItemDataModel } from "../abstract.mjs";
import AdvancementField from "../fields/advancement-field.mjs";
import FormulaField from "../fields/formula-field.mjs";
import SpellcastingField from "./fields/spellcasting-field.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import StartingEquipmentTemplate from "./templates/starting-equipment.mjs";

declare class _ItemDataModel extends ItemDataModel {}
/**
 * Data definition for Class items.
 */
export default class ClassData extends _ItemDataModel.mixin(
  ItemDescriptionTemplate<'class'>, StartingEquipmentTemplate
)<
  dnd5e.types.MergeSchemas<
    {
      levels: foundry.data.fields.NumberField<{ required: true, nullable: false, integer: true, min: 0, initial: 1 }>,
      primaryAbility: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey>>,
        all: foundry.data.fields.BooleanField<{ initial: true }>
      }>,
      hd: foundry.data.fields.SchemaField<{
        additional: FormulaField<{ deterministic: true, required: true }>,
        denomination: dnd5e.types.fields.RestrictedStringField<`d${number}`, {
          required: true,
          initial: "d6",
          blank: false,
          validate: (v: string) => boolean,
          validationError: "must be a dice value in the format d#"
        }>,
        spent: foundry.data.fields.NumberField<{ required: true, nullable: false, integer: true, initial: 0, min: 0 }>
      }>,
      advancement: foundry.data.fields.ArrayField<AdvancementField, { label: "DND5E.AdvancementTitle" }>,
      spellcasting: SpellcastingField
    },
    {
      spellcasting: foundry.data.fields.SchemaField<
        {},
        SpellcastingField.DefaultOptions,
        {},
        {
          preparation: {
            value: number
          }
        }
      >,
      hd: foundry.data.fields.SchemaField<
        {},
        foundry.data.fields.SchemaField.DefaultOptions,
        {},
        {
          max: number,
          value: number
        }
      >
    }
  >
> {
  isOriginalClass: boolean;


  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */
  /* -------------------------------------------- */

  /** @inheritDoc */
  getFavoriteData: () => Promise<
    ItemDataModel.FavoriteData & {
      subtitle?: string,
      value: number
    }
  >


  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */

  /* -------------------------------------------- */

  /**
   * Migrate the hit dice data.
   */
  static #migrateHitDice(source: ClassData['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate the class levels.
   */
  static #migrateLevels(source: ClassData['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate the class's spellcasting string to object.
   */
  static #migrateSpellcastingData(source: ClassData['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate the class's saves & skills into TraitAdvancements.
   * @protected
   */
  static _migrateTraitAdvancement(source: ClassData['_source'])
}
