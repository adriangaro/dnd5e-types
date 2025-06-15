import { formatNumber } from "../../../utils.mjs";
import type { AttributionDescription } from "../../property-attribution.d.mts";
import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for hit point bonuses and current values.
 */
declare class HitPointsConfig<
  Document extends HitPointsConfig.ValidDocument = HitPointsConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  Document,
  HitPointsConfig.MakeRenderContext<RenderContext, Document>,
  HitPointsConfig.MakeConfiguration<Configuration>,
  HitPointsConfig.MakeRenderOptions<RenderOptions>
> {

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle rolling NPC health values using the provided formula.
   * @this 
   * @param event  The triggering click event.
   * @param target  The button that was clicked.
   * @protected
   */
  static #rollFormula(this: HitPointsConfig, event: PointerEvent, target: HTMLElement): Promise<void>
}

declare namespace HitPointsConfig {
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { attributes: { hp: any } } }>

  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Document extends ValidDocument = ValidDocument
  > = dnd5e.types.DeepMerge<
    {
      classes: {
        name: string
        anchor: string,
        id: string,
        total: number
      }[]
      effects: {
        bonuses: AttributionDescription[]
        max: AttributionDescription[]
        overall: AttributionDescription[]
      }
      levels: number,
      levelMultiplier: string
      showCalculation: boolean
      showMaxInCalculation: boolean
    },
    Ctx
  >;
  type RenderContext = HitPointsConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified in the provided .mjs
    },
    Cfg
  >;
  type Configuration = HitPointsConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // Add specific render options for HitPointsConfig if needed
    },
    Opt
  >;
  type RenderOptions = HitPointsConfig['__RenderOptions'];
}

export default HitPointsConfig;