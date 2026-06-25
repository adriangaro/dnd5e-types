/**
 * Base class for the advancement interface displayed by the advancement prompt that should be subclassed by
 * individual advancement types.
 *
 * Modern base for the advancement-interface step shown by the advancement prompt (the one the
 * concrete hit-points/trait/scale-value/… flow leaves extend). An {@link Application5e}; generic &
 * subclassable via the open interfaces.
 */

import Application5e from "../api/application.mjs";
import AdvancementManager from "./advancement-manager.mjs";

declare class AdvancementFlow<
  RenderContext extends object = AdvancementFlow.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = AdvancementFlow.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = AdvancementFlow.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  /** The Advancement this flow modifies. */
  get advancement(): dnd5e.types.Advancement.Instance | null;

  /** The Item to which the advancement belongs. */
  get item(): globalThis.Item.Implementation;

  /** The level this flow is being applied at. */
  get level(): number;

  /** The manager running this flow. */
  manager: AdvancementManager.Any | undefined;

  /**
   * Data retained by the advancement manager during a reverse step. If restoring data using
   * Advancement#restore, this data should be used when displaying the flow's form.
   */
  retainedData: object | null;

  /** @inheritDoc */
  get title(): string;

  /** Prepare rendering context for the flow contents. */
  protected _prepareContentContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the flow header. */
  protected _prepareHeaderContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Handle submission of the form. */
  protected _handleForm(
    event: Event,
    form: HTMLFormElement,
    formData: foundry.applications.ux.FormDataExtended,
  ): Promise<void>;

  /**
   * Retrieve automatic application data from the advancement, if supported.
   * @returns Data to pass to the apply method, or `false` if user intervention required.
   */
  getAutomaticApplicationValue(): Promise<object | false>;

  /**
   * Set the retained data for this flow. This method gives the flow a chance to do any additional prep
   * work when the data is initially retained.
   */
  retainData(data: object): Promise<void>;
}

declare namespace AdvancementFlow {
  interface Any extends AdvancementFlow<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AdvancementFlow<any, any, any>> {}

  interface RenderContext extends Application5e.RenderContext {
    advancement: dnd5e.types.Advancement.Instance;
    summary: string;
    hint: string;
    title: string;
  }
  interface Configuration extends Application5e.Configuration {
    /** The Advancement this flow modifies. */
    document: dnd5e.types.Advancement.Instance | null;
    /** The level this flow is being applied at. */
    level: number | null;
  }
  interface RenderOptions extends Application5e.RenderOptions {
    /** If provided, elements matching this selector will receive an `error` CSS class on render. */
    error?: { selector: string };
  }
}

export default AdvancementFlow;
