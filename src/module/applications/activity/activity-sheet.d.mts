/**
 * Default sheet for activities.
 *
 * Base configuration sheet for Activity pseudo-documents. A {@link PseudoDocumentSheet} bound to an
 * {@link dnd5e.types.Activity.Instance}; generic over the concrete activity so each leaf
 * (attack/damage/heal/…) binds its own activity type and extends the open context interface.
 */

import PseudoDocumentSheet from "../api/pseudo-document-sheet.mjs";

declare class ActivitySheet<
  Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.Instance,
  RenderContext extends object = ActivitySheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ActivitySheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ActivitySheet.RenderOptions,
> extends PseudoDocumentSheet<Document, RenderContext, Configuration, RenderOptions> {
  /** Key paths to parts of the submit data stored in arrays needing special handling on submission. */
  static CLEAN_ARRAYS: string[];

  /** The Activity associated with this application. */
  get activity(): Document;

  /** Prepare rendering context for the activation tab. */
  protected _prepareActivationContext(
    context: RenderContext,
    options: RenderOptions,
  ): Promise<RenderContext>;

  /** Prepare a specific applied effect if present in the activity data. */
  protected _prepareAppliedEffectContext(context: RenderContext, effect: object): object;

  /** Prepare a specific damage part if present in the activity data. */
  protected _prepareDamagePartContext(context: RenderContext, part: object): object;

  /** Prepare rendering context for the effect tab. */
  protected _prepareEffectContext(
    context: RenderContext,
    options: RenderOptions,
  ): Promise<RenderContext>;

  /** Prepare rendering context for the identity tab. */
  protected _prepareIdentityContext(
    context: RenderContext,
    options: RenderOptions,
  ): Promise<RenderContext>;

  /** Prepare the tab information for the sheet. */
  protected _getTabs(): Record<string, Partial<foundry.applications.api.ApplicationV2.Tab>>;

  /**
   * Mark the tabs data structure with the appropriate CSS class if it is active.
   * @internal
   */
  protected _markTabs(
    tabs: Record<string, Partial<foundry.applications.api.ApplicationV2.Tab>>,
  ): Record<string, Partial<foundry.applications.api.ApplicationV2.Tab>>;

  /** The data for a newly created applied effect. */
  protected _addEffectData(): object;
}

declare namespace ActivitySheet {
  interface Any extends ActivitySheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ActivitySheet<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.Instance>
    extends PseudoDocumentSheet.RenderContext<Document> {
    activity: Document;
    fields: Document["schema"]["fields"];
    inferred: Document['_source'];
    source: Document["_source"];
    tabs: Record<string, Partial<foundry.applications.api.ApplicationV2.Tab>>;

    // Fields set by _prepareActivationContext
    tab?: Partial<foundry.applications.api.ApplicationV2.Tab>;
    data?: Record<string, unknown>;
    disabled?: Record<string, boolean>;
    activationTypes?: { value: string; label: string; group?: string }[];
    affectsPlaceholder?: string;
    durationUnits?: { value: string; label: string; group?: string }[];
    rangeUnits?: { value: string; label: string; group?: string }[];
    consumptionTargets?: object[];
    showConsumeSpellSlot?: boolean;
    showScaling?: boolean;
    recoveryTypes?: { value: string; label: string }[];
    usesRecovery?: object[];
    dimensions?: object;

    // Fields set by _prepareEffectContext
    allEffects?: { value: string; label: string; selected: boolean }[];
    appliedEffects?: object[];
    denominationOptions?: foundry.applications.fields.FormSelectOption[];
    damageParts?: object[];

    // Fields set by _prepareIdentityContext
    behaviorFields?: object[];
    enriched?: string;
    placeholder?: { name: string; img: string };
    visibilityFields?: object[];
  }
  interface Configuration extends PseudoDocumentSheet.Configuration {}
  interface RenderOptions extends PseudoDocumentSheet.RenderOptions {}
}

export default ActivitySheet;
