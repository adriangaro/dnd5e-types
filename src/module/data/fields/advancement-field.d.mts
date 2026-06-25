/**
 * Data field that selects the appropriate advancement data model if available, otherwise defaults to generic
 * `ObjectField` to prevent issues with custom advancement types that aren't currently loaded.
 *
 * Polymorphic single-advancement field: stored as a source object (`Advancement.Source`), initialized
 * to the resolved advancement instance (`Advancement.Instance`) via the registry, mirroring how
 * `ActivityField` swaps class by type. `Options` flows through so `required`/`nullable` narrow the value.
 */
declare class AdvancementField<
  const Options extends foundry.data.fields.DataField.Options<dnd5e.types.Advancement.Source> = foundry.data.fields.ObjectField.DefaultOptions,
> extends foundry.data.fields.ObjectField<
  Options,
  foundry.data.fields.DataField.DerivedAssignmentType<dnd5e.types.Advancement.Source, fvttUtils.SimpleMerge<foundry.data.fields.ObjectField.DefaultOptions, Options>>,
  foundry.data.fields.DataField.DerivedInitializedType<dnd5e.types.Advancement.Instance, fvttUtils.SimpleMerge<foundry.data.fields.ObjectField.DefaultOptions, Options>>,
  foundry.data.fields.DataField.DerivedInitializedType<dnd5e.types.Advancement.Source, fvttUtils.SimpleMerge<foundry.data.fields.ObjectField.DefaultOptions, Options>>
> {
  /**
   * Get the BaseAdvancement definition for the specified advancement type.
   * @param type  The Advancement type.
   * @returns     The BaseAdvancement class, or null.
   */
  getModelForType<T extends dnd5e.types.Advancement.TypeKey = dnd5e.types.Advancement.TypeKey>(
    type: T,
  ): dnd5e.types.Advancement.Types[T] | null;
}

export default AdvancementField;
