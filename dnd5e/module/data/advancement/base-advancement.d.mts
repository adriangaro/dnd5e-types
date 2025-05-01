import { SparseDataModel } from "../abstract.mjs";
import AdvancementDataField from "../fields/advancement-data-field.mjs";

/**
 * Base data model for advancement.
 */
declare class BaseAdvancement<
  Type extends dnd5e.types.Advancement.TypeKey,
  ConfigurationData extends AdvancementDataField.RequiredType,
  ValueData extends AdvancementDataField.RequiredType
> extends SparseDataModel<{
  _id: foundry.data.fields.DocumentIdField<{ initial: () => string }>,
  type: foundry.data.fields.StringField<{
    required: true,
    initial: Type,
    validate: (v: string) => boolean,
    validationError: string
  }, Type, Type, Type>,
  configuration: AdvancementDataField<ConfigurationData, { required: true }>,
  value: AdvancementDataField<ValueData, { required: true }>,
  level: foundry.data.fields.NumberField<{
    integer: true, initial: number, min: 0, label: "DND5E.Level"
  }>,
  title: foundry.data.fields.StringField<{ initial: undefined, label: "DND5E.AdvancementCustomTitle" }>,
  hint: foundry.data.fields.StringField<{ label: "DND5E.AdvancementHint" }>,
  icon: foundry.data.fields.FilePathField<{
    initial: undefined, categories: ["IMAGE"], label: "DND5E.AdvancementCustomIcon", base64: true
  }>,
  classRestriction: foundry.data.fields.StringField<
    {
      initial: undefined, choices: ["primary", "secondary"], label: "DND5E.AdvancementClassRestriction"
    },
    undefined | "primary" | "secondary", undefined | "primary" | "secondary", undefined | "primary" | "secondary"
  >
}, null> {
  /**
   * Name of this advancement type that will be stored in config and used for lookups.
   */
  static get typeName(): string;

}

export default BaseAdvancement;