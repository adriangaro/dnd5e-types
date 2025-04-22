import type AbilityScoreImprovementAdvancement from "@dnd5e/module/documents/advancement/ability-score-improvement.mjs";

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
  type BaseData = dnd5e.types.Advancement.AdvancementAssignmentData
  type Options = foundry.data.fields.DataField.Options<BaseData>;
  export import DefaultOptions = foundry.data.fields.ObjectField.DefaultOptions;
  type MergedOptions<Options extends AdvancementField.Options> = fvttUtils.SimpleMerge<DefaultOptions, Options>;
  type AssignmentType<
    Options extends AdvancementField.Options
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    BaseData,
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
    BaseData,
    MergedOptions<Options>
  >;
}

export default AdvancementField