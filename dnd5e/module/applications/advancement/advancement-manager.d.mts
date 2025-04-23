import Advancement from "../../documents/advancement/advancement.mjs";
import { log } from "../../utils.mjs";
import Application5e from "../api/application.mjs";
import type AdvancementFlow from "./advancement-flow.d.mts";

/**
 * Internal type used to manage each step within the advancement process.
 */


/**
 * @typedef AdvancementManagerConfiguration
 * @property {boolean} [automaticApplication=false]  Apply advancement steps automatically if no user input is required.
 * @property {boolean} [showVisualizer=false]        Display the step debugging application.
 */

/**
 * Application for controlling the advancement workflow and displaying the interface.
 *
 * @param {Actor5e} actor        Actor on which this advancement is being performed.
 * @param {object} [options={}]  Additional application options.
 */
declare class AdvancementManager<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends Application5e<
  AdvancementManager.RenderContext<RenderContext>,
  AdvancementManager.Configuration<Configuration>,
  AdvancementManager.RenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The original actor to which changes will be applied when the process is complete.

   */
  actor: Actor.Implementation;

  /* -------------------------------------------- */

  /**
   * Is the prompt currently advancing through un-rendered steps?
   */
  #advancing: boolean;

  /* -------------------------------------------- */

  /**
   * A clone of the original actor to which the changes can be applied during the advancement process.
   */
  clone: Actor.Implementation;

  /* -------------------------------------------- */

  /**
   * Get the step that is currently in progress.
   */
  get step(): AdvancementManager.AdvancementStep | null

  /* -------------------------------------------- */

  /**
   * Step being currently displayed.
   */
  #stepIndex: number | null;

  /* -------------------------------------------- */

  /**
   * Individual steps that will be applied in order.
   * @type {AdvancementStep[]}
   */
  steps: AdvancementManager.AdvancementStep[];

  /* -------------------------------------------- */

  /**
   * Get the step before the current one.
   */
  get previousStep(): AdvancementManager.AdvancementStep | null

  /* -------------------------------------------- */

  /**
   * Get the step after the current one.
   */
  get nextStep(): AdvancementManager.AdvancementStep | null

  /* -------------------------------------------- */

  /**
   * Side application for debugging advancement steps.
   */
  #visualizer: AdvancementVisualizer | null;

  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /**
   * Construct a manager for a newly added advancement from drag-drop.
   * @param {Actor5e} actor               Actor from which the advancement should be updated.
   * @param {string} itemId               ID of the item to which the advancements are being dropped.
   * @param {Advancement[]} advancements  Dropped advancements to add.
   * @param {object} [options={}]         Rendering options passed to the application.
   * @returns {AdvancementManager}  Prepared manager. Steps count can be used to determine if advancements are needed.
   */
  static forNewAdvancement<
    This extends typeof AdvancementManager
  >(
    this: This,
    actor: Actor.Implementation,
    itemId: string,
    advancements: dnd5e.types.Advancement.Any[],
    options?: object
  ): InstanceType<This>

  /* -------------------------------------------- */

  /**
   * Construct a manager for a newly added item.
   * @param {Actor5e} actor         Actor to which the item is being added.
   * @param {object} itemData       Data for the item being added.
   * @param {object} [options={}]   Rendering options passed to the application.
   * @returns {AdvancementManager}  Prepared manager. Steps count can be used to determine if advancements are needed.
   */
  static forNewItem<
    This extends typeof AdvancementManager
  >(
    this: This,
    actor: Actor.Implementation,
    itemData: Item.CreateData,
    options?: object
  ): InstanceType<This>

  /**
   * Construct a manager for modifying choices on an item at a specific level.
   * @param {Actor5e} actor         Actor from which the choices should be modified.
   * @param {object} itemId         ID of the item whose choices are to be changed.
   * @param {number} level          Level at which the choices are being changed.
   * @param {object} [options={}]   Rendering options passed to the application.
   * @returns {AdvancementManager}  Prepared manager. Steps count can be used to determine if advancements are needed.
   */
  static forModifyChoices<
    This extends typeof AdvancementManager
  >(
    this: This,
    actor: Actor.Implementation,
    itemId: string,
    level: number,
    options?: object
  ): InstanceType<This>

  /* -------------------------------------------- */

  /**
   * Construct a manager for an advancement that needs to be deleted.
   * @param {Actor5e} actor         Actor from which the advancement should be unapplied.
   * @param {string} itemId         ID of the item from which the advancement should be deleted.
   * @param {string} advancementId  ID of the advancement to delete.
   * @param {object} [options={}]   Rendering options passed to the application.
   * @returns {AdvancementManager}  Prepared manager. Steps count can be used to determine if advancements are needed.
   */
  static forDeletedAdvancement<
    This extends typeof AdvancementManager
  >(
    this: This,
    actor: Actor.Implementation,
    itemId: string,
    advancementId: string,
    options?: object
  ): InstanceType<This>

  /* -------------------------------------------- */

  /**
   * Construct a manager for an item that needs to be deleted.
   * @param {Actor5e} actor         Actor from which the item should be deleted.
   * @param {string} itemId         ID of the item to be deleted.
   * @param {object} [options={}]   Rendering options passed to the application.
   * @returns {AdvancementManager}  Prepared manager. Steps count can be used to determine if advancements are needed.
   */
  static forDeletedItem<
    This extends typeof AdvancementManager
  >(
    this: This,
    actor: Actor.Implementation,
    itemId: string,
    options?: object
  ): InstanceType<This>

  /* -------------------------------------------- */

  /**
   * Construct a manager for a change in a class's levels.
   * @param actor         Actor whose level has changed.
   * @param classId        ID of the class being changed.
   * @param levelDelta     Levels by which to increase or decrease the class.
   * @param options        Rendering options passed to the application.
   * @returns Prepared manager. Steps count can be used to determine if advancements are needed.
   */
  static forLevelChange<
    This extends typeof AdvancementManager
  >(
    this: This,
    actor: Actor.Implementation,
    classId: string,
    levelDelta: string,
    options?: object
  ): InstanceType<This>
  /* -------------------------------------------- */

  /**
   * Create steps based on the provided level change data.
   * @param {string} classItem      Class being changed.
   * @param {number} levelDelta     Levels by which to increase or decrease the class.
   * @returns {AdvancementManager}  Manager with new steps.
   */
  createLevelChangeSteps(classItem: string, levelDelta: number): this

  /* -------------------------------------------- */

  /**
   * Creates advancement flows for all advancements at a specific level.
   * @param {Item5e} item                               Item that has advancement.
   * @param {number} level                              Level in question.
   * @param {object} [options={}]
   * @param {AdvancementStep[]} [options.findExisting]  Find if an existing matching flow exists.
   * @returns {AdvancementFlow[]}                       Created or matched flow applications.
   */
  static flowsForLevel<
    This extends typeof AdvancementManager
  >(
    this: This,
    item: Item.Implementation,
    level: number,
    options?: { findExisting: AdvancementManager.AdvancementStep[] }
  ): InstanceType<This>

  /* -------------------------------------------- */

  /**
   * Determine the proper working level either from the provided item or from the cloned actor.
   */
  static currentLevel(item: Item.Implementation, actor: Actor.Implementation): number

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle one of the buttons for moving through the process.
   */
  static #process(this: AdvancementManager, event: MouseEvent, target: HTMLElement): Promise<void>

  /* -------------------------------------------- */
  /*  Process                                     */
  /* -------------------------------------------- */

  /**
   * Advance through the steps until one requiring user interaction is encountered.
   * @param {object} config
   * @param {object} [config.automaticData]  Data provided to handle automatic application.
   * @param {Event} [config.event]           Triggering click event if one occurred.
   * @returns {Promise}
   */
  #forward(config?: {
    automaticData: object,
    event: Event
  }): Promise<void>
  /* -------------------------------------------- */

  /**
   * Add synthetic steps for any added or removed items with advancement.
   * @param {Item5e[]} preEmbeddedItems  Items present before the current step was applied.
   */
  #synthesizeSteps(preEmbeddedItems: Item.Implementation[])

  /* -------------------------------------------- */

  /**
   * Reverse through the steps until one requiring user interaction is encountered.
   * @param {Event} [event]                  Triggering click event if one occurred.
   * @param {object} [options]               Additional options to configure behavior.
   * @param {boolean} [options.render=true]  Whether to render the Application after the step has been reversed. Used
   *                                         by the restart workflow.
   * @returns {Promise}
   */
  #backward(event: Event, options?: { render: boolean }): Promise<void>
  /* -------------------------------------------- */

  /**
   * Remove synthetic steps for any added or removed items.
   * @param {Item5e[]} preEmbeddedItems  Items present before the current step was applied.
   */
  #clearSyntheticSteps(preEmbeddedItems: Item.Implementation[])

  /* -------------------------------------------- */

  /**
   * Reset back to the manager's initial state.
   * @param {MouseEvent} [event]  The triggering click event if one occurred.
   * @returns {Promise}
   */
  #restart(event: MouseEvent): Promise<void>

  /* -------------------------------------------- */

  /**
   * Apply changes to actual actor after all choices have been made.
   * @param {Event} event  Button click that triggered the change.
   * @returns {Promise}
   */
  #complete(event: Event): Promise<void>
}

declare namespace AdvancementManager {
  interface AdvancementStep {
    type: string;
    flow?: AdvancementFlow.Any;
    item?: Item.Implementation;
    class?: {
      item?: Item.OfType<'class'>;
      level?: number;
    };
    automatic?: boolean;
    synthetic?: boolean;
  }

  type RenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Ctx
  >
  type Configuration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      showVisualizer?: boolean
    },
    Cfg
  >
  type RenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
}

export default AdvancementManager;

/* -------------------------------------------- */

/**
 * Debug application for visualizing advancement steps.
 * Note: Intentionally not localized due to its nature as a debug application.
 */
declare class AdvancementVisualizer<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends Application5e<

  AdvancementVisualizer.RenderContext<RenderContext>,
  AdvancementVisualizer.Configuration<Configuration>,
  AdvancementVisualizer.RenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The advancement manager that this is visualizing.
   */
  get manager(): AdvancementManager
}

declare namespace AdvancementVisualizer {
  type RenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Ctx
  >
  type Configuration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      manager: AdvancementManager | null
    },
    Cfg
  >
  type RenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
}