/**
 * Follows the canonical advancement pattern (see `item-grant-data.d.mts`): `configuration` and `value`
 * are supplied explicitly to `BaseSchema<Type, ConfigField, ValueField>`. Here `configuration` is an
 * EmbeddedDataField over a local config DataModel and `value` an EmbeddedDataField over a value model.
 */

import BaseAdvancementData from "./base-advancement.mjs";

declare global {
  namespace dnd5e.types.Advancement {
    namespace ItemChoice {
      /** Embedded spell-configuration applied to granted spells (shared model). */
      type SpellConfigSchema = dnd5e.types.Advancement.SpellConfig.Schema;

      /** The `configuration` model schema. */
      type ConfigSchema = {
        /** Should players be able to drop non-listed items? */
        allowDrops: foundry.data.fields.BooleanField<{ initial: true }>;
        /** Choices & config for specific levels. */
        choices: dnd5e.types.fields.MappingField<
          foundry.data.fields.SchemaField<{
            count: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
            replacement: foundry.data.fields.BooleanField;
          }>
        >;
        /** Items that can be chosen. */
        pool: foundry.data.fields.ArrayField<
          foundry.data.fields.SchemaField<{
            sort: foundry.data.fields.IntegerSortField;
            uuid: foundry.data.fields.StringField;
          }>
        >;
        restriction: foundry.data.fields.SchemaField<{
          /** Level of spell allowed. */
          level: foundry.data.fields.StringField;
          /** Spell lists from which a spell must be selected. */
          list: foundry.data.fields.SetField<foundry.data.fields.StringField>;
          /** Item sub-type allowed. */
          subtype: foundry.data.fields.StringField;
          /** Specific item type allowed. */
          type: foundry.data.fields.StringField;
        }>;
        /** Sorting mode for the item list. */
        sorting: dnd5e.types.fields.RestrictedStringField<"a" | "m", { initial: "a" }>;
        /** Mutations applied to spell items. */
        spell: foundry.data.fields.EmbeddedDataField<typeof import("./spell-config.mjs").default, { nullable: true; initial: null }>;
        /** Type of item allowed, if it should be restricted. */
        type: dnd5e.types.fields.RestrictedStringField<globalThis.Item.SubType, { blank: false; nullable: true; initial: null }>;
      };

      /** The `value` model schema (what was chosen). */
      type ValueSchema = {
        /** Ability selected for the spells. */
        ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { blank: true }>;
        /** Mapping of IDs to UUIDs for items added at each level. */
        added: dnd5e.types.fields.MappingField<dnd5e.types.fields.MappingField<foundry.data.fields.StringField>>;
        /** Information on items replaced at each level. */
        replaced: dnd5e.types.fields.MappingField<
          foundry.data.fields.SchemaField<{
            level: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
            original: foundry.data.fields.ForeignDocumentField<typeof foundry.documents.BaseItem, { idOnly: true }>;
            replacement: foundry.data.fields.ForeignDocumentField<
              typeof foundry.documents.BaseItem,
              { idOnly: true; required: false }
            >;
          }>
        >;
      };

      type Schema = dnd5e.types.Advancement.BaseSchema<
        "ItemChoice",
        foundry.data.fields.EmbeddedDataField<typeof BaseItemChoiceConfigData>,
        foundry.data.fields.EmbeddedDataField<typeof BaseItemChoiceValueData>
      >;
    }
  }
}

/** Embedded configuration DataModel. */
declare class BaseItemChoiceConfigData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.ItemChoice.ConfigSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.ItemChoice.ConfigSchema;
  static override migrateData(source: fvttUtils.AnyMutableObject): fvttUtils.AnyMutableObject;
}

/** Embedded value DataModel. */
declare class BaseItemChoiceValueData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.ItemChoice.ValueSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.ItemChoice.ValueSchema;
}

declare class BaseItemChoiceAdvancementData extends BaseAdvancementData<dnd5e.types.Advancement.ItemChoice.Schema> {
  static override defineSchema(): dnd5e.types.Advancement.ItemChoice.Schema;
}

export default BaseItemChoiceAdvancementData;
export { BaseItemChoiceConfigData, BaseItemChoiceValueData };
