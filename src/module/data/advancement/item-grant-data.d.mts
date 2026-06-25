/**
 * CANONICAL EXAMPLE (advancement). Establishes the per-type config/value pattern (design D8): the
 * `configuration` and `value` fields are supplied explicitly to `BaseSchema<Type, ConfigField,
 * ValueField>` (they're resolved from `metadata.dataModels` at runtime, a runtime-only linkage). Here
 * `configuration` is an EmbeddedDataField over a local config DataModel; `value` a SchemaField.
 * The document (`documents/advancement/item-grant.d.mts`) is `AdvancementMixin(this)` and registers.
 */

import BaseAdvancementData from "./base-advancement.mjs";

declare global {
  namespace dnd5e.types.Advancement {
    namespace ItemGrant {
      /** The `configuration` model schema. */
      type ConfigSchema = {
        /** Data for the items to be granted. */
        items: foundry.data.fields.ArrayField<
          foundry.data.fields.SchemaField<{
            optional: foundry.data.fields.BooleanField;
            sort: foundry.data.fields.IntegerSortField;
            uuid: foundry.data.fields.StringField;
          }>,
          { required: true }
        >;
        /** Should user be able to de-select any individual option? */
        optional: foundry.data.fields.BooleanField<{ required: true }>;
        /** Sorting mode for the item list. */
        sorting: foundry.data.fields.StringField<{ initial: "m"; choices: readonly ("a" | "m")[] }>;
        /** Data used to modify any granted spells. */
        spell: foundry.data.fields.EmbeddedDataField<typeof import("./spell-config.mjs").default, { nullable: true }>;
      };

      /** The `value` model schema (what was granted). */
      type ValueSchema = {
        /** Flat object map of granted item id → source uuid. */
        added: foundry.data.fields.ObjectField<
          foundry.data.fields.DataField.Options<Record<string, string>>,
          Record<string, string> | null | undefined,
          Record<string, string>,
          Record<string, string>
        >;
        /** Spellcasting ability used when granting spells (if applicable). */
        ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { blank: true }>;
      };

      type Schema = dnd5e.types.Advancement.BaseSchema<
        "ItemGrant",
        foundry.data.fields.EmbeddedDataField<typeof BaseItemGrantConfigData>,
        foundry.data.fields.SchemaField<ValueSchema>
      >;
    }
  }
}

/** Configuration data for the Item Grant advancement. */
declare class BaseItemGrantConfigData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.ItemGrant.ConfigSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.ItemGrant.ConfigSchema;
}

declare class BaseItemGrantAdvancementData extends BaseAdvancementData<dnd5e.types.Advancement.ItemGrant.Schema> {
  static override defineSchema(): dnd5e.types.Advancement.ItemGrant.Schema;
}

export default BaseItemGrantAdvancementData;
export { BaseItemGrantConfigData };
