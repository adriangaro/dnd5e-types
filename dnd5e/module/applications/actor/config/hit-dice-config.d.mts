import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Configuration application for adjusting hit dice amounts and rolling.
 */
declare class HitDiceConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
HitDiceConfig.MakeRenderContext<RenderContext>,
HitDiceConfig.MakeConfiguration<Configuration>,
HitDiceConfig.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle rolling a specific hit die.
   * @this {HitDiceConfig}
   * @param {PointerEvent} event  The triggering click event.
   * @param {HTMLElement} target  The button that was clicked.
   */
  static #rollDie(this: HitDiceConfig, event: PointerEvent, target: HTMLElement): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle stepping a hit die count up or down.
   * @this {HitDiceConfig}
   * @param {PointerEvent} event  The triggering click event.
   * @param {HTMLElement} target  The button that was clicked.
   */
  static #stepValue(this: HitDiceConfig, event: PointerEvent, target: HTMLElement): Promise<void>
}

declare namespace HitDiceConfig {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      classes: {
        data: Item.OfType<'class'>['system']['hd']
        denomination: number,
        id: string,
        label: string
      }[]
    },
    Ctx
  >;
  type RenderContext = HitDiceConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified in the provided .mjs
    },
    Cfg
  >;
  type Configuration = HitDiceConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // Add specific render options for HitDiceConfig if needed
    },
    Opt
  >;
  type RenderOptions = HitDiceConfig['__RenderOptions'];
}

export default HitDiceConfig;