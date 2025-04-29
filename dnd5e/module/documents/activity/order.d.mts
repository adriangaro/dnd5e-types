import ActivityMixin from "./mixin.mjs";
import OrderActivityData from "../../data/activity/order-data.mjs";

/**
 * An activity for issuing an order to a facility.
 */
declare class OrderActivity extends ActivityMixin(OrderActivityData) {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Is this order currently in the process of being executed by its facility?
   */
  get inProgress(): boolean

  /* -------------------------------------------- */
  /*  Activation                                  */
  /* -------------------------------------------- */
  use(
    usage?: OrderActivity.UseConfiguration,
    dialog?: dnd5e.types.Activity.DialogConfiguration,
    message?: dnd5e.types.Activity.MessageConfiguration
  ): Promise<dnd5e.types.Activity.UsageResults | void>

  consume(
    usageConfig: OrderActivity.UseConfiguration,
    messageConfig: dnd5e.types.Activity.MessageConfiguration
  ): dnd5e.types.Activity.UsageResults | false

  /**
   * Update building configuration.
   * @param usageConfig  Order configuration.
   * @param updates                     Item updates.
   * @protected
   */
  _finalizeBuild(usageConfig: OrderActivity.UseConfiguration, updates: dnd5e.types.Activity.UsageResults)

  /* -------------------------------------------- */

  /**
   * Update costs.
   * @param usageConfig  Order configuration.
   * @param updates                     Item updates.
   * @protected
   */
  _finalizeCosts(usageConfig: OrderActivity.UseConfiguration, updates: dnd5e.types.Activity.UsageResults)

  /* -------------------------------------------- */

  /**
   * Update crafting configuration.
   * @param usageConfig  Order configuration.
   * @param updates                     Item updates.
   * @protected
   */
  _finalizeCraft(usageConfig: OrderActivity.UseConfiguration, updates: dnd5e.types.Activity.UsageResults)

  /* -------------------------------------------- */

  /**
   * Update facility size.
   * @param usageConfig  Order configuration.
   * @param updates                     Item updates.
   * @protected
   */
  _finalizeEnlarge(usageConfig: OrderActivity.UseConfiguration, updates: dnd5e.types.Activity.UsageResults)

  /* -------------------------------------------- */

  /**
   * Update trading configuration.
   * @param usageConfig  Order configuration.
   * @param updates                     Item updates.
   * @protected
   */
  _finalizeTrade(usageConfig: OrderActivity.UseConfiguration, updates: dnd5e.types.Activity.UsageResults)

  /* -------------------------------------------- */

  /** @override */
  _finalizeUsage(usageConfig: OrderActivity.UseConfiguration, updates: dnd5e.types.Activity.UsageResults): Promise<Item.Implementation>

  /* -------------------------------------------- */

  /** @override */
  _prepareUsageConfig(config: OrderActivity.UseConfiguration)

  /* -------------------------------------------- */

  /** @override */
  _prepareUsageScaling(
    usageConfig: OrderActivity.UseConfiguration, 
    messageConfig: dnd5e.types.Activity.MessageConfiguration, 
    item: Item.Implementation
  )

  /* -------------------------------------------- */

  /** @override */
  _requiresConfigurationDialog(config: OrderActivity.UseConfiguration): true

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /**
   * Handle deducting currency for the order.
   * @this
   * @param event     The triggering event.
   * @param target     The button that was clicked.
   * @param message  The message associated with the activation.
   * @returns
   */
  static #onPayOrder(this: OrderActivity, event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation): Promise<void>
}

declare namespace OrderActivity {
  /**
 * Represents the configuration for an order activity.
 */
  export interface UseConfiguration extends dnd5e.types.Activity.UseConfiguration {
    /** Optional details about building a facility. */
    building?: {
      /** The size of the facility to build. */
      size?: string;
    };
    /** Optional cost details for executing the order. */
    costs?: {
      /** The cost of executing the order, in days. */
      days?: number;
      /** The cost of executing the order, in gold. */
      gold?: number;
      /** Whether the gold cost has been paid. */
      paid?: boolean;
    };
    /** Optional details about crafting or harvesting. */
    craft?: {
      /** The item being crafted or harvested. */
      item?: string;
      /** The quantity of items to harvest. */
      quantity?: number;
    };
    /** Optional details about a trade operation. */
    trade?: {
      /** Whether the trade was a sell operation. */
      sell?: boolean;
      /** Optional details about stocking inventory. */
      stock?: {
        /** Whether the order was to fully stock the inventory. */
        stocked?: boolean;
        /** The base value of goods transacted. */
        value?: number; // Assuming this should be number based on 'value' name, JSDoc says boolean which might be a typo
      };
      /** Optional details about trading creatures. */
      creatures?: {
        /** Additional animals purchased. */
        buy?: string[];
        /** Whether a creature in a given slot was sold. */
        sell?: boolean[];
        /** The base value of the animals sold. */
        price?: number;
      };
    };
  }
}

export default OrderActivity
