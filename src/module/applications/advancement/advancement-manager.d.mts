/** Application for controlling the advancement workflow and displaying the interface. */

import Application5e from "../api/application.mjs";
import type AdvancementFlow from "./advancement-flow-v2.mjs";

declare class AdvancementManager<
  RenderContext extends object = AdvancementManager.RenderContext,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = AdvancementManager.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = AdvancementManager.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  constructor(actor: Actor.Implementation, options?: fvttUtils.DeepPartial<Configuration>);

  /**
   * The original actor to which changes will be applied when the process is complete.
   */
  actor: Actor.Implementation;

  /**
   * A clone of the original actor to which the changes can be applied during the advancement process.
   */
  clone: Actor.Implementation;

  /** @inheritDoc */
  get subtitle(): string;

  /** @override */
  override get id(): string;

  /**
   * Get the step that is currently in progress.
   */
  get step(): AdvancementManager.AdvancementStep | null;

  /**
   * Individual steps that will be applied in order.
   */
  steps: AdvancementManager.AdvancementStep[];

  /**
   * Get the step before the current one.
   */
  get previousStep(): AdvancementManager.AdvancementStep | null;

  /**
   * Get the step after the current one.
   */
  get nextStep(): AdvancementManager.AdvancementStep | null;

  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /**
   * Construct a manager for a newly added advancement from drag-drop.
   * @param actor        Actor from which the advancement should be updated.
   * @param itemId       ID of the item to which the advancements are being dropped.
   * @param advancements Dropped advancements to add.
   * @param options      Rendering options passed to the application.
   * @returns Prepared manager. Steps count can be used to determine if advancements are needed.
   */
  static forNewAdvancement<This extends typeof AdvancementManager>(
    this: This,
    actor: Actor.Implementation,
    itemId: string,
    advancements: dnd5e.types.Advancement.Instance[],
    options?: object
  ): InstanceType<This>;

  /**
   * Construct a manager for a newly added item.
   * @param actor    Actor to which the item is being added.
   * @param itemData Data for the item being added.
   * @param options  Rendering options passed to the application.
   * @returns Prepared manager. Steps count can be used to determine if advancements are needed.
   */
  static forNewItem<This extends typeof AdvancementManager>(
    this: This,
    actor: Actor.Implementation,
    itemData: object,
    options?: object
  ): InstanceType<This>;

  /**
   * Construct a manager for modifying choices on an item at a specific level.
   * @param actor   Actor from which the choices should be modified.
   * @param itemId  ID of the item whose choices are to be changed.
   * @param level   Level at which the choices are being changed.
   * @param options Rendering options passed to the application.
   * @returns Prepared manager. Steps count can be used to determine if advancements are needed.
   */
  static forModifyChoices<This extends typeof AdvancementManager>(
    this: This,
    actor: Actor.Implementation,
    itemId: string,
    level: number,
    options?: object
  ): InstanceType<This>;

  /**
   * Construct a manager for an advancement that needs to be deleted.
   * @param actor         Actor from which the advancement should be unapplied.
   * @param itemId        ID of the item from which the advancement should be deleted.
   * @param advancementId ID of the advancement to delete.
   * @param options       Rendering options passed to the application.
   * @returns Prepared manager. Steps count can be used to determine if advancements are needed.
   */
  static forDeletedAdvancement<This extends typeof AdvancementManager>(
    this: This,
    actor: Actor.Implementation,
    itemId: string,
    advancementId: string,
    options?: object
  ): InstanceType<This>;

  /**
   * Construct a manager for an item that needs to be deleted.
   * @param actor   Actor from which the item should be deleted.
   * @param itemId  ID of the item to be deleted.
   * @param options Rendering options passed to the application.
   * @returns Prepared manager. Steps count can be used to determine if advancements are needed.
   */
  static forDeletedItem<This extends typeof AdvancementManager>(
    this: This,
    actor: Actor.Implementation,
    itemId: string,
    options?: object
  ): InstanceType<This>;

  /**
   * Construct a manager for a change in a class's levels.
   */
  static forLevelChange<This extends typeof AdvancementManager>(
    this: This,
    actor: Actor.Implementation,
    classId: string,
    levelDelta: number,
    options?: object
  ): InstanceType<This>;

  /**
   * Create steps based on the provided level change data.
   */
  createLevelChangeSteps(classItem: Item.Implementation, levelDelta: number): this;

  /**
   * Creates advancement flows for all advancements at a specific level.
   */
  static flowsForLevel(
    item: Item.Implementation | null,
    level: number,
    options?: { findExisting?: AdvancementManager.AdvancementStep[] }
  ): AdvancementFlow.Any[];

  /**
   * Determine the proper working level either from the provided item or from the cloned actor.
   * @param item  Item being advanced. If class or subclass, its level will be used.
   * @param actor Actor being advanced.
   * @returns Working level.
   */
  static currentLevel(item: Item.Implementation, actor: Actor.Implementation): number;
}

declare namespace AdvancementManager {
  interface Any extends AdvancementManager<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AdvancementManager<any, any, any>> {}

  /** Internal type used to manage each step within the advancement process. */
  interface AdvancementStep {
    type: "forward" | "reverse" | "restore" | "delete";
    flow?: AdvancementFlow.Any;
    item?: Item.Implementation;
    advancement?: dnd5e.types.Advancement.Instance;
    class?: {
      item?: Item.OfType<"class">;
      level?: number;
    };
    level?: number;
    automatic?: boolean;
    synthetic?: boolean;
    error?: unknown;
  }

  interface RenderContext extends Application5e.RenderContext {
    actor?: Actor.Implementation;
    flowClasses?: string;
    flowId?: string;
    steps?: {
      current: number;
      total: number;
      hasPrevious: boolean;
      hasNext: boolean;
    };
  }

  interface Configuration extends Application5e.Configuration {
    automaticApplication?: boolean;
    showVisualizer?: boolean;
  }

  interface RenderOptions extends Application5e.RenderOptions {}
}

export default AdvancementManager;
