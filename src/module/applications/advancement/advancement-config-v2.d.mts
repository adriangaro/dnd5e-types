/**
 * Base configuration application for advancements that can be extended by other types to implement custom
 * editing interfaces.
 *
 * Modern base configuration sheet for Advancement pseudo-documents (the one the concrete
 * hit-points/scale-value/trait/… config leaves extend). A {@link PseudoDocumentSheet} bound to an
 * {@link dnd5e.types.Advancement.Instance}; generic & subclassable via the open interfaces.
 */

import PseudoDocumentSheet from "../api/pseudo-document-sheet.mjs";

declare class AdvancementConfig<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
  RenderContext extends object = AdvancementConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = AdvancementConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = AdvancementConfig.RenderOptions,
> extends PseudoDocumentSheet<Document, RenderContext, Configuration, RenderOptions> {
  override get title(): string;

  /** The advancement being created or edited. */
  get advancement(): Document;

  /** Perform any changes to configuration data before it is saved to the advancement. */
  prepareConfigurationUpdate(configuration: object): Promise<object>;

  /**
   * Helper method to take an object and apply updates that remove any empty keys.
   * @param object - Object to be cleaned.
   * @returns Copy of object with only non false-ish values included and others marked with ForcedDeletion to be removed by update process.
   */
  protected static _cleanedObject(object: object): object;

  /** Handle beginning drag events on the sheet. */
  protected _onDragStart(event: DragEvent): Promise<void>;

  /** Handle dropping items onto the sheet. */
  protected _onDrop(event: DragEvent): Promise<void>;

  /** Validate a dropped Item before it is saved; throws on invalid items. */
  protected _validateDroppedItem(event: Event, item: globalThis.Item.Implementation): void;
}

declare namespace AdvancementConfig {
  interface Any extends AdvancementConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AdvancementConfig<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance>
    extends PseudoDocumentSheet.RenderContext<Document> {
    advancement: Document;
    configuration: {
      data: fvttUtils.GetKey<Document, "configuration">;
      fields: foundry.data.fields.DataSchema | undefined;
    };
    fields: Document["schema"]["fields"];
    source: Document["_source"];
    default: { title: string; icon: string; hint: string };
    levels: { value: number; label: string | number }[];
    classRestrictionOptions: { value: "" | "primary" | "secondary"; label: string }[];
    showClassRestrictions: boolean;
    showLevelSelector: boolean;
    supportsHTMLHint: boolean;
  }
  interface Configuration extends PseudoDocumentSheet.Configuration {
    dropKeyPath: string | null;
  }
  interface RenderOptions extends PseudoDocumentSheet.RenderOptions {}
}

export default AdvancementConfig;
