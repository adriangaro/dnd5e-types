/** Configuration application for ability score improvements. */

import AdvancementConfig from "./advancement-config-v2.mjs";

declare class AbilityScoreImprovementConfig<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
  RenderContext extends object = AbilityScoreImprovementConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = AbilityScoreImprovementConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = AbilityScoreImprovementConfig.RenderOptions,
> extends AdvancementConfig<Document, RenderContext, Configuration, RenderOptions> {
  /** @override */
  prepareConfigurationUpdate(configuration: object): Promise<object>;
}

declare namespace AbilityScoreImprovementConfig {
  interface Any extends AbilityScoreImprovementConfig<any, any, any, any> {}
  interface AnyConstructor
    extends fvttUtils.Identity<typeof AbilityScoreImprovementConfig<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance>
    extends AdvancementConfig.RenderContext<Document> {
    abilities: Partial<
      Record<
        dnd5e.types.Ability.TypeKey,
        {
          key: dnd5e.types.Ability.TypeKey;
          name: string;
          label: string;
          locked: {
            value: boolean;
            hint: string;
          };
          value: number;
          canIncrease: boolean;
          canDecrease: boolean;
        }
      >
    >;
    points: {
      key: "points";
      name: string;
      label: string;
      min: number;
      value: number;
      canIncrease: boolean;
      canDecrease: boolean;
    };
  }
  interface Configuration extends AdvancementConfig.Configuration {}
  interface RenderOptions extends AdvancementConfig.RenderOptions {}
}

export default AbilityScoreImprovementConfig;
