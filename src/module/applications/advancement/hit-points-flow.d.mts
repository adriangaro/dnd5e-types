/** Inline application that presents hit points selection upon level up. */

import AdvancementFlow from "./advancement-flow-v2.mjs";

declare class HitPointsFlow<
  RenderContext extends object = HitPointsFlow.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = HitPointsFlow.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = HitPointsFlow.RenderOptions,
> extends AdvancementFlow<RenderContext, Configuration, RenderOptions> {}

declare namespace HitPointsFlow {
  interface Any extends HitPointsFlow<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof HitPointsFlow<any, any, any>> {}

  interface RenderContext extends AdvancementFlow.RenderContext {
    data: {
      value: number | "";
      useAverage: boolean;
    };
    hp: {
      average: number;
      bonus: number;
      max: number;
      modifier: {
        label: string;
        value: number;
      };
      previous: number;
      total: number | "—";
    };
    hitDie: string;
    isFirstClassLevel: boolean;
    manual: boolean;
  }
  interface Configuration extends AdvancementFlow.Configuration {}
  interface RenderOptions extends AdvancementFlow.RenderOptions {}
}

export default HitPointsFlow;
