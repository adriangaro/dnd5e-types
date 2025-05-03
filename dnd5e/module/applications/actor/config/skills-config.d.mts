import BaseProficiencyConfig from "./base-proficiency-config.mjs";
import TraitsConfig from "./traits-config.mjs";

/**
 * Configuration application for an actor's skills.
 */
declare class SkillsConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends TraitsConfig<
  SkillsConfig.MakeRenderContext<RenderContext>,
  SkillsConfig.MakeConfiguration<Configuration>,
  SkillsConfig.MakeRenderOptions<RenderOptions>
> {
  /**
     * Open the configuration sheet for a skill.
     * @this {SkillsConfig}
     * @param event         Triggering click event.
     * @param target  Button that was clicked.
     */
    static #configureSkill(this: SkillsConfig, event: Event, target: HTMLElement): Promise<void>
}

declare namespace SkillsConfig {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      skills: any
      rows: number
    },
    Ctx
  >;
  type RenderContext = SkillsConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  type Configuration = SkillsConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  type RenderOptions = SkillsConfig['__RenderOptions'];
}

export default SkillsConfig;
