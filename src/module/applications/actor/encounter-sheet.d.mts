/** Extension of the base actor sheet for encounter actors. */

import MultiActorSheet from "./api/multi-actor-sheet.mjs";

declare class EncounterActorSheet<
  RenderContext extends foundry.applications.sheets.ActorSheetV2.RenderContext = EncounterActorSheet.RenderContext,
  Configuration extends
    foundry.applications.sheets.ActorSheetV2.Configuration = EncounterActorSheet.Configuration,
  RenderOptions extends
    foundry.applications.sheets.ActorSheetV2.RenderOptions = EncounterActorSheet.RenderOptions,
> extends MultiActorSheet<RenderContext, Configuration, RenderOptions> {
  /** Prepare rendering context for the header. */
  protected _prepareHeaderContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare context for the members of the encounter. */
  protected _prepareMembersContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Explicitly suppresses position saving for this sheet. */
  _saveSheetPosition(): void;

  /** Handle incrementing or decrementing a numeric input. */
  protected _onAdjustInput(input: HTMLInputElement, delta: number): void;

  /** Intercept form changes to update member data by index. */
  override _onChangeForm(formConfig: object, event: Event): void;

  /** Handle delta inputs on member quantity fields. */
  override _onChangeInputDelta(event: Event): void;
}

declare namespace EncounterActorSheet {
  interface Any extends EncounterActorSheet<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof EncounterActorSheet<any, any, any>> {}

  interface RenderContext extends MultiActorSheet.RenderContext {
    subtitles?: string[];
    members?: object[];
    difficulty?: {
      value: number;
      max: number;
      pct: number;
      stops: { low: number; high: number };
    };
  }
  interface Configuration extends MultiActorSheet.Configuration {}
  interface RenderOptions extends MultiActorSheet.RenderOptions {}
}

export default EncounterActorSheet;
