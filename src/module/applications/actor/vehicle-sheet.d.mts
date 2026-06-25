/** Extension of base actor sheet for vehicles. */

import BaseActorSheet from "./api/base-actor-sheet.mjs";

declare class VehicleActorSheet<
  RenderContext extends foundry.applications.sheets.ActorSheetV2.RenderContext = VehicleActorSheet.RenderContext,
  Configuration extends
    foundry.applications.sheets.ActorSheetV2.Configuration = VehicleActorSheet.Configuration,
  RenderOptions extends
    foundry.applications.sheets.ActorSheetV2.RenderOptions = VehicleActorSheet.RenderOptions,
> extends BaseActorSheet<RenderContext, Configuration, RenderOptions> {
  /** Cover labels keyed by cover value. */
  static COVER: Record<number, string>;

  /** Prepare crew context. */
  _prepareCrewContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare description context. */
  _prepareDescriptionContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare sidebar context. */
  _prepareSidebarContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare stations context. */
  _prepareStationsContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare render context for draft animals. */
  _prepareDraftAnimals(): Promise<Array<{ actor: globalThis.Actor.Implementation; capacity: number; subtitle: string; uuid: string }>>;

  /** Determine which categories an item should be assigned to. */
  _assignItemCategories(item: globalThis.Item.Implementation): Set<string>;

  /** Handle using an action station. */
  _onUseItem(event: PointerEvent, target: HTMLElement): void;

  /** Handle adjusting a crew member's area or adding a new one. */
  _onAdjustCrew(
    actor: Actor.Implementation,
    dest: dnd5e.types.applications.actor.CrewArea5e,
    options?: { src?: dnd5e.types.applications.actor.CrewArea5e }
  ): void;

  /** Handle assigning or unassigning a crew member to a station. */
  _onAssignCrew(
    actor: Actor.Implementation,
    item: Item.Implementation,
    dest: dnd5e.types.applications.actor.CrewArea5e,
    options?: { src?: dnd5e.types.applications.actor.CrewArea5e }
  ): void;

  /** Group crew by UUID. */
  static groupCrew(crew: string[]): Record<string, number>;

  /** Resolve crew UUIDs. */
  static resolveCrew(
    group: Record<string, number>,
    counts?: Record<string, number>
  ): Promise<{ total: number; value: Array<{ actor: { cr: number | undefined; img: string; name: string; subtitle: string }; quantity: number; uuid: string; diff: number }> }>;

  /** Determine if the sheet should show a Crew & Passengers tab. */
  static vehicleHasCrew(vehicle: Actor.Implementation): boolean;
}

declare namespace VehicleActorSheet {
  interface Any extends VehicleActorSheet<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof VehicleActorSheet<any, any, any>> {}

  interface RenderContext extends BaseActorSheet.RenderContext {
    options: {
      showAbilities: boolean | undefined;
      showInitiative: boolean | undefined;
      showQuality: boolean | undefined;
    };
    crew?: {
      assigned: Awaited<ReturnType<typeof VehicleActorSheet.resolveCrew>>;
      unassigned: Awaited<ReturnType<typeof VehicleActorSheet.resolveCrew>>;
    };
    passengers?: Awaited<ReturnType<typeof VehicleActorSheet.resolveCrew>>;
    description?: string;
    hasConditions?: boolean;
    encumbrance?: { pct: number; max: number; value: number };
    traits?: object;
    properties?: { hp?: Array<{ label: string; value: number }>; [k: string]: unknown };
    actions?: Array<{ filled: boolean; n: number; label: string; classes: string }>;
    showTravelPace?: boolean;
    showTravelSpeed?: boolean;
    showCombatSpeed?: boolean;
    combatSpeed?: string;
    features?: object[];
    drafted?: Awaited<ReturnType<VehicleActorSheet["_prepareDraftAnimals"]>>;
    abilities?: object;
  }
  interface Configuration extends BaseActorSheet.Configuration {}
  interface RenderOptions extends BaseActorSheet.RenderOptions {}
}

export default VehicleActorSheet;
