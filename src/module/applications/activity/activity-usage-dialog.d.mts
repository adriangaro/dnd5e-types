/**
 * Dialog for configuring the usage of an activity.
 *
 * Base dialog presented when using an Activity (consumption/scaling prompts). A {@link Dialog5e};
 * generic & subclassable via the open interfaces. Concrete usage dialogs (cast/summon/…) extend it.
 */

import Dialog5e from "../api/dialog.mjs";

declare class ActivityUsageDialog<
  RenderContext extends object = ActivityUsageDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ActivityUsageDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ActivityUsageDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {
  /** The Activity being activated. */
  get activity(): dnd5e.types.Activity.Instance;

  /** The Actor that owns the activity being activated. */
  get actor(): globalThis.Actor.Implementation;

  /** The Item that owns the activity being activated. */
  get item(): globalThis.Item.Implementation;

  /** Configuration data for the activation. */
  get config(): dnd5e.types.documents.activity.ActivityUseConfiguration;

  /** Was the use button clicked? */
  get used(): boolean;

  /** Prepare rendering context for the concentration section. */
  _prepareConcentrationContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** Prepare rendering context for the consumption section. */
  _prepareConsumptionContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** Prepare rendering context for the creation section. */
  _prepareCreationContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** Prepare rendering context for the footer. */
  _prepareFooterContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** Prepare rendering context for the scaling section. */
  _prepareScalingContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** Determine whether a particular element should be displayed based on the `display` options. */
  _shouldDisplay(section: string): boolean;

  /** Perform any pre-processing of the form data to prepare it for updating. */
  _prepareSubmitData(
    event: SubmitEvent,
    formData: foundry.applications.ux.FormDataExtended,
  ): Promise<object>;

  /** Handle updating the usage configuration based on processed submit data. */
  _processSubmitData(event: SubmitEvent, submitData: object): Promise<void>;

  /** Display the activity usage dialog and await its result. */
  static create(
    activity: dnd5e.types.Activity.Instance,
    config?: dnd5e.types.documents.activity.ActivityUseConfiguration,
    options?: { sheet?: foundry.applications.api.ApplicationV2.Any } & Record<string, unknown>,
  ): Promise<dnd5e.types.documents.activity.ActivityUseConfiguration>;
}

declare namespace ActivityUsageDialog {
  interface Any extends ActivityUsageDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ActivityUsageDialog<any, any, any>> {}

  /** A note rendered in a usage section. */
  interface Note {
    type: "info" | "warn" | "error";
    message: string;
  }

  interface RenderContext extends Dialog5e.RenderContext {
    /** The Activity being activated. */
    activity: dnd5e.types.Activity.Instance;

    /** Linked activity resolved from the usage cause, if any. */
    linkedActivity: dnd5e.types.Activity.Instance | null;

    hasConcentration?: boolean;
    hasConsumption?: boolean;
    hasCreation?: boolean;
    hasScaling?: boolean;

    notes?: Note[];

    fields?: (dnd5e.applications.api.FieldsConfig & { warn?: boolean })[];

    template?: dnd5e.applications.api.FieldsConfig;

    spellSlots?: dnd5e.applications.api.FieldsConfig;

    scaling?: dnd5e.applications.api.FieldsConfig & { max: number; showRange: boolean };
  }
  interface Configuration extends Dialog5e.Configuration {
    activity?: dnd5e.types.Activity.Instance | null;
    button?: { icon?: string | null; label?: string | null };
    config?: dnd5e.types.documents.activity.ActivityUseConfiguration | null;
    display?: Record<string, boolean> & { all?: boolean };
  }
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default ActivityUsageDialog;
