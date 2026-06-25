/** Configuration application for hit points. */

import AdvancementConfig from "./advancement-config-v2.mjs";

declare class HitPointsConfig<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
  RenderContext extends object = HitPointsConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = HitPointsConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = HitPointsConfig.RenderOptions,
> extends AdvancementConfig<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace HitPointsConfig {
  interface Any extends HitPointsConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof HitPointsConfig<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance>
    extends AdvancementConfig.RenderContext<Document> {
    hitDie: string;
  }
  interface Configuration extends AdvancementConfig.Configuration {}
  interface RenderOptions extends AdvancementConfig.RenderOptions {}
}

export default HitPointsConfig;
