/**
 * Data definition for Rule journal entry pages.
 *
 * Document-subtype data model for Rule journal entry pages. Extends
 * `foundry.abstract.TypeDataModel` DIRECTLY (parent = JournalEntryPage.Implementation), with no
 * custom dnd5e abstract base.
 *
 * Loose typings:
 *  - `richTooltip` takes loose enrichment options (object) and returns a loose Promise (enrichment
 *    deps unported).
 *  - `toEmbed` config/options/return are loose (object / Promise<unknown>) — embed deps unported.
 */

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `rule` journal-entry-page subtype on the interface the funnel reads. */
    interface JournalEntryPage {
      rule: typeof import("./rule.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.JournalEntryPage.rule {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class RuleJournalPageData extends foundry.abstract.TypeDataModel<
  RuleJournalPageData.Schema,
  JournalEntryPage.Implementation,
  RuleJournalPageData.Base,
  RuleJournalPageData.Derived
> {
  static override defineSchema(): RuleJournalPageData.Schema;

  /** Render a rich tooltip for this page. */
  richTooltip(enrichmentOptions?: foundry.applications.ux.TextEditor.EnrichmentOptions): Promise<{ content: string; classes: string[] }>;

  /** @override */
  toEmbed(
    config: foundry.applications.ux.TextEditor.DocumentHTMLEmbedConfig,
    options?: foundry.applications.ux.TextEditor.EnrichmentOptions,
  ): Promise<HTMLElement | HTMLCollection | null>;
}

declare namespace RuleJournalPageData {
  /** Pre-Seam-D source schema (rule.mjs `defineSchema`). */
  type BaseSchema = {
    tooltip: foundry.data.fields.HTMLField;
    type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.RuleType.TypeKey, { required: true; blank: false; initial: "rule" }>;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.JournalEntryPage.rule.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.JournalEntryPage.rule.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.JournalEntryPage.rule.OverrideDerived
  >;
}

export default RuleJournalPageData;
