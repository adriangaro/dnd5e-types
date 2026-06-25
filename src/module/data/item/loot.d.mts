/**
 * Data definition for Loot items.
 *
 * CANONICAL EXAMPLE (item subtype). Demonstrates the full item pattern:
 *  - the model `extends ItemDataModelMixin<Schema, Base, Derived, Templates>()` — a REAL mixin that
 *    surfaces the merged schema/derived overlay AND every template's instance methods AND statics
 *    (the runtime `ItemDataModel.mixin(...)` copies both member kinds onto the base),
 *  - Seam-D `OverrideSchema`/`OverrideBase`/`OverrideDerived` folded at a single point,
 *  - Seam-C registration on `dnd5e.types.DataModelConfig.Item` (read by the funnel).
 */

import SystemDataModel, { ItemDataModel, ItemDataModelMixin } from "./../abstract/system-data-model.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";
import type IdentifiableTemplate from "./templates/identifiable.mjs";
import type ItemTypeTemplate from "./templates/item-type.mjs";
import type PhysicalItemTemplate from "./templates/physical-item.mjs";
import type InventoryElement from "../../applications/components/inventory.mjs";

declare global {
  namespace dnd5e.types.Item.Loot {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof ItemDescriptionTemplate,
      typeof IdentifiableTemplate,
      typeof ItemTypeTemplate,
      typeof PhysicalItemTemplate,
    ];

    /**
     * Pre-Seam-D source schema: mixed template schemas + loot's own fields. Uses
     * `MergeTemplateSchemas` (templates only) rather than `MixedSchema` — the latter folds in
     * `GetSchema<typeof ItemDataModel>`, and since the base is the registered document model that
     * re-enters `Item.system` resolution and circularly references itself.
     */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Loot.Templates>,
      {
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperty.Loot.TypeKey, { required: true; blank: false }>
        >;
        // ItemTypeField({ baseItem: false }) → value + subtype only.
        // value = loot category (LootType); subtype is value-coupled.
        type: dnd5e.types.fields.ItemTypeField<{
          value: dnd5e.types.fields.RestrictedStringField<dnd5e.types.LootType.TypeKey | "", { required: true; blank: true }>;
          subtype: dnd5e.types.fields.RestrictedStringField<dnd5e.types.LootType.Subtype.TypeKey | "", { required: true; blank: true }>;
        }>;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the loot subtype on the interface the funnel reads. */
    interface Item {
      loot: typeof import("./loot.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.loot {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const LootData_base: ReturnType<
  typeof ItemDataModelMixin<LootData.Schema, LootData.Base, LootData.Derived, dnd5e.types.Item.Loot.Templates>
>;

declare class LootData extends LootData_base {
  static override _systemType: "loot";
  static override defineSchema(): LootData.Schema;

  /** Default configuration for this item type's inventory section. */
  static get inventorySection(): InventoryElement.InventorySectionDescriptor;

  /** Properties displayed in chat. */
  get chatProperties(): string[];
}

declare namespace LootData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Loot.BaseSchema,
    dnd5e.types.DataModelConfig.Item.loot.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.Item.loot.OverrideBase>;

  /**
   * Derived overlay: `prepareDerivedData` augments the `type` object with `label`.
   * A top-level `type` key in DerivedData REPLACES the schema `type`, so intersect-preserve the
   * initialized schema shape and add the derived key.
   */
  interface DerivedDefault {
    type: dnd5e.types.InitializedOf<LootData.Schema>["type"] & {
      label: string;
    };
  }
  type Derived = dnd5e.types.MergeData<DerivedDefault, dnd5e.types.DataModelConfig.Item.loot.OverrideDerived>;
}

export default LootData;
