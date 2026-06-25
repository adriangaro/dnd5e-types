/**
 * Data definition for Map Location journal entry pages.
 *
 * Document-subtype data model for the `map` JournalEntryPage subtype. Extends
 * `foundry.abstract.TypeDataModel` DIRECTLY (parent = JournalEntryPage.Implementation) — journal
 * pages have no custom dnd5e abstract base.
 *
 * Loose typings:
 *  - `getControlIcon` param/return (ControlIcon / PIXI.Container unported) → object / Promise-free void union.
 */

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `map` JournalEntryPage subtype on the interface the funnel reads. */
    interface JournalEntryPage {
      map: typeof import("./map.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.JournalEntryPage.map {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class MapLocationJournalPageData extends foundry.abstract.TypeDataModel<
  MapLocationJournalPageData.Schema,
  JournalEntryPage.Implementation,
  MapLocationJournalPageData.Base,
  MapLocationJournalPageData.Derived
> {
  static override defineSchema(): MapLocationJournalPageData.Schema;

  /** Adjust the number of this entry in the table of contents. */
  adjustTOCNumbering(number: number): { number: string; adjustment: number } | void;

  /** Create a control icon for rendering this page on a scene. */
  getControlIcon(options: object): unknown | void;

  /** @override */
  toEmbed(
    config: foundry.applications.ux.TextEditor.DocumentHTMLEmbedConfig,
    options?: foundry.applications.ux.TextEditor.EnrichmentOptions,
  ): Promise<HTMLElement | HTMLCollection | null>;
}

declare namespace MapLocationJournalPageData {
  /** Pre-Seam-D source schema (map.mjs `defineSchema`). */
  type BaseSchema = {
    code: foundry.data.fields.StringField;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.JournalEntryPage.map.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.JournalEntryPage.map.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.JournalEntryPage.map.OverrideDerived
  >;
}

export default MapLocationJournalPageData;
