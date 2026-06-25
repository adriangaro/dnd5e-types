/** Inline application that presents the player with a choice between ability score improvement and taking a feat. */

import AdvancementFlow from "./advancement-flow-v2.mjs";
import AbilityScoreImprovementAdvancement from "../../../documents/advancement/ability-score-improvement.mjs";

declare class AbilityScoreImprovementFlow<
  RenderContext extends object = AbilityScoreImprovementFlow.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = AbilityScoreImprovementFlow.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = AbilityScoreImprovementFlow.RenderOptions,
> extends AdvancementFlow<RenderContext, Configuration, RenderOptions> {
  get advancement(): AbilityScoreImprovementAdvancement;

  /** Data on the feat selected. */
  get feat(): { item: globalThis.Item.Implementation; uuid: string } | null;

  /** Data on points that can be assigned. */
  get points(): { assigned: number; available: number; cap: number; total: number };

  protected _onDrop(event: DragEvent): Promise<false | null | void>;
}

declare namespace AbilityScoreImprovementFlow {
  interface Any extends AbilityScoreImprovementFlow<any, any, any> {}
  interface AnyConstructor
    extends fvttUtils.Identity<typeof AbilityScoreImprovementFlow<any, any, any>> {}

  interface RenderContext extends AdvancementFlow.RenderContext {
    advancement: AbilityScoreImprovementAdvancement;
    feat: globalThis.Item.Implementation | undefined;
    isASI: boolean;
    points: { assigned: number; available: number; cap: number; total: number };
    lockImprovement: boolean;
    abilities: Partial<
      Record<
        dnd5e.types.Ability.TypeKey,
        {
          key: dnd5e.types.Ability.TypeKey;
          max: number;
          min: number;
          value: number;
          name: string;
          label: string;
          initial: number;
          delta: string | null;
          showDelta: boolean;
          isDisabled: boolean;
          isFixed: boolean;
          isLocked: boolean;
          canIncrease: boolean;
          canDecrease: boolean;
          effectedValue: number | null;
        }
      >
    >;
    recommendation?: { img: string; name: string; uuid: string; checked: boolean; locked: boolean };
    pointCap: string;
    pointsRemaining: string;
    showASIFeat: boolean;
    showBrowseButton: boolean;
    showImprovement: boolean;
    staticIncrease: boolean;
  }
  interface Configuration extends AdvancementFlow.Configuration {}
  interface RenderOptions extends AdvancementFlow.RenderOptions {}
}

export default AbilityScoreImprovementFlow;
