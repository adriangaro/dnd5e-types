/** Dialog for configuring the usage of an order activity. */

import ActivityUsageDialog from "./activity-usage-dialog.mjs";

declare class OrderUsageDialog<
  RenderContext extends object = OrderUsageDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = OrderUsageDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = OrderUsageDialog.RenderOptions,
> extends ActivityUsageDialog<RenderContext, Configuration, RenderOptions> {
  /** Prepare render context for the build section. */
  _prepareBuildContext(context: RenderContext, options: RenderOptions): void;

  /**
   * Prepare render context for the costs section.
   * @param context - Render context.
   * @param options - Render options.
   * @param options.days - The cost in days.
   * @param options.gold - The cost in gold.
   */
  _prepareCostsContext(
    context: RenderContext,
    options: RenderOptions & { days?: number; gold?: number },
  ): void;

  /** Prepare render context for the craft section. */
  _prepareCraftContext(context: RenderContext, options: RenderOptions): Promise<void>;

  /**
   * Prepare render context for the enlarge order.
   * @returns The costs associated with performing this order.
   */
  _prepareEnlargeContext(
    context: RenderContext,
    options: RenderOptions,
  ): { days: number; gold: number };

  /** Prepare render context for orders. */
  _prepareOrderContext(context: RenderContext, options: RenderOptions): Promise<void>;

  /** Prepare render context for the trade order. */
  _prepareTradeContext(context: RenderContext, options: RenderOptions): Promise<void>;

  /** Handle drops onto the dialog. */
  _onDrop(event: DragEvent): void;

  /** Prepare submission data for build orders. */
  _prepareBuildData(submitData: object): void;

  /** Prepare submission data for craft orders. */
  _prepareCraftData(submitData: object): Promise<void>;

  /** Prepare submission data for trade orders. */
  _prepareTradeData(submitData: object): Promise<void>;
}

declare namespace OrderUsageDialog {
  interface Any extends OrderUsageDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof OrderUsageDialog<any, any, any>> {}

  interface RenderContext extends ActivityUsageDialog.RenderContext {
    build?: Omit<dnd5e.applications.api.FieldsConfig, "choices"> & {
      choices: { [K in dnd5e.types.Facility.Size.TypeKey]: dnd5e.types.Facility.SizeConfig };
    };
    costs?: {
      days: dnd5e.applications.api.FieldsConfig;
      gold: dnd5e.applications.api.FieldsConfig;
    };
    description?: string;
    craft?: {
      legend: string;
      item: dnd5e.applications.api.FieldsConfig;
      isHarvesting?: boolean;
      quantity?: dnd5e.applications.api.FieldsConfig;
      baseItem?: dnd5e.applications.api.FieldsConfig;
      value?: { img: string; name: string; contentLink: string };
    };
    trade?: {
      stocked?: dnd5e.applications.api.FieldsConfig;
      sell?: dnd5e.applications.api.FieldsConfig;
      stock?: dnd5e.applications.api.FieldsConfig;
      creatures?: {
        price: dnd5e.applications.api.FieldsConfig;
        hint: string;
        buy: ({ removable: boolean; uuid: string; img: string; name: string } | { empty: true })[];
        sell: (dnd5e.applications.api.FieldsConfig & { contentLink: string })[];
      };
    };
  }
  interface Configuration extends ActivityUsageDialog.Configuration {}
  interface RenderOptions extends ActivityUsageDialog.RenderOptions {}
}

export default OrderUsageDialog;
