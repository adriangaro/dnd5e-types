/**
 * Data definition for Container items.
 *
 * Item subtype for containers. Mixes the standard physical/equippable item templates plus the
 * shared `CurrencyTemplate` (so a container can hold loose currency), and adds its own capacity,
 * properties, and (forced-to-1) quantity fields.
 */

import SystemDataModel, { ItemDataModel, ItemDataModelMixinOmit } from "./../abstract/system-data-model.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";
import type IdentifiableTemplate from "./templates/identifiable.mjs";
import type PhysicalItemTemplate from "./templates/physical-item.mjs";
import type EquippableItemTemplate from "./templates/equippable-item.mjs";
import { CurrencyTemplate } from "../actor/templates/_fields.mjs";
import type InventoryElement from "../../applications/components/inventory.mjs";

declare global {
  namespace dnd5e.types.Item.Container {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof ItemDescriptionTemplate,
      typeof IdentifiableTemplate,
      typeof PhysicalItemTemplate,
      typeof EquippableItemTemplate,
      typeof CurrencyTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + container's own fields. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Container.Templates>,
      {
        capacity: foundry.data.fields.SchemaField<{
          count: foundry.data.fields.NumberField<{ min: 0; integer: true }>;
          volume: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.NumberField<{ min: 0 }>;
            units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.VolumeUnit.TypeKey, { required: false; blank: true }>;
          }>;
          weight: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.NumberField<{ min: 0 }>;
            units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.WeightUnit.TypeKey, { required: false; blank: true }>;
          }>;
        }>;
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperty.Container.TypeKey, { required: true; blank: false }>
        >;
        quantity: foundry.data.fields.NumberField<{ min: 1; max: 1 }>;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the container subtype on the interface the funnel reads. */
    interface Item {
      container: typeof import("./container.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.container {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/**
 * The real `ItemDataModel.mixin(...)` base, but with `totalWeight` dropped from the mixed surface so
 * the class body can widen it to `number | Promise<number>` (a `Promise` when in a compendium).
 */
declare const ContainerData_base: ItemDataModelMixinOmit<
  ContainerData.Schema,
  ContainerData.Base,
  ContainerData.Derived,
  dnd5e.types.Item.Container.Templates,
  "totalWeight"
>;

declare class ContainerData extends ContainerData_base {
  static override _systemType: "container";
  static override defineSchema(): ContainerData.Schema;

  /** Default configuration for this item type's inventory section. */
  static get inventorySection(): InventoryElement.InventorySectionDescriptor;

  /** Items contained in this container. A promise if item is within a compendium. */
  get contents():
    | foundry.utils.Collection<globalThis.Item.Implementation>
    | Promise<foundry.utils.Collection<globalThis.Item.Implementation>>;

  /** Items in this container and any sub-containers. A promise if item is within a compendium. */
  get allContainedItems():
    | foundry.utils.Collection<globalThis.Item.Implementation>
    | Promise<foundry.utils.Collection<globalThis.Item.Implementation>>;

  /**
   * Fetch a specific contained item.
   * @param id  ID of the item to fetch.
   * @returns Item if found.
   */
  getContainedItem(id: string): globalThis.Item.Implementation | Promise<globalThis.Item.Implementation>;

  /** Number of items contained, including sub-containers. Promise if within a compendium. */
  get contentsCount(): number | Promise<number>;

  /** Weight of the items in this container. Promise if within a compendium. */
  get contentsWeight(): number | Promise<number>;

  /** Weight of this container with all of its contents. Promise if within a compendium. */
  get totalWeight(): number | Promise<number>;

  /**
   * Compute capacity information for this container.
   * @returns A descriptor with:
   *   - `value` — the current total weight or number of items in the container.
   *   - `max`   — the maximum total weight or number of items in the container.
   *   - `pct`   — the percentage of total capacity.
   *   - `units` — the units label.
   */
  computeCapacity(): Promise<{ value: number; max: number; pct: number; units: string }>;

  /**
   * Migrate the weightless property into `properties`.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static _migrateWeightlessData(source: object): void;
}

declare namespace ContainerData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Container.BaseSchema,
    dnd5e.types.DataModelConfig.Item.container.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.Item.container.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.Item.container.OverrideDerived
  >;
}

export default ContainerData;
