/** Dialog for choosing an activity to use on an Item. */

import Application5e from "../api/application.mjs";

declare class ActivityChoiceDialog<
  RenderContext extends object = ActivityChoiceDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ActivityChoiceDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ActivityChoiceDialog.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  constructor(item: Item.Implementation, options?: Configuration);

  /** @override */
  get title(): string;

  /** The chosen activity. */
  get activity(): dnd5e.types.Activity.Instance | null;

  /** The Item whose activities are being chosen. */
  get item(): Item.Implementation;

  /** Prepare rendering context for a given activity. */
  _prepareActivityContext(
    activity: dnd5e.types.Activity.Instance,
  ): ActivityChoiceDialog.ActivityChoice;

  /**
   * Display the activity choice dialog.
   * @param item - The Item whose activities are being chosen.
   * @param options - Application configuration options.
   * @param options.sheet - The sheet to render this dialog a child of.
   * @returns The chosen activity, or null if the dialog was dismissed.
   */
  static create(
    item: Item.Implementation,
    options?: ActivityChoiceDialog.Configuration & {
      sheet?: foundry.applications.api.ApplicationV2.Any;
    },
  ): Promise<dnd5e.types.Activity.Instance | null>;
}

declare namespace ActivityChoiceDialog {
  interface Any extends ActivityChoiceDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ActivityChoiceDialog<any, any, any>> {}

  interface RenderContext extends Application5e.RenderContext {
    controlHint?: string | null;
    activities: ActivityChoiceDialog.ActivityChoice[];
  }
  interface Configuration extends Application5e.Configuration {}
  interface RenderOptions extends Application5e.RenderOptions {}

  /** Rendering context for a single activity choice. */
  interface ActivityChoice {
    id: string;
    name: string;
    img: string;
    sort: number;
  }
}

export default ActivityChoiceDialog;
