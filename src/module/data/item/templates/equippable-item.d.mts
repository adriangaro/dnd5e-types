/**
 * Data model template with information on items that can be attuned and equipped.
 *
 * Pure `SystemDataModel` template (parent = Item) for items that can be attuned and equipped.
 */

import SystemDataModel from "../../abstract/system-data-model.mjs";

declare global {
  namespace dnd5e.types.Item.EquippableItem {
    interface Schema extends foundry.data.fields.DataSchema {
      attunement: dnd5e.types.fields.RestrictedStringField<dnd5e.types.AttunementType.TypeKey | "", { required: true; blank: true }>;
      attuned: foundry.data.fields.BooleanField;
      equipped: foundry.data.fields.BooleanField<{ required: true }>;
    }

    /** Instance methods this template MIXES onto a model (composed onto items via a companion interface). */
    interface Methods {
      /** This item is capable of being attuned. */
      get canAttune(): boolean;
      /** Chat properties for equippable items. */
      get equippableItemCardProperties(): string[];
      /** Are the magical properties of this item, such as magical bonuses to armor & damage, available? */
      get magicAvailable(): boolean;
      /**
       * Ensure items that cannot be attuned are not marked as attuned. If attuned and on an actor type that
       * tracks attunement, increase that actor's attunement count.
       */
      prepareFinalEquippableData(): void;
      /**
       * Set as equipped for NPCs, and unequipped for PCs.
       * @param data - The initial data object provided to the document creation request.
       * @param options - Additional options which modify the creation request.
       * @param user - The User requesting the document creation.
       */
      preCreateEquipped(data: object, options: object, user: User.Implementation): void;
    }
  }
}

export declare class EquippableItemTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.EquippableItem.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends SystemDataModel<Schema, BaseData, DerivedData> {
  static override defineSchema(): dnd5e.types.Item.EquippableItem.Schema;
  /** Create attunement filter configuration. */
  static get compendiumBrowserAttunementFilter(): dnd5e.types.applications.CompendiumBrowserFilterDefinitionEntry;
}
export declare interface EquippableItemTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.EquippableItem.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends dnd5e.types.Item.EquippableItem.Methods {}

export default EquippableItemTemplate;
