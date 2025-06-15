import BaseProficiencyConfig from "./base-proficiency-config.mjs";
type d = BaseProficiencyConfig.ValidDocument<
  Extract<`${dnd5e.types.Trait.TraitKeyPath<'skills'>}.${dnd5e.types.Skill.TypeKey}`, BaseProficiencyConfig.ValidTraitKeyCombinations>
>
/**
 * Configuration application for an actor's skills & tools.
 */
declare class SkillToolConfig<
  Trait extends 'skills' | 'tool' = 'skills' | 'tool',
  Key extends BaseProficiencyConfig.ValidKeysOfTrait<Trait> = BaseProficiencyConfig.ValidKeysOfTrait<Trait>,
  Document extends BaseProficiencyConfig.ValidDocument<
    Extract<`${dnd5e.types.Trait.TraitKeyPath<Trait>}.${Key}`, BaseProficiencyConfig.ValidTraitKeyCombinations>
  > = BaseProficiencyConfig.ValidDocument<
    Extract<`${dnd5e.types.Trait.TraitKeyPath<Trait>}.${Key}`, BaseProficiencyConfig.ValidTraitKeyCombinations>
  >,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseProficiencyConfig<
  Trait,
  Key,
  Document,
  SkillToolConfig.MakeRenderContext<RenderContext>,
  SkillToolConfig.MakeConfiguration<Configuration>,
  SkillToolConfig.MakeRenderOptions<RenderOptions>
> {
  // No specific methods/properties to declare in the boilerplate
}

declare namespace SkillToolConfig {
  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      abilityOptions: dnd5e.types.FormSelectOption[];
      proficiencyOptions: dnd5e.types.FormSelectOption[];
      section: string;
      global: {
        skill: boolean;
      };
    },
    Ctx
  >;
  type RenderContext = SkillToolConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  type Configuration = SkillToolConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  type RenderOptions = SkillToolConfig['__RenderOptions'];
}

export default SkillToolConfig;
