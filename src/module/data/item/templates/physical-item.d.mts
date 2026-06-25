/**
 * Data model template with information on physical items.
 *
 * A pure `SystemDataModel` template (parent = Item) carrying the shared physical-item fields
 * (container, quantity, weight, price, rarity) that physical item models fold in via
 * `ItemDataModel.mixin(...)`. Exposes its schema as a global interface so it composes through
 * `dnd5e.types.GetSchema<typeof PhysicalItemTemplate>` at the mixin site.
 */

import SystemDataModel from "../../abstract/system-data-model.mjs";

declare global {
  namespace dnd5e.types.Item.PhysicalItem {
    /** Derived (non-schema) data added during data preparation. */
    interface DerivedData extends fvttUtils.AnyObject {
      price?: {
        valueInGP?: number;
      };
    }

    interface Schema extends foundry.data.fields.DataSchema {
      // ForeignDocumentField(BaseItem, { idOnly: true }) — stored as the container item's id.
      // Assignment/Initialized are pinned to `string`: with `idOnly` the field IS an id string, and
      // this breaks the item-contains-item cycle (an Item's schema referencing the Item document would
      // re-enter `Item.system` resolution → circular).
      container: foundry.data.fields.ForeignDocumentField<
        typeof foundry.documents.BaseItem,
        { idOnly: true },
        string,
        string
      >;
      quantity: foundry.data.fields.NumberField<{
        required: true;
        nullable: false;
        integer: true;
        initial: 1;
        min: 0;
      }>;
      weight: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.NumberField<{ required: true; nullable: false; initial: 0; min: 0 }>;
        units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.WeightUnit.TypeKey, { required: true; blank: false }>;
      }>;
      price: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.NumberField<{ required: true; nullable: false; initial: 0; min: 0 }>;
        denomination: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Currency.TypeKey, { required: true; blank: false }>;
      }>;
      rarity: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemRarity.TypeKey | "", { required: true; blank: true }>;
    }

    /** Instance methods/getters this template MIXES onto a model (composed onto items via a companion interface). */
    interface Methods {
      /** Get a human-readable label for the price and denomination. */
      get priceLabel(): string | null;
      /** The weight of all of the items in an item stack. */
      get totalWeight(): number;
      /** Field specifications for physical items. */
      get physicalItemSheetFields(): object[];
      /** Prepare physical item properties. */
      preparePhysicalData(): void;
      /**
       * Set gear property for NPCs automatically, remove if created elsewhere.
       * @param data     The initial data object provided to the document creation request.
       * @param options  Additional options which modify the creation request.
       * @param user     The User requesting the document creation.
       */
      preCreateGear(data: object, options: object, user: User.Implementation): void;
      /**
       * Trigger a render on all sheets for items within which this item is contained.
       * @param options
       * @param options.rendering        Additional rendering options.
       * @param options.formerContainer  UUID of the former container if this item was moved.
       */
      _renderContainers(options?: { formerContainer?: string } & Record<string, unknown>): Promise<void>;
      // Return abstract `Document.Any`, NOT `Item.Implementation`: this template is mixed into ~7
      // physical item subtypes, so a concrete item return here is re-instantiated inside
      // `InterfaceToObject<Item>` for every one of them, closing the item-contains-item cycle and
      // tripping tsc's recursion limiter at scale. Callers narrow with `as dnd5e.types.Item.Implementation`.
      /** All of the containers this item is within up to the parent actor or collection. */
      allContainers(): Promise<globalThis.Item.Implementation[]>;
      /** Perform any necessary transformations on this item when claiming it as gear from an NPC. */
      asGear(): Promise<globalThis.Item.Implementation>;
      /** Retrieve information needed to present this item's name as gear on sheets and in embeds. */
      gearPresentationData(): { name: string; nameHTML: string; uuid: string };
      /**
       * Split a stack of this item into two.
       * @param splitQuantity  Number of items to split off into a new stack.
       */
      split(splitQuantity?: number): Promise<unknown> | void;
      /**
       * Calculate the total weight and return it in specific units.
       * @param units  Units in which the weight should be returned.
       */
      totalWeightIn(units: dnd5e.types.WeightUnit.TypeKey): number | Promise<number>;
    }
  }
}

export declare class PhysicalItemTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.PhysicalItem.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = dnd5e.types.Item.PhysicalItem.DerivedData,
> extends SystemDataModel<Schema, BaseData, DerivedData> {
  static override defineSchema(): dnd5e.types.Item.PhysicalItem.Schema;

  /** Maximum depth items can be nested in containers. */
  static MAX_DEPTH: number;

  /** Create filter configurations shared by all physical items. */
  static get compendiumBrowserPhysicalItemFilters(): [string, dnd5e.types.applications.CompendiumBrowserFilterDefinitionEntry][];
}
export declare interface PhysicalItemTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.PhysicalItem.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = dnd5e.types.Item.PhysicalItem.DerivedData,
> extends dnd5e.types.Item.PhysicalItem.Methods {}

export default PhysicalItemTemplate;
