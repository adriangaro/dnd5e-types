/** Extension of the base actor sheet for group actors. */

import MultiActorSheet from "./api/multi-actor-sheet.mjs";

declare class GroupActorSheet<
  RenderContext extends foundry.applications.sheets.ActorSheetV2.RenderContext = GroupActorSheet.RenderContext,
  Configuration extends
    foundry.applications.sheets.ActorSheetV2.Configuration = GroupActorSheet.Configuration,
  RenderOptions extends
    foundry.applications.sheets.ActorSheetV2.RenderOptions = GroupActorSheet.RenderOptions,
> extends MultiActorSheet<RenderContext, Configuration, RenderOptions> {
  /** @override */
  override get inventorySource(): globalThis.Actor.Implementation;

  /** @override */
  declare tabGroups: { primary: string };

  /**
   * Prepare the header context.
   * @param context Shared context provided by _prepareContext.
   * @param options Options which configure application rendering behavior.
   * @returns The updated render context.
   * @override
   * @protected
   */
  protected _prepareHeaderContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /**
   * Prepare members context.
   * @param context Shared context provided by _prepareContext.
   * @param options Options which configure application rendering behavior.
   * @returns The updated render context.
   * @protected
   */
  protected _prepareMembersContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /**
   * Prepare encumbrance context for members.
   * @param actor   The actor instance.
   * @param context The render context.
   * @protected
   */
  protected _prepareMemberEncumbrance(actor: globalThis.Actor.Implementation, context: object): Promise<void>;

  /**
   * Prepare skills context for members.
   * @param actor   The actor instance.
   * @param context The render context.
   * @protected
   */
  protected _prepareMemberSkills(actor: globalThis.Actor.Implementation, context: object): void;

  /**
   * Prepare render context for player characters.
   * @param actor   The player character actor.
   * @param context The render context.
   * @param options Options which configure application rendering behavior.
   * @returns A promise resolving when context preparation is complete.
   * @protected
   */
  protected _prepareCharacterContext(
    actor: globalThis.Actor.Implementation,
    context: object,
    options: RenderOptions,
  ): Promise<void>;

  /**
   * Prepare render context for NPCs.
   * @param actor   The NPC actor.
   * @param context The render context.
   * @param options Options which configure application rendering behavior.
   * @returns A promise resolving when context preparation is complete.
   * @protected
   */
  protected _prepareNPCContext(
    actor: globalThis.Actor.Implementation,
    context: object,
    options: RenderOptions,
  ): Promise<void>;

  /**
   * Prepare render context for vehicles.
   * @param actor   The vehicle actor.
   * @param context The render context.
   * @param options Options which configure application rendering behavior.
   * @returns A promise resolving when context preparation is complete.
   * @protected
   */
  protected _prepareVehicleContext(
    actor: globalThis.Actor.Implementation,
    context: object,
    options: RenderOptions,
  ): Promise<void>;

  /**
   * Render a toggle for switching between inventories.
   * @protected
   */
  protected _renderInventoryToggle(): void;

  /** @override */
  override _openDocumentSheet(doc: foundry.abstract.Document.Any, options?: object): void;

  /** @override */
  override _onChangeForm(formConfig: object, event: Event): void;

  /** @override */
  protected override _onDropActor(
    event: DragEvent,
    actor: globalThis.Actor.Implementation,
  ): Promise<globalThis.Actor.Implementation>;

  /** @override */
  protected override _onDropItem(
    event: DragEvent,
    item: globalThis.Item.Implementation,
  ): Promise<globalThis.Item.Implementation | null>;
}

declare namespace GroupActorSheet {
  interface Any extends GroupActorSheet<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof GroupActorSheet<any, any, any>> {}

  interface RenderContext extends MultiActorSheet.RenderContext {
    showXP: boolean;
    travelPace: dnd5e.types.Actor.Group.TravelPaceDescriptor;
    members: Array<{
      id: string;
      type: string;
      img: string;
      name: string;
      system: object;
      uuid: string;
      hiddenStats: boolean;
      encumbrance: { pct: number; max: number; value: number };
      canView?: boolean;
      classes?: globalThis.Item.Implementation[];
      skills?: Record<string, { css: string; label: string; passive: number; total: number }>;
      underlay?: string;
    }>;
    sections: Record<"character" | "npc" | "vehicle", { members: object[]; hasStats?: boolean; label?: string }>;
    encumbrance?: { pct: number; max: number; value: number };
  }
  interface Configuration extends MultiActorSheet.Configuration {}
  interface RenderOptions extends MultiActorSheet.RenderOptions {}
}

export default GroupActorSheet;
