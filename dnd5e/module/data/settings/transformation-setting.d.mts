import { createCheckboxInput } from "../../applications/fields.mjs";
import FormulaField from "../fields/formula-field.mjs";

/**
 * A data model that represents the transformation settings.
 */
declare class TransformationSetting extends foundry.abstract.DataModel<{
  effects: foundry.data.fields.SetField<
    dnd5e.types.fields.RestrictedStringField<dnd5e.types.Transform.Effects.TypeKey>
  >,
  keep: foundry.data.fields.SetField<
    dnd5e.types.fields.RestrictedStringField<dnd5e.types.Transform.Keep.TypeKey>
  >,
  merge: foundry.data.fields.SetField<
    dnd5e.types.fields.RestrictedStringField<dnd5e.types.Transform.Merge.TypeKey>
  >,
  other: foundry.data.fields.SetField<
    dnd5e.types.fields.RestrictedStringField<dnd5e.types.Transform.Other.TypeKey>
  >,
  preset: dnd5e.types.fields.RestrictedStringField<
    dnd5e.types.Transform.Presets.TypeKey, 
    { initial: null, nullable: true }
  >,
  tempFormula: FormulaField<{ deterministic: true }>,
  transformTokens: foundry.data.fields.BooleanField<{ initial: true }>
}> {
  /** @override */
  static LOCALIZATION_PREFIXES: string[];

  /* -------------------------------------------- */

  /**
   * Categories that define sets of booleans.
   */
  static BOOLEAN_CATEGORIES: readonly string[];

  /* -------------------------------------------- */

  /**
   * Populate the initial value for "effects", "keep", "merge", & "other" based on the settings.
   * @internal
   */
  static #initial(category: "effects" | "keep" | "merge" | "other"): string[];

  /* -------------------------------------------- */

  /**
   * Create a transformation setting object from an old TransformationOptions object.
   * @deprecated since DnD5e 4.4, targeted for removal in DnD5e 5.0
   */
  static _fromDeprecatedConfig(options: TransformationSetting.TransformationOptions): TransformationSetting;

  /* -------------------------------------------- */

  /**
   * Split a key in the old settings config to a new category and object.
   * @internal
   */
  static _splitDeprecatedKey(prop: string): [string | null, string];

  /* -------------------------------------------- */

  /**
   * Convert a transformation setting to an old config object.
   * @deprecated since DnD5e 4.4, targeted for removal in DnD5e 5.0
   */
  _toDeprecatedConfig(): TransformationSetting.TransformationOptions;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Generate form categories populated with data from this settings object.
   */
  createFormCategories(options?: {
    prefix?: string;
  }): Array<{
    category: string;
    title: string;
    hint: string;
    settings: Array<{
      field: foundry.data.fields.DataField;
      disabled?: boolean;
      input?: typeof createCheckboxInput;
      name: string;
      value: any;
    }>;
  }>;
}

declare namespace TransformationSetting {

  type Data = fvttUtils.PrettifyType<foundry.data.fields.SchemaField.InitializedData<dnd5e.types.GetSchema<typeof TransformationSetting>>>;

  /**
   * Options that determine what properties of the original actor are kept and which are replaced with
   * the target actor.
   * @deprecated since DnD5e 4.4, targeted for removal in DnD5e 5.0
   */
  interface TransformationOptions {
    /** Keep physical abilities (str, dex, con) */
    keepPhysical?: boolean;
    /** Keep mental abilities (int, wis, cha) */
    keepMental?: boolean;
    /** Keep saving throw proficiencies */
    keepSaves?: boolean;
    /** Keep skill proficiencies */
    keepSkills?: boolean;
    /** Take the maximum of the save proficiencies */
    mergeSaves?: boolean;
    /** Take the maximum of the skill proficiencies */
    mergeSkills?: boolean;
    /** Keep proficiency bonus */
    keepClass?: boolean;
    /** Keep features */
    keepFeats?: boolean;
    /** Keep spells and spellcasting ability */
    keepSpells?: boolean;
    /** Keep items */
    keepItems?: boolean;
    /** Keep biography */
    keepBio?: boolean;
    /** Keep vision */
    keepVision?: boolean;
    /** Keep self */
    keepSelf?: boolean;
    /** Keep all effects */
    keepAE?: boolean;
    /** Keep effects which originate on this actor */
    keepOriginAE?: boolean;
    /** Keep effects which originate on another actor */
    keepOtherOriginAE?: boolean;
    /** Keep effects which originate from actors spells */
    keepSpellAE?: boolean;
    /** Keep effects which originate from actors features */
    keepFeatAE?: boolean;
    /** Keep effects which originate on actors equipment */
    keepEquipmentAE?: boolean;
    /** Keep effects which originate from actors class/subclass */
    keepClassAE?: boolean;
    /** Keep effects which originate from actors background */
    keepBackgroundAE?: boolean;
    /** Keep HP & HD */
    keepHP?: boolean;
    /** Keep creature type */
    keepType?: boolean;
    /** Add temporary hit points equal to the target's max HP */
    addTemp?: boolean;
    /** Transform linked tokens too */
    transformTokens?: boolean;
    /** The transformation preset used (if any). */
    preset?: string;
  }
}

export default TransformationSetting;
