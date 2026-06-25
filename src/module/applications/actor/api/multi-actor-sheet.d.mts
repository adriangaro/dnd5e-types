/**
 * An abstract class that implements functionality for sheets that contain multiple actors.
 *
 * Base for sheets that manage a collection of member actors (group & encounter sheets). Extends
 * {@link BaseActorSheet}; adds the member-management surface. Subclassable via the open interfaces.
 */

import BaseActorSheet from "./base-actor-sheet.mjs";

declare class MultiActorSheet<
  RenderContext extends foundry.applications.sheets.ActorSheetV2.RenderContext = MultiActorSheet.RenderContext,
  Configuration extends
    foundry.applications.sheets.ActorSheetV2.Configuration = MultiActorSheet.Configuration,
  RenderOptions extends
    foundry.applications.sheets.ActorSheetV2.RenderOptions = MultiActorSheet.RenderOptions,
> extends BaseActorSheet<RenderContext, Configuration, RenderOptions> {
  /** Description currently being edited. */
  editingDescriptionTarget: string | null;

  /**
   * Prepare rendering context for the description tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns
   * @protected
   */
  _prepareDescriptionContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /**
   * Prepare portrait context for members.
   * @param actor    The actor instance.
   * @param context  The render context.
   * @protected
   */
  _prepareMemberPortrait(actor: globalThis.Actor.Implementation, context: object): Promise<void>;

  /** Get context menu entries for group members. */
  _getEntryContextOptions(): foundry.applications.ux.ContextMenu.Entry<HTMLElement>[];

  /** Augment the DocumentSheetConfig with additional options. */
  static addDocumentSheetConfigOptions(
    app: foundry.applications.apps.DocumentSheetConfig.Any,
    html: HTMLElement,
  ): void;

  /** Handle persisting additional sheet configuration options. */
  static _applyDocumentSheetConfigOptions(event: SubmitEvent): void;
}

declare namespace MultiActorSheet {
  interface Any extends MultiActorSheet<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof MultiActorSheet<any, any, any>> {}

  interface RenderContext extends BaseActorSheet.RenderContext {
    enriched: { label: string; summary: string; full: string; value: string };
    editingDescription?: { target: string; value: unknown };
  }
  interface Configuration extends BaseActorSheet.Configuration {}
  interface RenderOptions extends BaseActorSheet.RenderOptions {}
}

export default MultiActorSheet;
