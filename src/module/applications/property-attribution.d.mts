/** Interface for viewing what factors went into determining a specific property. */

import Application5e from "./api/application.mjs";

declare class PropertyAttribution<
  RenderContext extends object = PropertyAttribution.RenderContext,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = PropertyAttribution.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = PropertyAttribution.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  constructor(
    object: foundry.abstract.Document.Any,
    attributions: PropertyAttribution.AttributionDescription[],
    property: string,
    options?: fvttUtils.DeepPartial<Configuration>,
  );

  /** The Document that owns the property being attributed. */
  object: foundry.abstract.Document.Any;

  /** An array of all the attribution data. */
  attributions: PropertyAttribution.AttributionDescription[];

  /** Dot separated path to the property. */
  property: string;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** Prepare tooltip contents. */
  renderTooltip(): Promise<string>;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /** Suppresses DOM insertion when the application is used as a tooltip. @override */
  protected _insertElement(element: HTMLElement): void;

  /** Produce a human-readable and localized name for the provided property. */
  getPropertyLabel(property: string): string;
}

declare namespace PropertyAttribution {
  interface Any extends PropertyAttribution<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof PropertyAttribution<any, any, any>> {}

  /** Description for a single part of a property attribution. */
  interface AttributionDescription {
    /**
     * Descriptive label that will be displayed. If the label is in the form of an @ property, the system will try to
     * turn it into a human-readable label.
     */
    label: string;
    /** Active effect application type. */
    type?: string;
    /** @deprecated since DnD5e 6.0, use `type` instead. */
    mode?: number;
    /** Value of this step. */
    value: number;
    /** Active effect applying this attribution, if any. */
    document?: ActiveEffect.Implementation;
  }

  /** Render context for `PropertyAttribution`. Open for declaration merging; extended by subclasses. */
  interface RenderContext extends Application5e.RenderContext {
    caption: string;
    sources: AttributionDescription[];
    total: number | undefined;
  }

  /** Configuration for `PropertyAttribution`. Open for declaration merging; extended by subclasses. */
  interface Configuration extends Application5e.Configuration {}

  /** Render options for `PropertyAttribution`. Open for declaration merging; extended by subclasses. */
  interface RenderOptions extends Application5e.RenderOptions {}
}

export default PropertyAttribution;
