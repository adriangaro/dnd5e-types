import ActivityUsageDialog from "./activity-usage-dialog.mjs";

/**
 * Dialog for configuring the usage of an order activity.
 */
export default class OrderUsageDialog extends ActivityUsageDialog<
  dnd5e.types.Activity.OfType<'order'>,
  {
    build: dnd5e.applications.api.Application5e.FieldsConfig
    costs: {
      days: dnd5e.applications.api.Application5e.FieldsConfig
      fold: dnd5e.applications.api.Application5e.FieldsConfig
    }
    craft: {
      legend: string,
      item: dnd5e.applications.api.Application5e.FieldsConfig
      isHarvesting: boolean,
      quantity: dnd5e.applications.api.Application5e.FieldsConfig
      baseItem: dnd5e.applications.api.Application5e.FieldsConfig
      value: dnd5e.applications.api.Application5e.FieldsConfig
    }
    days: number,
    gold: number
    trade: {
      stocked: dnd5e.applications.api.Application5e.FieldsConfig
      sell: dnd5e.applications.api.Application5e.FieldsConfig
      stock: dnd5e.applications.api.Application5e.FieldsConfig
      creatures: {
        price: dnd5e.applications.api.Application5e.FieldsConfig
        hint: string,
        buy: ({
          removable: boolean,
          uuid: string,
          img: string,
          name: string
        } | { empty: true })[]
        sell: dnd5e.applications.api.Application5e.FieldsConfig & {
          contentLink: string
        }[]
      }
    }
  },
  {

  },
  {
    days?: number | null,
    gold?: number | null
  }
> {
  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare render context for the build section.
   * @param context  Render context.
   * @param options   Render options.
   * @protected
   */
  _prepareBuildContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /**
   * Prepare render context for the costs section.
   * @param context  Render context.
   * @param options   Render options.
   * @param options.days               The cost in days.
   * @param options.gold               The cost in gold.
   * @protected
   */
  _prepareCostsContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>
  /* -------------------------------------------- */

  /**
   * Prepare render context for the craft section.
   * @param context  Render context.
   * @param options   Render options.
   * @protected
   */
   _prepareCraftContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>
  /* -------------------------------------------- */

  /**
   * Prepare render context for the enlarge order.
   * @param context  Render context.
   * @param options   Render options.
   * @returns The costs associated with performing this order.
   * @protected
   */
  _prepareEnlargeContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /** @override */
  _prepareFooterContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>
   

  /* -------------------------------------------- */

  /**
   * Prepare render context for orders.
   * @param context  Render context.
   * @param options   Render options.
   * @protected
   */
  _prepareOrderContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<void>


  /* -------------------------------------------- */

  /**
   * Prepare render context for the trade order.
   * @param context  Render context.
   * @param options   Render options.
   * @protected
   */
  _prepareTradeContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<void>

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /**
   * Prepare submission data for build orders.
   * @param submitData  Submission data.
   * @protected
   */
  _prepareBuildData(submitData: object)

  /* -------------------------------------------- */

  /**
   * Prepare submission data for craft orders.
   * @param submitData  Submission data.
   * @protected
   */
  _prepareCraftData(submitData: object): Promise<void>

  /* -------------------------------------------- */

  /**
   * Prepare submission data for trade orders.
   * @param submitData  Submission data.
   * @protected
   */
  _prepareTradeData(submitData: object): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle removing a configured occupant.
   * @param event  The triggering event.
   * @param target  The event target.
   */
  static #onDeleteOccupant(this: OrderUsageDialog, event: PointerEvent, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle clearing the currently configured item for crafting.
   */
  static #onRemoveCraft(this: OrderUsageDialog)
}
