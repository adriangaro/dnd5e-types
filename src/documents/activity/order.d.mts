/**
 * An activity for issuing an order to a facility.
 * The document = `ActivityMixin(BaseOrderActivityData)`, registered as the `"order"` type.
 */

import type BaseOrderActivityData from "../../module/data/activity/order-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const OrderActivity_base: ReturnType<typeof ActivityMixin<typeof BaseOrderActivityData>>;

declare class OrderActivity extends OrderActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "order" };

  /**
   * Is this order currently in the process of being executed by its facility?
   */
  get inProgress(): boolean;

  /* -------------------------------------------- */
  /*  Activation                                  */
  /* -------------------------------------------- */

  /**
   * Update building configuration.
   * @param usageConfig  Order configuration.
   * @param updates      Item updates.
   */
  protected _finalizeBuild(usageConfig: dnd5e.types.documents.activity.OrderUseConfiguration, updates: fvttUtils.AnyMutableObject): void;

  /**
   * Update costs.
   * @param usageConfig  Order configuration.
   * @param updates      Item updates.
   */
  protected _finalizeCosts(usageConfig: dnd5e.types.documents.activity.OrderUseConfiguration, updates: fvttUtils.AnyMutableObject): void;

  /**
   * Update crafting configuration.
   * @param usageConfig  Order configuration.
   * @param updates      Item updates.
   */
  protected _finalizeCraft(usageConfig: dnd5e.types.documents.activity.OrderUseConfiguration, updates: fvttUtils.AnyMutableObject): void;

  /**
   * Update facility size.
   * @param usageConfig  Order configuration.
   * @param updates      Item updates.
   */
  protected _finalizeEnlarge(usageConfig: dnd5e.types.documents.activity.OrderUseConfiguration, updates: fvttUtils.AnyMutableObject): void;

  /**
   * Update trading configuration.
   * @param usageConfig  Order configuration.
   * @param updates      Item updates.
   */
  protected _finalizeTrade(usageConfig: dnd5e.types.documents.activity.OrderUseConfiguration, updates: fvttUtils.AnyMutableObject): void;
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      order: typeof OrderActivity;
    }
  }
}

export default OrderActivity;
