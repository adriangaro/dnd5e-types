
/**
 * Data field that selects the appropriate advancement data model if available, otherwise defaults to generic
 * `ObjectField` to prevent issues with custom advancement types that aren't currently loaded.
 */
declare class AdvancementField<
  const Options extends AdvancementField.Options = AdvancementField.DefaultOptions,
  const AssignmentType = AdvancementField.AssignmentType<Options>,
  const InitializedType = AdvancementField.InitializedType<Options>,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = AdvancementField.PersistedType<Options>,
> extends foundry.data.fields.ObjectField<
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {

  /**
   * Get the BaseAdvancement definition for the specified advancement type.
   */
  getModelForType<T extends dnd5e.types.Advancement.TypeKey = dnd5e.types.Advancement.TypeKey>(type: T): dnd5e.types.Advancement.Types[T]
}

declare namespace AdvancementField {
  type Options = foundry.data.fields.DataField.Options<
    foundry.data.fields.SchemaField.AssignmentData<
      dnd5e.types.Advancement.Schema
    >
  >
  type DefaultOptions = foundry.data.fields.ObjectField.DefaultOptions

  type MergedOptions<Options extends AdvancementField.Options> = fvttUtils.SimpleMerge<DefaultOptions, Options>;
  type AssignmentType<
    Options extends AdvancementField.Options
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    foundry.data.fields.SchemaField.AssignmentData<
      dnd5e.types.Advancement.Schema
    >,
    MergedOptions<Options>
  >;
  type InitializedType<
    Options extends AdvancementField.Options
  > = foundry.data.fields.DataField.DerivedInitializedType<
    dnd5e.types.Advancement.Any,
    MergedOptions<Options>
  >;
  type PersistedType<
    Options extends AdvancementField.Options
  > = foundry.data.fields.DataField.DerivedAssignmentType<
  foundry.data.fields.SchemaField.SourceData<
    dnd5e.types.Advancement.Schema
  >,
    MergedOptions<Options>
  >;
}

export default AdvancementField