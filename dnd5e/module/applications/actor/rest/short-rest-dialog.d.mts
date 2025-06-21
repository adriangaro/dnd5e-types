import BaseRestDialog from "./base-rest-dialog.mjs";

/**
 * Dialog for configuring a short rest.
 */
declare class ShortRestDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseRestDialog<
  ShortRestDialog.MakeRenderContext<RenderContext>,
  ShortRestDialog.MakeConfiguration<Configuration>,
  ShortRestDialog.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Currently selected hit dice denomination.
   */
  #denom: string;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle rolling a hit die.
   * @this {ShortRestDialog}
   * @param event         Triggering click event.
   * @param target  Button that was clicked.
   */
  static #rollHitDie(this: ShortRestDialog, event: Event, target: HTMLElement)
}


declare namespace ShortRestDialog {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      autoRoll: foundry.data.fields.DataField.Any
      hitDice: {
        canRoll: boolean,
        denomination: string,
        options: dnd5e.types.FormSelectOption[]
      }
      denomination: number | string
    },
    Ctx
  >;
  type RenderContext = ShortRestDialog['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  type Configuration = ShortRestDialog['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  type RenderOptions = ShortRestDialog['__RenderOptions'];
}

export default ShortRestDialog;