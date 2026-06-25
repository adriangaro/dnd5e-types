/**
 * Field that stores advancement on an item.
 * The id-keyed polymorphic collection of advancements on an item (`system.advancement`). Alias over
 * the advancement registry's collection field, so new advancement types flow in automatically.
 *
 * The runtime `initialize()` returns `new AdvancementCollection(...)`, a `Collection` subclass with
 * `.get`/`.map`/`.toObject` — so the InitializedType is `dnd5e.types.Advancement.Collection`, NOT
 * `Record<id, RegistryInstance>`. This specialized alias carries the correct InitializedType so that
 * `system.advancement` (typed via `dnd5e.types.Item.Advancement.Schema`) resolves to `Collection`.
 */

declare global {
  namespace dnd5e.types.fields {
    /**
     * The field type for `system.advancement`: SOURCE = `Record<id, RegistrySource>`,
     * INITIALIZED = `dnd5e.types.Advancement.Collection` (a `foundry.utils.Collection` subclass
     * with `.toObject(source?)`), matching the runtime `initialize()` return value.
     */
    type AdvancementCollectionField = foundry.data.fields.ObjectField<
      dnd5e.types.fields.MappingField.DefaultOptions,
      Record<string, dnd5e.types.fields.RegistrySource<dnd5e.types.Advancement.Types>>,
      dnd5e.types.Advancement.Collection,
      Record<string, dnd5e.types.fields.RegistrySource<dnd5e.types.Advancement.Types>>
    >;
  }
}

/**
 * Field that stores advancement on an item.
 *
 * Module-scoped value class so `AdvancementCollectionField` is usable as a value (constructor).
 * The InitializedType is `dnd5e.types.Advancement.Collection` to match the runtime `initialize()`
 * which returns `new AdvancementCollection(model, entries)` — a Collection subclass with
 * `.get`/`.map`/`.toObject`.
 */
declare class AdvancementCollectionField extends foundry.data.fields.ObjectField<
  dnd5e.types.fields.MappingField.DefaultOptions,
  Record<string, dnd5e.types.fields.RegistrySource<dnd5e.types.Advancement.Types>>,
  dnd5e.types.Advancement.Collection,
  Record<string, dnd5e.types.fields.RegistrySource<dnd5e.types.Advancement.Types>>
> {
  constructor(options?: dnd5e.types.fields.MappingField.DefaultOptions);

  /**
   * Advancements are created via updates to the parent Item. Update deltas that return from the
   * server are not cleaned as they are assumed to be good. For sparse data models, this means
   * those sparse fields are not present in the update delta since they do not survive
   * serialization. Therefore, we must always clean sparse data models.
   * @inheritDoc
   */
  initialize(
    value: Record<string, dnd5e.types.fields.RegistrySource<dnd5e.types.Advancement.Types>>,
    model: foundry.abstract.DataModel.Any,
    options?: fvttUtils.AnyObject,
  ): dnd5e.types.Advancement.Collection;
}

export { AdvancementCollectionField };
export {};
