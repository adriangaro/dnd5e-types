/**
 * Data definition for Background items.
 *
 * Item subtype following the canonical loot pattern. Mixes Advancement, ItemDescription, and
 * StartingEquipment templates via `ItemDataModel.mixin(...)`; carries no own schema fields.
 */

import SystemDataModel from "../abstract/system-data-model.mjs";
import ItemDataModel, { ItemDataModelMixin } from "../abstract/item-data-model.mjs";
import type AdvancementTemplate from "./templates/advancement.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";
import type StartingEquipmentTemplate from "./templates/starting-equipment.mjs";

declare global {
  namespace dnd5e.types.Item.Background {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof AdvancementTemplate,
      typeof ItemDescriptionTemplate,
      typeof StartingEquipmentTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + background's own fields (none). */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Background.Templates>,
      {}
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the background subtype on the interface the funnel reads. */
    interface Item {
      background: typeof import("./background.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.background {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const BackgroundData_base: ReturnType<
  typeof ItemDataModelMixin<BackgroundData.Schema, BackgroundData.Base, BackgroundData.Derived, dnd5e.types.Item.Background.Templates>
>;

declare class BackgroundData extends BackgroundData_base {
  static override _systemType: "background";
  static override defineSchema(): BackgroundData.Schema;
}

declare namespace BackgroundData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Background.BaseSchema,
    dnd5e.types.DataModelConfig.Item.background.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.Item.background.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.Item.background.OverrideDerived
  >;
}

export default BackgroundData;
