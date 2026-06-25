/**
 * Activity type registry (Seam A) — the expandable map of activity `type` → DataModel constructor.
 *
 * Built-in activity files self-register one line into {@link dnd5e.types.Activity.DefaultTypes};
 * a downstream module adds `interface OverrideTypes { ping: typeof PingActivity }` and the new type
 * flows into the SOURCE union, the INSTANCE union, every item's `system.activities`, `getByType`,
 * and `CONFIG.DND5E.activityTypes` — with zero edits to any base or item model.
 */

declare global {
  namespace dnd5e.types {
    namespace Activity {
      /** Built-in types merge their key here (one line per activity file). */
      interface DefaultTypes extends Record<string, dnd5e.types.fields.AnyDataModelConstructor | never> {}
      /** Downstream merge point for new activity types. */
      interface OverrideTypes extends Record<string, dnd5e.types.fields.AnyDataModelConstructor | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<
        dnd5e.types.Activity.DefaultTypes,
        dnd5e.types.Activity.OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<dnd5e.types.Activity.Types>;

      /**
       * Per-activity-type EXPANDABLE set of valid parent item subtypes (mirrors `Advancement.ValidItemTypes`).
       * Each entry is an OPEN interface in the `ValidItemTypes` namespace, bridged by key — merge
       * `{ myItemType: true }` to allow an activity on more item types (built-ins or your own). Keys
       * with no entry accept any item. A restricted activity's document narrows via a body override:
       * `override get item(): dnd5e.types.Activity.ParentItemOf<"myActivity">;`.
       */
      interface ValidItemTypes {}
      namespace ValidItemTypes {}

      /** Resolve activity `K`'s parent-item type from its (expandable) valid-item-type set. */
      type ParentItemOf<K extends string> = K extends keyof dnd5e.types.Activity.ValidItemTypes
        ? globalThis.Item.OfType<
            Extract<dnd5e.types.ExtractKeys<dnd5e.types.Activity.ValidItemTypes[K]>, globalThis.Item.SubType>
          >
        : globalThis.Item.Implementation;

      /** Schema recovered through the registered constructor's `defineSchema`. */
      type Schema<T extends dnd5e.types.Activity.TypeKey = dnd5e.types.Activity.TypeKey> =
        dnd5e.types.fields.SchemaOf<dnd5e.types.Activity.Types[T]>;

      /**
       * Discriminated unions across all registered types. The INSTANCE union is `FixedInstanceType`
       * of each registered class — which surfaces the schema fields, the `TypeDataModel` DerivedData
       * overlay, AND the companion-interface mixin behavior — so no separate overlay registry is
       * needed.
       */
      type Instance = dnd5e.types.fields.RegistryInstance<dnd5e.types.Activity.Types>;
      type Source = dnd5e.types.fields.RegistrySource<dnd5e.types.Activity.Types>;
      type OfType<T extends dnd5e.types.Activity.TypeKey = dnd5e.types.Activity.TypeKey> = Extract<
        dnd5e.types.Activity.Instance,
        { type: T }
      >;

      /** SOURCE side of an Item's `system.activities` (id → discriminated source). */
      type Field = dnd5e.types.fields.TypedCollectionField<dnd5e.types.Activity.Types, string>;

      /** INITIALIZED read shape (runtime `initialize()` returns a Collection). */
      interface Collection extends foundry.utils.Collection<dnd5e.types.Activity.Instance> {
        getByType<T extends dnd5e.types.Activity.TypeKey>(type: T): dnd5e.types.Activity.OfType<T>[];
        getByTypes<T extends dnd5e.types.Activity.TypeKey>(
          ...types: T[]
        ): IterableIterator<dnd5e.types.Activity.OfType<T>>;
        toObject(source?: boolean): dnd5e.types.Activity.Source[];
        every(predicate: (value: dnd5e.types.Activity.Instance, index: number, collection: this) => boolean): boolean;
      }

      /** Shape of each `CONFIG.DND5E.activityTypes[key]`. */
      interface Config<T extends dnd5e.types.Activity.TypeKey = dnd5e.types.Activity.TypeKey> {
        documentClass: dnd5e.types.Activity.Types[T];
        configurable?: boolean;
        hidden?: boolean;
      }
    }
  }
}

export {};
