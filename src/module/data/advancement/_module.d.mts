/**
 * `dnd5e.dataModels.advancement` — runtime API members from
 * `module/data/advancement/_module.mjs`. Each member is exposed as BOTH a value
 * (`const` → constructor) and a type (`type` → instance), inside an OPEN namespace
 * so consumers can declaration-merge their own members.
 *
 * Names mirror the runtime `_module.mjs` aliases even where the v2 src class is named
 * differently:
 *   - `BaseAdvancement`              → v2 default of base-advancement.mjs (BaseAdvancementData)
 *   - `SpellConfigurationData`       → v2 default of spell-config.mjs (shared by item-grant + item-choice)
 *   - `ItemGrantConfigurationData`   → runtime default of item-grant-data.mjs; v2 named
 *                                      `BaseItemGrantConfigData` of item-grant-data.mjs
 *   - `scaleValue` (nested ns, runtime `export * as scaleValue`): exposes all runtime members —
 *     `ScaleValueConfigurationData` (v2 named `BaseScaleValueConfigData`),
 *     `ScaleValueEntryField` (deprecated), `ScaleValueType` and its five subclasses
 *     (Number/CR/Dice/Distance/Usage), and `TYPES`.
 */

declare global {
  namespace dnd5e.dataModels.advancement {
    const BaseAdvancement: typeof import("../advancement/base-advancement.mjs").default;
    type BaseAdvancement = import("../advancement/base-advancement.mjs").default;

    const SpellConfigurationData: typeof import("../advancement/spell-config.mjs").default;
    type SpellConfigurationData = import("../advancement/spell-config.mjs").default;

    const ItemGrantConfigurationData: typeof import("../advancement/item-grant-data.mjs").BaseItemGrantConfigData;
    type ItemGrantConfigurationData = import("../advancement/item-grant-data.mjs").BaseItemGrantConfigData;

    const AbilityScoreImprovementConfigurationData: typeof import("../advancement/ability-score-improvement-data.mjs").BaseAbilityScoreImprovementConfigData;
    type AbilityScoreImprovementConfigurationData = import("../advancement/ability-score-improvement-data.mjs").BaseAbilityScoreImprovementConfigData;

    const AbilityScoreImprovementValueData: typeof import("../advancement/ability-score-improvement-data.mjs").BaseAbilityScoreImprovementValueData;
    type AbilityScoreImprovementValueData = import("../advancement/ability-score-improvement-data.mjs").BaseAbilityScoreImprovementValueData;

    const ItemChoiceConfigurationData: typeof import("../advancement/item-choice-data.mjs").BaseItemChoiceConfigData;
    type ItemChoiceConfigurationData = import("../advancement/item-choice-data.mjs").BaseItemChoiceConfigData;

    const ItemChoiceValueData: typeof import("../advancement/item-choice-data.mjs").BaseItemChoiceValueData;
    type ItemChoiceValueData = import("../advancement/item-choice-data.mjs").BaseItemChoiceValueData;

    const ModifyItemConfigurationData: typeof import("../advancement/modify-item-data.mjs").BaseModifyItemConfigData;
    type ModifyItemConfigurationData = import("../advancement/modify-item-data.mjs").BaseModifyItemConfigData;

    const ModifyItemValueData: typeof import("../advancement/modify-item-data.mjs").BaseModifyItemValueData;
    type ModifyItemValueData = import("../advancement/modify-item-data.mjs").BaseModifyItemValueData;

    const SizeConfigurationData: typeof import("../advancement/size-data.mjs").BaseSizeConfigData;
    type SizeConfigurationData = import("../advancement/size-data.mjs").BaseSizeConfigData;

    const SizeValueData: typeof import("../advancement/size-data.mjs").BaseSizeValueData;
    type SizeValueData = import("../advancement/size-data.mjs").BaseSizeValueData;

    const TraitConfigurationData: typeof import("../advancement/trait-data.mjs").BaseTraitConfigData;
    type TraitConfigurationData = import("../advancement/trait-data.mjs").BaseTraitConfigData;

    const TraitValueData: typeof import("../advancement/trait-data.mjs").BaseTraitValueData;
    type TraitValueData = import("../advancement/trait-data.mjs").BaseTraitValueData;

    const SubclassValueData: typeof import("../advancement/subclass-data.mjs").SubclassValueData;
    type SubclassValueData = import("../advancement/subclass-data.mjs").SubclassValueData;

    namespace scaleValue {
      const ScaleValueConfigurationData: typeof import("../advancement/scale-value-data.mjs").BaseScaleValueConfigData;
      type ScaleValueConfigurationData = import("../advancement/scale-value-data.mjs").BaseScaleValueConfigData;

      const ScaleValueEntryField: typeof import("../advancement/scale-value-data.mjs").ScaleValueEntryField;
      type ScaleValueEntryField = import("../advancement/scale-value-data.mjs").ScaleValueEntryField;

      const ScaleValueType: typeof import("../advancement/scale-value-data.mjs").ScaleValueType;
      type ScaleValueType = import("../advancement/scale-value-data.mjs").ScaleValueType;

      const ScaleValueTypeNumber: typeof import("../advancement/scale-value-data.mjs").ScaleValueTypeNumber;
      type ScaleValueTypeNumber = import("../advancement/scale-value-data.mjs").ScaleValueTypeNumber;

      const ScaleValueTypeCR: typeof import("../advancement/scale-value-data.mjs").ScaleValueTypeCR;
      type ScaleValueTypeCR = import("../advancement/scale-value-data.mjs").ScaleValueTypeCR;

      const ScaleValueTypeDice: typeof import("../advancement/scale-value-data.mjs").ScaleValueTypeDice;
      type ScaleValueTypeDice = import("../advancement/scale-value-data.mjs").ScaleValueTypeDice;

      const ScaleValueTypeDistance: typeof import("../advancement/scale-value-data.mjs").ScaleValueTypeDistance;
      type ScaleValueTypeDistance = import("../advancement/scale-value-data.mjs").ScaleValueTypeDistance;

      const ScaleValueTypeUsage: typeof import("../advancement/scale-value-data.mjs").ScaleValueTypeUsage;
      type ScaleValueTypeUsage = import("../advancement/scale-value-data.mjs").ScaleValueTypeUsage;

      const TYPES: typeof import("../advancement/scale-value-data.mjs").TYPES;
      type TYPES = typeof import("../advancement/scale-value-data.mjs").TYPES;
    }
  }
}

export {};
