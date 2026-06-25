/**
 * Follows the canonical item-grant pattern (design D8): the `configuration` and `value` fields are
 * supplied explicitly to `BaseSchema<Type, ConfigField, ValueField>`. Subclass registers NO
 * `configuration` dataModel (only `value`), so `configuration` falls back to the generic
 * `AdvancementDataField` payload — modeled here as an `ObjectField`. The `value` model
 * ({@link SubclassValueData}) records the chosen subclass document/uuid.
 */

import BaseAdvancementData from "./base-advancement.mjs";

declare global {
  namespace dnd5e.types.Advancement {
    namespace Subclass {
      /** The `value` model schema (the chosen subclass). */
      type ValueSchema = {
        /** Copy of the subclass on the actor. */
        document: dnd5e.types.fields.LocalDocumentField<globalThis.Item.Implementation>;
        /** UUID of the remote subclass source. */
        uuid: foundry.data.fields.DocumentUUIDField<{ type: "Item" }>;
      };

      type Schema = dnd5e.types.Advancement.BaseSchema<
        "Subclass",
        foundry.data.fields.ObjectField,
        foundry.data.fields.EmbeddedDataField<typeof SubclassValueData>
      >;
    }
  }
}

/**
 * Value data for Subclass advancement.
 * @extends {foundry.abstract.DataModel<SubclassAdvancementValueData>}
 * @mixes SubclassAdvancementValueData
 */
declare class SubclassValueData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.Subclass.ValueSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.Subclass.ValueSchema;
}

declare class BaseSubclassAdvancementData extends BaseAdvancementData<dnd5e.types.Advancement.Subclass.Schema> {
  static override defineSchema(): dnd5e.types.Advancement.Subclass.Schema;
}

export default BaseSubclassAdvancementData;
export { SubclassValueData };
